import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, ChefHat, Factory, Thermometer, Wind, Coffee, Scissors, Beef, Home } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LucideIcon } from "lucide-react";

interface Applicazione {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  applicabileA: string[];
  href: string;
}

interface CategoriaApplicazioni {
  title: string;
  applicazioni: Applicazione[];
}

const categorieApplicazioni: CategoriaApplicazioni[] = [
  {
    title: "🔥 Combustione solida",
    applicazioni: [
      {
        id: "forni-a-legna",
        title: "Forni a legna",
        icon: Flame,
        description: "Fumi neri, fuliggine e polveri generate dalla combustione del legno in forni professionali e industriali.",
        applicabileA: ["Pizzerie", "Panifici", "Bracerie"],
        href: "/applicazioni/forni-a-legna"
      },
      {
        id: "braci-carbone",
        title: "Braci e carbone",
        icon: Thermometer,
        description: "Trattamento fumi da combustione di carbone e braci in impianti professionali per grigliate e cotture alla brace.",
        applicabileA: ["Bracerie", "Girarrosti", "Ristoranti"],
        href: "/applicazioni/braci-carbone"
      },
      {
        id: "caldaie-biomassa",
        title: "Caldaie a biomassa",
        icon: Flame,
        description: "Abbattimento particolato e fumi da caldaie alimentate a pellet, legna, cippato o altri combustibili solidi.",
        applicabileA: ["Abitazioni", "Condomini", "Aziende agricole"],
        href: "/applicazioni/caldaie-biomassa"
      },
      {
        id: "forni-elettrici",
        title: "Forni elettrici",
        icon: Flame,
        description: "Trattamento fumi e odori da forni elettrici professionali e industriali per cotture prolungate.",
        applicabileA: ["Pizzerie", "Panifici", "Cucine professionali"],
        href: "/applicazioni/forni-elettrici"
      },
      {
        id: "camini",
        title: "Camini e stufe a legna",
        icon: Home,
        description: "Riduzione fumi visibili e particolato da camini aperti, termocamini e stufe a legna domestiche.",
        applicabileA: ["Abitazioni", "Ville", "Agriturismi"],
        href: "/applicazioni/camini"
      }
    ]
  },
  {
    title: "🍳 Cucine e cappe",
    applicazioni: [
      {
        id: "cappe",
        title: "Cappe da cucina professionale",
        icon: ChefHat,
        description: "Trattamento fumi, odori e grassi da cucine professionali con sistemi di captazione e filtrazione avanzata.",
        applicabileA: ["Ristoranti", "Hotel", "Mense"],
        href: "/applicazioni/cappe"
      }
    ]
  },
  {
    title: "🏭 Applicazioni industriali",
    applicazioni: [
      {
        id: "forni-industriali",
        title: "Forni industriali",
        icon: Factory,
        description: "Abbattimento fumi e particolato da forni industriali per processi produttivi ad alta temperatura.",
        applicabileA: ["Industrie alimentari", "Ceramiche", "Fonderie"],
        href: "/applicazioni/forni-industriali"
      },
      {
        id: "torrefazioni",
        title: "Torrefazioni caffè",
        icon: Coffee,
        description: "Gestione fumi e odori intensi generati dal processo di tostatura del caffè in impianti artigianali e industriali.",
        applicabileA: ["Torrefazioni", "Caffetterie artigianali"],
        href: "/applicazioni/torrefazioni"
      },
      {
        id: "affumicatori",
        title: "Affumicatori",
        icon: Beef,
        description: "Trattamento fumi densi e aromatici da processi di affumicatura alimentare professionale.",
        applicabileA: ["Salumifici", "Caseifici", "Industrie ittiche"],
        href: "/applicazioni/affumicatori"
      },
      {
        id: "taglio-laser",
        title: "Macchine taglio laser",
        icon: Scissors,
        description: "Aspirazione e filtrazione fumi e particolato da lavorazioni con taglio laser industriale.",
        applicabileA: ["Officine", "Industrie metalmeccaniche"],
        href: "/applicazioni/taglio-laser"
      }
    ]
  }
];

const Applicazioni = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Applicazioni ZAPPER®
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                ZAPPER® interviene su diverse tipologie di impianti a combustione, adattando ogni soluzione al tipo di fumi, alla portata e al contesto di utilizzo.
              </p>
            </div>
          </div>
        </section>

        {/* Griglia Applicazioni per categoria */}
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="space-y-16">
              {categorieApplicazioni.map((categoria) => (
                <div key={categoria.title}>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                    {categoria.title}
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoria.applicazioni.map((app) => (
                      <Link 
                        key={app.id} 
                        to={app.href}
                        className="group block"
                      >
                        <div className="h-full p-6 bg-card rounded-2xl shadow-lg hover:shadow-xl border border-border hover:border-accent/30 transition-all">
                          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                            <app.icon className="w-6 h-6 text-accent" />
                          </div>
                          <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                            {app.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                            {app.description}
                          </p>
                          <div className="mb-4">
                            <p className="text-xs text-muted-foreground/70 mb-2">Applicabile a:</p>
                            <div className="flex flex-wrap gap-2">
                              {app.applicabileA.map((ambito) => (
                                <span 
                                  key={ambito} 
                                  className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground"
                                >
                                  {ambito}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center text-accent font-medium text-sm">
                            Scopri l'applicazione 
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Micro-trust */}
        <section className="py-8 bg-muted/30 border-y border-border">
          <div className="container">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              <p className="text-muted-foreground">
                Interventi reali su impianti professionali, domestici e industriali
              </p>
              <Link 
                to="/interventi" 
                className="text-accent hover:text-primary font-medium flex items-center gap-1 transition-colors"
              >
                Vedi tutti gli interventi <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Finale */}
        <section className="py-16 md:py-24 bg-zapper-black">
          <div className="container text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Non trovi la tua applicazione?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Analizziamo il tuo impianto e individuiamo la soluzione più adatta.
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link to="/contatti">
                Richiedi una valutazione tecnica gratuita
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

export default Applicazioni;
