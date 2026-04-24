import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, AlertTriangle, MapPin, LucideIcon, ClipboardCheck, Wrench, ThumbsUp } from "lucide-react";
import Header from "@/components/layout/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/layout/Footer";
import { BreadcrumbSchema, ProductSchema } from "@/components/StructuredData";

export interface ApplicazioneData {
  id: string;
  title: string;
  icon: LucideIcon;
  heroColor: string;
  heroImage?: string;
  subtitle: string;
  problemiTipici: string[];
  ambitiCoinvolti: { name: string; href: string }[];
  modelliCompatibili: { name: string; descrizione: string; href: string }[];
  miniInterventi: { titolo: string; citta: string; problema: string; risultato: string; modello: string }[];
}

interface ApplicazioneTemplateProps {
  data: ApplicazioneData;
}

const ApplicazioneTemplate = ({ data }: ApplicazioneTemplateProps) => {
  return (
    <div className="min-h-screen bg-background">
      <SEO title={`${data.title} – Abbattimento Fumi`} description={`Sistemi ZAPPER® per ${data.title.toLowerCase()}: ${data.subtitle}`} />
      <BreadcrumbSchema items={[
        { name: "Home", href: "/" },
        { name: "Applicazioni", href: "/applicazioni" },
        { name: data.title, href: `/applicazioni/${data.id}` },
      ]} />
      <Header />
      <main>
        {/* 1. Hero Applicazione */}
        <section 
          className={`pt-24 pb-12 md:pt-32 md:pb-16 ${data.heroImage ? '' : data.heroColor} relative bg-cover bg-center`}
          style={data.heroImage ? { backgroundImage: `url(${data.heroImage})` } : undefined}
        >
          {data.heroImage && <div className="absolute inset-0 bg-foreground/60" />}
          <div className="container relative z-10">
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-6">
              <Link to="/applicazioni" className="hover:text-primary-foreground transition-colors">Applicazioni</Link>
              <span>/</span>
              <span className="text-primary-foreground">{data.title}</span>
            </nav>
            <div className="max-w-3xl">
              <div className="w-14 h-14 bg-primary-foreground/20 rounded-xl flex items-center justify-center mb-6">
                <data.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                {data.title}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
                {data.subtitle}
              </p>
              <Button variant="accent" size="lg" asChild>
                <Link to="/contatti">
                  Verifica il tuo impianto
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 2. Il Problema (Riconoscimento) */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Problemi tipici
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Se riconosci uno di questi problemi, ZAPPER può aiutarti:
              </p>
              <ul className="space-y-3">
                {data.problemiTipici.map((problema, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-destructive mt-1">⚠</span>
                    <span className="text-foreground">{problema}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Dove si applica (Ambiti) */}
        <section className="py-12 md:py-16">
          <div className="container">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
              Utilizzato in
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {data.ambitiCoinvolti.map((a) => (
                <Link 
                  key={a.name} 
                  to={a.href} 
                  className="px-6 py-3 bg-card rounded-full shadow-sm hover:shadow-md border border-border hover:border-primary/30 text-foreground font-medium hover:text-primary transition-all"
                >
                  {a.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Modelli ZAPPER Compatibili */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4 text-center">
              Soluzioni ZAPPER per {data.title.toLowerCase()}
            </h2>
            <p className="text-muted-foreground text-center mb-8 text-sm">
              Il modello corretto viene confermato in base a diametro e portata
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {data.modelliCompatibili.map((m) => (
                <Link key={m.name} to={m.href} className="group block">
                  <div className="p-6 bg-card rounded-2xl shadow-lg hover:shadow-xl border border-border hover:border-accent/30 transition-all">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {m.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">{m.descrizione}</p>
                    <div className="flex items-center text-accent font-medium text-sm">
                      Scopri <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Interventi Reali */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Interventi su {data.title.toLowerCase()}
              </h2>
              <Link to="/interventi" className="text-accent hover:text-primary font-medium flex items-center gap-1 transition-colors">
                Vedi tutti <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {data.miniInterventi.map((i, idx) => (
                <div key={idx} className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">{i.citta}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-3">{i.titolo}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-destructive">⚠</span>
                      <span className="text-muted-foreground">{i.problema}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium">{i.risultato}</span>
                    </div>
                  </div>
                  <div className="mt-4 px-3 py-1.5 bg-accent/10 rounded-full inline-block">
                    <span className="text-sm font-semibold text-accent">{i.modello}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Come si interviene */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <h2 className="font-display text-2xl font-bold text-foreground mb-10 text-center">
              Come interveniamo
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ClipboardCheck className="w-8 h-8 text-primary" />
              </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">1. Analisi impianto</h3>
                <p className="text-muted-foreground text-sm">
                  Valutiamo diametro, portata e contesto di utilizzo del tuo impianto.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">2. Installazione ZAPPER</h3>
                <p className="text-muted-foreground text-sm">
                  Installiamo il modello ZAPPER più adatto alle tue esigenze.
                </p>
              </div>
              <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">3. Verifica risultato</h3>
                <p className="text-muted-foreground text-sm">
                  Confermiamo l'efficacia dell'intervento con test e documentazione.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CTA Finale */}
        <section 
          className={`py-16 md:py-24 ${data.heroImage ? '' : data.heroColor} relative bg-cover bg-center`}
          style={data.heroImage ? { backgroundImage: `url(${data.heroImage})` } : undefined}
        >
          {data.heroImage && <div className="absolute inset-0 bg-foreground/70" />}
          <div className="container text-center relative z-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Hai questo problema?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-2 max-w-2xl mx-auto">
              Consulenza tecnica gratuita.
            </p>
            <p className="text-primary-foreground/60 text-sm mb-8 max-w-2xl mx-auto">
              Analizziamo il tuo impianto da remoto e definiamo la soluzione ZAPPER più adatta.
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link to="/contatti">
                Consulenza tecnica gratuita
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

export default ApplicazioneTemplate;
