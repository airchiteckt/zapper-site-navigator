import { ArrowRight, Factory, CheckCircle, FileText, Calendar, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/layout/Footer";

const Industria40 = () => {
  const requirements = [
    "Beni strumentali nuovi destinati a strutture produttive in Italia",
    "Interconnessione al sistema aziendale di gestione della produzione",
    "Integrazione automatizzata con il sistema logistico o la rete di fornitura",
    "Interfaccia uomo-macchina semplice e intuitiva",
    "Rispondenza ai più recenti parametri di sicurezza e igiene del lavoro",
  ];

  const documents = [
    "Fattura di acquisto con riferimento normativo",
    "Perizia tecnica giurata (per beni > €300.000)",
    "Dichiarazione del legale rappresentante (per beni ≤ €300.000)",
    "Analisi tecnica di interconnessione",
    "Comunicazione al MISE (Ministero delle Imprese)",
  ];

  const timeline = [
    { period: "2026", benefit: "Credito d'imposta al 20% fino a €2,5 milioni" },
    { period: "2027", benefit: "Credito d'imposta al 15% fino a €2,5 milioni" },
    { period: "2028", benefit: "Credito d'imposta al 10% fino a €2,5 milioni" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
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
              <Factory className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">2026-2028</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Industria 4.0
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              I sistemi ZAPPER® rientrano tra i beni strumentali 4.0 e permettono di accedere all'iperammortamento per investimenti in tecnologie innovative.
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl md:text-6xl font-bold text-primary">180%</span>
              <span className="text-xl text-foreground font-medium">Iperammortamento</span>
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
                I sistemi ZAPPER® soddisfano i requisiti previsti dall'Allegato A della Legge di Bilancio per i beni strumentali 4.0, in quanto:
              </p>
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6 md:p-8 border border-primary/20">
              <p className="text-foreground">
                <strong>Nota:</strong> I sistemi ZAPPER® con funzionalità di monitoraggio remoto e integrazione IoT soddisfano automaticamente i requisiti di interconnessione richiesti dalla normativa 4.0.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Tempistiche e benefici
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl border border-border p-6 text-center"
                >
                  <span className="text-3xl font-bold text-primary mb-2 block">
                    {item.period}
                  </span>
                  <p className="text-muted-foreground text-sm">{item.benefit}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-6 text-center">
              * I benefici sono soggetti a variazioni normative. Verifica sempre con il tuo commercialista.
            </p>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 md:py-24">
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
              Prepariamo insieme la documentazione tecnica necessaria per accedere agli incentivi Industria 4.0. Il nostro team ti guida in ogni passaggio.
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link to="/contatti?motivo=industria-40">
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

export default Industria40;
