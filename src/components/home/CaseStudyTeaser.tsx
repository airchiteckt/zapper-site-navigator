import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import caseStudyPrima from "@/assets/case-study-prima.webp";
import caseStudyDopo from "@/assets/case-study-dopo.webp";

const CaseStudyTeaser = () => {
  const { t } = useTranslation();

  const caseStudy = {
    name: "Ristorante Pizzeria La Pace",
    location: "Biella",
    sector: "Professionale",
    application: "Lavafumi",
    model: "ZAPPER",
    quote: "Abbiamo un ristorante pizzeria a Biella, da oltre 45 anni, e un anno fa per necessità ho dovuto installare una Lavafumi per eliminare un problema di fuliggine che colpiva il condominio. Elefante Pasquale si è dimostrato esperto ed efficiente portando soluzioni direttamente sul posto. A distanza di tempo SONO PIENAMENTE SODDISFATTO dell'investimento fatto, sull'efficienza del macchinario, e sulla poca ma accurata manutenzione che devo fare.",
    author: "Giuseppe Apicella",
    role: "Titolare",
  };

  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">{t("caseStudy.label")}</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">{caseStudy.name}</h2>
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
              <span className="px-2.5 py-1 sm:px-3 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium">{caseStudy.sector}</span>
              <span className="px-2.5 py-1 sm:px-3 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">{caseStudy.application}</span>
              <span className="px-2.5 py-1 sm:px-3 bg-accent/10 text-accent rounded-full text-xs sm:text-sm font-medium">{caseStudy.model}</span>
            </div>
            <div className="relative bg-muted/50 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
              <Quote className="absolute top-3 left-3 sm:top-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 text-accent/30" />
              <p className="text-base sm:text-lg text-foreground italic pl-6 sm:pl-8">"{caseStudy.quote}"</p>
              <div className="mt-3 sm:mt-4 pl-6 sm:pl-8">
                <p className="font-semibold text-foreground text-sm sm:text-base">{caseStudy.author}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{caseStudy.role}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full sm:w-auto" asChild>
              <Link to="/interventi">{t("caseStudy.seeAll")}<ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>

          <div className="bg-zapper-black rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">{t("caseStudy.results")}</h3>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
                <span className="text-white/70 text-sm sm:text-base">{t("caseStudy.yearsActivity")}</span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-primary">45+</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
                <span className="text-white/70 text-sm sm:text-base">{t("caseStudy.sootProblem")}</span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-primary">{t("caseStudy.resolved")}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
                <span className="text-white/70 text-sm sm:text-base">{t("caseStudy.maintenance")}</span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-primary">{t("caseStudy.minimal")}</span>
              </div>
            </div>
            <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="aspect-video rounded-lg overflow-hidden relative">
                <img src={caseStudyPrima} alt={t("caseStudy.before")} className="w-full h-full object-cover" loading="lazy" width={640} height={512} />
                <span className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm text-xs font-medium text-foreground px-2 py-1 rounded">{t("caseStudy.before")}</span>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden relative">
                <img src={caseStudyDopo} alt={t("caseStudy.after")} className="w-full h-full object-cover" loading="lazy" width={640} height={512} />
                <span className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm text-xs font-medium text-foreground px-2 py-1 rounded">{t("caseStudy.after")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyTeaser;
