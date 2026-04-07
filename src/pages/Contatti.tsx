import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, ArrowRight, ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import SEO from "@/components/SEO";

type FormStep = "prefiltro" | "form";

const Contatti = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>("prefiltro");
  
  // Pre-filtro data
  const [prefiltroData, setPrefiltroData] = useState({
    settore: "",
    tipoImpianto: "",
    diametroRange: ""
  });

  // Accordion states for mobile
  const [openSections, setOpenSections] = useState({
    contatto: true,
    note: false
  });

  const isPreFiltro = currentStep === "prefiltro";

  const canProceedFromPrefiltro = prefiltroData.settore && prefiltroData.tipoImpianto && prefiltroData.diametroRange;

  const handlePrefiltroSubmit = () => {
    if (canProceedFromPrefiltro) {
      setCurrentStep("form");
    }
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const goToNextSection = (current: keyof typeof openSections, next: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [current]: false,
      [next]: true
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title="Contatti e Valutazione Tecnica" description="Richiedi una valutazione tecnica gratuita per il tuo impianto. Contatta ZAPPER® per soluzioni di abbattimento fumi, odori e polveri." />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background pt-24 pb-12 md:pt-32 md:pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                {isPreFiltro ? "Verifica il tuo impianto" : "Valutazione tecnica ZAPPER®"}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-3">
                {isPreFiltro 
                  ? "Scopri in pochi secondi se ZAPPER® è la soluzione adatta al tuo impianto."
                  : "Analizziamo il tuo impianto da remoto e ti proponiamo la soluzione ZAPPER® più adatta."
                }
              </p>
              <p className="text-sm text-primary font-medium">
                {isPreFiltro 
                  ? "Solo 3 domande per iniziare."
                  : "La valutazione è tecnica, gratuita e senza impegno."
                }
              </p>
            </div>
          </div>
        </section>

        {/* Progress Indicator - only show after prefiltro */}
        {!isPreFiltro && (
          <section className="py-6 border-b border-border bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Passaggio 1 di 2
                  </span>
                  <span className="text-sm font-medium text-primary">
                    50% completato
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300 rounded-full"
                    style={{ width: '50%' }}
                  />
                </div>
                <div className="flex justify-between mt-3">
                  <div className="text-xs text-primary font-medium">Contatto</div>
                  <div className="text-xs text-muted-foreground">Invio</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Pre-Filtro Step */}
        {isPreFiltro && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto">
                <div className="bg-card p-6 md:p-8 rounded-xl border border-border shadow-sm">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="pf-settore" className="text-base font-medium">
                        In che settore operi?
                      </Label>
                      <Select 
                        value={prefiltroData.settore}
                        onValueChange={(value) => setPrefiltroData(prev => ({ ...prev, settore: value }))}
                      >
                        <SelectTrigger id="pf-settore" className="h-12">
                          <SelectValue placeholder="Seleziona settore" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professionale">🍕 Professionale (ristoranti, pizzerie...)</SelectItem>
                          <SelectItem value="residenziale">🏠 Residenziale (casa privata)</SelectItem>
                          <SelectItem value="industriale">🏭 Industriale</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pf-tipo" className="text-base font-medium">
                        Che tipo di impianto hai?
                      </Label>
                      <Select 
                        value={prefiltroData.tipoImpianto}
                        onValueChange={(value) => setPrefiltroData(prev => ({ ...prev, tipoImpianto: value }))}
                      >
                        <SelectTrigger id="pf-tipo" className="h-12">
                          <SelectValue placeholder="Seleziona tipo impianto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="forno-legna">Forno a legna</SelectItem>
                          <SelectItem value="caldaia-biomassa">Caldaia a biomassa</SelectItem>
                          <SelectItem value="braci-carbone">Braci / Carbone / Griglia</SelectItem>
                          <SelectItem value="camino">Camino</SelectItem>
                          <SelectItem value="stufa">Stufa</SelectItem>
                          <SelectItem value="affumicatore">Affumicatore</SelectItem>
                          <SelectItem value="altro">Altro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pf-diametro" className="text-base font-medium">
                        Diametro canna fumaria?
                      </Label>
                      <Select 
                        value={prefiltroData.diametroRange}
                        onValueChange={(value) => setPrefiltroData(prev => ({ ...prev, diametroRange: value }))}
                      >
                        <SelectTrigger id="pf-diametro" className="h-12">
                          <SelectValue placeholder="Seleziona range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sotto-150">Sotto 150 mm</SelectItem>
                          <SelectItem value="150-200">150 - 200 mm</SelectItem>
                          <SelectItem value="200-250">200 - 250 mm</SelectItem>
                          <SelectItem value="250-300">250 - 300 mm</SelectItem>
                          <SelectItem value="oltre-300">Oltre 300 mm</SelectItem>
                          <SelectItem value="non-so">Non lo so</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Non preoccuparti se non conosci il diametro esatto, lo verificheremo insieme.
                      </p>
                    </div>

                    <Button 
                      onClick={handlePrefiltroSubmit}
                      disabled={!canProceedFromPrefiltro}
                      size="lg" 
                      className="w-full text-base py-6 mt-4"
                    >
                      Procedi alla valutazione tecnica
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-6">
                  Non effettuiamo sopralluoghi in loco. La valutazione avviene da remoto.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Full Form - After Pre-Filtro */}
        {!isPreFiltro && (
          <section className="py-10 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                {/* Back button */}
                <button 
                  onClick={() => setCurrentStep("prefiltro")}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Modifica selezione iniziale
                </button>

                {/* Riepilogo pre-filtro */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8">
                  <p className="text-sm text-muted-foreground mb-2">La tua selezione:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium">
                      {prefiltroData.settore === "professionale" ? "🍕 Professionale" : 
                       prefiltroData.settore === "residenziale" ? "🏠 Residenziale" : "🏭 Industriale"}
                    </span>
                    <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium">
                      {prefiltroData.tipoImpianto.replace("-", " ")}
                    </span>
                    <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium">
                      Ø {prefiltroData.diametroRange.replace("-", "–")} mm
                    </span>
                  </div>
                </div>

                <form className="space-y-4">
                  {/* Section 1: Dati di contatto */}
                  <Collapsible open={openSections.contatto} onOpenChange={() => toggleSection("contatto")}>
                    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                      <CollapsibleTrigger className="w-full p-5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium",
                            openSections.contatto ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          )}>
                            1
                          </span>
                          <span className="font-semibold text-foreground">Dati di contatto</span>
                        </div>
                        <ChevronDown className={cn(
                          "w-5 h-5 text-muted-foreground transition-transform",
                          openSections.contatto && "rotate-180"
                        )} />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="px-5 pb-5 pt-2 space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="nome">Nome e Cognome *</Label>
                              <Input id="nome" placeholder="Mario Rossi" required className="h-11" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email *</Label>
                              <Input id="email" type="email" placeholder="mario@esempio.it" required className="h-11" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="telefono">Telefono (consigliato)</Label>
                              <Input id="telefono" type="tel" placeholder="+39 333 1234567" className="h-11" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="azienda">Azienda (se presente)</Label>
                              <Input id="azienda" placeholder="Nome azienda" className="h-11" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="citta">Città / Paese *</Label>
                              <Input id="citta" placeholder="Milano, Italia" required className="h-11" />
                            </div>
                          </div>
                          <Button 
                            type="button" 
                            onClick={() => goToNextSection("contatto", "note")}
                            className="w-full md:w-auto"
                          >
                            Continua
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>

                  {/* Section 2: Note e invio */}
                  <Collapsible open={openSections.note} onOpenChange={() => toggleSection("note")}>
                    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                      <CollapsibleTrigger className="w-full p-5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium",
                            openSections.note ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          )}>
                            2
                          </span>
                          <span className="font-semibold text-foreground">Note e invio</span>
                        </div>
                        <ChevronDown className={cn(
                          "w-5 h-5 text-muted-foreground transition-transform",
                          openSections.note && "rotate-180"
                        )} />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="px-5 pb-5 pt-2 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="note">Descrivi il problema o aggiungi dettagli utili</Label>
                            <Textarea 
                              id="note" 
                              placeholder="Es. Fumi persistenti anche dopo pulizia, odori che arrivano ai vicini, problemi di tiraggio..."
                              rows={4}
                            />
                          </div>

                          <div className="pt-4">
                            <Button type="submit" size="lg" className="w-full text-base py-6">
                              Invia richiesta di valutazione
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <p className="text-xs text-muted-foreground text-center mt-3">
                              Riceverai una risposta dal nostro team tecnico entro 24-48 ore lavorative.
                            </p>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                </form>

                {/* Privacy */}
                <p className="text-xs text-muted-foreground text-center mt-6">
                  Le informazioni fornite vengono utilizzate esclusivamente per la valutazione tecnica del tuo impianto.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Blocco fiducia - sempre visibile */}
        <section className="py-10 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-muted-foreground mb-4">
                Abbiamo già effettuato valutazioni tecniche e installazioni su impianti<br />
                <strong className="text-foreground">professionali, residenziali e industriali in tutta Europa.</strong>
              </p>
              <Link 
                to="/interventi" 
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                Vedi alcuni interventi reali
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Contatti diretti */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Preferisci parlare con noi?
              </h3>
              
              <div className="flex flex-wrap justify-center gap-6">
                <a 
                  href="tel:+3908119968436" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+39 081 199 68 436</span>
                </a>
                <a 
                  href="mailto:info@smokezapper.it" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>info@smokezapper.it</span>
                </a>
                <a 
                  href="https://wa.me/393248996189" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                Per richieste tecniche consigliamo sempre la valutazione tramite modulo.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contatti;
