import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { AlertTriangle, CheckCircle2, Sparkles, Camera, Gift, ArrowRight } from "lucide-react";

export interface ServizioData {
  slug: string;
  title: string;
  metaDescription: string;
  heroImage?: string;
  hero: {
    headline: string;
    sublines: string[];
    cta: string;
  };
  problemi: string[];
  soluzione: {
    intro?: string;
    punti: string[];
  };
  benefici: string[];
  prova?: {
    punti: string[];
  };
  offerta: string[];
  crossSell?: {
    testo: string;
    link: string;
    linkLabel: string;
  };
  bonus?: string;
}

export default function ServizioTemplate({ data }: { data: ServizioData }) {
  return (
    <>
      <SEO
        title={data.title}
        description={data.metaDescription}
        canonical={`/${data.slug}`}
      />
      <Header />
      <main className="pt-20">
        {/* HERO */}
        <section className="relative bg-zapper-black text-white py-20 md:py-28 overflow-hidden">
          {data.heroImage && (
            <div className="absolute inset-0">
              <img src={data.heroImage} alt={data.title} className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-zapper-black via-zapper-black/70 to-zapper-black/50" />
            </div>
          )}
          <div className="container px-4 sm:px-6 max-w-4xl text-center relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {data.hero.headline}
            </h1>
            <div className="space-y-2 mb-8">
              {data.hero.sublines.map((line, i) => (
                <p key={i} className="text-lg md:text-xl text-white/80">
                  👉 {line}
                </p>
              ))}
            </div>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contatti">{data.hero.cta}</Link>
            </Button>
          </div>
        </section>

        {/* PROBLEMA */}
        <section className="py-16 md:py-20 bg-muted">
          <div className="container px-4 sm:px-6 max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Il problema</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.problemi.map((p, i) => (
                <Card key={i} className="border-destructive/20">
                  <CardContent className="p-5 flex items-start gap-3">
                    <span className="text-destructive mt-0.5">✗</span>
                    <p className="text-foreground">{p}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUZIONE */}
        <section className="py-16 md:py-20">
          <div className="container px-4 sm:px-6 max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle2 className="w-8 h-8 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">La soluzione</h2>
            </div>
            {data.soluzione.intro && (
              <p className="text-lg text-muted-foreground mb-6">{data.soluzione.intro}</p>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              {data.soluzione.punti.map((p, i) => (
                <Card key={i} className="border-primary/20 bg-primary/5">
                  <CardContent className="p-5 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-foreground">{p}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFICI */}
        <section className="py-16 md:py-20 bg-zapper-black text-white">
          <div className="container px-4 sm:px-6 max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">I benefici</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.benefici.map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-white/5">
                  <span className="text-primary">✓</span>
                  <p>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROVA */}
        {data.prova && (
          <section className="py-16 md:py-20">
            <div className="container px-4 sm:px-6 max-w-4xl">
              <div className="flex items-center gap-3 mb-8">
                <Camera className="w-8 h-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">La prova</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.prova.punti.map((p, i) => (
                  <Card key={i}>
                    <CardContent className="p-5">
                      <p className="text-foreground">{p}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* OFFERTA + BONUS */}
        <section className="py-16 md:py-20 bg-muted">
          <div className="container px-4 sm:px-6 max-w-4xl text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Gift className="w-8 h-8 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">L'offerta</h2>
            </div>
            <div className="space-y-3 mb-8">
              {data.offerta.map((o, i) => (
                <p key={i} className="text-lg text-foreground">👉 {o}</p>
              ))}
            </div>
            {data.bonus && (
              <p className="text-primary font-semibold text-lg mb-8">💥 {data.bonus}</p>
            )}
            <Button variant="hero" size="xl" asChild>
              <Link to="/contatti">{data.hero.cta}</Link>
            </Button>
          </div>
        </section>

        {/* CROSS SELL */}
        {data.crossSell && (
          <section className="py-12 md:py-16">
            <div className="container px-4 sm:px-6 max-w-4xl">
              <Card className="border-primary/20">
                <CardContent className="p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-lg text-foreground font-medium">{data.crossSell.testo}</p>
                  <Button variant="outline" asChild className="shrink-0">
                    <Link to={data.crossSell.link}>
                      {data.crossSell.linkLabel} <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
