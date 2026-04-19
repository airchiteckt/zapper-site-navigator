import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck, Sparkles, MessageCircle } from "lucide-react";
import founderImage from "@/assets/pasquale-elefante-founder.jpg";

const STEPS = [
  {
    icon: CheckCircle2,
    title: "Verifica di fattibilità",
    description:
      "Analizziamo insieme a te e ai nostri partner il tuo impianto, le emissioni e i vincoli normativi (ASL/ARPA, vicinato).",
  },
  {
    icon: ShieldCheck,
    title: "Proposta soddisfatti o rimborsati",
    description:
      "Ti proponiamo la soluzione tecnica più adatta con la garanzia ZAPPER®: se non risolve, ti rimborsiamo.",
  },
  {
    icon: Sparkles,
    title: "Professionalità a 360°",
    description:
      "Assistenza pre, durante e post-vendita: progettazione, installazione, manutenzione e supporto normativo.",
  },
];

const FounderSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Foto */}
          <div className="relative order-1 lg:order-1">
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
            <img
              src={founderImage}
              alt="Pasquale Elefante — Fondatore e Responsabile Tecnico ZAPPER®"
              width={1024}
              height={1024}
              loading="lazy"
              decoding="async"
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover aspect-square"
            />
            {/* Badge fondatore */}
            <div className="absolute -bottom-5 left-4 right-4 sm:left-6 sm:right-auto bg-card border border-border p-4 sm:p-5 rounded-xl shadow-xl">
              <p className="font-display font-bold text-foreground text-base sm:text-lg leading-tight">
                Pasquale Elefante
              </p>
              <p className="text-sm text-muted-foreground">
                Fondatore & Responsabile Tecnico
              </p>
            </div>
          </div>

          {/* Contenuto */}
          <div className="order-2 lg:order-2 mt-6 lg:mt-0">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4">
              Parla direttamente con chi progetta la tua soluzione
            </span>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Una consulenza{" "}
              <span className="text-primary">tecnica e personale</span>
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed">
              Pasquale, insieme alla nostra rete di partner certificati, analizza
              ogni progetto per risolvere professionalmente le problematiche di{" "}
              <strong className="text-foreground">
                fuliggine, odori e inquinanti
              </strong>{" "}
              che disturbano il vicinato o creano contenziosi con{" "}
              <strong className="text-foreground">ASL/ARPA</strong> e normative
              ambientali.
            </p>

            {/* 3 Step */}
            <div className="space-y-4 mb-8">
              {STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground text-base sm:text-lg mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA secondaria WhatsApp */}
            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <a
                href="https://wa.me/390811996843?text=Ciao%20Pasquale%2C%20vorrei%20una%20valutazione%20tecnica%20per%20il%20mio%20impianto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Scrivi a Pasquale su WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
