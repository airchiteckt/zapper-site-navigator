import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Phone, Loader2, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { sendContactEmails } from "@/lib/emailService";
import { useToast } from "@/hooks/use-toast";
import { trackFormStart, trackFormSubmit, trackFormAbandon } from "@/lib/analytics";

const STEPS = [
  { id: "sector", key: "formFinale.stepSector" },
  { id: "problem", key: "formFinale.stepProblem" },
  { id: "contact", key: "formFinale.stepContact" },
];

const FormFinaleSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ sector: "", problem: "", name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectorOptions = [
    { value: "professionale", label: t("common.professional") },
    { value: "domestico", label: t("common.domestic") },
    { value: "industriale", label: t("common.industrial") },
  ];

  const problemOptions = [
    { value: "fumi", label: t("formFinale.problemSmoke") },
    { value: "odori", label: t("formFinale.problemOdor") },
    { value: "sanzioni", label: t("formFinale.problemFines") },
    { value: "altro", label: t("formFinale.problemOther") },
  ];

  // Track form start when user picks first option
  useEffect(() => {
    if (data.sector && step === 1) trackFormStart("homepage_quiz");
  }, [data.sector, step]);

  // Track abandon
  useEffect(() => {
    const onLeave = () => {
      if ((data.sector || data.problem || data.name || data.phone) && !isSubmitting) {
        const filled = Object.entries(data).filter(([, v]) => v).map(([k]) => k);
        const last = filled[filled.length - 1] || "none";
        trackFormAbandon("homepage_quiz", last, filled);
      }
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [data, isSubmitting]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await sendContactEmails({
        name: data.name,
        phone: data.phone,
        email: "",
        sector: data.sector,
        message: `Problema: ${data.problem}`,
        source: "Quiz Homepage",
      });
      if (result.success) {
        trackFormSubmit("homepage_quiz");
        navigate(`/${i18n.language || "it"}/grazie`);
      } else {
        toast({ title: t("cta.errorTitle"), description: t("cta.errorMessage"), variant: "destructive" });
      }
    } catch {
      toast({ title: t("cta.errorTitle"), description: t("cta.errorGeneric"), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 md:py-24 bg-zapper-black">
      <div className="container px-4 sm:px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              {t("formFinale.title")}
            </h2>
            <p className="text-white/70 text-sm sm:text-base">{t("formFinale.subtitle")}</p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-8">
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
            {/* Step 1: Sector */}
            {step === 0 && (
              <div className="space-y-4">
                <p className="text-white font-semibold text-base mb-4">{t("formFinale.sectorQuestion")}</p>
                <div className="grid gap-3">
                  {sectorOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setData({ ...data, sector: opt.value }); setStep(1); }}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${data.sector === opt.value ? "border-primary bg-primary/20 text-white" : "border-white/20 text-white/80 hover:border-white/40"}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Problem */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-white font-semibold text-base mb-4">{t("formFinale.problemQuestion")}</p>
                <div className="grid gap-3">
                  {problemOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setData({ ...data, problem: opt.value }); setStep(2); }}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${data.problem === opt.value ? "border-primary bg-primary/20 text-white" : "border-white/20 text-white/80 hover:border-white/40"}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Contact */}
            {step === 2 && (
              <div className="space-y-4">
                <p className="text-white font-semibold text-base mb-4">{t("formFinale.contactQuestion")}</p>
                <Input
                  type="text"
                  placeholder={t("formFinale.namePlaceholder")}
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 text-base"
                />
                <Input
                  type="tel"
                  placeholder={t("formFinale.phonePlaceholder")}
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 text-base"
                />
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={!data.phone || isSubmitting}
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t("cta.submitting")}</>
                  ) : (
                    <>{t("formFinale.submit")}<ArrowRight className="w-4 h-4 ml-2" /></>
                  )}
                </Button>
                <p className="text-[10px] sm:text-xs text-white/40 text-center">
                  {t("cta.privacyConsent")}{" "}
                  <a href="/privacy" className="underline hover:text-white/60">{t("cta.privacyPolicy")}</a>
                </p>
              </div>
            )}
          </div>

          {/* Direct call fallback */}
          <div className="mt-6 text-center">
            <p className="text-white/50 text-xs mb-2">{t("formFinale.preferCall")}</p>
            <a href="tel:+3908119968436" className="inline-flex items-center gap-2 text-primary hover:underline font-semibold text-base">
              <Phone className="w-4 h-4" />
              081 199 68 436
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormFinaleSection;
