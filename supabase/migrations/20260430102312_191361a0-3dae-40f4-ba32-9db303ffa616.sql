-- Tabella schede cliente
CREATE TABLE public.client_sheets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_token text NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(18), 'hex'),
  status text NOT NULL DEFAULT 'draft', -- draft | sent | closed
  
  -- Sezione 1: Dati generali
  business_name text NOT NULL,
  contact_name text,
  contact_phone text,
  contact_email text,
  address text,
  business_type text,
  opening_hours text,
  intervention_hours text,
  
  -- Sezioni 2-9 (dati strutturati flessibili)
  kitchen_hood jsonb NOT NULL DEFAULT '{}'::jsonb,        -- sez 2
  cooking_area jsonb NOT NULL DEFAULT '{}'::jsonb,        -- sez 3
  ductwork jsonb NOT NULL DEFAULT '{}'::jsonb,            -- sez 4
  exhaust_system jsonb NOT NULL DEFAULT '{}'::jsonb,      -- sez 5
  carbon_filters jsonb NOT NULL DEFAULT '{}'::jsonb,      -- sez 6
  operating_conditions jsonb NOT NULL DEFAULT '{}'::jsonb,-- sez 7
  risks jsonb NOT NULL DEFAULT '{}'::jsonb,               -- sez 8
  intervention_estimate jsonb NOT NULL DEFAULT '{}'::jsonb,-- sez 9
  
  -- Sezione 10: Opportunità commerciali (preventivo)
  -- struttura: [{ id, label, description, frequency, price_cents, included }]
  quote_items jsonb NOT NULL DEFAULT '[]'::jsonb,
  quote_notes text,
  quote_total_cents integer NOT NULL DEFAULT 0,
  
  -- Sezione 11: Valutazione interna (sempre privata)
  internal_evaluation jsonb NOT NULL DEFAULT '{}'::jsonb,
  
  -- Toggle visibilità pubblica per ogni sezione (1..11)
  section_visibility jsonb NOT NULL DEFAULT jsonb_build_object(
    'general', true,        -- sez 1
    'kitchen_hood', true,   -- sez 2
    'cooking_area', false,  -- sez 3
    'ductwork', false,      -- sez 4
    'exhaust_system', false,-- sez 5
    'carbon_filters', true, -- sez 6
    'operating_conditions', false, -- sez 7
    'risks', false,         -- sez 8
    'intervention_estimate', false,-- sez 9
    'quote', true,          -- sez 10
    'evaluation', false     -- sez 11 (consigliato OFF)
  ),
  
  created_by uuid,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_client_sheets_token ON public.client_sheets(public_token);
CREATE INDEX idx_client_sheets_created_at ON public.client_sheets(created_at DESC);

-- Tabella foto sopralluogo
CREATE TABLE public.client_sheet_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sheet_id uuid NOT NULL REFERENCES public.client_sheets(id) ON DELETE CASCADE,
  category text NOT NULL, -- 'hood_front' | 'hood_inside' | 'filters' | 'cooking_area' | 'ductwork' | 'exhaust' | 'other'
  url text NOT NULL,
  caption text,
  is_public boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_client_sheet_photos_sheet ON public.client_sheet_photos(sheet_id);

-- RLS
ALTER TABLE public.client_sheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_sheet_photos ENABLE ROW LEVEL SECURITY;

-- client_sheets: admin/contributor gestione completa
CREATE POLICY "Content editors can read client sheets"
  ON public.client_sheets FOR SELECT
  TO authenticated
  USING (is_content_editor());

CREATE POLICY "Content editors can insert client sheets"
  ON public.client_sheets FOR INSERT
  TO authenticated
  WITH CHECK (is_content_editor());

CREATE POLICY "Content editors can update client sheets"
  ON public.client_sheets FOR UPDATE
  TO authenticated
  USING (is_content_editor());

CREATE POLICY "Admins can delete client sheets"
  ON public.client_sheets FOR DELETE
  TO authenticated
  USING (is_admin());

-- client_sheet_photos: stesse regole + lettura pubblica sotto controllo della funzione (vedi sotto)
CREATE POLICY "Content editors can read sheet photos"
  ON public.client_sheet_photos FOR SELECT
  TO authenticated
  USING (is_content_editor());

