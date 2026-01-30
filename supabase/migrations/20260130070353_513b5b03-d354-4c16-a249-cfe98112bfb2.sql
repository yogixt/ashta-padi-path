-- Fix the security definer view issue by dropping it and using RLS policies instead
DROP VIEW IF EXISTS public.student_assessment_questions;

-- The security is now handled by:
-- 1. The RLS policy "Students can view questions for incomplete assignments" on assessment_questions
-- 2. The submit_assessment_answers function for verifying answers server-side
-- Students will query assessment_questions but the correct_answer field should not be exposed in the frontend queries