import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, AlertTriangle, MapPin, LucideIcon, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/layout/Footer";
import { useAmbitoModels } from "@/hooks/useAmbitoModels";

export interface AmbitoData {
  id: string;
  title: string;
  settore: "professionale" | "domestico" | "industriale";
  settoreLabel: string;
  settoreHref: string;
  icon: LucideIcon;
  heroColor: string;
  description: string;
  problemiTipici: string[];
  applicazioni: { name: string; href: string; description: string }[];
  modelliConsigliati: { name: string; descrizione: string; href: string }[];
  miniInterventi: {
    titolo: string;
    citta: string;
    problema: string;
    risultato: string;
    modello: string;
  }[];
}

interface AmbitoTemplateProps {
  data: AmbitoData;
}

const AmbitoTemplate = ({ data }: AmbitoTemplateProps) => {
  const { models: dbModels, isLoading: modelsLoading } = useAmbitoModels(data.id);

  // Use DB models if available, otherwise fall back to hardcoded
  const displayModels = dbModels.length > 0
    ? dbModels.map((m) => ({
        name: m.name,
        descrizione: m.tagline || m.description || '',
        href: `/modelli/${m.model_id}`,
      }))
    : data.modelliConsigliati;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Breadcrumb + Hero */}
        <section className={`pt-24 pb-12 md:pt-32 md:pb-16 ${data.heroColor}`}>
          <div className="container">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-6">
              <Link to="/settori" className="hover:text-primary-foreground transition-colors">Settori</Link>
              <span>/</span>
              <Link to={data.settoreHref} className="hover:text-primary-foreground transition-colors">{data.settoreLabel}</Link>
              <span>/</span>
              <span className="text-primary-foreground">{data.title}</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                  <data.icon className="w-7 h-7 text-primary-foreground" />
                </div>
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                {data.title}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80">
                {data.description}
              </p>
            </div>
          </div>
        </section>

        {/* Problemi Tipici */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-accent" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Problemi tipici
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.problemiTipici.map((problema, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 bg-card rounded-xl shadow-sm"
                  >
                    <span className="w-6 h-6 bg-destructive/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-destructive text-sm">✕</span>
                    </span>
                    <span className="text-foreground">{problema}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Applicazioni Tecniche */}
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Applicazioni tecniche rilevanti
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Scopri come ZAPPER risolve i problemi specifici del tuo impianto.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {data.applicazioni.map((app, index) => (
                <Link
                  key={app.name}
                  to={app.href}
                  className="group block animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-full bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-accent/30">
                    <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {app.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {app.description}
                    </p>
                    <div className="flex items-center text-primary font-medium group-hover:text-accent transition-colors">
                      <span>Scopri di più</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Modelli Consigliati */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Modelli consigliati
              </h2>
              {modelsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {displayModels.map((modello) => (
                  <Link
                    key={modello.name}
                    to={modello.href}
                    className="group block"
                  >
                    <div className="p-6 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all border border-border hover:border-accent/30">
                      <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {modello.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">{modello.descrizione}</p>
                      <div className="flex items-center text-accent font-medium">
                        <span>Scopri il modello</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              )}
            </div>
          </div>
        </section>

        {/* Mini Interventi */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Interventi reali
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
                {data.miniInterventi.map((intervento, index) => (
                  <div 
                    key={index}
                    className="bg-card rounded-2xl p-6 shadow-lg"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="text-sm text-muted-foreground">{intervento.citta}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-3">
                      {intervento.titolo}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-destructive">⚠</span>
                        <span className="text-muted-foreground">{intervento.problema}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        <span className="text-foreground font-medium">{intervento.risultato}</span>
                      </div>
                    </div>
                    <div className="mt-4 px-3 py-1.5 bg-accent/10 rounded-full inline-block">
                      <span className="text-sm font-semibold text-accent">{intervento.modello}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`py-16 md:py-24 ${data.heroColor}`}>
          <div className="container text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Hai un problema simile?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-2 max-w-2xl mx-auto">
              Richiedi una valutazione tecnica gratuita.
            </p>
            <p className="text-primary-foreground/60 text-sm mb-8 max-w-2xl mx-auto">
              Analizziamo il tuo impianto da remoto e definiamo la soluzione ZAPPER più adatta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link to="/contatti">
                  Richiedi una valutazione tecnica
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/interventi">
                  Vedi gli interventi
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AmbitoTemplate;
