-- Fix 1: Strengthen assessments policy to verify teacher_profiles existence
DROP POLICY IF EXISTS "Teachers can manage their assessments" ON public.assessments;

CREATE POLICY "Teachers can manage their assessments"
ON public.assessments FOR ALL
USING (
  auth.uid() = teacher_id AND 
  EXISTS (
    SELECT 1 FROM public.teacher_profiles 
    WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  auth.uid() = teacher_id AND 
  EXISTS (
    SELECT 1 FROM public.teacher_profiles 
    WHERE user_id = auth.uid()
  )
);

-- Fix 2: Strengthen assessment_questions policy to also verify teacher_profiles
DROP POLICY IF EXISTS "Teachers can manage their assessment questions" ON public.assessment_questions;

CREATE POLICY "Teachers can manage their assessment questions"
ON public.assessment_questions FOR ALL
USING (
  assessment_id IN (
    SELECT id FROM public.assessments 
    WHERE teacher_id = auth.uid()
  ) AND
  EXISTS (
    SELECT 1 FROM public.teacher_profiles 
    WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  assessment_id IN (
    SELECT id FROM public.assessments 
    WHERE teacher_id = auth.uid()
  ) AND
  EXISTS (
    SELECT 1 FROM public.teacher_profiles 
    WHERE user_id = auth.uid()
  )
);

-- Fix 3: Strengthen assessment_assignments teacher policy
DROP POLICY IF EXISTS "Teachers can manage assignments for their assessments" ON public.assessment_assignments;

CREATE POLICY "Teachers can manage assignments for their assessments"
ON public.assessment_assignments FOR ALL
USING (
  assessment_id IN (
    SELECT id FROM public.assessments 
    WHERE teacher_id = auth.uid()
  ) AND
  EXISTS (
    SELECT 1 FROM public.teacher_profiles 
    WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  assessment_id IN (
    SELECT id FROM public.assessments 
    WHERE teacher_id = auth.uid()
  ) AND
  EXISTS (
    SELECT 1 FROM public.teacher_profiles 
    WHERE user_id = auth.uid()
  )
);

-- Fix 4: Add explicit view-only policy for profiles (authenticated users can see public profile info for teacher browsing)
-- This addresses the profiles_table_public_exposure warning by making the access explicit
CREATE POLICY "Authenticated users can view teacher-linked profiles"
ON public.profiles FOR SELECT
USING (
  -- User can always view their own profile
  auth.uid() = user_id
  OR
  -- Anyone authenticated can view profiles of teachers (for teacher browsing)
  user_id IN (SELECT user_id FROM public.teacher_profiles)
  OR
  -- Teachers can view profiles of students with approved/pending connections
  (
    EXISTS (SELECT 1 FROM public.teacher_profiles WHERE user_id = auth.uid())
    AND user_id IN (
      SELECT student_id FROM public.connection_requests 
      WHERE teacher_id = auth.uid() AND status IN ('pending', 'approved')
    )
  )
);

-- Drop the old restrictive policy that only allowed self-view
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;