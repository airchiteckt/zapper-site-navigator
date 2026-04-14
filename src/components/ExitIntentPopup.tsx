import { useState, useEffect, useCallback } from "react";
import { X, ArrowRight, Loader2, ShieldCheck, Phone, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendContactEmails } from "@/lib/emailService";

const EXIT_DISMISSED_KEY = "zapper_exit_popup_dismissed";

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const dismiss = useCallback(() => {
    setShow(false);
    sessionStorage.setItem(EXIT_DISMISSED_KEY, "1");
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(EXIT_DISMISSED_KEY)) return;

    let triggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (triggered) return;
      if (e.clientY <= 0) {
        triggered = true;
        setShow(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    const handleVisibility = () => {
      if (triggered) return;
      if (document.visibilityState === "hidden") {
        triggered = true;
        const onReturn = () => {
          setShow(true);
          document.removeEventListener("visibilitychange", onReturn);
        };
        document.addEventListener("visibilitychange", onReturn);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setSubmitting(true);
    try {
      await sendContactEmails({
        name: name.trim() || "Non fornito",
        email: "non fornita",
        phone: phone.trim(),
        source: "Exit Intent Popup",
        message: "",
      });
      dismiss();
      const lang = window.location.pathname.split("/").filter(Boolean)[0] || "it";
      window.location.href = `/${lang}/grazie`;
    } catch {
      setSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismiss} />

      <div className="relative bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="bg-primary px-6 py-5 text-center">
          <p className="text-primary-foreground/70 text-sm font-medium line-through">
            Valutazione tecnica: 149€
          </p>
          <h2 className="text-primary-foreground text-xl sm:text-2xl font-bold mt-1">
            Scopri quanto puoi risparmiare
          </h2>
          <p className="text-primary-foreground/90 text-sm mt-1">
            Gratis, in 24h
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-muted-foreground text-sm text-center mb-4">
            Un tecnico analizza il tuo caso e ti dà una risposta reale, non commerciale
          </p>

          {/* Value bullets */}
          <div className="space-y-2 mb-5">
            {[
              "Analisi personalizzata",
              "Nessun impegno",
              "Risposta da tecnico esperto",
            ].map((text) => (
              <div key={text} className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              placeholder="+39 333 1234567"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="h-12"
              autoFocus
            />
            <Input
              placeholder="Nome (opzionale)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12"
            />
            <Button
              type="submit"
              size="lg"
              className="w-full text-base py-6"
              disabled={submitting}
            >
              {submitting ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Invio...</>
              ) : (
                <>Invia e fatti contattare da un tecnico<ArrowRight className="w-5 h-5 ml-2" /></>
              )}
            </Button>
          </form>

          {/* Trust micro-copy */}
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>Ti contattiamo solo per questa richiesta</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>Risposta da un tecnico, non da un commerciale</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>Offerta gratuita valida per pochi clienti ogni settimana</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
