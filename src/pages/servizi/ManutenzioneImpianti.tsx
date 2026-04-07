import ServizioTemplate, { ServizioData } from "./ServizioTemplate";
import heroImg from "@/assets/servizi/manutenzione-impianti.jpg";

const data: ServizioData = {
  slug: "manutenzione-impianti",
  heroImage: heroImg,
  title: "Manutenzione Impianti",
  metaDescription: "Manutenzione preventiva completa per impianti cucine professionali: controlli programmati, prevenzione guasti e ottimizzazione performance.",
  hero: {
    headline: "Impianti trascurati = problemi garantiti.",
    sublines: [
      "Manutenzione preventiva completa",
    ],
    cta: "Richiedi piano manutenzione",
  },
  problemi: [
    "Impianti non controllati",
    "Guasti improvvisi e costosi",
    "Prestazioni in calo",
    "Rischi per la sicurezza",
  ],
  soluzione: {
    punti: [
      "Controlli programmati",
      "Prevenzione guasti",
      "Ottimizzazione performance",
      "Report periodici",
    ],
  },
  benefici: [
    "Impianti sempre efficienti",
    "Zero guasti a sorpresa",
    "Risparmio sui costi di riparazione",
    "Sicurezza garantita",
  ],
  offerta: [
    "Piano manutenzione su misura",
    "Primo controllo gratuito",
  ],
};

export default function ManutenzioneImpianti() {
  return <ServizioTemplate data={data} />;
}
