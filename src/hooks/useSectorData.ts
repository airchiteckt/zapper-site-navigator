import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { SectorType } from '@/types/admin';

interface SectorModel {
  id: string;
  name: string;
  tagline: string | null;
  description: string | null;
  model_id: string;
}

interface SectorIntervention {
  id: string;
  title: string;
  location: string | null;
  problem: string | null;
  description: string | null;
  model_used: string | null;
  client_name: string | null;
}

export function useSectorModels(sector: SectorType) {
  const [models, setModels] = useState<SectorModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from('models')
        .select('id, name, tagline, description, model_id, settori_utilizzo')
        .order('name');

      if (data) {
        // Filter models whose settori_utilizzo contains href matching the sector
        const filtered = data.filter((m) => {
          const settori = (m.settori_utilizzo as any[]) || [];
          return settori.some(
            (s: any) =>
              s.href?.includes(sector) || s.name?.toLowerCase().includes(sector)
          );
        });
        setModels(
          filtered.map((m) => ({
            id: m.id,
            name: m.name,
            tagline: m.tagline,
            description: m.description,
            model_id: m.model_id,
          }))
        );
      }
      setIsLoading(false);
    };
    fetch();
  }, [sector]);

  return { models, isLoading };
}

export function useSectorInterventions(sector: SectorType, limit = 4) {
  const [interventions, setInterventions] = useState<SectorIntervention[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from('interventions')
        .select('id, title, location, problem, description, model_used, client_name')
        .eq('sector', sector)
        .order('created_at', { ascending: false })
        .limit(limit);

      setInterventions((data as SectorIntervention[]) || []);
      setIsLoading(false);
    };
    fetch();
  }, [sector, limit]);

  return { interventions, isLoading };
}
