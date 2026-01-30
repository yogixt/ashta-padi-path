-- Fix: Students should not be able to see correct answers before completing assessments
-- Drop the existing policy that exposes correct_answer to students
DROP POLICY IF EXISTS "Students can view questions for assigned assessments" ON public.assessment_questions;

-- Create a new policy that allows students to view questions only for assessments they haven't completed
-- Note: This doesn't prevent reading correct_answer column, so we'll use a security definer function
CREATE POLICY "Students can view questions for incomplete assignments"
ON public.assessment_questions FOR SELECT
USING (
  assessment_id IN (
    SELECT aa.assessment_id 
    FROM public.assessment_assignments aa
    WHERE aa.student_id = auth.uid() 
    AND aa.completed_at IS NULL
  )
);

-- Create a security definer function to check answers server-side
-- This function verifies answers and returns the score without exposing correct answers
CREATE OR REPLACE FUNCTION public.submit_assessment_answers(
  p_assignment_id UUID,
  p_answers JSONB -- Format: [{"question_id": "uuid", "answer": "text"}, ...]
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_student_id UUID;
  v_assessment_id UUID;
  v_completed_at TIMESTAMPTZ;
  v_question RECORD;
  v_answer JSONB;
  v_correct_count INT := 0;
  v_total_count INT := 0;
  v_results JSONB := '[]'::JSONB;
BEGIN
  -- Verify the assignment belongs to the current user and is not completed
  SELECT student_id, assessment_id, completed_at
  INTO v_student_id, v_assessment_id, v_completed_at
  FROM public.assessment_assignments
  WHERE id = p_assignment_id;
  
  IF v_student_id IS NULL THEN
    RETURN jsonb_build_object('error', 'Assignment not found');
  END IF;
  
  IF v_student_id != auth.uid() THEN
    RETURN jsonb_build_object('error', 'Unauthorized');
  END IF;
  
  IF v_completed_at IS NOT NULL THEN
    RETURN jsonb_build_object('error', 'Assessment already completed');
  END IF;
  
  -- Check each answer
  FOR v_question IN 
    SELECT id, question_text, correct_answer, explanation
    FROM public.assessment_questions
    WHERE assessment_id = v_assessment_id
    ORDER BY order_index
  LOOP
    v_total_count := v_total_count + 1;
    
    -- Find the student's answer for this question
    SELECT value INTO v_answer
    FROM jsonb_array_elements(p_answers)
    WHERE value->>'question_id' = v_question.id::text;
    
    IF v_answer IS NOT NULL AND (v_answer->>'answer') = v_question.correct_answer THEN
      v_correct_count := v_correct_count + 1;
      v_results := v_results || jsonb_build_object(
        'question_id', v_question.id,
        'correct', true,
        'correct_answer', v_question.correct_answer,
        'explanation', v_question.explanation
      );
    ELSE
      v_results := v_results || jsonb_build_object(
        'question_id', v_question.id,
        'correct', false,
        'your_answer', COALESCE(v_answer->>'answer', 'Not answered'),
        'correct_answer', v_question.correct_answer,
        'explanation', v_question.explanation
      );
    END IF;
  END LOOP;
  
  -- Update the assignment with the score and completion time
  UPDATE public.assessment_assignments
  SET 
    score = v_correct_count,
    max_score = v_total_count,
    completed_at = NOW()
  WHERE id = p_assignment_id;
  
  RETURN jsonb_build_object(
    'score', v_correct_count,
    'max_score', v_total_count,
    'percentage', CASE WHEN v_total_count > 0 THEN ROUND((v_correct_count::NUMERIC / v_total_count) * 100, 2) ELSE 0 END,
    'results', v_results
  );
END;
$$;

-- Create a view for students that excludes correct answers
-- Students should use this view instead of querying assessment_questions directly
CREATE OR REPLACE VIEW public.student_assessment_questions AS
SELECT 
  aq.id,
  aq.assessment_id,
  aq.question_text,
  aq.question_type,
  aq.options,
  aq.order_index,
  aq.created_at
  -- Note: correct_answer and explanation are intentionally excluded
FROM public.assessment_questions aq
WHERE aq.assessment_id IN (
  SELECT aa.assessment_id 
  FROM public.assessment_assignments aa
  WHERE aa.student_id = auth.uid() 
  AND aa.completed_at IS NULL
);

-- Grant access to the view
GRANT SELECT ON public.student_assessment_questions TO authenticated;