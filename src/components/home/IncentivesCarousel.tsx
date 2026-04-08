import { ArrowRight, BadgePercent, Factory, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";

const IncentivesCarousel = () => {
  const { t } = useTranslation();

  const incentives = [
    {
      id: "industria40", icon: Factory, badge: "2026-2028",
      title: t("incentives.industria40_title"), highlight: "180%",
      subtitle: t("incentives.industria40_subtitle"),
      description: t("incentives.industria40_desc"),
      link: "/agevolazioni/industria-40",
    },
    {
      id: "inail-isi", icon: ShieldCheck, badge: "Bando 2026",
      title: t("incentives.inail_title"), highlight: "65%",
      subtitle: t("incentives.inail_subtitle"),
      description: t("incentives.inail_desc"),
      link: "/agevolazioni/bando-inail-isi",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <BadgePercent className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">{t("incentives.badge")}</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">{t("incentives.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("incentives.description")}</p>
        </div>

        <div className="max-w-4xl mx-auto px-12">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {incentives.map((incentive) => (
                <CarouselItem key={incentive.id} className="md:basis-1/2">
                  <div className="h-full p-1">
                    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full">{incentive.badge}</span>
                        <incentive.icon className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">{incentive.title}</h3>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-4xl md:text-5xl font-bold text-primary">{incentive.highlight}</span>
                      </div>
                      <p className="text-lg font-medium text-foreground mb-4">{incentive.subtitle}</p>
                      <p className="text-muted-foreground flex-grow mb-6">{incentive.description}</p>
                      <Button variant="outline" className="w-full group" asChild>
                        <Link to={incentive.link}>{t("incentives.learnMore")}<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Link>
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground text-sm">
            {t("incentives.needHelp")}{" "}
            <Link to="/contatti" className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 transition-colors">
              {t("incentives.contactUs")}<ArrowRight className="w-3 h-3" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default IncentivesCarousel;
