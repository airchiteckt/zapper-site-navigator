import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link, useNavigate } from "react-router-dom";
import { Phone, Mail, MessageCircle, ArrowRight, ArrowLeft, ChevronDown, Loader2, CheckCircle, Handshake } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import SEO from "@/components/SEO";
import { sendContactEmails } from "@/lib/emailService";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

type FormStep = "prefiltro" | "form";

const Contatti = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FormStep>("prefiltro");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [prefiltroData, setPrefiltroData] = useState({
    settore: "",
    tipoImpianto: "",
    diametroRange: ""
  });

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    azienda: "",
    citta: "",
    note: "",
  });

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
      <SEO title={t("contattiPage.seoTitle")} description={t("contattiPage.seoDescription")} />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background pt-24 pb-12 md:pt-32 md:pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                {isPreFiltro ? t("contattiPage.verifyTitle") : t("contattiPage.assessmentTitle")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-3">
                {isPreFiltro ? t("contattiPage.verifyDescription") : t("contattiPage.assessmentDescription")}
              </p>
              <p className="text-sm text-primary font-medium">
                {isPreFiltro ? t("contattiPage.verifySubtext") : t("contattiPage.assessmentSubtext")}
              </p>
            </div>
          </div>
        </section>

        {/* Progress Indicator */}
        {!isPreFiltro && (
          <section className="py-6 border-b border-border bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {t("contattiPage.step")} 1 {t("contattiPage.of")} 2
                  </span>
                  <span className="text-sm font-medium text-primary">
                    50% {t("contattiPage.completed")}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-300 rounded-full" style={{ width: '50%' }} />
                </div>
                <div className="flex justify-between mt-3">
                  <div className="text-xs text-primary font-medium">{t("contattiPage.contact")}</div>
                  <div className="text-xs text-muted-foreground">{t("contattiPage.send")}</div>
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
                        {t("contattiPage.sectorLabel")}
                      </Label>
                      <Select value={prefiltroData.settore} onValueChange={(value) => setPrefiltroData(prev => ({ ...prev, settore: value }))}>
                        <SelectTrigger id="pf-settore" className="h-12">
                          <SelectValue placeholder={t("contattiPage.selectSector")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professionale">{t("contattiPage.professional")}</SelectItem>
                          <SelectItem value="residenziale">{t("contattiPage.residential")}</SelectItem>
                          <SelectItem value="industriale">{t("contattiPage.industrial")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pf-tipo" className="text-base font-medium">
                        {t("contattiPage.systemTypeLabel")}
                      </Label>
                      <Select value={prefiltroData.tipoImpianto} onValueChange={(value) => setPrefiltroData(prev => ({ ...prev, tipoImpianto: value }))}>
                        <SelectTrigger id="pf-tipo" className="h-12">
                          <SelectValue placeholder={t("contattiPage.selectSystemType")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="forno-legna">{t("contattiPage.woodOven")}</SelectItem>
                          <SelectItem value="caldaia-biomassa">{t("contattiPage.biomassBoiler")}</SelectItem>
                          <SelectItem value="braci-carbone">{t("contattiPage.charcoalGrill")}</SelectItem>
                          <SelectItem value="camino">{t("contattiPage.fireplace")}</SelectItem>
                          <SelectItem value="stufa">{t("contattiPage.stove")}</SelectItem>
                          <SelectItem value="affumicatore">{t("contattiPage.smokehouse")}</SelectItem>
                          <SelectItem value="altro">{t("contattiPage.other")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pf-diametro" className="text-base font-medium">
                        {t("contattiPage.diameterLabel")}
                      </Label>
                      <Select value={prefiltroData.diametroRange} onValueChange={(value) => setPrefiltroData(prev => ({ ...prev, diametroRange: value }))}>
                        <SelectTrigger id="pf-diametro" className="h-12">
                          <SelectValue placeholder={t("contattiPage.selectRange")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sotto-150">{t("contattiPage.under150")}</SelectItem>
                          <SelectItem value="150-200">{t("contattiPage.range150200")}</SelectItem>
                          <SelectItem value="200-250">{t("contattiPage.range200250")}</SelectItem>
                          <SelectItem value="250-300">{t("contattiPage.range250300")}</SelectItem>
                          <SelectItem value="oltre-300">{t("contattiPage.over300")}</SelectItem>
                          <SelectItem value="non-so">{t("contattiPage.dontKnow")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        {t("contattiPage.diameterHelp")}
                      </p>
                    </div>

                    <Button onClick={handlePrefiltroSubmit} disabled={!canProceedFromPrefiltro} size="lg" className="w-full text-base py-6 mt-4">
                      {t("contattiPage.proceedButton")}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-6">
                  {t("contattiPage.noSiteVisit")}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Full Form */}
        {!isPreFiltro && (
          <section className="py-10 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <button onClick={() => setCurrentStep("prefiltro")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  {t("contattiPage.editSelection")}
                </button>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8">
                  <p className="text-sm text-muted-foreground mb-2">{t("contattiPage.yourSelection")}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium">
                      {prefiltroData.settore === "professionale" ? t("contattiPage.professional") : 
                       prefiltroData.settore === "residenziale" ? t("contattiPage.residential") : t("contattiPage.industrial")}
                    </span>
                    <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium">
                      {prefiltroData.tipoImpianto.replace("-", " ")}
                    </span>
                    <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium">
                      Ø {prefiltroData.diametroRange.replace("-", "–")} mm
                    </span>
                  </div>
                </div>

                <form className="space-y-4" onSubmit={async (e) => {
                  e.preventDefault();
                  if (!formData.email || !formData.telefono) {
                    toast({ title: t("contattiPage.errorTitle"), description: t("contattiPage.errorRequired"), variant: "destructive" });
                    return;
                  }
                  setIsSubmitting(true);
                  try {
                    const result = await sendContactEmails({
                      name: formData.nome,
                      email: formData.email,
                      phone: formData.telefono,
                      sector: prefiltroData.settore,
                      message: formData.note,
                      source: "Pagina Contatti",
                      extra: {
                        'Azienda': formData.azienda || '—',
                        'Città': formData.citta || '—',
                        'Tipo impianto': prefiltroData.tipoImpianto || '—',
                        'Diametro': prefiltroData.diametroRange || '—',
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
                }}>
                  {/* Section 1: Contact data */}
                  <Collapsible open={openSections.contatto} onOpenChange={() => toggleSection("contatto")}>
                    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                      <CollapsibleTrigger className="w-full p-5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className={cn("w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium", openSections.contatto ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>1</span>
                          <span className="font-semibold text-foreground">{t("contattiPage.contactData")}</span>
                        </div>
                        <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform", openSections.contatto && "rotate-180")} />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="px-5 pb-5 pt-2 space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="nome">{t("contattiPage.fullName")}</Label>
                              <Input id="nome" placeholder="Mario Rossi" className="h-11" value={formData.nome} onChange={(e) => setFormData(p => ({ ...p, nome: e.target.value }))} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">{t("contattiPage.email")} *</Label>
                              <Input id="email" type="email" placeholder="mario@esempio.it" required className="h-11" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="telefono">{t("contattiPage.phone")} *</Label>
                              <Input id="telefono" type="tel" placeholder="+39 333 1234567" required className="h-11" value={formData.telefono} onChange={(e) => setFormData(p => ({ ...p, telefono: e.target.value }))} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="azienda">{t("contattiPage.company")}</Label>
                              <Input id="azienda" placeholder="" className="h-11" value={formData.azienda} onChange={(e) => setFormData(p => ({ ...p, azienda: e.target.value }))} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="citta">{t("contattiPage.city")}</Label>
                              <Input id="citta" placeholder="" className="h-11" value={formData.citta} onChange={(e) => setFormData(p => ({ ...p, citta: e.target.value }))} />
                            </div>
                          </div>
                          <Button type="button" onClick={() => goToNextSection("contatto", "note")} className="w-full md:w-auto">
                            {t("contattiPage.continue")}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>

                  {/* Section 2: Notes and submit */}
                  <Collapsible open={openSections.note} onOpenChange={() => toggleSection("note")}>
                    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                      <CollapsibleTrigger className="w-full p-5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className={cn("w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium", openSections.note ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>2</span>
                          <span className="font-semibold text-foreground">{t("contattiPage.notesAndSubmit")}</span>
                        </div>
                        <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform", openSections.note && "rotate-180")} />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="px-5 pb-5 pt-2 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="note">{t("contattiPage.describeProblem")}</Label>
                            <Textarea id="note" placeholder={t("contattiPage.notesPlaceholder")} rows={4} value={formData.note} onChange={(e) => setFormData(p => ({ ...p, note: e.target.value }))} />
                          </div>
                          <div className="pt-4">
                            <Button type="submit" size="lg" className="w-full text-base py-6" disabled={isSubmitting}>
                              {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />{t("contattiPage.submitting")}</> : <>{t("contattiPage.submitButton")}<ArrowRight className="w-5 h-5 ml-2" /></>}
                            </Button>
                            <p className="text-xs text-muted-foreground text-center mt-3">
                              {t("contattiPage.responseTime")}
                            </p>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                </form>

                <p className="text-xs text-muted-foreground text-center mt-6">
                  {t("contattiPage.privacyNote")}
                </p>
              </div>
            </div>
          </section>
        )}

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
                <a href="https://wa.me/393248996189" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
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
