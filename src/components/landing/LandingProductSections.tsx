import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Flame, Droplets, Zap, Factory, Home, UtensilsCrossed,
  ShieldCheck, Gauge, FlameKindling, Settings
} from "lucide-react";
import techImg from "@/assets/landing-partners-technology.jpg";
import sectorsImg from "@/assets/landing-partners-sectors.jpg";
import WetScrubberAnimation from "./WetScrubberAnimation";

const MODELS = [
  { name: "ZPZ", desc: "Pizzerie & Panifici", diameter: "Ø 200–350 mm" },
  { name: "ZPF", desc: "Panifici & Forni", diameter: "Ø 200–300 mm" },
  { name: "ZGR", desc: "Bracerie & Grill", diameter: "Ø 200–300 mm" },
  { name: "ZCL", desc: "Camini & Stufe", diameter: "Ø 150–250 mm" },
  { name: "ZAF", desc: "Affumicatori", diameter: "Ø 150–200 mm" },
  { name: "ZTGL", desc: "Taglio laser", diameter: "Ø 200–400 mm" },
  { name: "ZTRF", desc: "Torrefazioni", diameter: "Ø 200–250 mm" },
  { name: "Destink", desc: "Odori & VOC", diameter: "Ø 150–300 mm" },
];

const TECH_FEATURES_ICONS = [Droplets, Flame, ShieldCheck, Gauge, FlameKindling, Settings];

const SECTOR_ICONS = [UtensilsCrossed, Home, Factory];
const SECTOR_KEYS = ["professional", "residential", "industrial"] as const;

interface Props {
  scrollToForm: () => void;
}

export default function LandingProductSections({ scrollToForm }: Props) {
  const { t } = useTranslation();

  return (
    <>
      {/* TECHNOLOGY */}
      <section className="py-16 md:py-24 border-b border-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                {t("landingPartners.techBadge")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                {t("landingPartners.techTitle")}
              </h2>
              <p className="text-muted-foreground text-base mb-8 leading-relaxed">
                {t("landingPartners.techDesc")}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {TECH_FEATURES_ICONS.map((Icon, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t(`landingPartners.techFeat${i + 1}`)}</p>
                      <p className="text-xs text-muted-foreground">{t(`landingPartners.techFeat${i + 1}Desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={techImg}
                alt="ZAPPER® Technology"
                className="w-full h-full object-cover rounded-2xl"
                loading="lazy"
                width={1280}
                height={720}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-primary-foreground font-bold text-lg">{t("landingPartners.techImgCaption")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CATALOG */}
      <section className="py-16 md:py-24 bg-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              {t("landingPartners.catalogBadge")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t("landingPartners.catalogTitle")}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              {t("landingPartners.catalogDesc")}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MODELS.map((m) => (
              <div
                key={m.name}
                className="bg-foreground border border-primary/10 rounded-xl p-5 hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-primary">{m.name}</h3>
                  <Zap className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm font-medium mb-1">{m.desc}</p>
                <p className="text-xs text-muted-foreground">{m.diameter}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            {t("landingPartners.catalogNote")}
          </p>
        </div>
      </section>

      {/* SECTORS / APPLICATIONS */}
      <section className="py-16 md:py-24 border-b border-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              {t("landingPartners.sectorsBadge")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t("landingPartners.sectorsTitle")}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              {t("landingPartners.sectorsDesc")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {SECTOR_KEYS.map((key, i) => {
              const Icon = SECTOR_ICONS[i];
              return (
                <div key={key} className="bg-card/5 border border-primary/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all group">
                  <div className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{t(`landingPartners.sector${i + 1}Title`)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {t(`landingPartners.sector${i + 1}Desc`)}
                    </p>
                    <div className="space-y-2">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          <span>{t(`landingPartners.sector${i + 1}App${j}`)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full-width sector image */}
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={sectorsImg}
              alt=""
              className="w-full h-64 md:h-80 object-cover"
              loading="lazy"
              width={1280}
              height={720}
            />
            <div className="absolute inset-0 bg-foreground/70 flex items-center justify-center">
              <div className="text-center px-4">
                <p className="text-2xl md:text-3xl font-bold mb-4">{t("landingPartners.sectorsCtaTitle")}</p>
                <Button variant="hero" onClick={scrollToForm}>
                  {t("landingPartners.sectorsCtaBtn")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
