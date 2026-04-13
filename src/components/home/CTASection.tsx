import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, ArrowRight, Shield, Clock, Truck, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { sendContactEmails } from "@/lib/emailService";
import logoCompass from "@/assets/logo-compass.jpg";
import { useToast } from "@/hooks/use-toast";

const CTASection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", sector: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await sendContactEmails({ name: formData.name, email: formData.email, phone: formData.phone, sector: formData.sector, message: formData.message, source: "Form CTA Homepage" });
      if (result.success) {
        const lang = i18n.language || "it";
        navigate(`/${lang}/grazie`);
      } else {
        toast({ title: t("cta.errorTitle"), description: t("cta.errorMessage"), variant: "destructive" });
      }
    } catch {
      toast({ title: t("cta.errorTitle"), description: t("cta.errorGeneric"), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: Clock, text: t("cta.assessment48h") },
    { icon: Shield, text: t("cta.noObligation") },
    { icon: Truck, text: t("cta.quickInstallation") },
  ];

  return (
    <section className="py-10 md:py-24 bg-zapper-black">
      <div className="container px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-16 items-start">
          <div>
            <span className="inline-block text-primary font-semibold text-xs uppercase tracking-wider mb-2 sm:mb-4">{t("cta.startNow")}</span>
            <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-6 leading-tight">
              {t("cta.title1")}{" "}
              <span className="text-primary block sm:inline">{t("cta.title2")}</span>
            </h2>
            <p className="text-sm sm:text-lg text-white/80 mb-2 sm:mb-4 leading-relaxed">{t("cta.description")}</p>
            <p className="text-xs sm:text-base text-white/70 mb-4 sm:mb-8 leading-relaxed">{t("cta.description2")}</p>

            <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-8">
              {benefits.map((benefit) => (
                <div key={benefit.text} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <span className="text-white text-xs sm:text-base font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="p-3 sm:p-6 bg-white/10 rounded-lg sm:rounded-xl">
              <p className="text-xs text-white/70 mb-2 sm:mb-4">{t("cta.preferDirect")}</p>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                <a href="tel:+3908119968436" className="flex items-center gap-2 text-primary hover:underline">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="font-semibold text-xs sm:text-base">+39 081 199 68 436</span>
                </a>
                <a href="mailto:info@smokezapper.it" className="flex items-center gap-2 text-primary hover:underline">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="font-semibold text-xs sm:text-base">info@smokezapper.it</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 sm:p-4 bg-white/10 rounded-lg sm:rounded-xl mt-3 sm:mt-4">
              <img src={logoCompass} alt="Compass - Gruppo Mediobanca" className="h-10 sm:h-12 w-auto rounded bg-white p-1" />
              <div>
                <p className="text-white text-xs sm:text-sm font-semibold">{t("cta.compassTitle")}</p>
                <p className="text-white/70 text-[10px] sm:text-xs">{t("cta.compassDescription")}</p>
              </div>
            </div>
          </div>

          <div className="bg-card text-foreground rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
            <h3 className="font-display text-lg sm:text-2xl font-bold mb-3 sm:mb-6">{t("cta.fillForm")}</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-3 sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium mb-1.5">{t("cta.nameLabel")}</label>
                  <Input id="name" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Mario Rossi" className="bg-background text-sm h-9 sm:h-10" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium mb-1.5">{t("cta.phoneLabel")} *</label>
                  <Input id="phone" type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+39 333 123 4567" className="bg-background text-sm h-9 sm:h-10" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium mb-1.5">{t("cta.emailLabel")} *</label>
                <Input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="mario@esempio.it" className="bg-background text-sm h-9 sm:h-10" />
              </div>
              <div>
                <label htmlFor="sector" className="block text-xs font-medium mb-1.5">{t("cta.sectorLabel")}</label>
                <select id="sector" value={formData.sector} onChange={(e) => setFormData({ ...formData, sector: e.target.value })} className="w-full h-9 sm:h-10 rounded-lg border border-input bg-background px-3 text-sm">
                  <option value="">{t("cta.selectSector")}</option>
                  <option value="professionale">{t("common.professional")}</option>
                  <option value="domestico">{t("common.domestic")}</option>
                  <option value="industriale">{t("common.industrial")}</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium mb-1.5">{t("cta.messageLabel")}</label>
                <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder={t("cta.messagePlaceholder")} rows={2} className="bg-background text-sm min-h-[60px] sm:min-h-[80px]" />
              </div>
              <Button type="submit" variant="accent" size="default" className="w-full h-10 sm:h-11 text-sm sm:text-base" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t("cta.submitting")}</> : <>{t("cta.submitButton")}<ArrowRight className="w-4 h-4 ml-2" /></>}
              </Button>
              <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
                {t("cta.privacyConsent")}{" "}
                <a href="/privacy" className="underline hover:text-foreground">{t("cta.privacyPolicy")}</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
