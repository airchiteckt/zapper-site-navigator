import { ArrowRight, BadgePercent, Factory, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";

const Agevolazioni = () => {
  const incentives = [
    {
      id: "industria-40",
      icon: Factory,
      badge: "2026-2028",
      title: "Industria 4.0",
      highlight: "180%",
      subtitle: "Iperammortamento",
      description:
        "I sistemi ZAPPER® rientrano tra i beni strumentali 4.0. Puoi beneficiare dell'iperammortamento al 180% sull'investimento.",
      link: "/agevolazioni/industria-40",
    },
    {
      id: "bando-inail-isi",
      icon: ShieldCheck,
      badge: "Bando 2026",
      title: "Bando INAIL ISI",
      highlight: "65%",
      subtitle: "Fondo perduto",
      description:
        "Il Bando INAIL ISI finanzia interventi per la sicurezza sul lavoro. I sistemi ZAPPER® sono ammissibili al contributo a fondo perduto.",
      link: "/agevolazioni/bando-inail-isi",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <BadgePercent className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Incentivi fiscali</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Agevolazioni per il tuo investimento
            </h1>
            <p className="text-lg text-muted-foreground">
              I sistemi ZAPPER® rientrano nei principali bandi e agevolazioni nazionali per l'industria e la sicurezza sul lavoro. Scopri come ridurre il costo del tuo investimento.
            </p>
          </div>
        </div>
      </section>

      {/* Incentives Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {incentives.map((incentive) => (
              <div
                key={incentive.id}
                className="bg-card rounded-2xl border border-border p-6 md:p-8 flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full">
                    {incentive.badge}
                  </span>
                  <incentive.icon className="w-6 h-6 text-muted-foreground" />
                </div>

                {/* Title */}
                <h2 className="font-display text-xl font-bold text-foreground mb-2">
                  {incentive.title}
                </h2>

                {/* Highlight Number */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl md:text-5xl font-bold text-primary">
                    {incentive.highlight}
                  </span>
                </div>
                <p className="text-lg font-medium text-foreground mb-4">
                  {incentive.subtitle}
                </p>

                {/* Description */}
                <p className="text-muted-foreground flex-grow mb-6">
                  {incentive.description}
                </p>

                {/* CTA */}
                <Button variant="outline" className="w-full group" asChild>
                  <Link to={incentive.link}>
                    Scopri di più
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-zapper-black">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Ti aiutiamo con la pratica
            </h2>
            <p className="text-white/70 mb-8">
              Non sai da dove iniziare? Il nostro team ti supporta nella preparazione della documentazione e nella gestione della pratica per accedere agli incentivi.
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link to="/contatti?motivo=agevolazioni">
                Richiedi supporto
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Agevolazioni;
