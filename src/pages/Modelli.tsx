import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Home, Factory, Pizza, Croissant, Beef, Drumstick, ChefHat, Heater, TreeDeciduous, Coffee, Beef as Smoke, Zap } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";

interface ModelloCard {
  id: string;
  name: string;
  diameter: string;
  description: string;
  label?: string;
}

interface SubCategory {
  icon: React.ReactNode;
  titleKey: string;
  models: ModelloCard[];
  applicationLink?: { text: string; href: string };
  interventionLink?: { text: string; href: string };
}

interface SectorSection {
  id: string;
  titleKey: string;
  icon: React.ReactNode;
  color: string;
  subcategories: SubCategory[];
}

const ModelCard = ({ model }: { model: ModelloCard }) => (
  <Link
    to={`/modelli/${model.id}`}
    className="group block bg-card border border-border rounded-xl p-4 hover:border-accent hover:shadow-lg transition-all duration-300"
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-display font-bold text-foreground group-hover:text-accent transition-colors">
            {model.name}
          </h4>
          {model.label && (
            <span className="text-xs font-medium bg-accent/15 text-accent px-2 py-0.5 rounded-full">
              {model.label}
            </span>
          )}
        </div>
        <p className="text-sm text-accent font-medium mt-1">{model.diameter}</p>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{model.description}</p>
      </div>
      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
    </div>
  </Link>
);

