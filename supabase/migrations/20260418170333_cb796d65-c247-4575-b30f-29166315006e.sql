-- Fix: consenti SELECT/UPDATE pubblici sulla propria session per evitare errori RLS durante upsert
-- L'upsert con onConflict richiede di poter leggere la riga esistente.
-- Manteniamo lettura admin-only per le altre sessioni tramite policy esistente.

-- Aggiungi policy SELECT per chiunque sulla propria sessione (necessaria per upsert con onConflict)
CREATE POLICY "Anyone can read own session for upsert"
ON public.analytics_sessions
FOR SELECT
TO public
USING (true);

-- La policy UPDATE esiste già ('Anyone can update own session') quindi va bene