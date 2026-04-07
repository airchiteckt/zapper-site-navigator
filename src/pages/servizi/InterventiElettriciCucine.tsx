import ServizioTemplate, { ServizioData } from "./ServizioTemplate";

const data: ServizioData = {
  slug: "interventi-elettrici-cucine",
  title: "Interventi Elettrici Cucine",
  metaDescription: "Interventi elettrici rapidi per cucine professionali: riparazioni, adeguamenti impianti e soluzioni d'emergenza per continuità operativa.",
  hero: {
    headline: "Problemi elettrici in cucina? Ogni minuto è fatturato perso.",
    sublines: [
      "Interventi rapidi e professionali",
    ],
    cta: "Intervento immediato",
  },
  problemi: [
    "Blackout improvvisi",
    "Impianti non sicuri",
    "Guasti improvvisi",
  ],
  soluzione: {
    punti: [
      "Interventi elettrici mirati",
      "Adeguamenti impianti",
      "Riparazioni rapide",
    ],
  },
  benefici: [
    "Ripartenza immediata",
    "Sicurezza garantita",
    "Continuità operativa",
  ],
  offerta: [
    "Intervento immediato su chiamata",
  ],
};

export default function InterventiElettriciCucine() {
  return <ServizioTemplate data={data} />;
}
