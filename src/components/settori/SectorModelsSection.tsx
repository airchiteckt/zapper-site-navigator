import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSectorModels } from "@/hooks/useSectorData";
import type { SectorType } from "@/types/admin";

interface Props {
  sector: SectorType;
}

const SectorModelsSection = ({ sector }: Props) => {
  const { models, isLoading } = useSectorModels(sector);

  if (isLoading) {
    return (
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (models.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Modelli consigliati per questo settore
          </h2>
          <div className={`grid gap-6 ${models.length === 1 ? 'max-w-md mx-auto' : 'sm:grid-cols-2'}`}>
            {models.map((modello) => (
              <Link
                key={modello.id}
                to={`/modelli/${modello.model_id.toLowerCase()}`}
                className="group block"
              >
                <div className="p-6 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all border border-border hover:border-accent/30">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {modello.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {modello.tagline || modello.description || ''}
                  </p>
                  <div className="flex items-center text-accent font-medium">
                    <span>Scopri il modello</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorModelsSection;
