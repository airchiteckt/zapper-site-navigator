import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, CheckCircle, AlertTriangle, MapPin, Flame,
  Droplets, Shield, Wrench, ClipboardCheck, ThumbsUp,
  Ban, Volume2, Building2, Star, Wind
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import heroImage from "@/assets/ambiti/bracerie-hero.jpg";
import soluzioneImage from "@/assets/zapper-prodotto-forni.jpg";
import installazioneImage from "@/assets/forni-legna-installazione.webp";
import primaDopoImage from "@/assets/forni-legna-prima-dopo.webp";

const problemi = [
  { icon: Flame, testo: "Fumi densi e scuri dalla combustione del carbone, visibili a centinaia di metri" },
  { icon: Volume2, testo: "Odore intenso di carne e carbone che pervade l'intero vicinato" },
  { icon: Building2, testo: "Grasso e particolato che si depositano su balconi, finestre e auto parcheggiate" },
  { icon: Ban, testo: "Segnalazioni frequenti da vicini e condomini, rischio sanzioni e chiusura" },
  { icon: Wind, testo: "Fumi che rientrano nel locale con cappe insufficienti per il carico di lavoro" },
];

const vantaggiSoluzione = [
  { icon: Droplets, titolo: "Abbattimento ad acqua", desc: "L'acqua atomizzata ad alta pressione cattura il particolato grasso, la fuliggine e gli odori intensi della brace. Nessun filtro da sostituire." },
  { icon: Shield, titolo: "Progettato per carichi pesanti", desc: "ZAPPER® gestisce fumi densi e grassi tipici della cottura alla brace. Funziona anche con Josper e griglie professionali." },
  { icon: Wrench, titolo: "Installazione in giornata", desc: "Si collega al sistema di aspirazione esistente. Nessuna modifica strutturale, nessun fermo attività." },
];

const modelliCompatibili = [
  { name: "ZGR", desc: "Per bracerie di media portata con griglia singola (Ø 200–250 mm)", href: "/modelli/zgr" },
  { name: "ZGR MAX", desc: "Per bracerie ad alto volume con griglie multiple (Ø 300–350 mm)", href: "/modelli/zgr-max" },
  { name: "DESTINK MAX", desc: "Abbattimento odori intensi per bracerie in centro città (Ø 300–400 mm)", href: "/modelli/destink-max" },
];

const casiClienti = [
  {
    titolo: "Braceria Gourmet", citta: "Roma",
    problema: "Fumi densi e odore di carbone con lamentele quotidiane e diffida comunale",
    risultato: "Ambiente pulito, zero segnalazioni in 14 mesi",
    modello: "ZGR MAX"
  },
  {
    titolo: "Steakhouse Centro Storico", citta: "Firenze",
    problema: "Grasso e fuliggine sui balconi dei condomini, causa civile pendente",
    risultato: "Causa ritirata, emissioni invisibili dalla canna fumaria",
    modello: "ZGR MAX"
  },
  {
    titolo: "Braceria Tradizionale", citta: "Bari",
    problema: "Cappe completamente sature di grasso, odori in sala e reclami dei clienti",
    risultato: "Sala senza odori, clienti soddisfatti, cappe sempre pulite",
    modello: "ZGR"
  },
];

