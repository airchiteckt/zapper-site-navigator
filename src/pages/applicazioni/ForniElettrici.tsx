import { Flame } from "lucide-react";
import ApplicazioneTemplate, { ApplicazioneData } from "./ApplicazioneTemplate";

const data: ApplicazioneData = {
  id: "forni-elettrici",
  title: "Forni Elettrici",
  icon: Flame,
  heroColor: "bg-gradient-to-br from-primary via-primary/95 to-primary/90",
  subtitle: "Trattamento fumi e odori da forni elettrici professionali e industriali.",
  problemiTipici: [
    "Odori persistenti durante le cotture prolungate",
    "Fumi di cottura che si diffondono negli ambienti circostanti",
    "Residui di grasso e particolato nei condotti di aspirazione",
    "Segnalazioni da vicini per odori molesti",
    "Necessità di conformità alle normative sulle emissioni"
  ],
  ambitiCoinvolti: [
    { name: "Pizzerie", href: "/professionale/pizzerie" },
    { name: "Panifici", href: "/professionale/panifici" },
    { name: "Cucine Professionali", href: "/professionale/cucine-professionali" }
  ],
  modelliCompatibili: [
    { name: "ZPZ Nuvola", descrizione: "Per forni elettrici di media portata (Ø 200–250 mm)", href: "/modelli/zpz-nuvola" },
    { name: "ZPZ Nuvola L", descrizione: "Per forni elettrici ad alta portata (Ø 250–300 mm)", href: "/modelli/zpz-nuvola-l" },
    { name: "DESTINK", descrizione: "Abbattimento odori da cucina (Ø 250–300 mm)", href: "/modelli/destink" }
  ],
  miniInterventi: [
    {
      titolo: "Pizzeria con forno elettrico",
      citta: "Milano",
      problema: "Odori di cottura che si diffondevano nel condominio",
      risultato: "Emissioni abbattute, nessuna segnalazione",
      modello: "ZPZ Nuvola"
    },
    {
      titolo: "Panificio industriale",
      citta: "Torino",
      problema: "Fumi da cotture prolungate e residui nei condotti",
      risultato: "Aria pulita e condotti liberi da residui",
      modello: "ZPZ Nuvola L"
    }
  ]
};

export default function ForniElettrici() {
  return <ApplicazioneTemplate data={data} />;
}
