
-- Chat sessions table
CREATE TABLE public.chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text NOT NULL,
  page_url text,
  user_agent text,
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  message_count integer NOT NULL DEFAULT 0,
  contact_submitted boolean NOT NULL DEFAULT false,
  visitor_name text,
  visitor_email text,
  visitor_phone text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Chat messages table
CREATE TABLE public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Public can insert (anonymous visitors)
CREATE POLICY "Anyone can create chat sessions" ON public.chat_sessions FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can update own chat session" ON public.chat_sessions FOR UPDATE TO public USING (true);
CREATE POLICY "Anyone can insert chat messages" ON public.chat_messages FOR INSERT TO public WITH CHECK (true);

-- Admins can read all
CREATE POLICY "Admins can read chat sessions" ON public.chat_sessions FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admins can read chat messages" ON public.chat_messages FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admins can delete chat sessions" ON public.chat_sessions FOR DELETE TO authenticated USING (is_admin());
CREATE POLICY "Admins can delete chat messages" ON public.chat_messages FOR DELETE TO authenticated USING (is_admin());

-- Index for fast lookups
CREATE INDEX idx_chat_sessions_visitor ON public.chat_sessions(visitor_id);
CREATE INDEX idx_chat_messages_session ON public.chat_messages(session_id);