const getSectors = (t: (key: string) => string): SectorSection[] => [
  {
    id: "professionale",
    titleKey: "modelliPage.professionalSector",
    icon: <Flame className="w-6 h-6" />,
    color: "bg-accent",
    subcategories: [
      {
        icon: <Pizza className="w-5 h-5" />,
        titleKey: "modelliPage.pizzerieWood",
        applicationLink: { text: t("modelliPage.pizzerieWood"), href: "/applicazioni/forni-a-legna" },
        models: [
          { id: "zpz", name: "ZPZ", diameter: "Ø 200–250 mm", description: "Per forni a legna di media portata in ambito professionale." },
          { id: "zpz-max", name: "ZPZ MAX", diameter: "Ø 300–350 mm", description: "Per forni a legna ad alta portata e utilizzo intensivo.", label: "Alta portata" },
        ],
      },
      {
        icon: <Pizza className="w-5 h-5" />,
        titleKey: "modelliPage.pizzerieGas",
        applicationLink: { text: t("modelliPage.pizzerieGas"), href: "/applicazioni/forni-a-legna" },
        models: [
          { id: "zpz-nuvola-l", name: "ZPZ NUVOLA L", diameter: "Ø 200–250 mm", description: "Soluzione dedicata per forni a gas professionali." },
        ],
      },
      {
        icon: <Pizza className="w-5 h-5" />,
        titleKey: "modelliPage.pizzerieElectric",
        applicationLink: { text: t("modelliPage.pizzerieElectric"), href: "/applicazioni/forni-a-legna" },
        models: [
          { id: "zpz-nuvola", name: "ZPZ NUVOLA", diameter: "Ø 80–120 mm", description: "Per forni elettrici compatti.", label: "Compatto" },
          { id: "zpz-nuvola-l-elettrico", name: "ZPZ NUVOLA L", diameter: "Ø 200–250 mm", description: "Per forni elettrici professionali." },
        ],
      },
      {
        icon: <Croissant className="w-5 h-5" />,
        titleKey: "modelliPage.bakeries",
        applicationLink: { text: t("modelliPage.bakeries"), href: "/applicazioni/forni-a-legna" },
        models: [
          { id: "zpf", name: "ZPF", diameter: "Ø 200–250 mm", description: "Per forni da panificazione di media capacità." },
          { id: "zpf-max", name: "ZPF MAX", diameter: "Ø 300–350 mm", description: "Per panifici con elevata produzione.", label: "Alta produzione" },
        ],
      },
      {
        icon: <Beef className="w-5 h-5" />,
        titleKey: "modelliPage.grillHouses",
        applicationLink: { text: t("modelliPage.grillHouses"), href: "/applicazioni/braci-carbone" },
        models: [
          { id: "zbr-s", name: "ZBR S", diameter: "Ø 200–250 mm", description: "Per impianti a braci e carbone di media portata." },
          { id: "zbr-max", name: "ZBR MAX", diameter: "Ø 300–350 mm", description: "Per bracerie ad alta intensità.", label: "Alta intensità" },
        ],
      },
      {
        icon: <Drumstick className="w-5 h-5" />,
        titleKey: "modelliPage.rotisseries",
        applicationLink: { text: t("modelliPage.rotisseries"), href: "/applicazioni/braci-carbone" },
        models: [
          { id: "zgr", name: "ZGR", diameter: "Ø 200–250 mm", description: "Per girarrosti professionali standard." },
          { id: "zgr-max", name: "ZGR MAX", diameter: "Ø 300–350 mm", description: "Per impianti di grandi dimensioni.", label: "Grandi dimensioni" },
        ],
      },
      {
        icon: <ChefHat className="w-5 h-5" />,
        titleKey: "modelliPage.professionalKitchens",
        applicationLink: { text: t("modelliPage.professionalKitchens"), href: "/applicazioni/cappe" },
        models: [
          { id: "destink", name: "DESTINK", diameter: "Ø 250–300 mm", description: "Trattamento fumi, odori e grassi da cucina." },
          { id: "destink-max", name: "DESTINK MAX", diameter: "Ø 300–350 mm", description: "Per cucine ad alto volume.", label: "Alto volume" },
          { id: "destink-ultra", name: "DESTINK ULTRA", diameter: "Ø 250–300 mm", description: "Doppia filtrazione per odori persistenti.", label: "Doppia filtrazione" },
          { id: "destink-ultra-max", name: "DESTINK ULTRA MAX", diameter: "Ø 300–350 mm", description: "Doppia filtrazione per grandi cucine.", label: "Doppia filtrazione" },
        ],
      },
    ],
  },
  {
    id: "residenziale",
    titleKey: "modelliPage.residentialSector",
    icon: <Home className="w-6 h-6" />,
    color: "bg-primary",
    subcategories: [
      {
        icon: <Heater className="w-5 h-5" />,
        titleKey: "modelliPage.boilers",
        applicationLink: { text: t("modelliPage.boilers"), href: "/applicazioni/caldaie-biomassa" },
        models: [
          { id: "zcl", name: "ZCL", diameter: "Ø 200–250 mm", description: "Per caldaie domestiche standard." },
          { id: "zcl-max-res", name: "ZCL MAX", diameter: "Ø 250–300 mm", description: "Per caldaie domestiche ad alta portata.", label: "Alta portata" },
        ],
      },
      {
        icon: <TreeDeciduous className="w-5 h-5" />,
        titleKey: "modelliPage.stovesFireplaces",
        applicationLink: { text: t("modelliPage.stovesFireplaces"), href: "/applicazioni/camini" },
        models: [
          { id: "zcm", name: "ZCM", diameter: "Ø 200–250 mm", description: "Per stufe a legna e camini residenziali." },
        ],
      },
    ],
  },
  {
    id: "industriale",
    titleKey: "modelliPage.industrialSector",
    icon: <Factory className="w-6 h-6" />,
    color: "bg-zapper-gray",
    subcategories: [
      {
        icon: <Heater className="w-5 h-5" />,
        titleKey: "modelliPage.industrialBoilers",
        applicationLink: { text: t("modelliPage.industrialBoilers"), href: "/applicazioni/caldaie-biomassa" },
        models: [
          { id: "zcl-ind", name: "ZCL", diameter: "Ø 250–300 mm", description: "Per caldaie industriali standard." },
          { id: "zcl-max-ind", name: "ZCL MAX", diameter: "Ø 300–350 mm", description: "Per caldaie industriali ad alta portata.", label: "Alta portata" },
          { id: "z-max", name: "Z-MAX", diameter: "Ø 400–500 mm", description: "Per impianti industriali ad altissima portata.", label: "Altissima portata" },
        ],
      },
      {
        icon: <Coffee className="w-5 h-5" />,
        titleKey: "modelliPage.coffeeRoasters",
        models: [
          { id: "ztrf", name: "ZTRF", diameter: "Ø 200–250 mm", description: "Per torrefazioni standard." },
          { id: "ztrf-max", name: "ZTRF MAX", diameter: "Ø 300–350 mm", description: "Per torrefazioni ad alta capacità.", label: "Alta capacità" },
          { id: "ztrf-max-desk", name: "ZTRF MAX DESK", diameter: "Ø 200–250 mm", description: "Configurazione compatta per spazi ridotti.", label: "Compatto" },
        ],
      },
      {
        icon: <Smoke className="w-5 h-5" />,
        titleKey: "modelliPage.smokehouses",
        models: [
          { id: "zaf", name: "ZAF", diameter: "Ø 250–300 mm", description: "Per affumicatori standard." },
          { id: "zaf-max", name: "ZAF MAX", diameter: "Ø 300–350 mm", description: "Per affumicatori industriali.", label: "Industriale" },
        ],
      },
      {
        icon: <Zap className="w-5 h-5" />,
        titleKey: "modelliPage.laserCutting",
        models: [
          { id: "ztgl", name: "ZTGL", diameter: "Ø 200–250 mm", description: "Per macchine taglio laser standard." },
          { id: "ztgl-max", name: "ZTGL MAX", diameter: "Ø 300–350 mm", description: "Per macchine laser ad alta potenza.", label: "Alta potenza" },
          { id: "ztgl-max-ultra", name: "ZTGL MAX ULTRA", diameter: "Ø 400–450 mm", description: "Per applicazioni industriali ad alta complessità.", label: "Massima complessità" },
        ],
      },
    ],
  },
];

