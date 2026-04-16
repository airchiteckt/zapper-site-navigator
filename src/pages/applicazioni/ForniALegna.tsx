import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight, CheckCircle, AlertTriangle, MapPin, Flame,
  Shield, Wrench, Ban, Building2, Star, Phone, Loader2,
  ChevronRight, HelpCircle, Clock, BadgePercent
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { sendContactEmails } from "@/lib/emailService";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/applicazione-forni.webp";
import soluzioneImage from "@/assets/zapper-prodotto-forni.jpg";
import primaDopoImage from "@/assets/forni-legna-prima-dopo.webp";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const problemi = [
  { icon: Building2, testo: "I vicini si lamentano per fumi neri e odori. Hai già ricevuto segnalazioni o diffide." },
  { icon: Ban, testo: "Rischi sanzioni fino a €5.000 e la chiusura dell'attività per emissioni fuori norma." },
  { icon: AlertTriangle, testo: "La reputazione del tuo locale ne risente: fuliggine su muri, balconi e auto parchegiate." },
];

const vantaggiSoluzione = [
  { icon: Flame, titolo: "Funziona con l'acqua, nessun filtro da comprare", desc: "Il sistema usa solo acqua nebulizzata per catturare fumo e fuliggine. Non ci sono filtri da sostituire, né costi ricorrenti." },
  { icon: Shield, titolo: "Dal giorno dopo, zero fumo nero dalla canna fumaria", desc: "Appena installato, le emissioni visibili spariscono. I vicini smettono di lamentarsi e l'ASL non ha più nulla da contestare." },
  { icon: Wrench, titolo: "Si installa in un giorno, senza fermare l'attività", desc: "Si collega alla canna fumaria che hai già. Nessuna modifica strutturale, nessun giorno di chiusura." },
];

const modelliCompatibili = [
  { name: "ZPZ", desc: "Per forni a legna di media portata", href: "/modelli/zpz" },
  { name: "ZPZ MAX", desc: "Per forni ad alta portata e uso intensivo", href: "/modelli/zpz-max" },
  { name: "ZPF", desc: "Per forni da panificazione", href: "/modelli/zpf" },
];

const casiClienti = [
  {
    titolo: "Pizzeria Napoletana", citta: "Napoli",
    problema: "Fumi neri dalla canna fumaria, lamentele continue dal vicinato e rischio chiusura",
    risultato: "Zero segnalazioni in 18 mesi, attività regolare senza vincoli",
    modello: "ZPZ MAX"
  },
  {
    titolo: "Panificio Artigianale", citta: "Bologna",
    problema: "Odori intensi durante la produzione notturna con diffida dal Comune",
    risultato: "Nessuna lamentela, produzione senza vincoli orari",
    modello: "ZPF"
  },
  {
    titolo: "Ristorante Centro Storico", citta: "Firenze",
    problema: "Fuliggine sui balconi dei condomini, causa civile in corso",
    risultato: "Causa ritirata, rapporti con il vicinato ristabiliti",
    modello: "ZPZ"
  },
];

const faqItems = [
  {
    domanda: "Quanto costa un sistema ZAPPER® per forno a legna?",
    risposta: "Il prezzo dipende dal modello e dalle caratteristiche dell'impianto. Offriamo una valutazione gratuita e senza impegno per darti un preventivo preciso. In più, molti sistemi rientrano nelle agevolazioni fiscali fino al 65% a fondo perduto.",
  },
  {
    domanda: "Chi si occupa dell'installazione?",
    risposta: "Ci occupiamo noi di tutto. I nostri tecnici certificati raggiungono tutta Italia e installano il sistema in giornata, senza interrompere la tua attività.",
  },
  {
    domanda: "Quanta acqua consuma?",
    risposta: "Il consumo è minimo: circa 3-5 litri all'ora, meno di uno sciacquone. L'acqua viene nebulizzata ad alta pressione per massimizzare l'efficienza.",
  },
  {
    domanda: "Funziona su qualsiasi canna fumaria?",
    risposta: "Sì, ZAPPER® si adatta a canne fumarie di qualsiasi diametro. Il nostro team analizza le foto del tuo impianto e ti conferma il modello più adatto prima dell'acquisto.",
  },
  {
    domanda: "C'è una garanzia?",
    risposta: "Sì, tutti i sistemi ZAPPER® hanno garanzia di 1 anno. Se il risultato non ti soddisfa, ne parliamo e troviamo la soluzione.",
  },
  {
    domanda: "Che manutenzione richiede?",
    risposta: "Manutenzione minima: un semplice risciacquo del serbatoio ogni 2-4 settimane. Nessun filtro da comprare o sostituire.",
  },
];

/* ═══════════════════════════════════════════
   INLINE FORM (3-step quiz)
   ═══════════════════════════════════════════ */

