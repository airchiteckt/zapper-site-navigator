import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wind, Factory, ChefHat, Coffee, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import utaMachine from "@/assets/uta-carbone-attivo.webp";

const UTASection = () => {
  const { t } = useTranslation();

  const applications = [
    { label: t("uta.professionalKitchens"), icon: ChefHat },
    { label: t("uta.coffeeRoasters"), icon: Coffee },
    { label: t("uta.industrialProcesses"), icon: Factory },
    { label: t("uta.laserCutting"), icon: Zap },
  ];

  return (
    <section className="py-16 md:py-28 bg-muted/20 relative overflow-hidden">
      <div className="container px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-accent/20 rounded-xl flex items-center justify-center">
                <Wind className="w-5 h-5 text-accent" />
              </div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t("uta.label")}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
              {t("uta.title1")}{" "}
              <span className="text-accent">{t("uta.title2")}</span>
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg mb-6 leading-relaxed">{t("uta.description")}</p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {applications.map((item) => (
                <div key={item.label} className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-xl shadow-sm">
                  <item.icon className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-foreground text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="accent" size="lg" asChild>
                <Link to="/contatti">
                  {t("uta.requestInfo")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/modelli">{t("uta.seeAllModels")}</Link>
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-xl">
              <div className="absolute -inset-4 bg-accent/5 rounded-3xl blur-2xl" />
              <img src={utaMachine} alt="UTA ZAPPER a carbone attivo per trattamento aria in ambito professionale e industriale" className="relative w-full h-auto rounded-2xl" loading="lazy" />
              <div className="absolute bottom-4 left-4 right-4 bg-foreground/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <p className="text-white text-xs sm:text-sm font-medium">{t("uta.imageCaption")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UTASection;