const Modelli = () => {
  const { t } = useTranslation();
  const sectors = getSectors(t);

  return (
    <div className="min-h-screen bg-background">
      <SEO title={t("modelliPage.seoTitle")} description={t("modelliPage.seoDescription")} />
      <Header />
      
      <main className="pt-20">
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {t("modelliPage.heroTitle")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                {t("modelliPage.heroDescription")}
              </p>
            </div>
          </div>
        </section>

        {sectors.map((sector, sectorIndex) => (
          <section 
            key={sector.id} 
            className={`py-12 md:py-16 ${sectorIndex % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}
          >
            <div className="container">
              <div className="flex items-center gap-4 mb-10">
                <div className={`w-12 h-12 ${sector.color} rounded-xl flex items-center justify-center text-white`}>
                  {sector.icon}
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {t(sector.titleKey)}
                </h2>
              </div>

              <div className="space-y-10">
                {sector.subcategories.map((subcat, subIndex) => (
                  <div key={subIndex}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-accent">{subcat.icon}</span>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {t(subcat.titleKey)}
                      </h3>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {subcat.models.map((model) => (
                        <ModelCard key={model.id} model={model} />
                      ))}
                    </div>
                    {(subcat.applicationLink || subcat.interventionLink) && (
                      <div className="flex flex-wrap gap-4 mt-4 text-sm">
                        {subcat.applicationLink && (
                          <Link 
                            to={subcat.applicationLink.href}
                            className="text-primary hover:text-accent transition-colors flex items-center gap-1"
                          >
                            → {subcat.applicationLink.text}
                          </Link>
                        )}
                        {subcat.interventionLink && (
                          <Link 
                            to={subcat.interventionLink.href}
                            className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
                          >
                            → {subcat.interventionLink.text}
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="py-16 md:py-24 bg-zapper-black">
          <div className="container text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              {t("modelliPage.unsureTitle")}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              {t("modelliPage.unsureDescription")}
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link to="/contatti">
                {t("modelliPage.requestSurvey")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-6 bg-muted/50 border-t border-border">
          <div className="container">
            <p className="text-sm text-muted-foreground text-center">
              {t("modelliPage.disclaimer")}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Modelli;
