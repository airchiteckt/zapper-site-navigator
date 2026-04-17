
-- Analytics sessions: una riga per visita unica
CREATE TABLE public.analytics_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text NOT NULL,
  session_id text NOT NULL UNIQUE,
  started_at timestamptz NOT NULL DEFAULT now(),
  last_activity_at timestamptz NOT NULL DEFAULT now(),
  landing_page text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  user_agent text,
  device_type text,
  language text,
  country text,
  pageview_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_sessions_visitor ON public.analytics_sessions(visitor_id);
CREATE INDEX idx_analytics_sessions_started ON public.analytics_sessions(started_at DESC);

-- Analytics events: ogni interazione
CREATE TABLE public.analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  visitor_id text NOT NULL,
  event_type text NOT NULL, -- 'pageview' | 'click' | 'scroll' | 'form_start' | 'form_field' | 'form_submit' | 'form_abandon' | 'cta_click' | 'time_on_page'
  event_name text,
  page_url text NOT NULL,
  page_title text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_events_session ON public.analytics_events(session_id);
CREATE INDEX idx_analytics_events_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_events_created ON public.analytics_events(created_at DESC);
CREATE INDEX idx_analytics_events_page ON public.analytics_events(page_url);

ALTER TABLE public.analytics_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Insert pubblico (tracking anonimo)
CREATE POLICY "Anyone can insert analytics sessions"
  ON public.analytics_sessions FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Anyone can update own session"
  ON public.analytics_sessions FOR UPDATE TO public USING (true);

CREATE POLICY "Anyone can insert analytics events"
  ON public.analytics_events FOR INSERT TO public WITH CHECK (true);

-- Solo admin possono leggere
CREATE POLICY "Admins can read analytics sessions"
  ON public.analytics_sessions FOR SELECT TO authenticated USING (is_admin());

CREATE POLICY "Admins can read analytics events"
  ON public.analytics_events FOR SELECT TO authenticated USING (is_admin());

CREATE POLICY "Admins can delete analytics sessions"
  ON public.analytics_sessions FOR DELETE TO authenticated USING (is_admin());

CREATE POLICY "Admins can delete analytics events"
  ON public.analytics_events FOR DELETE TO authenticated USING (is_admin());
