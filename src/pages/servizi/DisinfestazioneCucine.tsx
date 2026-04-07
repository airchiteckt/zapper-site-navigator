import ServizioTemplate, { ServizioData } from "./ServizioTemplate";

const data: ServizioData = {
  slug: "disinfestazione-cucine",
  title: "Disinfestazione Cucine",
  metaDescription: "Disinfestazione professionale HACCP per cucine: interventi rapidi contro insetti e roditori, monitoraggio continuo e piani di prevenzione.",
  hero: {
    headline: "Insetti o infestazioni in cucina? Rischi chiusura immediata.",
    sublines: [
      "Interventi professionali HACCP",
      "Soluzioni rapide e sicure",
    ],
    cta: "Intervento urgente",
  },
  problemi: [
    "Presenza di insetti o roditori",
    "Rischio controlli sanitari",
    "Danni reputazionali",
    "Rischio chiusura",
  ],
  soluzione: {
    punti: [
      "Disinfestazione professionale",
      "Trattamenti certificati",
      "Monitoraggio continuo",
      "Interventi programmati",
    ],
  },
  benefici: [
    "Ambiente sicuro",
    "Rispetto normative",
    "Zero rischi sanitari",
    "Protezione del locale",
  ],
  offerta: [
    "Intervento rapido",
    "Piano prevenzione personalizzato",
  ],
  crossSell: {
    testo: "La pulizia profonda riduce il rischio infestazioni",
    link: "/pulizia-cucine-professionali",
    linkLabel: "Scopri la pulizia professionale",
  },
};

export default function DisinfestazioneCucine() {
  return <ServizioTemplate data={data} />;
}
