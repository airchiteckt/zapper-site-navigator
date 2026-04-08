import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Sparkles, Bug, Wrench, Wind, Zap, Settings, ArrowRight } from "lucide-react";
import heroImage from "@/assets/servizi-hero.jpg";

const servizi = [
  {
    icon: Sparkles,
    title: "Pulizia Cucine Professionali",
    description: "Pulizia profonda con vapore ad alta temperatura, rimozione grassi e sanificazione HACCP.",
    href: "/pulizia-cucine-professionali",
  },
  {
    icon: Bug,
    title: "Disinfestazione Cucine",
    description: "Interventi professionali contro insetti e roditori con monitoraggio continuo.",
    href: "/disinfestazione-cucine",
  },
  {
    icon: Wrench,
    title: "Manutenzione Cucine Industriali",
    description: "Manutenzione ordinaria e straordinaria per evitare blocchi operativi.",
    href: "/manutenzione-cucine-industriali",
  },
  {
    icon: Wind,
    title: "Impianti Aspirazione Fumi",
    description: "Pulizia canne fumarie, manutenzione aspirazione e installazione abbattitori.",
    href: "/impianti-aspirazione-fumi",
  },
  {
    icon: Zap,
    title: "Interventi Elettrici Cucine",
    description: "Riparazioni rapide, adeguamenti impianti e interventi d'emergenza.",
    href: "/interventi-elettrici-cucine",
  },
  {
    icon: Settings,
    title: "Manutenzione Impianti",
    description: "Controlli programmati, prevenzione guasti e ottimizzazione performance.",
    href: "/manutenzione-impianti",
  },
];

export default function Servizi() {
  return (
    <>
      <SEO
        title="Servizi per Cucine Professionali"
        description="Pulizia, disinfestazione, manutenzione, aspirazione fumi, interventi elettrici e manutenzione impianti per cucine professionali e industriali."
        canonical="/servizi"
      />
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative text-white py-20 md:py-28 overflow-hidden">
          <img
            src={heroImage}
            alt="Team ZAPPER® al lavoro in cucina professionale"
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={768}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/60 to-foreground/40" />
          <div className="container px-4 sm:px-6 max-w-4xl text-center relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Servizi per Cucine Professionali
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Tutto ciò che serve per mantenere la tua cucina efficiente, sicura e conforme alle normative.
            </p>
          </div>
        </section>

        {/* Grid servizi */}
        <section className="py-16 md:py-24">
          <div className="container px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {servizi.map((s) => (
                <Link key={s.href} to={s.href} className="group">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <s.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-xl font-bold text-foreground mb-2">{s.title}</h2>
                      <p className="text-muted-foreground mb-4 flex-1">{s.description}</p>
                      <span className="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                        Scopri di più <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-muted">
          <div className="container px-4 sm:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Non sai da dove iniziare?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Contattaci per un sopralluogo gratuito: valuteremo insieme le esigenze della tua cucina.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contatti">Richiedi sopralluogo gratuito</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
