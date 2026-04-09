import ServizioTemplate, { ServizioData } from "./ServizioTemplate";
import heroImg from "@/assets/servizi/pulizia-cucine.jpg";
import imgCappa from "@/assets/servizi/pulizia-vapore-cappa.jpg";
import imgPianoCottura from "@/assets/servizi/pulizia-piano-cottura.jpg";
import imgAcciaio from "@/assets/servizi/pulizia-acciaio-inox.jpg";
import imgGriglie from "@/assets/servizi/pulizia-griglie-pavimento.jpg";

const data: ServizioData = {
  slug: "pulizia-cucine-professionali",
  heroImage: heroImg,
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
    "Accumulo di grasso su cappe, filtri e condotti di aspirazione",
    "Cattivi odori persistenti che compromettono l'ambiente di lavoro",
    "Rischio sanzioni HACCP e multe durante i controlli ASL",
    "Attrezzature meno efficienti con consumi energetici più alti",
    "Residui carbonizzati incrostati su piani cottura e forni",
    "Pericolo di incendio causato da depositi di grasso nei condotti",
  ],
  soluzione: {
    intro: "Intervento di pulizia profonda professionale senza sostanze chimiche aggressive:",
    punti: [
      "Vapore secco ad alta temperatura (fino a 160°C)",
      "Sgrassatura completa di cappe, condotti e filtri",
      "Pulizia forni, piani cottura e griglie a pavimento",
      "Sanificazione superfici in acciaio inox",
      "Trattamento conforme agli standard HACCP",
      "Nessun residuo chimico tossico sulle superfici",
    ],
  },
  approfondimenti: [
    {
      title: "Perché evitare la soda caustica per sgrassare",
      paragraphs: [
        "Molti ristoratori utilizzano la soda caustica per rimuovere i grassi più ostinati da cappe, filtri e forni, pensando sia la soluzione più economica. In realtà, questa sostanza altamente corrosiva può danneggiare le superfici metalliche, in particolare alluminio e leghe leggere, riducendo la vita utile delle attrezzature.",
        "Oltre ai danni ai materiali, la soda caustica rappresenta un rischio concreto per la salute degli operatori: l'inalazione dei vapori può causare irritazioni alle vie respiratorie e il contatto con la pelle provoca ustioni chimiche. Il suo smaltimento improprio contamina le acque reflue.",
      ],
      bullets: [
        "Corrode alluminio, zinco e leghe metalliche",
        "Rischio ustioni cutanee e irritazioni respiratorie",
        "Impatto ambientale negativo se smaltita in modo scorretto",
      ],
      image: imgCappa,
      imageAlt: "Pulizia professionale cappa cucina con vapore",
      imagePosition: "right",
    },
    {
      title: "Sporco incrostato sui piani cottura: come eliminarlo davvero",
      paragraphs: [
        "I metodi di pulizia tradizionali — spugne abrasive, detergenti chimici, olio di gomito — spesso non bastano per rimuovere i residui carbonizzati che si formano giorno dopo giorno sui piani cottura professionali.",
        "Il vapore ad alta temperatura agisce in profondità sciogliendo il grasso bruciato senza aggredire le superfici. Il risultato è un piano cottura perfettamente pulito, senza graffi né residui chimici, pronto per il turno successivo.",
      ],
      image: imgPianoCottura,
      imageAlt: "Prima e dopo pulizia piano cottura professionale",
      imagePosition: "left",
    },
    {
      title: "Zone critiche: griglie a pavimento e scarichi",
      paragraphs: [
        "Le griglie di scolo e i punti di raccolta dello sporco a pavimento sono tra le aree più trascurate nelle cucine professionali, eppure rappresentano un focolaio di batteri e cattivi odori. Lo sporco che si accumula in questi punti è spesso difficile da raggiungere con i metodi convenzionali.",
        "Con il vapore secco è possibile penetrare anche negli angoli più inaccessibili, sciogliendo il grasso depositato e sanificando in un unico passaggio, senza la necessità di smontare le strutture.",
      ],
      image: imgGriglie,
      imageAlt: "Pulizia griglie a pavimento cucina industriale",
      imagePosition: "right",
    },
    {
      title: "Superfici in acciaio inox: igiene senza rischi",
      paragraphs: [
        "L'acciaio inossidabile è il materiale più diffuso nelle cucine professionali, ma richiede attenzioni specifiche. Detersivi in polvere, prodotti a base di cloro e spugne abrasive possono graffiarlo e opacizzarlo in modo irreversibile, compromettendo sia l'estetica che le proprietà igieniche della superficie.",
        "La pulizia a vapore è il metodo più sicuro: rimuove grasso e batteri senza lasciare residui chimici, non graffia le superfici e restituisce la brillantezza originale dell'acciaio. In più, è un intervento rapido che riduce drasticamente i tempi di fermo cucina.",
      ],
      bullets: [
        "Nessun rischio di graffi o opacizzazione",
        "Zero residui chimici a contatto con gli alimenti",
        "Sanificazione e lucidatura in un unico passaggio",
        "Riduzione dei tempi di pulizia fino al 50%",
      ],
      image: imgAcciaio,
      imageAlt: "Sanificazione superfici acciaio inox cucina",
      imagePosition: "left",
    },
  ],
  benefici: [
    "Cucina pienamente conforme agli standard HACCP",
    "Eliminazione definitiva di odori sgradevoli",
    "Maggiore durata e efficienza delle attrezzature",
    "Ambiente di lavoro più sicuro e salubre",
    "Riduzione del rischio incendio nei condotti",
    "Risparmio su detergenti e prodotti chimici",
  ],
  offerta: [
    "Sopralluogo gratuito e preventivo personalizzato",
    "Intervento programmabile entro 48h",
    "Report fotografico pre/post intervento",
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
