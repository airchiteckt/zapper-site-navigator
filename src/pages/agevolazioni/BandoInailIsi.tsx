import { ArrowRight, ShieldCheck, CheckCircle, FileText, Calendar, Info, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/layout/Footer";

const BandoInailIsi = () => {
  const eligibility = [
    "Imprese, anche individuali, iscritte alla Camera di Commercio",
    "Enti del terzo settore (solo alcune tipologie)",
    "Regolarità contributiva (DURC regolare)",
    "Rispetto delle normative in materia di salute e sicurezza sul lavoro",
    "Non aver ricevuto altri contributi per lo stesso intervento",
  ];

  const documents = [
    "Domanda di partecipazione al bando",
    "Relazione tecnica dell'intervento",
    "Preventivo dettagliato del fornitore",
    "Visura camerale aggiornata",
    "DURC in corso di validità",
    "Dichiarazione de minimis",
  ];

  const timeline = [
    { phase: "Pubblicazione", description: "Apertura bando e pubblicazione avviso" },
    { phase: "Click Day", description: "Invio domande in modalità telematica" },
    { phase: "Istruttoria", description: "Verifica requisiti e valutazione" },
    { phase: "Erogazione", description: "Conferma e accredito del contributo" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Bando INAIL ISI" description="Finanziamento a fondo perduto fino al 65% con il Bando INAIL ISI per i sistemi ZAPPER®. Scopri come partecipare." />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl">
            <Link 
              to="/agevolazioni" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              ← Torna alle agevolazioni
            </Link>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4 ml-4">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Bando 2026</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Bando INAIL ISI
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Il Bando INAIL ISI finanzia interventi per il miglioramento delle condizioni di salute e sicurezza nei luoghi di lavoro. I sistemi ZAPPER® sono ammissibili come interventi di riduzione del rischio.
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl md:text-6xl font-bold text-primary">65%</span>
              <span className="text-xl text-foreground font-medium">Fondo perduto</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why ZAPPER qualifies */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Perché ZAPPER® è ammissibile
              </h2>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
              <p className="text-muted-foreground mb-6">
                I sistemi ZAPPER® rientrano negli interventi ammissibili dal Bando INAIL ISI in quanto:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">
                    <strong>Riducono l'esposizione a fumi e particolato</strong> – Intervento di bonifica ambientale che migliora la qualità dell'aria nei luoghi di lavoro
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">
                    <strong>Migliorano le condizioni igienico-sanitarie</strong> – Eliminazione di odori e sostanze nocive derivanti da processi di combustione
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">
                    <strong>Riducono il rischio incendio</strong> – Abbattimento delle particelle combustibili nei condotti di scarico
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-accent/10 rounded-2xl p-6 md:p-8 border border-accent/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-medium mb-2">Attenzione: Click Day</p>
                  <p className="text-muted-foreground text-sm">
                    Il Bando INAIL ISI prevede una procedura a "click day". È fondamentale preparare tutta la documentazione in anticipo per non perdere l'opportunità. Contattaci per tempo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Chi può partecipare
              </h2>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <ul className="space-y-4">
                {eligibility.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Come funziona
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {timeline.map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-card rounded-xl border border-border p-6 text-center h-full">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center mx-auto mb-3">
                      {index + 1}
                    </span>
                    <h3 className="font-bold text-foreground mb-2">{item.phase}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Documenti necessari
              </h2>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <ul className="space-y-4">
                {documents.map((doc, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-foreground">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
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
              Prepara la tua domanda per il Bando INAIL ISI con il nostro supporto. Ti guidiamo nella raccolta dei documenti e nella compilazione della pratica.
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link to="/contatti?motivo=bando-inail">
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

export default BandoInailIsi;
