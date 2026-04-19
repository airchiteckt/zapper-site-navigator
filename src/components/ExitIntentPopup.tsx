import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { X, Download, FileText, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const LeadMagnetModal = lazy(() => import("./LeadMagnetModal"));

const EXIT_DISMISSED_KEY = "zapper_exit_popup_dismissed";

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  const handleClaim = () => {
    setOpenModal(true);
    sessionStorage.setItem(EXIT_DISMISSED_KEY, "1");
    setShow(false);
  };

  if (!show && !openModal) return null;

  return (
    <>
      {show && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={dismiss} />

          <div className="relative bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground transition-colors"
              aria-label="Chiudi"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="bg-foreground px-6 py-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/20 rounded-xl mb-3">
                <FileText className="w-7 h-7 text-primary" />
              </div>
              <p className="text-primary text-xs font-bold uppercase tracking-wider mb-2">
                Aspetta — non andare via a mani vuote
              </p>
              <h2 className="text-background text-xl sm:text-2xl font-bold leading-tight">
                Scarica gratis la Guida tecnica all'abbattimento fumi
              </h2>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <p className="text-muted-foreground text-sm text-center mb-4">
                10 pagine di esperienza diretta dei nostri tecnici. Evita gli errori più costosi
                <span className="font-semibold text-foreground"> prima </span>
                di scegliere il tuo sistema.
              </p>

              <ul className="space-y-2 mb-5 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">7 errori più costosi (con soluzione)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Checklist normativa aggiornata</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Tabella diagnostica + case study reale</span>
                </li>
              </ul>

              <Button
                onClick={handleClaim}
                size="lg"
                className="w-full text-base py-6"
              >
                <Download className="w-5 h-5 mr-2" />
                Scarica la guida ora
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>Gratis. Niente spam. PDF in 30 secondi.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Suspense fallback={null}>
        <LeadMagnetModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          source="exit_intent_popup"
        />
      </Suspense>
    </>
  );
};

export default ExitIntentPopup;
