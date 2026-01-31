-- Create user_progress table to persist learning progress
CREATE TABLE IF NOT EXISTS public.user_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  selected_profession text,
  selected_module text,
  current_vocab_index integer DEFAULT 0,
  vocab_completed boolean DEFAULT false,
  completed_vocab_terms integer[] DEFAULT '{}',
  current_sutra_index integer DEFAULT 0,
  sutras_completed integer DEFAULT 0,
  quiz_answers jsonb DEFAULT '{}',
  quiz_score integer,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Users can only see their own progress
CREATE POLICY "Users can view own progress"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can insert own progress"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update own progress"
  ON public.user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS user_progress_user_id_idx ON public.user_progress(user_id);
