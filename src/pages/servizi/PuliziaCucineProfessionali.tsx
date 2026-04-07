import ServizioTemplate, { ServizioData } from "./ServizioTemplate";

const data: ServizioData = {
  slug: "pulizia-cucine-professionali",
  title: "Pulizia Cucine Professionali",
  metaDescription: "Pulizia professionale completa per cucine industriali: vapore ad alta temperatura, rimozione grassi, sanificazione HACCP. Sopralluogo gratuito in Campania.",
  hero: {
    headline: "Cucina sporca e piena di grasso? Rischi multe, cattivi odori e calo delle prestazioni.",
    sublines: [
      "Pulizia professionale completa per cucine industriali",
      "Intervento rapido in Campania",
    ],
    cta: "Richiedi sopralluogo gratuito",
  },
  problemi: [
    "Accumulo di grasso su cappe e superfici",
    "Cattivi odori persistenti",
    "Rischio sanzioni HACCP",
    "Attrezzature meno efficienti",
  ],
  soluzione: {
    intro: "Pulizia profonda professionale con:",
    punti: [
      "Vapore ad alta temperatura",
      "Rimozione completa grassi",
      "Pulizia cappe e aspirazione",
      "Sanificazione ambienti",
    ],
  },
  benefici: [
    "Cucina conforme HACCP",
    "Eliminazione odori",
    "Maggiore durata attrezzature",
    "Ambiente più sicuro",
  ],
  prova: {
    punti: [
      "Foto prima / dopo ogni intervento",
      "Video interventi reali",
    ],
  },
  offerta: [
    "Sopralluogo gratuito",
    "Intervento entro 48h",
  ],
  crossSell: {
    testo: "Hai anche problemi di infestazione?",
    link: "/disinfestazione-cucine",
    linkLabel: "Scopri la disinfestazione",
  },
};

export default function PuliziaCucineProfessionali() {
  return <ServizioTemplate data={data} />;
}
