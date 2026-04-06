import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, Home, Factory, ArrowRight, CheckCircle } from "lucide-react";
import settoreProfessionaleHero from "@/assets/settore-professionale-hero.webp";
import settoreDomesticoHero from "@/assets/settore-domestico-hero.webp";
import settoreIndustrialeHero from "@/assets/settore-industriale-hero.webp";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";

const Settori = () => {
  const sectors = [
    {
      id: "professionale",
      title: "Settore Professionale",
      description: "Ristoranti, pizzerie, panifici, bracerie e cucine professionali con problemi di fumi, polveri, odori e segnalazioni.",
      icon: ChefHat,
      href: "/settori/professionale",
      ambiti: ["Pizzerie", "Panifici", "Bracerie", "Cucine professionali"],
      priority: true,
    },
    {
      id: "domestico",
      title: "Settore Domestico",
      description: "Abitazioni con caldaie a biomassa, camini e stufe a legna dove il fumo crea problemi di tiraggio, odori o disturbo al vicinato.",
      icon: Home,
      href: "/settori/domestico",
      ambiti: ["Caldaie a biomassa", "Camini a legna", "Stufe"],
      priority: false,
    },
    {
      id: "industriale",
      title: "Settore Industriale",
      description: "Impianti industriali con alte portate e emissioni complesse, dove è necessario intervenire in modo mirato su fumi e polveri.",
      icon: Factory,
      href: "/settori/industriale",
      ambiti: ["Torrefazioni", "Caseifici", "Affumicatori", "Forni industriali"],
      priority: false,
    },
  ];

  const ctaLabels = {
    professionale: "Vai alle soluzioni per attività professionali",
    domestico: "Vai alle soluzioni per uso domestico",
    industriale: "Vai alle soluzioni industriali",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Soluzioni ZAPPER® per ogni settore
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                ZAPPER® interviene su impianti a combustione in ambito professionale, domestico e industriale, 
                adattando ogni soluzione al contesto reale di utilizzo.
              </p>
            </div>
          </div>
        </section>

        {/* Sectors Cards */}
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="grid gap-6 md:gap-8 max-w-4xl mx-auto">
              {sectors.map((sector, index) => (
                <Link
                  key={sector.id}
                  to={sector.href}
                  className={`group block animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${sector.priority ? 'ring-2 ring-primary/50' : ''}`}>
                    {/* Card Header */}
                    <div
                      className="relative bg-zapper-black p-6 md:p-8 bg-cover bg-center"
                      style={
                        sector.id === 'professionale' ? { backgroundImage: `url(${settoreProfessionaleHero})` } :
                        sector.id === 'domestico' ? { backgroundImage: `url(${settoreDomesticoHero})` } :
                        sector.id === 'industriale' ? { backgroundImage: `url(${settoreIndustrialeHero})` } :
                        undefined
                      }
                    >
                      {(sector.id === 'professionale' || sector.id === 'domestico' || sector.id === 'industriale') && <div className="absolute inset-0 bg-foreground/60" />}
                      <div className="relative z-10 flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                          <sector.icon className="w-7 h-7 text-primary" />
                        </div>
                        {sector.priority && (
                          <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                            Più richiesto
                          </span>
                        )}
                      </div>
                      <h2 className="relative z-10 font-display text-2xl md:text-3xl font-bold text-white">
                        {sector.title}
                      </h2>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 md:p-8">
                      <p className="text-muted-foreground mb-6 text-lg">
                        {sector.description}
                      </p>

                      {/* Ambiti */}
                      <div className="mb-6">
                        <p className="text-sm font-medium text-foreground mb-3">Esempi di ambiti:</p>
                        <div className="flex flex-wrap gap-2">
                          {sector.ambiti.map((ambito) => (
                            <span
                              key={ambito}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-sm text-muted-foreground"
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-accent" />
                              {ambito}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-medium group-hover:text-accent transition-colors">
                          {ctaLabels[sector.id as keyof typeof ctaLabels]}
                        </span>
                        <ArrowRight className="w-5 h-5 text-primary group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Micro Trust */}
        <section className="py-8 border-t border-border">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
              <p className="text-muted-foreground">
                Interventi reali su impianti professionali, domestici e industriali in tutta Italia
              </p>
              <Link 
                to="/interventi" 
                className="text-accent hover:text-accent/80 font-medium inline-flex items-center gap-1 transition-colors"
              >
                Vedi gli interventi
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-zapper-black">
          <div className="container text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Non sei sicuro di quale settore rientra il tuo impianto?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Analizziamo il tuo impianto da remoto e definiamo la soluzione ZAPPER® più adatta.
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link to="/contatti">
                Richiedi una valutazione tecnica
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Settori;
