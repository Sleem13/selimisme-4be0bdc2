DROP POLICY "Service role can insert chat logs" ON public.chat_logs;
DROP POLICY "Service role can select chat logs" ON public.chat_logs;

-- Only service_role can insert (edge function uses service role key)
CREATE POLICY "Only service role can insert chat logs"
ON public.chat_logs FOR INSERT
TO service_role
WITH CHECK (true);

-- Only service_role can read logs
CREATE POLICY "Only service role can select chat logs"
ON public.chat_logs FOR SELECT
TO service_role
USING (true);