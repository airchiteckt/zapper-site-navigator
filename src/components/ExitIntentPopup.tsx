import { useState, useEffect, useCallback } from "react";
import { X, Phone, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendContactEmails } from "@/lib/emailService";

const EXIT_DISMISSED_KEY = "zapper_exit_popup_dismissed";

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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

    // Desktop: mouse leaves viewport top
    document.addEventListener("mouseleave", handleMouseLeave);

    // Mobile: back button / visibility change (tab switch)
    const handleVisibility = () => {
      if (triggered) return;
      if (document.visibilityState === "hidden") {
        triggered = true;
        // Show when they come back
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
    if (!name.trim() || !phone.trim()) return;
    setSubmitting(true);
    try {
      await sendContactEmails({
        name: name.trim(),
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismiss} />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="bg-primary px-6 py-5 text-center">
          <p className="text-primary-foreground text-sm font-medium line-through opacity-70">
            Valutazione tecnica: 149€
          </p>
          <h2 className="text-primary-foreground text-2xl font-bold mt-1">
            Ora è GRATUITA 🎁
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p className="text-foreground font-semibold text-lg text-center mb-1">
            Ricevi la tua valutazione tecnica gratuita
          </p>
          <p className="text-muted-foreground text-sm text-center mb-5">
            Prima risposta entro 24h
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              placeholder="Il tuo nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-12"
            />
            <Input
              placeholder="+39 333 1234567"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
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
                <>Richiedi valutazione gratuita<ArrowRight className="w-5 h-5 ml-2" /></>
              )}
            </Button>
          </form>

          {/* Trust badges */}
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>Nessuna chiamata spam</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>Risposta da un tecnico, non da un commerciale</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
