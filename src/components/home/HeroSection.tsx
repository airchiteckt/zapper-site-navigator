import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-zapper-team.webp";
import trustpilotLogo from "@/assets/trustpilot-logo.png";

const HERO_TAGS = [
  { label: "Forni a legna", href: "/applicazioni/forni-a-legna" },
  { label: "Braci a carbone", href: "/applicazioni/braci-carbone" },
  { label: "Caldaie biomassa", href: "/applicazioni/caldaie-biomassa" },
  { label: "Camini e stufe", href: "/applicazioni/camini" },
  { label: "Cappe cucina", href: "/applicazioni/cappe" },
  { label: "Forni elettrici", href: "/applicazioni/forni-elettrici" },
  { label: "Forni a gas", href: "/applicazioni/forni-a-legna" },
  { label: "Forni industriali", href: "/applicazioni/forni-industriali" },
  { label: "Altri impianti", href: "/applicazioni" },
];

const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const handleTagClick = (tag: typeof HERO_TAGS[0]) => {
    if (selectedTag === tag.label) {
      // Second click → navigate
      navigate(tag.href);
    } else {
      // First click → select & highlight CTA
      setSelectedTag(tag.label);
    }
  };

  // Pulse the CTA when a tag is selected
  useEffect(() => {
    if (selectedTag && ctaRef.current) {
      ctaRef.current.classList.add("animate-pulse");
      const timer = setTimeout(() => {
        ctaRef.current?.classList.remove("animate-pulse");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [selectedTag]);

  return (
    <section className="relative min-h-screen flex items-center bg-zapper-black overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative z-10 pt-12 pb-24 sm:pt-20 sm:pb-12 md:pt-32 md:pb-24 px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="text-center lg:text-left max-w-xl mx-auto lg:max-w-none lg:mx-0">
            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 animate-fade-in-up leading-[1.1]">
              {t("hero.title1")}{" "}
              <span className="text-primary">{t("hero.title2")}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl md:text-2xl text-white font-semibold mb-4 sm:mb-5 animate-fade-in-up animation-delay-100">
              {t("hero.subtitle")}
            </p>

            {/* Focus Box: Context + Tags + Social Proof + CTA */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6 animate-fade-in-up animation-delay-100">
              {/* Context */}
              <p className="text-base sm:text-lg text-white/70 mb-4 max-w-lg mx-auto lg:mx-0">
                <span className="font-bold text-primary">Abbattitori di fuliggine e odori</span> per:
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                {HERO_TAGS.map((tag) => (
                  <button
                    key={tag.label}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1 rounded-full border text-xs sm:text-sm transition-all cursor-pointer ${
                      selectedTag === tag.label
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-white/20 text-white/70 hover:border-white/40 hover:text-white/90"
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>

              {/* Social Proof */}
              <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start mb-3">
                <div className="flex text-yellow-400 text-lg">★★★★★</div>
                <span className="text-white/80 text-sm sm:text-base font-medium">{t("hero.socialProof")}</span>
                <img src={trustpilotLogo} alt="Trustpilot" className="h-4 sm:h-5 brightness-0 invert opacity-70" />
              </div>

              {/* Sopralluogo gratuito */}
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-5 pb-5 border-b border-white/10">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span className="text-white/90 text-sm sm:text-base font-semibold">Sopralluogo gratuito in tutta Italia</span>
              </div>

              {/* CTA Primary */}
              <div ref={ctaRef} className="flex flex-col items-center lg:items-start gap-3">
                <Button
                  variant="hero"
                  size="lg"
                  className={`w-full sm:w-auto transition-all ${selectedTag ? "ring-2 ring-primary ring-offset-2 ring-offset-zapper-black scale-105" : ""}`}
                  asChild
                >
                  <Link to="/scopri">
                    {t("hero.cta")}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Link>
                </Button>

                {/* Reassurance */}
                <p className="text-xs sm:text-sm text-white/50">
                  {t("hero.ctaSubtext")}
                </p>

                {/* CTA Secondary - text link */}
                <Link
                  to="/interventi"
                  className="inline-flex items-center gap-2 text-sm sm:text-base text-white/70 hover:text-primary transition-colors mt-1"
                >
                  <Play className="w-4 h-4 fill-current" />
                  {t("hero.ctaSecondary")}
                </Link>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-up animation-delay-200 hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl"></div>
              <img src={heroImage} alt="Sistema ZAPPER® per abbattimento fumi" className="relative rounded-2xl shadow-2xl w-full object-contain" loading="lazy" decoding="async" />
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
