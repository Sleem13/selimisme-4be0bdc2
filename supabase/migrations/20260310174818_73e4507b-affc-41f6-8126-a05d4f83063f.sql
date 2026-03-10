CREATE TABLE public.chat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  user_message TEXT NOT NULL,
  assistant_response TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

-- Allow the edge function (using service role) to insert
CREATE POLICY "Service role can insert chat logs"
ON public.chat_logs FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service role can select chat logs"
ON public.chat_logs FOR SELECT
USING (true);