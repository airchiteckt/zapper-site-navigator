import ServizioTemplate, { ServizioData } from "./ServizioTemplate";
import heroImg from "@/assets/servizi/aspirazione-fumi.jpg";

const data: ServizioData = {
  slug: "impianti-aspirazione-fumi",
  heroImage: heroImg,
  title: "Impianti Aspirazione Fumi",
  metaDescription: "Soluzioni professionali per aspirazione e abbattimento fumi in cucina: pulizia canne fumarie, manutenzione aspirazione e installazione abbattitori.",
  hero: {
    headline: "Fumo e odori nella tua cucina? Problemi con clienti e vicini.",
    sublines: [
      "Soluzioni professionali per aspirazione e abbattimento fumi",
    ],
    cta: "Richiedi verifica impianto",
  },
  problemi: [
    "Fumo in sala o all'esterno",
    "Cattivi odori",
    "Segnalazioni e multe",
    "Impianti inefficienti",
  ],
  soluzione: {
    punti: [
      "Pulizia canne fumarie",
      "Manutenzione aspirazione",
      "Ottimizzazione flussi",
      "Installazione abbattitori",
    ],
  },
  benefici: [
    "Zero fumo",
    "Zero odori",
    "Conformità normativa",
    "Ambiente più vivibile",
  ],
  offerta: [
    "Verifica impianto gratuita",
  ],
  bonus: "Integrazione con ZAPPER® per abbattimento totale",
};

export default function ImpiantiAspirazioneFumi() {
  return <ServizioTemplate data={data} />;
}
