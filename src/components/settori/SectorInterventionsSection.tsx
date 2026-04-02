import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, MapPin } from "lucide-react";
import { useSectorInterventions } from "@/hooks/useSectorData";
import type { SectorType } from "@/types/admin";

interface Props {
  sector: SectorType;
}

const SectorInterventionsSection = ({ sector }: Props) => {
  const { interventions, isLoading } = useSectorInterventions(sector);

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (interventions.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Interventi nel settore
            </h2>
            <Link
              to="/interventi"
              className="text-primary hover:text-accent font-medium flex items-center gap-1 transition-colors"
            >
              Vedi tutti
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {interventions.map((intervento) => (
              <div
                key={intervento.id}
                className="bg-card rounded-2xl p-6 shadow-lg"
              >
                {intervento.location && (
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">{intervento.location}</span>
                  </div>
                )}
                <h3 className="font-display text-lg font-bold text-foreground mb-3">
                  {intervento.title}
                </h3>
                <div className="space-y-2 text-sm">
                  {intervento.problem && (
                    <div className="flex items-start gap-2">
                      <span className="text-destructive">⚠</span>
                      <span className="text-muted-foreground">{intervento.problem}</span>
                    </div>
                  )}
                  {intervento.description && (
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-foreground font-medium">{intervento.description}</span>
                    </div>
                  )}
                </div>
                {intervento.model_used && (
                  <div className="mt-4 px-3 py-1.5 bg-accent/10 rounded-full inline-block">
                    <span className="text-sm font-semibold text-accent">{intervento.model_used}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorInterventionsSection;
