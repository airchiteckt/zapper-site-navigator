import { useState } from "react";
import { FileText, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeadMagnetModal from "./LeadMagnetModal";
import { trackCTA } from "@/lib/analytics";

interface LeadMagnetBannerProps {
  source?: string;
  variant?: "full" | "compact";
}

const LeadMagnetBanner = ({ source = "lead_magnet_banner", variant = "full" }: LeadMagnetBannerProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    trackCTA("lead_magnet_open", { source });
    setOpen(true);
  };

  if (variant === "compact") {
    return (
      <>
        <div className="bg-foreground text-background rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base mb-1">Guida tecnica gratuita</h3>
            <p className="text-sm text-background/70">
              7 errori da evitare + checklist normativa. PDF di 10 pagine.
            </p>
          </div>
          <Button onClick={handleOpen} variant="accent" className="w-full sm:w-auto flex-shrink-0">
            <Download className="w-4 h-4 mr-2" />Scarica
          </Button>
        </div>
        <LeadMagnetModal open={open} onClose={() => setOpen(false)} source={source} />
      </>
    );
  }

  return (
    <>
      <section className="py-12 md:py-16 bg-foreground">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4">
                <FileText className="w-3.5 h-3.5" />
                <span>RISORSA GRATUITA</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-background mb-4 leading-tight">
                Guida tecnica all'abbattimento fumi
              </h2>
              <p className="text-background/80 text-base md:text-lg mb-6 leading-relaxed">
                10 pagine di esperienza diretta dei nostri tecnici. Evita gli errori più costosi
                prima di scegliere il tuo sistema.
              </p>
              <ul className="space-y-2 mb-6 text-background/80 text-sm md:text-base">
                <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span><span>I 7 errori più costosi (con soluzione)</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span><span>Checklist normativa aggiornata 2025</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span><span>Tabella diagnostica rapida</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span><span>Case study reale documentato</span></li>
              </ul>
              <Button onClick={handleOpen} variant="accent" size="lg" className="text-base">
                <Download className="w-5 h-5 mr-2" />
                Scarica la guida gratuita
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-background/50 text-xs mt-3">Già scaricata da oltre 500 professionisti.</p>
            </div>

            {/* Visual mockup */}
            <div className="relative hidden md:block">
              <div className="bg-gradient-to-br from-primary/30 to-primary/5 rounded-2xl p-8 transform rotate-2">
                <div className="bg-background rounded-lg shadow-2xl aspect-[3/4] p-6 flex flex-col">
                  <div className="h-1.5 bg-primary rounded mb-4" />
                  <div className="text-foreground text-2xl font-bold leading-tight mb-2">Guida tecnica</div>
                  <div className="text-primary text-sm font-semibold mb-4">all'abbattimento fumi</div>
                  <div className="flex-1 space-y-2">
                    <div className="h-2 bg-muted rounded w-full" />
                    <div className="h-2 bg-muted rounded w-5/6" />
                    <div className="h-2 bg-muted rounded w-4/6" />
                    <div className="h-2 bg-muted rounded w-full mt-4" />
                    <div className="h-2 bg-muted rounded w-3/4" />
                  </div>
                  <div className="mt-4 pt-4 border-t border-muted">
                    <div className="text-foreground font-bold text-sm">ZAPPER®</div>
                    <div className="text-muted-foreground text-xs">10 pagine • PDF</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LeadMagnetModal open={open} onClose={() => setOpen(false)} source={source} />
    </>
  );
};

export default LeadMagnetBanner;
