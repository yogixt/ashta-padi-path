-- Create table to track user learning activity
CREATE TABLE public.user_activity (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
  activity_type TEXT NOT NULL, -- 'vocabulary', 'sutra', 'quiz'
  activity_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, activity_date, activity_type)
);

-- Enable RLS
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

-- Users can view their own activity
CREATE POLICY "Users can view their own activity"
  ON public.user_activity FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own activity
CREATE POLICY "Users can insert their own activity"
  ON public.user_activity FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own activity (for incrementing counts)
CREATE POLICY "Users can update their own activity"
  ON public.user_activity FOR UPDATE
  USING (auth.uid() = user_id);

-- Create index for efficient date range queries
CREATE INDEX idx_user_activity_user_date ON public.user_activity(user_id, activity_date);

-- Function to log or increment activity for today
CREATE OR REPLACE FUNCTION public.log_user_activity(
  p_activity_type TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.user_activity (user_id, activity_date, activity_type, activity_count)
  VALUES (auth.uid(), CURRENT_DATE, p_activity_type, 1)
  ON CONFLICT (user_id, activity_date, activity_type)
  DO UPDATE SET activity_count = user_activity.activity_count + 1;
END;
$$;