-- Fix 1: Create a secure RPC function for students to get questions WITHOUT correct answers
CREATE OR REPLACE FUNCTION public.get_student_assessment_questions(p_assignment_id uuid)
RETURNS TABLE (
  id uuid,
  assessment_id uuid,
  question_text text,
  question_type text,
  options jsonb,
  order_index integer
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    aq.id,
    aq.assessment_id,
    aq.question_text,
    aq.question_type,
    aq.options,
    aq.order_index
  FROM assessment_questions aq
  INNER JOIN assessment_assignments aa ON aa.assessment_id = aq.assessment_id
  WHERE aa.id = p_assignment_id
    AND aa.student_id = auth.uid()
    AND aa.completed_at IS NULL
  ORDER BY aq.order_index;
$$;

-- Drop the existing policy that exposes answers
DROP POLICY IF EXISTS "Students can view questions for incomplete assignments" ON public.assessment_questions;

-- Create a more restrictive policy - students can only view via the RPC function
-- Teachers still have full access through their existing policy
-- This ensures students cannot directly SELECT from assessment_questions