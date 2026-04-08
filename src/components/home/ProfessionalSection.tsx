import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChefHat, Flame, CookingPot, Croissant } from "lucide-react";
import { useTranslation } from "react-i18next";
import professionalMachine from "@/assets/professional-machine.webp";
import vincenzoCapuano from "@/assets/clients/vincenzo-capuano.webp";
import daMichele from "@/assets/clients/da-michele.webp";
import laBaita from "@/assets/clients/la-baita.webp";
import daAlfonso from "@/assets/clients/da-alfonso.webp";
import pummarolaNcoppa from "@/assets/clients/pummarola-ncoppa.webp";
import rossopomodoro from "@/assets/clients/rossopomodoro.webp";

const ProfessionalSection = () => {
  const { t } = useTranslation();

  const applications = [
    { label: t("professional.pizzerias"), icon: Flame },
    { label: t("professional.bakeries"), icon: Croissant },
    { label: t("professional.grillHouses"), icon: Flame },
    { label: t("professional.professionalKitchens"), icon: CookingPot },
  ];

  const proClients = [
    { name: "Vincenzo Capuano", logo: vincenzoCapuano },
    { name: "Da Michele", logo: daMichele },
    { name: "La Baita Ibiza", logo: laBaita },
    { name: "Da Alfonso", logo: daAlfonso },
    { name: "Pummarola 'Ncoppa", logo: pummarolaNcoppa },
    { name: "Rossopomodoro", logo: rossopomodoro },
  ];

  return (
    <section className="py-16 md:py-28 bg-muted/30 relative overflow-hidden">
      <div className="container px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="flex justify-center">
            <div className="relative w-full max-w-xl">
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl" />
              <img src={professionalMachine} alt="Macchina ZAPPER professionale in acciaio inox per ristorazione" className="relative w-full h-auto rounded-2xl shadow-2xl" loading="lazy" />
              <div className="absolute bottom-4 left-4 right-4 bg-foreground/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <p className="text-white text-xs sm:text-sm font-medium">{t("professional.imageCaption")}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-primary" />
              </div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">{t("professional.label")}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
              {t("professional.title1")}{" "}
              <span className="text-primary">{t("professional.title2")}</span>
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg mb-6 leading-relaxed">{t("professional.description")}</p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {applications.map((item) => (
                <div key={item.label} className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-xl shadow-sm">
                  <item.icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-foreground text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="default" size="lg" asChild>
                <Link to="/settori/professionale">
                  {t("professional.discoverProfessional")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/modelli">{t("professional.seeAllModels")}</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-14">
          <p className="text-center text-muted-foreground text-xs uppercase tracking-wider mb-6">{t("professional.socialProof")}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {proClients.map((client) => (
              <div key={client.name} className="flex items-center justify-center w-24 h-16 sm:w-28 sm:h-20 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSection;