CREATE POLICY "Content editors can insert sheet photos"
  ON public.client_sheet_photos FOR INSERT
  TO authenticated
  WITH CHECK (is_content_editor());

CREATE POLICY "Content editors can update sheet photos"
  ON public.client_sheet_photos FOR UPDATE
  TO authenticated
  USING (is_content_editor());

CREATE POLICY "Content editors can delete sheet photos"
  ON public.client_sheet_photos FOR DELETE
  TO authenticated
  USING (is_content_editor());

-- Funzione SECURITY DEFINER per accesso pubblico via token
-- Restituisce la scheda + foto ma solo i campi delle sezioni marcate visibili.
CREATE OR REPLACE FUNCTION public.get_public_client_sheet(_token text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  sheet public.client_sheets%ROWTYPE;
  vis jsonb;
  result jsonb;
  photos jsonb;
BEGIN
  SELECT * INTO sheet FROM public.client_sheets WHERE public_token = _token;
  IF NOT FOUND THEN
    RETURN NULL;
  END IF;
  
  vis := sheet.section_visibility;
  
  -- Costruisco l'oggetto pubblico solo con le sezioni visibili
  result := jsonb_build_object(
    'id', sheet.id,
    'business_name', sheet.business_name,
    'status', sheet.status,
    'created_at', sheet.created_at,
    'section_visibility', vis
  );
  
  IF (vis->>'general')::boolean THEN
    result := result || jsonb_build_object(
      'contact_name', sheet.contact_name,
      'contact_phone', sheet.contact_phone,
      'contact_email', sheet.contact_email,
      'address', sheet.address,
      'business_type', sheet.business_type,
      'opening_hours', sheet.opening_hours,
      'intervention_hours', sheet.intervention_hours
    );
  END IF;
  
  IF (vis->>'kitchen_hood')::boolean THEN
    result := result || jsonb_build_object('kitchen_hood', sheet.kitchen_hood);
  END IF;
  IF (vis->>'cooking_area')::boolean THEN
    result := result || jsonb_build_object('cooking_area', sheet.cooking_area);
  END IF;
  IF (vis->>'ductwork')::boolean THEN
    result := result || jsonb_build_object('ductwork', sheet.ductwork);
  END IF;
  IF (vis->>'exhaust_system')::boolean THEN
    result := result || jsonb_build_object('exhaust_system', sheet.exhaust_system);
  END IF;
  IF (vis->>'carbon_filters')::boolean THEN
    result := result || jsonb_build_object('carbon_filters', sheet.carbon_filters);
  END IF;
  IF (vis->>'operating_conditions')::boolean THEN
    result := result || jsonb_build_object('operating_conditions', sheet.operating_conditions);
  END IF;
  IF (vis->>'risks')::boolean THEN
    result := result || jsonb_build_object('risks', sheet.risks);
  END IF;
  IF (vis->>'intervention_estimate')::boolean THEN
    result := result || jsonb_build_object('intervention_estimate', sheet.intervention_estimate);
  END IF;
  IF (vis->>'quote')::boolean THEN
    result := result || jsonb_build_object(
      'quote_items', sheet.quote_items,
      'quote_notes', sheet.quote_notes,
      'quote_total_cents', sheet.quote_total_cents
    );
  END IF;
  IF (vis->>'evaluation')::boolean THEN
    result := result || jsonb_build_object('internal_evaluation', sheet.internal_evaluation);
  END IF;
  
  -- Foto pubbliche
  SELECT COALESCE(jsonb_agg(jsonb_build_object(
    'id', p.id,
    'category', p.category,
    'url', p.url,
    'caption', p.caption,
    'sort_order', p.sort_order
  ) ORDER BY p.sort_order, p.created_at), '[]'::jsonb)
  INTO photos
  FROM public.client_sheet_photos p
  WHERE p.sheet_id = sheet.id AND p.is_public = true;
  
  result := result || jsonb_build_object('photos', photos);
  
  RETURN result;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_public_client_sheet(text) TO anon, authenticated;

-- Trigger updated_at
CREATE TRIGGER update_client_sheets_updated_at
  BEFORE UPDATE ON public.client_sheets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();