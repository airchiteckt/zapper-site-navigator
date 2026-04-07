import ServizioTemplate, { ServizioData } from "./ServizioTemplate";

const data: ServizioData = {
  slug: "manutenzione-cucine-industriali",
  title: "Manutenzione Cucine Industriali",
  metaDescription: "Manutenzione tecnica per cucine industriali: interventi ordinari e straordinari, verifica impianti e ripristino funzionalità. Piani personalizzati.",
  hero: {
    headline: "Un guasto può fermare tutta la cucina.",
    sublines: [
      "Manutenzione tecnica per evitare blocchi operativi",
    ],
    cta: "Richiedi intervento",
  },
  problemi: [
    "Guasti improvvisi",
    "Blocco attività",
    "Perdita fatturato",
    "Attrezzature non sicure",
  ],
  soluzione: {
    punti: [
      "Manutenzione ordinaria",
      "Interventi straordinari",
      "Verifica impianti",
      "Ripristino funzionalità",
    ],
  },
  benefici: [
    "Continuità operativa",
    "Meno emergenze",
    "Sicurezza impianti",
    "Risparmio costi",
  ],
  offerta: [
    "Piano manutenzione personalizzato",
  ],
};

export default function ManutenzioneCucineIndustriali() {
  return <ServizioTemplate data={data} />;
}
