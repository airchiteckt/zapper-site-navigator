import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-zapper-team.webp";
import trustpilotRating from "@/assets/trustpilot-rating.webp";

const HeroSection = () => {
  const { t } = useTranslation();

  const benefits = [
    t("hero.benefit1"),
    t("hero.benefit2"),
    t("hero.benefit3"),
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-zapper-black overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative z-10 pt-20 pb-20 sm:pt-24 sm:pb-12 md:pt-32 md:pb-24 px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="text-center lg:text-left max-w-xl mx-auto lg:max-w-none lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 rounded-full mb-4 sm:mb-6 animate-fade-in">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span className="text-white/90 text-xs sm:text-sm font-medium">{t("hero.badge")}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 animate-fade-in-up leading-tight">
              {t("hero.title1")}{" "}
              <span className="text-primary block sm:inline">{t("hero.title2")}</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-100">
              {t("hero.description")}
            </p>

            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 animate-fade-in-up animation-delay-200">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <span className="text-white/90 text-sm sm:text-base">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 sm:gap-4 animate-fade-in-up animation-delay-300">
              <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
                <Link to="/contatti">
                  {t("hero.cta")}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10" asChild>
                <Link to="/interventi">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {t("hero.ctaSecondary")}
                </Link>
              </Button>
            </div>
            <p className="text-xs sm:text-sm text-white/60 mt-3 animate-fade-in-up animation-delay-300">
              {t("hero.ctaSubtext")}
            </p>

            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10 animate-fade-in animation-delay-400">
              <div className="flex items-center gap-4 sm:gap-6 justify-center lg:justify-start">
                <img src={trustpilotRating} alt="Trustpilot 4.8" className="h-6 sm:h-8" />
                <span className="text-white/80 text-sm sm:text-base">
                  <strong className="text-white">2500+</strong> {t("hero.satisfiedClients")}
                </span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-up animation-delay-200 hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl"></div>
              <img src={heroImage} alt="Sistema ZAPPER® per abbattimento fumi" className="relative rounded-2xl shadow-2xl w-full object-contain" />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 sm:p-6 rounded-xl shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-display font-semibold text-zapper-black">Pasquale Elefante</p>
                    <p className="text-sm text-zapper-gray">{t("hero.founder")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
