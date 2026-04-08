import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, Home, Factory, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

type Step = "sector" | "application" | "result";

interface Option {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

const SelfDiscoverySection = () => {
  const [currentStep, setCurrentStep] = useState<Step>("sector");
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [selectedApplication, setSelectedApplication] = useState<string>("");
  const { t } = useTranslation();

  const sectors: Option[] = [
    { id: "professionale", label: t("selfDiscovery.professionale"), icon: ChefHat, description: t("selfDiscovery.professionale_desc") },
    { id: "domestico", label: t("selfDiscovery.domestico"), icon: Home, description: t("selfDiscovery.domestico_desc") },
    { id: "industriale", label: t("selfDiscovery.industriale"), icon: Factory, description: t("selfDiscovery.industriale_desc") },
  ];

  const applicationsBySection: Record<string, Option[]> = {
    professionale: [
      { id: "forno-legna", label: t("selfDiscovery.forno-legna"), description: t("selfDiscovery.forno-legna_desc") },
      { id: "brace-carbone", label: t("selfDiscovery.brace-carbone"), description: t("selfDiscovery.brace-carbone_desc") },
      { id: "cappa-cucina", label: t("selfDiscovery.cappa-cucina"), description: t("selfDiscovery.cappa-cucina_desc") },
      { id: "forno-gas", label: t("selfDiscovery.forno-gas"), description: t("selfDiscovery.forno-gas_desc") },
    ],
    domestico: [
      { id: "camino", label: t("selfDiscovery.camino"), description: t("selfDiscovery.camino_desc") },
      { id: "stufa-pellet", label: t("selfDiscovery.stufa-pellet"), description: t("selfDiscovery.stufa-pellet_desc") },
      { id: "barbecue", label: t("selfDiscovery.barbecue"), description: t("selfDiscovery.barbecue_desc") },
      { id: "forno-giardino", label: t("selfDiscovery.forno-giardino"), description: t("selfDiscovery.forno-giardino_desc") },
    ],
    industriale: [
      { id: "torrefazione", label: t("selfDiscovery.torrefazione"), description: t("selfDiscovery.torrefazione_desc") },
      { id: "affumicatore", label: t("selfDiscovery.affumicatore"), description: t("selfDiscovery.affumicatore_desc") },
      { id: "caldaia-biomassa", label: t("selfDiscovery.caldaia-biomassa"), description: t("selfDiscovery.caldaia-biomassa_desc") },
      { id: "forno-industriale", label: t("selfDiscovery.forno-industriale"), description: t("selfDiscovery.forno-industriale_desc") },
    ],
  };

  interface Recommendation { name: string; href: string; description: string; }

  const recommendations: Record<string, Recommendation[]> = {
    "forno-legna": [
      { name: "ZPZ", href: "/modelli/zpz", description: "Per pizzerie con forno a legna standard" },
      { name: "ZPZ MAX", href: "/modelli/zpz-max", description: "Per forni a legna ad alta portata" },
    ],
    "brace-carbone": [
      { name: "ZBR S", href: "/modelli/zbr-s", description: "Per bracerie e grill standard" },
      { name: "ZBR MAX", href: "/modelli/zbr-max", description: "Per bracerie ad alta portata" },
    ],
    "cappa-cucina": [
      { name: "Destink", href: "/modelli/destink", description: "Per cappe di cucine professionali" },
      { name: "Destink MAX", href: "/modelli/destink-max", description: "Per cappe ad alta portata" },
    ],
    "forno-gas": [
      { name: "ZPZ Nuvola", href: "/modelli/zpz-nuvola", description: "Per forni a gas standard" },
      { name: "ZPZ Nuvola L", href: "/modelli/zpz-nuvola-l", description: "Per forni a gas di grandi dimensioni" },
    ],
    camino: [{ name: "ZCM", href: "/modelli/zcm", description: "Per camini e stufe residenziali" }],
    "stufa-pellet": [{ name: "ZCM", href: "/modelli/zcm", description: "Per stufe a pellet e legna" }],
    barbecue: [{ name: "ZBR S", href: "/modelli/zbr-s", description: "Per barbecue e grill domestici" }],
    "forno-giardino": [{ name: "ZPZ", href: "/modelli/zpz", description: "Per forni da giardino a legna" }],
    torrefazione: [
      { name: "ZTRF", href: "/modelli/ztrf", description: "Per torrefazioni standard" },
      { name: "ZTRF MAX", href: "/modelli/ztrf-max", description: "Per torrefazioni industriali" },
    ],
    affumicatore: [
      { name: "ZAF", href: "/modelli/zaf", description: "Per affumicatori standard" },
      { name: "ZAF MAX", href: "/modelli/zaf-max", description: "Per affumicatori industriali" },
    ],
    "caldaia-biomassa": [
      { name: "ZCL", href: "/modelli/zcl", description: "Per caldaie a biomassa residenziali" },
      { name: "ZCL MAX", href: "/modelli/zcl-max", description: "Per caldaie a biomassa industriali" },
    ],
    "forno-industriale": [
      { name: "ZTGL", href: "/modelli/ztgl", description: "Per forni e taglio laser industriali" },
      { name: "ZTGL MAX", href: "/modelli/ztgl-max", description: "Per forni industriali ad alta portata" },
    ],
  };

  const handleSectorSelect = (sectorId: string) => { setSelectedSector(sectorId); setCurrentStep("application"); };
  const handleApplicationSelect = (appId: string) => { setSelectedApplication(appId); setCurrentStep("result"); };
  const handleBack = () => {
    if (currentStep === "application") { setCurrentStep("sector"); setSelectedApplication(""); }
    else if (currentStep === "result") { setCurrentStep("application"); }
  };

  const getRecommendedModels = (): Recommendation[] => {
    return recommendations[selectedApplication] || [{ name: "ZPZ", href: "/modelli/zpz", description: "Modello versatile per diverse applicazioni" }];
  };

  return (
    <section className="py-12 md:py-24 bg-muted/50">
      <div className="container px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">{t("selfDiscovery.label")}</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 px-2">{t("selfDiscovery.title")}</h2>
            <p className="text-muted-foreground text-sm sm:text-base">{t("selfDiscovery.subtitle")}</p>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-10">
            {["sector", "application", "result"].map((step, index) => (
              <div key={step} className="flex items-center gap-2 sm:gap-4">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-colors ${
                  currentStep === step || (step === "sector" && currentStep !== "sector") || (step === "application" && currentStep === "result")
                    ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>{index + 1}</div>
                {index < 2 && <div className={`w-8 sm:w-12 md:w-20 h-1 rounded ${
                  (step === "sector" && currentStep !== "sector") || (step === "application" && currentStep === "result") ? "bg-primary" : "bg-muted"
                }`} />}
              </div>
            ))}
          </div>

          <div className="bg-card rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-10 border border-border">
            {currentStep === "sector" && (
              <div className="animate-fade-in">
                <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-center mb-6 sm:mb-8">{t("selfDiscovery.step1Title")}</h3>
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-3">
                  {sectors.map((sector) => (
                    <button key={sector.id} onClick={() => handleSectorSelect(sector.id)} className="group p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 border-border bg-background hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left">
                      {sector.icon && <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors"><sector.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" /></div>}
                      <h4 className="font-display font-bold text-base sm:text-lg mb-0.5 sm:mb-1">{sector.label}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{sector.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === "application" && selectedSector && (
              <div className="animate-fade-in">
                <button onClick={handleBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors text-sm sm:text-base">
                  <ArrowLeft className="w-4 h-4" /><span>{t("selfDiscovery.back")}</span>
                </button>
                <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-center mb-6 sm:mb-8">{t("selfDiscovery.step2Title")}</h3>
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  {applicationsBySection[selectedSector]?.map((app) => (
                    <button key={app.id} onClick={() => handleApplicationSelect(app.id)} className="group p-4 sm:p-5 rounded-lg sm:rounded-xl border-2 border-border bg-background hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left">
                      <h4 className="font-display font-bold text-base sm:text-lg mb-0.5 sm:mb-1">{app.label}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{app.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === "result" && (
              <div className="animate-fade-in">
                <button onClick={handleBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors text-sm sm:text-base">
                  <ArrowLeft className="w-4 h-4" /><span>{t("selfDiscovery.back")}</span>
                </button>
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-2">{t("selfDiscovery.resultsTitle")}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">{t("selfDiscovery.resultsSubtitle")}</p>
                </div>
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 mb-6 sm:mb-8">
                  {getRecommendedModels().map((model, index) => (
                    <Link key={model.name} to={model.href} className={`block p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 hover:shadow-md transition-all ${index === 0 ? "border-accent bg-accent/5" : "border-border hover:border-primary/50"}`}>
                      {index === 0 && <span className="text-xs font-bold text-accent uppercase mb-1 sm:mb-2 block">{t("selfDiscovery.recommended")}</span>}
                      <h4 className="font-display text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{model.name}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{model.description}</p>
                    </Link>
                  ))}
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <Button variant="accent" size="lg" className="w-full" asChild>
                    <Link to="/contatti">{t("selfDiscovery.requestAssessment")}<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" /></Link>
                  </Button>
                  <p className="text-center text-xs sm:text-sm text-muted-foreground">{t("selfDiscovery.assessmentSubtext")}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfDiscoverySection;
