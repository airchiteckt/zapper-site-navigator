import { useState, useEffect, useCallback } from "react";
import { X, Phone, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";

const DISMISSED_KEY = "zapper_mobile_callback_dismissed";
const DELAY_MS = 20000;

/**
 * Mobile-only popup that appears after 20 seconds of presence on the page.
 * Plays a soft notification sound on appearance and asks the visitor if they
 * want to be called back. Captures Name + Phone (only mandatory fields per
 * project standards).
 */
const MobileCallbackPopup = () => {
  const { toast } = useToast();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const playNotificationSound = useCallback(() => {
    try {
      // Web Audio API: short, soft two-tone "ping"
      const AudioCtx =
        (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const playTone = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, ctx.currentTime + start);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };
      playTone(880, 0, 0.18);
      playTone(1320, 0.16, 0.22);
    } catch {
      // silent: audio not critical
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(DISMISSED_KEY)) return;

    // Mobile-only: pointer coarse OR width <= 768
    const isMobile =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 768;
    if (!isMobile) return;

    const timer = window.setTimeout(() => {
      setShow(true);
      playNotificationSound();
      // Soft haptic on supported devices
      if ("vibrate" in navigator) {
        try {
          navigator.vibrate([60, 40, 60]);
        } catch {
          /* noop */
        }
      }
      trackEvent("mobile_callback_popup_shown", { delay_ms: DELAY_MS });
    }, DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [playNotificationSound]);

  const dismiss = useCallback(() => {
    setShow(false);
    sessionStorage.setItem(DISMISSED_KEY, "1");
    trackEvent("mobile_callback_popup_dismissed");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast({
        title: "Campi obbligatori",
        description: "Inserisci nome e telefono.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("form_submissions").insert({
        source: "mobile_callback_popup",
        name: name.trim(),
        phone: phone.trim(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        extra: { delay_ms: DELAY_MS, channel: "mobile_callback" },
      });
      if (error) throw error;

      trackEvent("mobile_callback_requested", { source: "mobile_callback_popup" });
      sessionStorage.setItem(DISMISSED_KEY, "1");
      setShow(false);
      // Conversion goal page
      window.location.href = "/grazie";
    } catch (err) {
      console.error("[MobileCallbackPopup] submit error", err);
      toast({
        title: "Ops, qualcosa è andato storto",
        description: "Riprova tra un istante o chiamaci direttamente.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-3 sm:p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={dismiss} />

      <div className="relative bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300">
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground transition-colors"
          aria-label="Chiudi"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="bg-foreground px-6 py-5 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/20 rounded-xl mb-3 animate-pulse">
            <Phone className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-background text-xl sm:text-2xl font-bold leading-tight">
            Vuoi che ti richiamiamo noi?
          </h2>
          <p className="text-background/70 text-sm mt-2">
            Valutazione tecnica gratuita, senza impegno.
          </p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-3">
          <Input
            type="text"
            placeholder="Il tuo nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-base"
            autoComplete="name"
            required
          />
          <Input
            type="tel"
            placeholder="Numero di telefono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="text-base"
            autoComplete="tel"
            inputMode="tel"
            required
          />

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full text-base py-6"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Invio...
              </>
            ) : (
              <>
                <Phone className="w-5 h-5 mr-2" />
                Sì, richiamatemi
              </>
            )}
          </Button>

          <a
            href="https://wa.me/390811996843"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent("mobile_callback_whatsapp_click");
              sessionStorage.setItem(DISMISSED_KEY, "1");
            }}
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-2"
          >
            <MessageCircle className="w-4 h-4" />
            Preferisco scrivervi su WhatsApp
          </a>
        </form>
      </div>
    </div>
  );
};

export default MobileCallbackPopup;
