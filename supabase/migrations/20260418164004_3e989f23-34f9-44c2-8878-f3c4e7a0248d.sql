-- Fix RLS upsert su analytics_sessions: la policy UPDATE deve avere WITH CHECK
DROP POLICY IF EXISTS "Anyone can update own session" ON public.analytics_sessions;

CREATE POLICY "Anyone can update own session"
ON public.analytics_sessions
FOR UPDATE
USING (true)
WITH CHECK (true);