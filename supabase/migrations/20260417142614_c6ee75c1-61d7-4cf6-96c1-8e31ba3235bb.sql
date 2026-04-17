-- Tabella di fallback per salvare TUTTI gli invii form del sito
CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL,
  name TEXT,
  email TEXT,
  phone TEXT,
  sector TEXT,
  message TEXT,
  extra JSONB DEFAULT '{}'::jsonb,
  page_url TEXT,
  user_agent TEXT,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  email_error TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_form_submissions_created_at ON public.form_submissions(created_at DESC);
CREATE INDEX idx_form_submissions_status ON public.form_submissions(status);
CREATE INDEX idx_form_submissions_source ON public.form_submissions(source);

ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert form submissions"
  ON public.form_submissions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can read form submissions"
  ON public.form_submissions FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can update form submissions"
  ON public.form_submissions FOR UPDATE
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can delete form submissions"
  ON public.form_submissions FOR DELETE
  TO authenticated
  USING (is_admin());

CREATE TRIGGER update_form_submissions_updated_at
  BEFORE UPDATE ON public.form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();