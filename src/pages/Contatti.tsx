import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Phone, Mail, MessageCircle, ArrowRight, Loader2, Handshake } from "lucide-react";
import { useState } from "react";
import SEO from "@/components/SEO";
import { sendContactEmails } from "@/lib/emailService";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const Contatti = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nome: "",
    telefono: "",
    email: "",
    citta: "",
    note: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.telefono) {
      toast({ title: t("contattiPage.errorTitle"), description: t("contattiPage.errorRequired"), variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await sendContactEmails({
        name: formData.nome,
        email: formData.email || "non fornita",
        phone: formData.telefono,
        sector: "",
        message: formData.note,
        source: "Pagina Contatti",
        extra: {
          'Città': formData.citta || '—',
        },
      });
      if (result.success) {
        const lang = i18n.language || "it";
        navigate(`/${lang}/grazie`);
      } else {
        toast({ title: t("contattiPage.errorTitle"), description: t("contattiPage.errorSend"), variant: "destructive" });
      }
    } catch {
      toast({ title: t("contattiPage.errorTitle"), description: t("contattiPage.errorGeneric"), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title={t("contattiPage.seoTitle")} description={t("contattiPage.seoDescription")} />
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background pt-24 pb-12 md:pt-32 md:pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                {t("contattiPage.assessmentTitle")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-3">
                {t("contattiPage.assessmentDescription")}
              </p>
              <p className="text-sm text-primary font-medium">
                {t("contattiPage.assessmentSubtext")}
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="bg-card p-6 md:p-8 rounded-xl border border-border shadow-sm space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="nome">{t("contattiPage.fullName")} *</Label>
                  <Input id="nome" placeholder="Mario Rossi" required className="h-12" value={formData.nome} onChange={(e) => setFormData(p => ({ ...p, nome: e.target.value }))} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">{t("contattiPage.phone")} *</Label>
                  <Input id="telefono" type="tel" placeholder="+39 333 1234567" required className="h-12" value={formData.telefono} onChange={(e) => setFormData(p => ({ ...p, telefono: e.target.value }))} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("contattiPage.email")}</Label>
                  <Input id="email" type="email" placeholder="mario@esempio.it" className="h-12" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="citta">{t("contattiPage.city")}</Label>
                  <Input id="citta" placeholder="Roma" className="h-12" value={formData.citta} onChange={(e) => setFormData(p => ({ ...p, citta: e.target.value }))} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">{t("contattiPage.describeProblem")}</Label>
                  <Textarea id="note" placeholder={t("contattiPage.notesPlaceholder")} rows={3} value={formData.note} onChange={(e) => setFormData(p => ({ ...p, note: e.target.value }))} />
                </div>

                <Button type="submit" size="lg" className="w-full text-base py-6" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />{t("contattiPage.submitting")}</> : <>{t("contattiPage.submitButton")}<ArrowRight className="w-5 h-5 ml-2" /></>}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  {t("contattiPage.responseTime")}
                </p>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-6">
                {t("contattiPage.privacyNote")}
              </p>
            </div>
          </div>
        </section>

        {/* Trust section */}
        <section className="py-10 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-muted-foreground mb-4">
                {t("contattiPage.trustText")}<br />
                <strong className="text-foreground">{t("contattiPage.trustTextBold")}</strong>
              </p>
              <Link to="/interventi" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                {t("contattiPage.seeInterventions")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Direct contacts */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                {t("contattiPage.preferTalk")}
              </h3>

              <div className="flex flex-wrap justify-center gap-6">
                <a href="tel:+3908119968436" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>+39 081 199 68 436</span>
                </a>
                <a href="mailto:info@smokezapper.it" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>info@smokezapper.it</span>
                </a>
                <a href="https://wa.me/3908119968436" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="mt-6">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/partners">
                    <Handshake className="w-5 h-5 mr-2" />
                    Diventa Partner ZAPPER®
                  </Link>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                {t("contattiPage.technicalAdvice")}
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
