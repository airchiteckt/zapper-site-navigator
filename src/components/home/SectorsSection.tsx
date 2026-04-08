import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, Home, Factory, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import sectorProfessionale from "@/assets/sector-professionale.webp";
import sectorDomestico from "@/assets/sector-domestico.webp";
import sectorIndustriale from "@/assets/sector-industriale.webp";

const SectorsSection = () => {
  const { t } = useTranslation();

  const sectors = [
    {
      id: "professionale",
      title: t("sectors.professional.title"),
      subtitle: t("sectors.professional.subtitle"),
      description: t("sectors.professional.description"),
      icon: ChefHat,
      href: "/settori/professionale",
      features: t("sectors.professional.features", { returnObjects: true }) as string[],
      image: sectorProfessionale,
    },
    {
      id: "domestico",
      title: t("sectors.domestic.title"),
      subtitle: t("sectors.domestic.subtitle"),
      description: t("sectors.domestic.description"),
      icon: Home,
      href: "/settori/domestico",
      features: t("sectors.domestic.features", { returnObjects: true }) as string[],
      image: sectorDomestico,
    },
    {
      id: "industriale",
      title: t("sectors.industrial.title"),
      subtitle: t("sectors.industrial.subtitle"),
      description: t("sectors.industrial.description"),
      icon: Factory,
      href: "/settori/industriale",
      features: t("sectors.industrial.features", { returnObjects: true }) as string[],
      image: sectorIndustriale,
    },
  ];

  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <span className="inline-block text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
            {t("sectors.label")}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 px-2">
            {t("sectors.title")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
            {t("sectors.description")}
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {sectors.map((sector, index) => (
            <div
              key={sector.id}
              className={`group relative bg-card rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-${(index + 1) * 100}`}
            >
              <div
                className="relative p-5 sm:p-6 md:p-8"
                style={{ backgroundImage: `url(${sector.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-foreground/60" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center">
                      <sector.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">{sector.title}</h3>
                  <p className="text-white/70 text-xs sm:text-sm">{sector.subtitle}</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 md:p-8">
                <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">{sector.description}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {sector.features.map((feature) => (
                    <span key={feature} className="px-2.5 py-1 sm:px-3 bg-muted rounded-full text-xs sm:text-sm text-muted-foreground">{feature}</span>
                  ))}
                </div>
                <Button variant="sector-card" className="w-full sm:w-auto" asChild>
                  <Link to={sector.href}>
                    {t("sectors.discoverSolutions")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectorsSection;
