import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, CheckCircle, AlertTriangle, MapPin,
  Droplets, Shield, Wrench, ClipboardCheck, ThumbsUp,
  Ban, Volume2, Building2, Star, Moon, Clock
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import heroImage from "@/assets/ambiti/panifici-hero.jpg";
import soluzioneImage from "@/assets/zapper-prodotto-forni.jpg";
import installazioneImage from "@/assets/forni-legna-installazione.webp";
import primaDopoImage from "@/assets/forni-legna-prima-dopo.webp";

const problemi = [
  { icon: Moon, testo: "Fumi da cottura continua durante le ore notturne che disturbano il vicinato" },
  { icon: Volume2, testo: "Odori persistenti di pane e lievitati che generano lamentele e segnalazioni" },
  { icon: Ban, testo: "Segnalazioni ASL e rischio di sanzioni per emissioni fuori norma" },
  { icon: Building2, testo: "Residui di fuliggine su superfici esterne, auto e balconi dei condomini" },
  { icon: Clock, testo: "Limitazioni negli orari di produzione imposte dal Comune o dai vicini" },
];

const vantaggiSoluzione = [
  { icon: Droplets, titolo: "Abbattimento ad acqua", desc: "La tecnologia wet scrubber cattura fuliggine, particolato e odori da panificazione senza filtri da sostituire." },
  { icon: Shield, titolo: "Produzione senza limiti", desc: "Nessun vincolo orario: cuoci di notte senza disturbare nessuno. Emissioni invisibili e inodori." },
  { icon: Wrench, titolo: "Compatibile con ogni forno", desc: "Si installa su forni a legna, a gas e rotativi. Collegamento alla canna fumaria esistente." },
];

const modelliCompatibili = [
  { name: "ZPF", desc: "Per forni da panificazione di media portata (Ø 200–250 mm)", href: "/modelli/zpf" },
  { name: "ZPF MAX", desc: "Per panifici ad alto volume con forni rotativi (Ø 300–350 mm)", href: "/modelli/zpf-max" },
  { name: "DESTINK", desc: "Abbattimento odori per panifici con forno elettrico (Ø 250–300 mm)", href: "/modelli/destink" },
];

const casiClienti = [
  {
    titolo: "Panificio Artigianale", citta: "Milano",
    problema: "Odori intensi durante la produzione notturna, diffida del Comune e rischio chiusura",
    risultato: "Produzione notturna senza vincoli, zero segnalazioni in 12 mesi",
    modello: "ZPF"
  },
  {
    titolo: "Panificio Tradizionale", citta: "Bologna",
    problema: "Fumi densi dal forno a legna con fuliggine sui balconi del condominio sovrastante",
    risultato: "Emissioni ridotte del 95%, rapporti con i vicini ristabiliti",
    modello: "ZPF MAX"
  },
  {
    titolo: "Forno Industriale", citta: "Torino",
    problema: "Emissioni fuori norma con sanzioni già ricevute e ispezione ASL in programma",
    risultato: "Conformità raggiunta, ispezione superata con successo",
    modello: "ZPF MAX"
  },
];

export default function Panifici() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Panifici – Abbattimento Fumi e Odori | ZAPPER®"
        description="Elimina fumi, fuliggine e odori dal tuo panificio con la tecnologia wet scrubber ZAPPER®. Produci senza vincoli orari, installazione in giornata."
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
              <span className="text-primary-foreground/80">Panifici</span>
            </nav>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/20 border border-destructive/30 rounded-full mb-6">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium text-primary-foreground/90">Fumi e odori dal panificio, anche di notte?</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Produci pane senza fumi e senza vincoli.
                <span className="text-accent"> Di giorno e di notte.</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl">
                ZAPPER® abbatte il 95% delle emissioni da forni per panificazione. Nessun filtro, nessun limite orario, risultati immediati.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="accent" size="lg" asChild>
                  <Link to="/contatti">
                    Consulenza tecnica gratuita
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8 text-primary-foreground/60 text-sm">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-accent" /> 1500+ installazioni</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-accent" /> Produzione H24</span>
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
                I panifici producono emissioni continue, spesso durante la notte. Il vicinato lo nota subito.
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
                ZAPPER®: il tuo panificio produce, noi abbattiamo
              </h2>
              <p className="text-muted-foreground text-lg">
                Un sistema che si installa sulla canna fumaria del forno e abbatte fumi, fuliggine e odori con acqua atomizzata.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto mb-16">
              <div>
                <img src={soluzioneImage} alt="Sistema ZAPPER® per panifici" className="rounded-2xl shadow-2xl w-full" loading="lazy" width={1280} height={864} />
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
              <img src={primaDopoImage} alt="Prima e dopo ZAPPER® in panificio" className="rounded-2xl shadow-xl w-full" loading="lazy" width={1280} height={640} />
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
                  Installato in giornata, senza fermare la produzione
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  Il panificio continua a produrre. I nostri partner certificati intervengono rapidamente in tutta Italia.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <ClipboardCheck className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-1">1. Analisi da remoto</h3>
                      <p className="text-muted-foreground text-sm">Inviaci foto della canna fumaria e del forno. Valutiamo diametro, portata e tipo di combustibile.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <Wrench className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-1">2. Installazione rapida</h3>
                      <p className="text-muted-foreground text-sm">ZAPPER® si collega alla canna fumaria esistente. Nessuna modifica strutturale necessaria.</p>
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
                <img src={installazioneImage} alt="Installazione ZAPPER® in panificio" className="rounded-2xl shadow-2xl w-full" loading="lazy" width={1280} height={864} />
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
                Quale ZAPPER® per il tuo panificio?
              </h2>
              <p className="text-muted-foreground">
                Il modello corretto viene confermato in base al tipo di forno e al diametro della canna fumaria.
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
                Panifici che hanno risolto con ZAPPER®
              </h2>
              <p className="text-muted-foreground">Interventi documentati su panifici in tutta Italia.</p>
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
                Il tuo panificio ha problemi di fumi o odori?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-3 max-w-2xl mx-auto">
                Consulenza tecnica gratuita.
              </p>
              <p className="text-primary-foreground/50 text-sm mb-10 max-w-2xl mx-auto">
                Analizziamo il tuo impianto da remoto e definiamo la soluzione ZAPPER® più adatta. Nessun impegno.
              </p>
              <Button variant="accent" size="lg" asChild>
                <Link to="/contatti">
                  Consulenza tecnica gratuita
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
