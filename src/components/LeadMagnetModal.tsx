import { useState } from "react";
import { X, Download, Loader2, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { trackCTA, trackFormSubmit } from "@/lib/analytics";

interface LeadMagnetModalProps {
  open: boolean;
  onClose: () => void;
  source?: string;
}

const PDF_URL = "https://npyygvuhmxrvccaczifw.supabase.co/storage/v1/object/public/media/guides/zapper-guida-tecnica-abbattimento-fumi.pdf";

const LeadMagnetModal = ({ open, onClose, source = "lead_magnet_modal" }: LeadMagnetModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;

    // Fire GTM event IMMEDIATELY on submit (before async work)
    if (typeof window !== "undefined") {
      const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      const payload = {
        event: "scarica_guida",
        source,
        page_url: window.location.href,
      };
      w.dataLayer.push(payload);
      console.log("[GTM dataLayer push]", payload);
    }

    setSubmitting(true);
    try {
      await supabase.functions.invoke("send-lead-magnet", {
        body: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          source,
          page_url: window.location.href,
        },
      });
      trackFormSubmit("lead_magnet_guida");
      setSuccess(true);
      // Trigger immediate browser download
      window.open(PDF_URL, "_blank");
    } catch (err) {
      console.error("Lead magnet submit failed:", err);
      // Still show success: PDF is public and we want max conversion
      setSuccess(true);
      window.open(PDF_URL, "_blank");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-card rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-300 max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground transition-colors"
          aria-label="Chiudi"
        >
          <X className="w-4 h-4" />
        </button>

        {!success ? (
          <>
            {/* Header */}
            <div className="bg-foreground px-6 py-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/20 rounded-xl mb-3">
                <FileText className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-background text-xl sm:text-2xl font-bold mb-1">
                Guida tecnica gratuita
              </h2>
              <p className="text-background/70 text-sm">
                10 pagine. Scaricala in 30 secondi.
              </p>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <ul className="space-y-2 mb-5 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">I 7 errori più costosi nei sistemi di abbattimento</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Checklist normativa: D.Lgs. 152/2006, ARPA, Comuni</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Tabella diagnostica: dal sintomo alla soluzione</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Case study reale: pizzeria storica a Napoli</span>
                </li>
              </ul>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  placeholder="Nome e cognome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12"
                  autoFocus
                />
                <Input
                  placeholder="Email (per ricevere la guida)"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
                <Input
                  placeholder="Telefono"
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
                  onClick={() => trackCTA("lead_magnet_submit", { source })}
                >
                  {submitting ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Invio in corso...</>
                  ) : (
                    <><Download className="w-5 h-5 mr-2" />Scarica la guida ora</>
                  )}
                </Button>
              </form>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>Nessuno spam. Email facoltativa per il PDF.</span>
              </div>
            </div>
          </>
        ) : (
          <div className="px-6 py-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-foreground text-xl font-bold mb-2">
              La guida è in arrivo!
            </h2>
            <p className="text-muted-foreground text-sm mb-5">
              Il download è iniziato e abbiamo inviato anche una copia alla tua email.
              Un nostro tecnico ti ricontatterà entro 24-48 ore.
            </p>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
            >
              <Download className="w-4 h-4" />
              Scarica di nuovo il PDF
            </a>
            <Button onClick={onClose} variant="outline" className="w-full mt-5">
              Chiudi
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadMagnetModal;
