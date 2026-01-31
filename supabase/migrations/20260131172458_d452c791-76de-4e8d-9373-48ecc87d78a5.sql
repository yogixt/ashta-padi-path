-- Create user_progress table for persisting learning state
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  selected_profession TEXT,
  selected_module TEXT,
  current_vocab_index INTEGER NOT NULL DEFAULT 0,
  vocab_completed BOOLEAN NOT NULL DEFAULT false,
  completed_vocab_terms INTEGER[] NOT NULL DEFAULT '{}',
  current_sutra_index INTEGER NOT NULL DEFAULT 0,
  sutras_completed INTEGER NOT NULL DEFAULT 0,
  quiz_answers JSONB NOT NULL DEFAULT '{}',
  quiz_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Users can view their own progress
CREATE POLICY "Users can view their own progress"
  ON public.user_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can insert their own progress"
  ON public.user_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update their own progress"
  ON public.user_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Add trigger for updating updated_at timestamp
CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();