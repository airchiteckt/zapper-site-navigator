import ServizioTemplate, { ServizioData } from "./ServizioTemplate";
import heroImg from "@/assets/servizi/manutenzione/cater-clean-services.jpg";
import ductCleaningImg from "@/assets/servizi/manutenzione/duct-cleaning.jpg";
import kitchenExtractImg from "@/assets/servizi/manutenzione/kitchen-extract-cleaning.jpg";
import ventilationImg from "@/assets/servizi/manutenzione/kitchen-ventilation-cleaning.jpg";
import productionImg from "@/assets/servizi/manutenzione/production-extraction.jpg";
import standardsImg from "@/assets/servizi/manutenzione/cleaning-standards.jpg";
import filtersImg from "@/assets/servizi/manutenzione/replacement-filters.jpg";

const data: ServizioData = {
  slug: "manutenzione-cucine-industriali",
  heroImage: heroImg,
  title: "Manutenzione Cucine Professionali e Industriali",
  metaDescription: "Manutenzione tecnica specializzata per cucine professionali e industriali: pulizia condotti, sistemi di estrazione, filtri, riduzione rischio incendio. Preventivo gratuito.",
  hero: {
    headline: "La tua cucina è al sicuro? Il grasso nei condotti è un rischio silenzioso.",
    sublines: [
      "Pulizia professionale di condotti, cappe e sistemi di estrazione",
      "Riduzione del rischio incendio e conformità normativa garantita",
    ],
    cta: "Richiedi preventivo gratuito",
  },
  problemi: [
    "Accumulo di grasso nei condotti di estrazione che aumenta il rischio di incendi",
    "Ventilazione compromessa con scarsa qualità dell'aria in cucina",
    "Non conformità alle normative igienico-sanitarie e antincendio",
    "Consumo energetico elevato per impianti ostruiti e inefficienti",
    "Odori sgradevoli che si diffondono nei locali e nel vicinato",
    "Rischio infestazioni: il grasso accumulato attrae insetti e parassiti",
  ],
  soluzione: {
    intro: "Un servizio completo di pulizia e manutenzione per tutti i componenti del sistema di estrazione della tua cucina professionale.",
    punti: [
      "Pulizia approfondita dei condotti di estrazione (ductwork)",
      "Sgrassatura completa di cappe, filtri e ventilatori",
      "Pulizia del sistema di ventilazione e ricambio aria",
      "Sostituzione filtri a deflettore danneggiati o usurati",
      "Report dettagliato e certificazione post-intervento",
      "Programmazione manutenzioni periodiche personalizzate",
    ],
  },
  approfondimenti: [
    {
      title: "Pulizia dei condotti di estrazione",
      paragraphs: [
        "I condotti di estrazione delle cucine professionali svolgono un ruolo fondamentale nel sistema di ventilazione. Durante il funzionamento, i ventilatori aspirano aria insieme a grasso, fumo e altri contaminanti generati dalla cottura. Con il tempo, queste sostanze si accumulano nei condotti, formando uno strato spesso di grasso altamente infiammabile.",
        "Il nostro servizio di pulizia professionale dei condotti rimuove completamente tutti i depositi, ripristinando il flusso d'aria ottimale e riducendo drasticamente il rischio di incendio.",
      ],
      image: ductCleaningImg,
      imageAlt: "Pulizia professionale dei condotti di estrazione cucina",
      imagePosition: "right",
    },
    {
      title: "Pulizia del sistema di estrazione cucina",
      paragraphs: [
        "Il cuore del problema è il sistema di estrazione della cucina: il nascondiglio perfetto per grasso, olio e altri depositi. Un sistema di estrazione sporco non solo rappresenta un pericolo di incendio, ma riduce l'efficienza dell'intero impianto di ventilazione.",
        "Interveniamo su tutti i componenti del sistema di estrazione — cappe, plenum, ventilatori e giunzioni — garantendo una pulizia completa e certificata.",
      ],
      image: kitchenExtractImg,
      imageAlt: "Pulizia sistema di estrazione cucina professionale",
      imagePosition: "left",
    },
    {
      title: "Pulizia della ventilazione cucina",
      paragraphs: [
        "Un sistema di ventilazione pulito e ben mantenuto contribuisce direttamente all'efficienza delle operazioni in cucina. Quando grasso e contaminanti si accumulano, ostruiscono il flusso d'aria e compromettono l'efficacia della ventilazione.",
        "Ripristinando il flusso d'aria ottimale, i nostri interventi migliorano la qualità dell'aria interna, riducono i consumi energetici e prolungano la durata delle attrezzature.",
      ],
      image: ventilationImg,
      imageAlt: "Pulizia ventilazione cucina industriale",
      imagePosition: "right",
    },
    {
      title: "Pulizia impianti di estrazione industriale",
      paragraphs: [
        "Abbiamo una vasta esperienza nella pulizia di impianti di estrazione in ambienti di produzione industriale. Comprendiamo le sfide specifiche di lavorare in contesti produttivi dove la continuità operativa è fondamentale.",
        "Pianifichiamo gli interventi fuori orario per ridurre al minimo l'impatto sulle operazioni, garantendo al contempo una pulizia accurata e conforme agli standard di settore.",
      ],
      image: productionImg,
      imageAlt: "Pulizia estrazione industriale per ambienti produttivi",
      imagePosition: "left",
    },
    {
      title: "Standard e conformità normativa",
      paragraphs: [
        "In Italia, il rispetto delle normative igienico-sanitarie e antincendio è obbligatorio per le cucine commerciali. La pulizia regolare dei condotti di estrazione è spesso un requisito per soddisfare questi standard.",
        "I nostri interventi garantiscono che la tua cucina rimanga sempre conforme a tutte le normative vigenti, fornendoti documentazione e certificazioni che attestano lo stato degli impianti.",
      ],
      image: standardsImg,
      imageAlt: "Standard di pulizia e conformità normativa cucine",
      imagePosition: "right",
    },
    {
      title: "Sostituzione filtri a deflettore",
      paragraphs: [
        "I filtri a deflettore sono la prima linea di difesa contro l'accumulo di grasso nel sistema di estrazione. Filtri danneggiati o usurati non trattengono efficacemente il grasso, che si deposita nei condotti aumentando il rischio di incendio.",
        "Forniamo un servizio dedicato di sostituzione filtri, assicurando che il tuo sistema di filtrazione sia sempre in condizioni ottimali per proteggere l'intero impianto.",
      ],
      image: filtersImg,
      imageAlt: "Sostituzione filtri a deflettore per cappe cucina",
      imagePosition: "left",
    },
    {
      title: "Domande frequenti",
      paragraphs: [],
      bullets: [
        "Ogni quanto va pulito il sistema di estrazione? — Dipende dall'utilizzo: generalmente ogni 3-12 mesi. Le cucine ad alto volume richiedono pulizie più frequenti.",
        "Posso pulire i condotti da solo? — La pulizia di routine può essere fatta dal personale, ma la pulizia professionale dei condotti richiede attrezzature specializzate per raggiungere zone inaccessibili.",
        "La pulizia interrompe le attività? — Pianifichiamo gli interventi fuori orario per ridurre al minimo l'impatto sulle operazioni della tua cucina.",
        "Rilasciate certificazioni? — Sì, al termine di ogni intervento forniamo un report dettagliato e certificazione di conformità.",
        "La pulizia riduce gli odori? — Assolutamente sì. La rimozione dei depositi di grasso e residui alimentari elimina le fonti di odori sgradevoli.",
        "La pulizia previene le infestazioni? — Sì, il grasso accumulato attira insetti e parassiti. La pulizia regolare elimina la fonte di attrazione.",
      ],
    },
  ],
  benefici: [
    "Riduzione drastica del rischio incendio",
    "Conformità normativa garantita con certificazione",
    "Risparmio energetico fino al 30% con impianti puliti",
    "Maggiore durata delle attrezzature di cucina",
    "Ambiente di lavoro più sicuro e salubre",
    "Eliminazione di odori sgradevoli",
    "Prevenzione infestazioni da insetti e parassiti",
    "Interventi pianificati fuori orario, zero interruzioni",
  ],
  offerta: [
    "Sopralluogo e preventivo gratuito senza impegno",
    "Piano di manutenzione periodica personalizzato",
    "Report fotografico e certificazione post-intervento",
  ],
  bonus: "Primo sopralluogo tecnico gratuito — Chiamaci ora!",
  showContactForm: true,
};

export default function ManutenzioneCucineIndustriali() {
  return <ServizioTemplate data={data} />;
}
