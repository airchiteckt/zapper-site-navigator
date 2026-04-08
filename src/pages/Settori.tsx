import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, Home, Factory, ArrowRight, CheckCircle } from "lucide-react";
import settoreProfessionaleHero from "@/assets/settore-professionale-hero.webp";
import settoreDomesticoHero from "@/assets/settore-domestico-hero.webp";
import settoreIndustrialeHero from "@/assets/settore-industriale-hero.webp";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";

const Settori = () => {
  const { t } = useTranslation();

  const sectors = [
    {
      id: "professionale",
      title: t("settoriPage.professionalTitle"),
      description: t("settoriPage.professionalDescription"),
      icon: ChefHat,
      href: "/settori/professionale",
      ambiti: t("settoriPage.professionalAmbiti", { returnObjects: true }) as string[],
      priority: true,
      ctaKey: "professionalCta",
    },
    {
      id: "domestico",
      title: t("settoriPage.domesticTitle"),
      description: t("settoriPage.domesticDescription"),
      icon: Home,
      href: "/settori/domestico",
      ambiti: t("settoriPage.domesticAmbiti", { returnObjects: true }) as string[],
      priority: false,
      ctaKey: "domesticCta",
    },
    {
      id: "industriale",
      title: t("settoriPage.industrialTitle"),
      description: t("settoriPage.industrialDescription"),
      icon: Factory,
      href: "/settori/industriale",
      ambiti: t("settoriPage.industrialAmbiti", { returnObjects: true }) as string[],
      priority: false,
      ctaKey: "industrialCta",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO title={t("settoriPage.seoTitle")} description={t("settoriPage.seoDescription")} />
      <Header />
      
      <main className="pt-20">
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {t("settoriPage.heroTitle")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                {t("settoriPage.heroDescription")}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container">
            <div className="grid gap-6 md:gap-8 max-w-4xl mx-auto">
              {sectors.map((sector, index) => (
                <Link
                  key={sector.id}
                  to={sector.href}
                  className={`group block animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${sector.priority ? 'ring-2 ring-primary/50' : ''}`}>
                    <div
                      className="relative bg-zapper-black p-6 md:p-8 bg-cover bg-center"
                      style={
                        sector.id === 'professionale' ? { backgroundImage: `url(${settoreProfessionaleHero})` } :
                        sector.id === 'domestico' ? { backgroundImage: `url(${settoreDomesticoHero})` } :
                        sector.id === 'industriale' ? { backgroundImage: `url(${settoreIndustrialeHero})` } :
                        undefined
                      }
                    >
                      {(sector.id === 'professionale' || sector.id === 'domestico' || sector.id === 'industriale') && <div className="absolute inset-0 bg-foreground/60" />}
                      <div className="relative z-10 flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                          <sector.icon className="w-7 h-7 text-primary" />
                        </div>
                        {sector.priority && (
                          <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                            {t("settoriPage.mostRequested")}
                          </span>
                        )}
                      </div>
                      <h2 className="relative z-10 font-display text-2xl md:text-3xl font-bold text-white">
                        {sector.title}
                      </h2>
                    </div>

                    <div className="p-6 md:p-8">
                      <p className="text-muted-foreground mb-6 text-lg">
                        {sector.description}
                      </p>

                      <div className="mb-6">
                        <p className="text-sm font-medium text-foreground mb-3">{t("settoriPage.exampleAreas")}</p>
                        <div className="flex flex-wrap gap-2">
                          {sector.ambiti.map((ambito) => (
                            <span
                              key={ambito}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-sm text-muted-foreground"
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-accent" />
                              {ambito}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-primary font-medium group-hover:text-accent transition-colors">
                          {t(`settoriPage.${sector.ctaKey}`)}
                        </span>
                        <ArrowRight className="w-5 h-5 text-primary group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 border-t border-border">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
              <p className="text-muted-foreground">
                {t("settoriPage.trustText")}
              </p>
              <Link 
                to="/interventi" 
                className="text-accent hover:text-accent/80 font-medium inline-flex items-center gap-1 transition-colors"
              >
                {t("settoriPage.seeInterventions")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-zapper-black">
          <div className="container text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              {t("settoriPage.unsureTitle")}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              {t("settoriPage.unsureDescription")}
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link to="/contatti">
                {t("settoriPage.requestAssessment")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Settori;
