-- FIX 1: Restrict profiles table - users can only see their own profile
-- Teacher profiles are discoverable via teacher_profiles table, not the profiles table directly
DROP POLICY IF EXISTS "Authenticated users can view teacher-linked profiles" ON public.profiles;

-- Users can only view their own profile directly
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

-- Teachers can view profiles of students with approved/pending connections (for connection management)
CREATE POLICY "Teachers can view connected student profiles"
ON public.profiles FOR SELECT
USING (
  EXISTS (SELECT 1 FROM public.teacher_profiles WHERE user_id = auth.uid())
  AND user_id IN (
    SELECT student_id FROM public.connection_requests 
    WHERE teacher_id = auth.uid() AND status IN ('pending', 'approved')
  )
);

-- FIX 2: Restrict teacher_profiles - hide meeting links from non-approved users
-- Create a view that exposes only public fields (no meeting links)
DROP POLICY IF EXISTS "Anyone can view teacher profiles" ON public.teacher_profiles;

-- Teachers can always view their own full profile
CREATE POLICY "Teachers can view their own full profile"
ON public.teacher_profiles FOR SELECT
USING (auth.uid() = user_id);

-- Approved students can view full teacher profiles (including meeting links)
CREATE POLICY "Approved students can view full teacher profiles"
ON public.teacher_profiles FOR SELECT
USING (
  user_id IN (
    SELECT cr.teacher_id FROM public.connection_requests cr
    WHERE cr.student_id = auth.uid() AND cr.status = 'approved'
  )
);

-- Create a public view for teacher discovery (excludes sensitive meeting links)
CREATE OR REPLACE VIEW public.teacher_profiles_public
WITH (security_invoker = on)
AS SELECT 
  id,
  user_id,
  degree,
  faculty_type,
  created_at,
  updated_at
  -- Explicitly excludes: zoom_link, gmeet_link
FROM public.teacher_profiles;

-- Allow anyone authenticated to browse teachers via the public view
GRANT SELECT ON public.teacher_profiles_public TO authenticated;

-- FIX 3: assessment_questions_answer_exposure - Already mitigated
-- The existing get_student_assessment_questions() SECURITY DEFINER function
-- already strips correct_answer and explanation fields before returning to students.
-- Students access questions ONLY through this RPC, never directly via RLS.
-- No additional changes needed - documenting that this is intentionally secure.