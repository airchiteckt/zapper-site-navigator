import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import trustpilotRating from "@/assets/trustpilot-rating.webp";
import review1 from "@/assets/trustpilot-review-1.webp";
import review2 from "@/assets/trustpilot-review-2.webp";
import review3 from "@/assets/trustpilot-review-3.webp";
import review4 from "@/assets/trustpilot-review-4.webp";
import review5 from "@/assets/trustpilot-review-5.webp";
import review6 from "@/assets/trustpilot-review-6.webp";

const reviewScreenshots = [review1, review2, review3, review4, review5, review6];

const TrustpilotSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-24 bg-muted/30">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 bg-card px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-sm border border-border mb-4 sm:mb-6">
            <img src={trustpilotRating} alt="Trustpilot 4.8" className="h-5 sm:h-6" />
            <span className="text-muted-foreground text-xs sm:text-sm">{t("trustpilot.satisfiedClients")}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 px-2">{t("trustpilot.title")}</h2>
          <p className="text-muted-foreground text-sm sm:text-base">{t("trustpilot.excellentRating", { percent: 95 })}</p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviewScreenshots.map((src, index) => (
            <div key={index} className="bg-card rounded-lg sm:rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <img src={src} alt={t("trustpilot.reviewAlt", { index: index + 1 })} className="w-full h-auto" loading="lazy" />
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 text-center">
          <a href="#" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base">
            <span>{t("trustpilot.readAll")}</span>
            <span className="font-bold text-foreground">Trustpilot</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrustpilotSection;
