import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import illCattura from "@/assets/howitworks-cattura.png";
import illFiltraggio from "@/assets/howitworks-filtraggio.png";
import illEmissione from "@/assets/howitworks-emissione.png";

const HowItWorksSection = () => {
  const { t } = useTranslation();

  const steps = [
    { image: illCattura, alt: "Canna fumaria collegata al macchinario ZAPPER®", title: t("howItWorks.step1Title"), description: t("howItWorks.step1Desc") },
    { image: illFiltraggio, alt: "Acqua atomizzata che cattura le particelle dei fumi", title: t("howItWorks.step2Title"), description: t("howItWorks.step2Desc") },
    { image: illEmissione, alt: "Aria pulita rilasciata nell'ambiente", title: t("howItWorks.step3Title"), description: t("howItWorks.step3Desc") },
  ];

  const badges = [
    t("howItWorks.benefit1"),
    t("howItWorks.benefit2"),
    t("howItWorks.benefit3"),
    t("howItWorks.benefit4"),
  ];

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <span className="inline-block text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">{t("howItWorks.label")}</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("howItWorks.title1")}{" "}
            <span className="text-primary">{t("howItWorks.title2")}</span>
          </h2>
        </div>

        {/* 3 steps inline */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8 md:mb-12">
          {steps.map((step) => (
            <div key={step.title} className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted mb-4 overflow-hidden">
                <img
                  src={step.image}
                  alt={step.alt}
                  className="w-16 h-16 object-contain"
                  loading="lazy"
                  width={512}
                  height={512}
                />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        {/* 4 badges */}
        <div className="p-4 sm:p-6 bg-zapper-black rounded-xl max-w-4xl mx-auto mb-8 md:mb-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-white text-xs sm:text-sm font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reinforcement CTA */}
        <div className="text-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/scopri">
              {t("hero.cta")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
