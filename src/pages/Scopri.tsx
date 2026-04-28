import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { sendContactEmails } from "@/lib/emailService";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";

type Step = 1 | 2 | 3 | 4;

interface SourceOption {
  emoji: string;
  label: string;
  id: string;
  full?: boolean;
}

interface SituationOption {
  id: string;
  title: string;
  description: string;
  urgent?: boolean;
}

const sources: SourceOption[] = [
  { emoji: "🔥", label: "Forno", id: "forno" },
  { emoji: "🥩", label: "Griglia / Brace", id: "griglia" },
  { emoji: "🏠", label: "Camino", id: "camino" },
  { emoji: "🍳", label: "Cappe cucina", id: "cappe" },
  { emoji: "❓", label: "Altro", id: "altro", full: true },
];

const situations: SituationOption[] = [
  {
    id: "multa",
    title: "Ho già ricevuto una multa o una sospensione",
    description: "Devo risolvere subito per riaprire o evitare altre sanzioni",
    urgent: true,
  },
  {
    id: "segnalazione",
    title: "Ho ricevuto una segnalazione da vicini o ASL",
    description: "Non ho ancora una multa ma il problema è in corso",
  },
  {
    id: "lamentela",
    title: "Un vicino si è lamentato informalmente",
    description: "Nessuna pratica formale, ma voglio risolvere prima che si aggravi",
  },
  {
    id: "prevenzione",
    title: "Voglio mettermi in regola in anticipo",
    description: "Nessun problema ancora, ma voglio essere conforme",
  },
];

const Scopri = () => {
  const [step, setStep] = useState<Step>(1);
  const [source, setSource] = useState("");
  const [altroText, setAltroText] = useState("");
  const [situation, setSituation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isUrgent = situation === "multa";
  const sourceLabel = source === "altro" ? (altroText || "Altro") : sources.find(s => s.id === source)?.label || source;
  const situationLabel = situations.find(s => s.id === situation)?.title || situation;
  const firstName = name.trim().split(" ")[0];

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) return;
    setSubmitting(true);
    try {
      // Save to chat_sessions as a discovery lead
      await supabase.from("chat_sessions").insert({
        visitor_id: `discovery-${Date.now()}`,
        visitor_name: name.trim(),
        visitor_phone: phone.trim(),
        page_url: `/scopri`,
        contact_submitted: true,
        user_agent: navigator.userAgent,
      });

      await sendContactEmails({
        name: name.trim(),
        phone: phone.trim(),
        email: "",
        source: "Discovery Funnel",
        extra: {
          fonte: sourceLabel,
          situazione: situationLabel,
          città: city.trim() || "Non specificata",
          urgente: isUrgent ? "Sì" : "No",
        },
      });

      // GTM dataLayer event - invio modulo scopri
      try {
        (window as any).dataLayer = (window as any).dataLayer || [];
        const payload = {
          event: "invio_modulo_scopri",
          form_source: "discovery_funnel",
          page_url: "/scopri",
          fonte: sourceLabel,
          situazione: situationLabel,
          urgente: isUrgent ? "si" : "no",
        };
        (window as any).dataLayer.push(payload);
        console.log("[GTM dataLayer push]", payload);
      } catch (e) { console.warn("[GTM] push failed", e); }

      setStep(4);
    } catch (e) {
      console.error("Discovery submit error:", e);
      setStep(4); // Show confirmation anyway
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Scopri la soluzione ZAPPER® per la tua attività"
        description="Rispondi a 3 semplici domande e scopri quale sistema di abbattimento fumi ZAPPER® è ideale per te."
      />
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container px-4 sm:px-6 max-w-xl mx-auto">

          {/* Progress indicator */}
          {step < 4 && (
            <p className="text-sm text-muted-foreground text-center mb-6">
              Passo {step} di 3
            </p>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-center mb-2">
                Che fonte hai nella tua attività?
              </h1>
              <p className="text-muted-foreground text-center mb-8">
                Ti troviamo la soluzione giusta in 2 minuti.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {sources.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSource(s.id)}
                    className={`relative p-5 rounded-xl border-2 text-center transition-all ${
                      s.full ? "col-span-2" : ""
                    } ${
                      source === s.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    {source === s.id && (
                      <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-primary" />
                    )}
                    <span className="text-3xl block mb-2">{s.emoji}</span>
                    <span className="font-semibold text-sm">{s.label}</span>
                  </button>
                ))}
              </div>

              {source === "altro" && (
                <div className="mt-3">
                  <Input
                    value={altroText}
                    onChange={(e) => setAltroText(e.target.value)}
                    placeholder="Descrivi la tua fonte…"
                    className="text-base"
                  />
                </div>
              )}

              <Button
                variant="accent"
                size="lg"
                className="w-full mt-6"
                disabled={!source}
                onClick={() => setStep(2)}
              >
                Continua <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="animate-fade-in">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Indietro
              </button>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-2">
                Qual è la tua situazione oggi?
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Ci aiuta a capire di che cosa hai bisogno adesso.
              </p>

              <div className="space-y-3">
                {situations.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSituation(s.id)}
                    className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                      situation === s.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <div
                      className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                        situation === s.id
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}
                    >
                      {situation === s.id && (
                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm">{s.title}</span>
                        {s.urgent && (
                          <span className="text-[10px] font-bold uppercase bg-red-500 text-white px-2 py-0.5 rounded">
                            Urgente
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {s.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <Button
                variant="accent"
                size="lg"
                className="w-full mt-6"
                disabled={!situation}
                onClick={() => setStep(3)}
              >
                Continua <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="animate-fade-in">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Indietro
              </button>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-2">
                Dove ti mandiamo la soluzione?
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                {isUrgent
                  ? "Caso urgente: un tecnico ti ricontatterà entro 2 ore."
                  : "Un tecnico ZAPPER® ti ricontatterà entro oggi."}
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Il tuo nome <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Es. Marco Rossi"
                    className="text-base"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Numero di telefono <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Es. 348 1234567"
                    className="text-base"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Città o provincia{" "}
                    <span className="text-muted-foreground text-xs">(opzionale)</span>
                  </label>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Es. Napoli"
                    className="text-base"
                  />
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Nessuno spam. I tuoi dati sono al sicuro. Trattati secondo la{" "}
                <a href="/privacy" className="underline">
                  Privacy Policy
                </a>
                .
              </p>

              <Button
                variant="accent"
                size="lg"
                className="w-full mt-6"
                disabled={!name.trim() || !phone.trim() || submitting}
                onClick={handleSubmit}
              >
                {submitting
                  ? "Invio in corso…"
                  : "Mostrami la soluzione per la mia attività"}
                {!submitting && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          )}

          {/* CONFIRMATION */}
          {step === 4 && (
            <div className="animate-fade-in text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                Perfetto, {firstName}!
              </h2>
              <p className="text-muted-foreground mb-8">
                {isUrgent
                  ? "Il tuo caso è segnato come urgente. Un tecnico ZAPPER® ti chiamerà entro 2 ore con la soluzione per il tuo caso."
                  : "Un tecnico ZAPPER® ti chiamerà entro poche ore con la soluzione giusta per il tuo caso."}
              </p>

              <div className="bg-muted/50 rounded-xl p-5 text-left space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fonte</span>
                  <span className="font-medium">{sourceLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Situazione</span>
                  <span className="font-medium text-right max-w-[60%]">{situationLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Telefono</span>
                  <span className="font-medium">{phone}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Scopri;
