import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Factory, Shield, Wind, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import industrialMachine from "@/assets/industrial-machine.webp";
import barilla from "@/assets/clients/barilla.webp";
import leonardo from "@/assets/clients/leonardo.webp";
import modelleriaReggiana from "@/assets/clients/modelleria-reggiana.webp";
import anticheCascine from "@/assets/clients/antiche-cascine.webp";

const IndustrialSection = () => {
  const { t } = useTranslation();

  const pollutants = [
    { label: t("industrial.fineDust"), icon: Wind },
    { label: "NOx", icon: Zap },
    { label: "CO₂", icon: Shield },
    { label: "SOx e COV", icon: Shield },
  ];

  return (
    <section className="py-16 md:py-28 bg-zapper-black relative overflow-hidden">
      <div className="container px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-accent/20 rounded-xl flex items-center justify-center">
                <Factory className="w-5 h-5 text-accent" />
              </div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t("industrial.label")}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
              {t("industrial.title1")}{" "}
              <span className="text-accent">{t("industrial.title2")}</span>
            </h2>

            <p className="text-white/75 text-base sm:text-lg mb-6 leading-relaxed">{t("industrial.description")}</p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {pollutants.map((item) => (
                <div key={item.label} className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
                  <item.icon className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-white/90 text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="accent" size="lg" asChild>
                <Link to="/settori/industriale">
                  {t("industrial.discoverIndustrial")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white/20 text-white hover:bg-white/10" asChild>
                <Link to="/contatti">{t("industrial.customProject")}</Link>
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-xl">
              <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl" />
              <img src={industrialMachine} alt="Macchina ZAPPER industriale per abbattimento inquinanti ad alta portata" className="relative w-full h-auto rounded-2xl shadow-2xl" loading="lazy" />
              <div className="absolute bottom-4 left-4 right-4 bg-zapper-black/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <p className="text-white/90 text-xs sm:text-sm font-medium">{t("industrial.imageCaption")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14">
          <p className="text-center text-white/50 text-xs uppercase tracking-wider mb-6">{t("industrial.socialProof")}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
            {[
              { name: "Barilla", logo: barilla },
              { name: "Leonardo", logo: leonardo },
              { name: "Modelleria Reggiana", logo: modelleriaReggiana },
              { name: "Antiche Cascine", logo: anticheCascine },
            ].map((client) => (
              <div key={client.name} className="flex items-center justify-center w-24 h-16 sm:w-32 sm:h-20 opacity-50 hover:opacity-90 transition-opacity duration-300">
                <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrialSection;
