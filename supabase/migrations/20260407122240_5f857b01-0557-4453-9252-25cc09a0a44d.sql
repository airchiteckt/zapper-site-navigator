CREATE TABLE public.partner_locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT,
  city TEXT,
  country TEXT NOT NULL DEFAULT 'Italia',
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  website TEXT,
  phone TEXT,
  email TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.partner_locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active partner locations"
ON public.partner_locations FOR SELECT TO public
USING (is_active = true);

CREATE POLICY "Admins can manage partner locations"
ON public.partner_locations FOR ALL TO authenticated
USING (is_admin())
WITH CHECK (is_admin());