export default function Bracerie() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Bracerie – Abbattimento Fumi e Odori dalla Griglia | ZAPPER®"
        description="Elimina fumi densi, grasso e odori dalla tua braceria con la tecnologia wet scrubber ZAPPER®. Installazione in giornata, zero filtri, risultati garantiti."
      />
      <Header />
      <main>
        {/* ═══ 1. HERO ═══ */}
        <section
          className="pt-24 pb-16 md:pt-32 md:pb-24 relative bg-cover bg-center min-h-[70vh] flex items-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-foreground/65" />
          <div className="container relative z-10">
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-8">
              <Link to="/settori/professionale" className="hover:text-primary-foreground transition-colors">Professionale</Link>
              <span>/</span>
              <span className="text-primary-foreground/80">Bracerie</span>
            </nav>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/20 border border-destructive/30 rounded-full mb-6">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium text-primary-foreground/90">Fumi, grasso e odori dalla tua braceria?</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Griglia senza fumi e senza problemi.
                <span className="text-accent"> Garantito.</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl">
                ZAPPER® abbatte il 95% delle emissioni da braci e griglie con tecnologia ad acqua. Nessun filtro, gestisce anche i fumi più densi e grassi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="accent" size="lg" asChild>
                  <Link to="/contatti">
                    Richiedi una valutazione tecnica gratuita
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8 text-primary-foreground/60 text-sm">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-accent" /> 1500+ installazioni</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-accent" /> Fumi densi? No problem</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-accent" /> Zero filtri</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 2. IL PROBLEMA ═══ */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-destructive font-semibold text-sm uppercase tracking-wider">Il problema</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                Ti riconosci in uno di questi scenari?
              </h2>
              <p className="text-muted-foreground text-lg">
                Le bracerie producono i fumi più densi e grassi della ristorazione. Il vicinato ne risente immediatamente.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {problemi.map((p, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 bg-destructive/5 border border-destructive/10 rounded-xl">
                  <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center shrink-0">
                    <p.icon className="w-5 h-5 text-destructive" />
                  </div>
                  <span className="text-foreground font-medium pt-2">{p.testo}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 3. LA SOLUZIONE ═══ */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">La soluzione</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                ZAPPER®: domina i fumi della brace
              </h2>
              <p className="text-muted-foreground text-lg">
                Un sistema progettato per gestire le emissioni più pesanti: grasso, particolato e odori intensi della cottura alla brace.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto mb-16">
              <div>
                <img src={soluzioneImage} alt="Sistema ZAPPER® per bracerie" className="rounded-2xl shadow-2xl w-full" loading="lazy" width={1280} height={864} />
              </div>
              <div className="space-y-6">
                {vantaggiSoluzione.map((v, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                      <v.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-1">{v.titolo}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <img src={primaDopoImage} alt="Prima e dopo ZAPPER® in braceria" className="rounded-2xl shadow-xl w-full" loading="lazy" width={1280} height={640} />
              <p className="text-center text-muted-foreground text-sm mt-4">
                A sinistra: emissioni senza trattamento. A destra: dopo l'installazione ZAPPER®.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 4. INSTALLAZIONE ═══ */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div className="order-2 lg:order-1">
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">Installazione</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                  Installato in giornata, senza fermare la braceria
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  La griglia continua a funzionare. I nostri partner certificati intervengono rapidamente in tutta Italia.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <ClipboardCheck className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-1">1. Analisi da remoto</h3>
                      <p className="text-muted-foreground text-sm">Inviaci foto della canna fumaria e della griglia. Valutiamo portata, tipo di combustibile e carico di lavoro.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <Wrench className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-1">2. Installazione rapida</h3>
                      <p className="text-muted-foreground text-sm">ZAPPER® si collega al sistema di aspirazione esistente. Nessuna modifica strutturale necessaria.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <ThumbsUp className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-1">3. Risultato immediato</h3>
                      <p className="text-muted-foreground text-sm">Verifica sul campo dell'efficacia. Documentazione tecnica e certificazione incluse.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <img src={installazioneImage} alt="Installazione ZAPPER® in braceria" className="rounded-2xl shadow-2xl w-full" loading="lazy" width={1280} height={864} />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 5. MODELLI ═══ */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Modelli</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                Quale ZAPPER® per la tua braceria?
              </h2>
              <p className="text-muted-foreground">
                Il modello corretto viene confermato in base alla portata della griglia e al diametro della canna fumaria.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {modelliCompatibili.map((m) => (
                <Link key={m.name} to={m.href} className="group block">
                  <div className="h-full p-6 bg-card rounded-2xl shadow-lg hover:shadow-xl border border-border hover:border-accent/30 transition-all text-center">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{m.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{m.desc}</p>
                    <span className="inline-flex items-center text-accent font-medium text-sm">
                      Scopri il modello <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 6. CASI CLIENTI ═══ */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Risultati reali</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                Bracerie che hanno risolto con ZAPPER®
              </h2>
              <p className="text-muted-foreground">Interventi documentati su bracerie e steakhouse in tutta Italia.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {casiClienti.map((c, idx) => (
                <div key={idx} className="bg-card rounded-2xl p-6 shadow-lg border border-border flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">{c.citta}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-4">{c.titolo}</h3>
                  <div className="space-y-3 text-sm flex-1">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{c.problema}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium">{c.risultato}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <span className="px-3 py-1.5 bg-accent/10 rounded-full text-sm font-semibold text-accent">{c.modello}</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/interventi" className="text-accent hover:text-primary font-medium inline-flex items-center gap-1 transition-colors">
                Vedi tutti gli interventi <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ 7. CTA FINALE ═══ */}
        <section className="py-20 md:py-28 bg-zapper-black">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                La tua braceria ha problemi di fumi o odori?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-3 max-w-2xl mx-auto">
                Richiedi una valutazione tecnica gratuita.
              </p>
              <p className="text-primary-foreground/50 text-sm mb-10 max-w-2xl mx-auto">
                Analizziamo il tuo impianto da remoto e definiamo la soluzione ZAPPER® più adatta. Nessun impegno.
              </p>
              <Button variant="accent" size="lg" asChild>
                <Link to="/contatti">
                  Richiedi una valutazione tecnica
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
