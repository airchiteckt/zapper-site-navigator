import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AmbitoModel {
  id: string;
  name: string;
  description: string | null;
  model_id: string;
  tagline: string | null;
}

export function useAmbitoModels(ambitoId: string) {
  const [models, setModels] = useState<AmbitoModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from('models')
        .select('id, name, description, model_id, tagline, ambiti_ideali')
        .order('name');

      if (data) {
        const filtered = data.filter((m) => {
          const ambiti = (m.ambiti_ideali as any[]) || [];
          return ambiti.some(
            (a: any) =>
              a.href?.includes(ambitoId) || a.name?.toLowerCase().includes(ambitoId)
          );
        });
        setModels(
          filtered.map((m) => ({
            id: m.id,
            name: m.name,
            description: m.description,
            model_id: m.model_id,
            tagline: m.tagline,
          }))
        );
      }
      setIsLoading(false);
    };
    fetchModels();
  }, [ambitoId]);

  return { models, isLoading };
}