const STEPS = [
  { id: "problem" },
  { id: "contact" },
];

const InlineQuizForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ problem: "", name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const problemOptions = [
    { value: "vicini", label: "Lamentele dai vicini o dall'ASL" },
    { value: "sanzioni", label: "Rischio sanzioni o chiusura" },
    { value: "fuliggine", label: "Fuliggine su muri e balconi" },
    { value: "altro", label: "Altro problema" },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await sendContactEmails({
        name: formData.name,
        phone: formData.phone,
        email: "",
        sector: "professionale",
        message: `[Forni a legna] Problema: ${formData.problem}`,
        source: "Quiz Forni a Legna",
      });
      if (result.success) {
        navigate("/it/grazie");
      } else {
        toast({ title: "Errore", description: "Riprova tra qualche istante.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Errore", description: "Riprova tra qualche istante.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i <= step ? "bg-primary text-white" : "bg-white/20 text-white/50"}`}>
              {i + 1}
            </div>
            {i < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-white/30" />}
          </div>
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
        {step === 0 && (
          <div className="space-y-3">
            <p className="text-white font-semibold text-base mb-4">Qual è il tuo problema principale?</p>
            {problemOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setFormData({ ...formData, problem: opt.value }); setStep(1); }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${formData.problem === opt.value ? "border-primary bg-primary/20 text-white" : "border-white/20 text-white/80 hover:border-white/40"}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <p className="text-white font-semibold text-base mb-4">Lasciaci il tuo numero, ti richiamiamo noi</p>
            <Input
              type="text"
              placeholder="Il tuo nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 text-base"
            />
            <Input
              type="tel"
              placeholder="Numero di telefono *"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 text-base"
            />
            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={handleSubmit}
              disabled={!formData.phone || isSubmitting}
            >
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Invio in corso...</>
              ) : (
                <>Scopri se fa per il tuo forno<ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
            <p className="text-[10px] text-white/40 text-center">
              Inviando accetti la{" "}
              <a href="/privacy" className="underline hover:text-white/60">privacy policy</a>
            </p>
          </div>
        )}
      </div>

      {/* Direct call */}
      <div className="mt-5 text-center">
        <p className="text-white/50 text-xs mb-1">Preferisci parlare subito con un tecnico?</p>
        <a href="tel:+3908119968436" className="inline-flex items-center gap-2 text-primary hover:underline font-semibold text-base">
          <Phone className="w-4 h-4" />
          081 199 68 436
        </a>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════ */

export default function ForniALegna() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Forno a legna con problemi di fumi? Risolvi subito | ZAPPER®"
        description="Il tuo forno a legna crea problemi con i vicini o l'ASL? ZAPPER® elimina fumi e fuliggine in un giorno. Nessun filtro, garanzia 1 anno. Scopri se fa per te."
      />
      <Header />
      <main>
        {/* ═══ 1. HERO — orientato al cliente ═══ */}
        <section
          className="pt-24 pb-16 md:pt-32 md:pb-24 relative bg-cover bg-center min-h-[70vh] flex items-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-foreground/70" />
          <div className="container relative z-10">
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-8">
              <Link to="/applicazioni" className="hover:text-primary-foreground transition-colors">Applicazioni</Link>
              <span>/</span>
              <span className="text-primary-foreground/80">Forni a Legna</span>
            </nav>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/20 border border-destructive/30 rounded-full mb-6">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium text-primary-foreground/90">Fumi, fuliggine e odori dal forno a legna?</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Il tuo forno a legna ti ha già creato problemi
                <span className="text-accent"> con i vicini o l'ASL?</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl">
                ZAPPER® elimina fumi neri, fuliggine e odori dal giorno dell'installazione. Nessun filtro da cambiare, nessun giorno di chiusura.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="accent" size="lg" asChild>
                  <Link to="/scopri">
                    Scopri se fa per il tuo forno
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 text-primary-foreground/60 text-sm">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-accent" /> 2.500+ attività soddisfatte</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-accent" /> Installazione in giornata</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-accent" /> Garanzia 1 anno</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 2. IL PROBLEMA — 3 punti, i più dolorosi ═══ */}
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
              <span className="text-destructive font-semibold text-sm uppercase tracking-wider">Il problema</span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                Ti riconosci in uno di questi scenari?
              </h2>
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

        {/* ═══ 3. LA SOLUZIONE — linguaggio umano ═══ */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">La soluzione</span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                Usa solo acqua, nessun filtro da comprare
              </h2>
              <p className="text-muted-foreground text-lg">
                ZAPPER® si collega alla canna fumaria che hai già. Il fumo entra, l'acqua nebulizzata cattura tutto — fuliggine, odori, particelle nere. Esce solo aria pulita.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto mb-12">
              <div>
                <img
                  src={soluzioneImage}
                  alt="Sistema ZAPPER® installato su forno a legna"
                  className="rounded-2xl shadow-2xl w-full"
                  loading="lazy"
                  width={1280}
                  height={864}
                />
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

            {/* Prima / Dopo */}
            <div className="max-w-4xl mx-auto">
              <img
                src={primaDopoImage}
                alt="Prima e dopo l'installazione ZAPPER® su forno a legna"
                className="rounded-2xl shadow-xl w-full"
                loading="lazy"
                width={1280}
                height={640}
              />
              <p className="text-center text-muted-foreground text-sm mt-4">
                A sinistra: emissioni senza trattamento. A destra: dopo l'installazione ZAPPER®.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 4. MODELLI COMPATIBILI + uscita di sicurezza ═══ */}
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Modelli</span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                Quale ZAPPER® per il tuo forno?
              </h2>
              <p className="text-muted-foreground">
                Il modello giusto dipende dal tuo impianto. Ecco i più usati per forni a legna.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {modelliCompatibili.map((m) => (
                <Link key={m.name} to={m.href} className="group block">
                  <div className="h-full p-6 bg-card rounded-2xl shadow-lg hover:shadow-xl border border-border hover:border-accent/30 transition-all text-center">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {m.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{m.desc}</p>
                    <span className="inline-flex items-center text-accent font-medium text-sm">
                      Scopri il modello <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Uscita di sicurezza */}
            <div className="max-w-xl mx-auto mt-8 p-5 bg-accent/5 border border-accent/20 rounded-xl text-center">
              <p className="text-foreground font-medium mb-3">Non sai quale modello fa per te?</p>
              <p className="text-muted-foreground text-sm mb-4">Ti basta inviarci una foto della canna fumaria — ti diciamo noi qual è il modello giusto, gratuitamente.</p>
              <Button variant="outline" size="default" asChild>
                <Link to="/scopri">
                  Te lo diciamo noi gratuitamente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Badge agevolazioni */}
            <div className="max-w-xl mx-auto mt-6 flex items-center justify-center gap-3 px-5 py-3 bg-primary/5 border border-primary/20 rounded-xl">
              <BadgePercent className="w-5 h-5 text-primary shrink-0" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">Finanziabile fino al 65% a fondo perduto</span> — con Bando INAIL ISI e Industria 4.0.{" "}
                <Link to="/agevolazioni" className="text-primary hover:underline font-medium">Scopri le agevolazioni →</Link>
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 5. PROOF — CASI CLIENTI ═══ */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Risultati reali</span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                Chi ha già risolto con ZAPPER®
              </h2>
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

        {/* ═══ 6. FAQ — gestione obiezioni ═══ */}
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <HelpCircle className="w-5 h-5 text-accent" />
                  <span className="text-accent font-semibold text-sm uppercase tracking-wider">Domande frequenti</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  Le domande che ci fanno tutti
                </h2>
              </div>
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((faq, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="border border-border rounded-xl px-5 data-[state=open]:bg-muted/30">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                      {faq.domanda}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                      {faq.risposta}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ═══ 7. DIVENTA PARTNER ═══ */}
        <section className="py-12 md:py-16 bg-muted/30 border-y border-border">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-5">
                <Wrench className="w-4 h-4" />
                Per installatori e rivenditori
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Diventa Partner ZAPPER®
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Sei un installatore di cappe o canne fumarie? Un rivenditore di attrezzature per la ristorazione? 
                Entra nella rete ZAPPER® e offri ai tuoi clienti una soluzione che funziona davvero.
              </p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-foreground/80 mb-8">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Listino riservato</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Formazione tecnica</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Supporto commerciale</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Area partner dedicata</span>
              </div>
              <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/landing-partners">
                  Scopri il programma partner
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ═══ 8. URGENZA + CTA FINALE con form inline ═══ */}
        <section className="py-16 md:py-24 bg-zapper-black">
          <div className="container">
            {/* Urgency banner */}
            <div className="max-w-xl mx-auto mb-10 flex items-center justify-center gap-3 px-5 py-3 bg-primary/10 border border-primary/30 rounded-xl">
              <Clock className="w-5 h-5 text-primary shrink-0" />
              <p className="text-sm text-white/90">
                <span className="font-semibold">Bando INAIL ISI:</span> le domande per il contributo a fondo perduto hanno scadenza annuale.{" "}
                <Link to="/agevolazioni/bando-inail-isi" className="text-primary hover:underline">Verifica se sei in tempo →</Link>
              </p>
            </div>

            <div className="max-w-xl mx-auto text-center mb-8">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                Hai un forno a legna con problemi di fumi?
              </h2>
              <p className="text-white/70 text-sm sm:text-base">
                Rispondi a una domanda e lasciaci il tuo numero. Ti richiamiamo noi entro 24 ore — zero impegno.
              </p>
            </div>

            <InlineQuizForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
