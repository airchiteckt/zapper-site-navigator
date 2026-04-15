import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  AlertTriangle, 
  Home,
  Flame,
  Thermometer,
  Wind,
} from "lucide-react";
import Header from "@/components/layout/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/layout/Footer";
import SectorModelsSection from "@/components/settori/SectorModelsSection";
import SectorInterventionsSection from "@/components/settori/SectorInterventionsSection";

const Domestico = () => {
  const problemiTipici = [
    "Fumo che rientra in casa dal camino",
    "Caldaia a biomassa con tiraggio insufficiente",
    "Odori di fumo che disturbano i vicini",
    "Stufa a legna che non scalda correttamente",
    "Residui e fuliggine che sporcano pareti e tetti",
  ];

  const ambiti = [
    {
      id: "caldaie-biomassa",
      title: "Caldaie a Biomassa",
      description: "Caldaie a pellet, cippato o legna con problemi di emissioni e tiraggio.",
      icon: Thermometer,
      href: "/domestico/caldaie-biomassa",
    },
    {
      id: "camini",
      title: "Camini a Legna",
      description: "Camini aperti o chiusi con fumo che rientra o disturba il vicinato.",
      icon: Flame,
      href: "/domestico/camini",
    },
    {
      id: "stufe",
      title: "Stufe",
      description: "Stufe a legna o pellet con problemi di emissioni e rendimento.",
      icon: Wind,
      href: "/domestico/stufe",
    },
  ];

  const applicazioniRilevanti = [
    { name: "Caldaie biomassa", href: "/applicazioni/caldaie-biomassa" },
    { name: "Camini", href: "/applicazioni/camini" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Settore Domestico" description="Soluzioni ZAPPER® per camini, caldaie a biomassa e stufe domestiche. Elimina fumi e odori dalla tua abitazione." />
      <Header />
      
      <main>
        {/* Hero */}
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-zapper-black">
          <div className="container">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                  <Home className="w-7 h-7 text-white" />
                </div>
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Soluzioni ZAPPER® per il Settore Domestico
              </h1>
              <p className="text-lg md:text-xl text-white/80">
                Abitazioni con caldaie a biomassa, camini e stufe: risolviamo problemi di tiraggio, 
                fumi e disturbo al vicinato.
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
                Ogni impianto domestico ha esigenze specifiche. Seleziona la tua tipologia per scoprire le soluzioni dedicate.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
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

        {/* Applicazioni */}
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

        <SectorModelsSection sector="domestico" />
        <SectorInterventionsSection sector="domestico" />

        {/* CTA */}
        <section className="py-16 md:py-24 bg-zapper-black">
          <div className="container text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Problemi di fumi in casa?
            </h2>
            <p className="text-white/80 text-lg mb-2 max-w-2xl mx-auto">
              Consulenza tecnica gratuita.
            </p>
            <p className="text-white/60 text-sm mb-8 max-w-2xl mx-auto">
              Analizziamo il tuo impianto da remoto e definiamo la soluzione ZAPPER® più adatta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link to="/contatti">
                  Consulenza tecnica gratuita
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

export default Domestico;
