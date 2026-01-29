-- Create enum for faculty type
CREATE TYPE public.faculty_type AS ENUM ('permanent', 'visiting');

-- Create storage bucket for profile images
INSERT INTO storage.buckets (id, name, public) VALUES ('profile-images', 'profile-images', true);

-- Create storage policies for profile images
CREATE POLICY "Anyone can view profile images"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-images');

CREATE POLICY "Users can upload their own profile image"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own profile image"
ON storage.objects FOR UPDATE
USING (bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own profile image"
ON storage.objects FOR DELETE
USING (bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add avatar_url column to profiles if not exists (already exists but ensuring it's used)
-- Add more fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS university TEXT,
ADD COLUMN IF NOT EXISTS department TEXT;

-- Create teacher_profiles table for teacher-specific data
CREATE TABLE public.teacher_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  faculty_type faculty_type NOT NULL DEFAULT 'permanent',
  degree TEXT,
  zoom_link TEXT,
  gmeet_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create publications table
CREATE TABLE public.publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES public.teacher_profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  publication_type TEXT NOT NULL CHECK (publication_type IN ('book', 'paper', 'conference')),
  url TEXT,
  published_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blogs/notes table
CREATE TABLE public.teacher_blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES public.teacher_profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create student_profiles table for student-specific data
CREATE TABLE public.student_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  academic_level TEXT,
  qualifications TEXT,
  interests TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create connection_requests table
CREATE TABLE public.connection_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(student_id, teacher_id)
);

-- Enable RLS on all new tables
ALTER TABLE public.teacher_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connection_requests ENABLE ROW LEVEL SECURITY;

-- Teacher profiles policies
CREATE POLICY "Teachers can view their own profile"
ON public.teacher_profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Teachers can insert their own profile"
ON public.teacher_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id AND public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "Teachers can update their own profile"
ON public.teacher_profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view teacher profiles"
ON public.teacher_profiles FOR SELECT
USING (true);

-- Publications policies
CREATE POLICY "Teachers can manage their publications"
ON public.publications FOR ALL
USING (teacher_id IN (SELECT id FROM public.teacher_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Approved students can view publications"
ON public.publications FOR SELECT
USING (
  teacher_id IN (
    SELECT tp.id FROM public.teacher_profiles tp
    JOIN public.connection_requests cr ON cr.teacher_id = tp.user_id
    WHERE cr.student_id = auth.uid() AND cr.status = 'approved'
  )
  OR
  teacher_id IN (SELECT id FROM public.teacher_profiles WHERE user_id = auth.uid())
);

-- Blogs policies
CREATE POLICY "Teachers can manage their blogs"
ON public.teacher_blogs FOR ALL
USING (teacher_id IN (SELECT id FROM public.teacher_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Approved students can view blogs"
ON public.teacher_blogs FOR SELECT
USING (
  teacher_id IN (
    SELECT tp.id FROM public.teacher_profiles tp
    JOIN public.connection_requests cr ON cr.teacher_id = tp.user_id
    WHERE cr.student_id = auth.uid() AND cr.status = 'approved'
  )
  OR
  teacher_id IN (SELECT id FROM public.teacher_profiles WHERE user_id = auth.uid())
);

-- Student profiles policies
CREATE POLICY "Students can view their own profile"
ON public.student_profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Students can insert their own profile"
ON public.student_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id AND public.has_role(auth.uid(), 'student'));

CREATE POLICY "Students can update their own profile"
ON public.student_profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Teachers can view approved student profiles"
ON public.student_profiles FOR SELECT
USING (
  user_id IN (
    SELECT cr.student_id FROM public.connection_requests cr
    WHERE cr.teacher_id = auth.uid() AND cr.status IN ('pending', 'approved')
  )
);

-- Connection requests policies
CREATE POLICY "Students can create connection requests"
ON public.connection_requests FOR INSERT
WITH CHECK (auth.uid() = student_id AND public.has_role(auth.uid(), 'student'));

CREATE POLICY "Students can view their own requests"
ON public.connection_requests FOR SELECT
USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view requests to them"
ON public.connection_requests FOR SELECT
USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can update requests to them"
ON public.connection_requests FOR UPDATE
USING (auth.uid() = teacher_id);

-- Update triggers for updated_at
CREATE TRIGGER update_teacher_profiles_updated_at
BEFORE UPDATE ON public.teacher_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_teacher_blogs_updated_at
BEFORE UPDATE ON public.teacher_blogs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_student_profiles_updated_at
BEFORE UPDATE ON public.student_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_connection_requests_updated_at
BEFORE UPDATE ON public.connection_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();