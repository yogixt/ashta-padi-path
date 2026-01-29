-- Create assessments table for teacher-created assessments
CREATE TABLE public.assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  assessment_type TEXT NOT NULL DEFAULT 'custom', -- 'custom' or 'assigned'
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create assessment questions table
CREATE TABLE public.assessment_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'multiple_choice',
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create assessment assignments table (for assigning to students)
CREATE TABLE public.assessment_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  score INTEGER,
  max_score INTEGER,
  UNIQUE(assessment_id, student_id)
);

-- Enable RLS
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_assignments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for assessments
CREATE POLICY "Teachers can manage their assessments"
ON public.assessments FOR ALL
USING (auth.uid() = teacher_id);

CREATE POLICY "Students can view assigned assessments"
ON public.assessments FOR SELECT
USING (id IN (
  SELECT assessment_id FROM public.assessment_assignments
  WHERE student_id = auth.uid()
));

-- RLS Policies for assessment questions
CREATE POLICY "Teachers can manage their assessment questions"
ON public.assessment_questions FOR ALL
USING (assessment_id IN (
  SELECT id FROM public.assessments WHERE teacher_id = auth.uid()
));

CREATE POLICY "Students can view questions for assigned assessments"
ON public.assessment_questions FOR SELECT
USING (assessment_id IN (
  SELECT assessment_id FROM public.assessment_assignments
  WHERE student_id = auth.uid()
));

-- RLS Policies for assessment assignments
CREATE POLICY "Teachers can manage assignments for their assessments"
ON public.assessment_assignments FOR ALL
USING (assessment_id IN (
  SELECT id FROM public.assessments WHERE teacher_id = auth.uid()
));

CREATE POLICY "Students can view and update their assignments"
ON public.assessment_assignments FOR SELECT
USING (auth.uid() = student_id);

CREATE POLICY "Students can update their completed assignments"
ON public.assessment_assignments FOR UPDATE
USING (auth.uid() = student_id);

-- Trigger for updated_at
CREATE TRIGGER update_assessments_updated_at
BEFORE UPDATE ON public.assessments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();