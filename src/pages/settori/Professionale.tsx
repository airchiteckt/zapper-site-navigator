import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  AlertTriangle, 
  ChefHat, 
  Pizza, 
  Croissant, 
  Flame, 
  UtensilsCrossed,
} from "lucide-react";
import Header from "@/components/layout/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/layout/Footer";
import SectorModelsSection from "@/components/settori/SectorModelsSection";
import SectorInterventionsSection from "@/components/settori/SectorInterventionsSection";

const Professionale = () => {
  const problemiTipici = [
    "Fumi neri che escono dalla canna fumaria",
    "Odori persistenti che disturbano i vicini",
    "Segnalazioni e multe dall'ASL o dal Comune",
    "Cappa fumaria che non tira correttamente",
    "Polveri e residui che sporcano l'ambiente",
  ];

  const ambiti = [
    {
      id: "pizzerie",
      title: "Pizzerie",
      description: "Forni a legna e forni elettrici ad alta temperatura con problemi di fumi e odori.",
      icon: Pizza,
      href: "/professionale/pizzerie",
    },
    {
      id: "panifici",
      title: "Panifici",
      description: "Forni professionali per la panificazione con emissioni da gestire.",
      icon: Croissant,
      href: "/professionale/panifici",
    },
    {
      id: "bracerie",
      title: "Bracerie",
      description: "Griglie a carbone e braci con fumi densi e odore intenso.",
      icon: Flame,
      href: "/professionale/bracerie",
    },
    {
      id: "cucine-professionali",
      title: "Cucine Professionali",
      description: "Ristoranti e hotel con cucine che generano fumi e vapori.",
      icon: UtensilsCrossed,
      href: "/professionale/cucine-professionali",
    },
  ];

  const applicazioniRilevanti = [
    { name: "Forni a legna", href: "/applicazioni/forni-a-legna" },
    { name: "Braci e carbonella", href: "/applicazioni/braci-carbone" },
    { name: "Cappe professionali", href: "/applicazioni/cappe" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-zapper-black">
          <div className="container">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                  <ChefHat className="w-7 h-7 text-white" />
                </div>
                <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  Più richiesto
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Soluzioni ZAPPER® per il Settore Professionale
              </h1>
              <p className="text-lg md:text-xl text-white/80">
                Ristoranti, pizzerie, panifici e bracerie: risolviamo problemi di fumi, odori e segnalazioni 
                con soluzioni certificate e interventi rapidi.
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
                  Problemi tipici del settore
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {problemiTipici.map((problema, index) => (
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

        {/* Ambiti */}
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Scegli il tuo ambito
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Ogni attività ha esigenze specifiche. Seleziona il tuo settore per scoprire le soluzioni dedicate.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {ambiti.map((ambito, index) => (
                <Link
                  key={ambito.id}
                  to={ambito.href}
                  className="group block animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-full bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-accent/30">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <ambito.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {ambito.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {ambito.description}
                    </p>
                    <div className="flex items-center text-primary font-medium group-hover:text-accent transition-colors">
                      <span>Scopri le soluzioni</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Applicazioni Rilevanti */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Applicazioni tecniche
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {applicazioniRilevanti.map((app) => (
                  <Link
                    key={app.name}
                    to={app.href}
                    className="px-6 py-3 bg-card rounded-full shadow-sm hover:shadow-md transition-all border border-border hover:border-primary/30 text-foreground font-medium hover:text-primary"
                  >
                    {app.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Modelli Consigliati - Dynamic from DB */}
        <SectorModelsSection sector="professionale" />

        {/* Interventi nel settore - Dynamic from DB */}
        <SectorInterventionsSection sector="professionale" />

        {/* CTA */}
        <section className="py-16 md:py-24 bg-zapper-black">
          <div className="container text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Hai un'attività professionale con problemi di fumi?
            </h2>
            <p className="text-white/80 text-lg mb-2 max-w-2xl mx-auto">
              Richiedi una valutazione tecnica gratuita.
            </p>
            <p className="text-white/60 text-sm mb-8 max-w-2xl mx-auto">
              Analizziamo il tuo impianto da remoto e definiamo la soluzione ZAPPER® più adatta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link to="/contatti">
                  Richiedi una valutazione tecnica
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white/30 text-white hover:bg-white/10" asChild>
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

export default Professionale;
