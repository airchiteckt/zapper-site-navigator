import ServizioTemplate, { ServizioData } from "./ServizioTemplate";
import heroImg from "@/assets/servizi/manutenzione-cucine.jpg";

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
      title: "Perché la pulizia dei condotti è essenziale",
      paragraphs: [
        "I condotti di estrazione delle cucine professionali svolgono un ruolo fondamentale nel sistema di ventilazione. Durante il funzionamento, i ventilatori aspirano aria insieme a grasso, fumo e altri contaminanti generati dalla cottura. Con il tempo, queste sostanze si accumulano nei condotti, formando uno strato spesso di grasso altamente infiammabile.",
        "Questo non solo rappresenta un grave pericolo di incendio, ma riduce anche l'efficienza del sistema di ventilazione, portando a un aumento dei consumi energetici e potenziali malfunzionamenti dell'impianto.",
      ],
    },
    {
      title: "Prevenzione del rischio incendio",
      paragraphs: [
        "L'accumulo di grasso all'interno dei condotti è una delle principali cause di incendi nelle cucine commerciali. Il grasso è altamente infiammabile e quando si deposita nel sistema di ventilazione, il rischio di un innesco aumenta esponenzialmente.",
        "Il nostro servizio di pulizia professionale si concentra sulla rimozione completa dei depositi di grasso, riducendo significativamente il rischio di incendio e garantendo la sicurezza della tua cucina e del tuo personale.",
      ],
    },
    {
      title: "Efficienza energetica e risparmio sui costi",
      paragraphs: [
        "Un sistema di condotti pulito e ben mantenuto contribuisce direttamente all'efficienza delle operazioni in cucina. Quando grasso e contaminanti si accumulano, ostruiscono il flusso d'aria e compromettono l'efficacia della ventilazione.",
        "Questo non solo porta a una scarsa qualità dell'aria interna, ma costringe le apparecchiature a lavorare di più, aumentando il consumo energetico e riducendo la loro durata. Ripristinando il flusso d'aria ottimale, i nostri interventi migliorano l'efficienza della cucina e riducono i costi energetici nel tempo.",
      ],
    },
    {
      title: "Conformità alle normative di sicurezza",
      paragraphs: [
        "In Italia, il rispetto delle normative igienico-sanitarie e antincendio è obbligatorio per le cucine commerciali. La pulizia regolare dei condotti di estrazione è spesso un requisito per soddisfare questi standard. La mancata conformità può comportare sanzioni, multe e persino la chiusura dell'attività.",
        "I nostri interventi garantiscono che la tua cucina rimanga sempre conforme a tutte le normative vigenti, fornendoti documentazione e certificazioni che attestano lo stato degli impianti.",
      ],
    },
    {
      title: "Protezione delle attrezzature",
      paragraphs: [
        "Le attrezzature di una cucina professionale rappresentano un investimento significativo. L'accumulo di grasso e contaminanti nei condotti non solo influisce sul sistema di ventilazione, ma espone anche le apparecchiature vicine a potenziali danni. La natura corrosiva del grasso può deteriorare i componenti metallici, causando costose riparazioni o sostituzioni premature.",
        "Il nostro approccio preventivo alla pulizia dei condotti aiuta a proteggere il tuo investimento, prevenendo danni alle costose attrezzature di cucina.",
      ],
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
