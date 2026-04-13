import ServizioTemplate, { ServizioData } from "./ServizioTemplate";
import heroImg from "@/assets/servizi/aspirazione-installazione.jpg";
import cappaImg from "@/assets/servizi/aspirazione-cappa.jpg";
import progettazioneImg from "@/assets/servizi/aspirazione-progettazione.jpg";
import ariaFrescaImg from "@/assets/servizi/aspirazione-aria-fresca.jpg";

const data: ServizioData = {
  slug: "impianti-aspirazione-fumi",
  heroImage: heroImg,
  title: "Impianti Aspirazione Fumi per Cucine Professionali",
  metaDescription: "Progettiamo, forniamo e installiamo impianti di aspirazione fumi per cucine di ristoranti, hotel e attività ristorative. Sopralluogo, progettazione su misura e installazione chiavi in mano.",
  hero: {
    headline: "Impianti di aspirazione fumi per ristoranti e hotel",
    sublines: [
      "Progettiamo, forniamo e installiamo l'impianto di estrazione su misura per la tua cucina professionale",
    ],
    cta: "Richiedi un sopralluogo gratuito",
  },
  problemi: [
    "Ventilazione inadeguata che causa accumulo di fumi, vapori e calore in cucina",
    "Cappe e condotti sottodimensionati rispetto al carico di cottura effettivo",
    "Assenza di ricambio d'aria fresca, con aria viziata e condizioni insalubri per il personale",
    "Non conformità alle normative vigenti su emissioni, rumore e sicurezza antincendio",
    "Lamentele di clienti e vicini per odori e fumo provenienti dalla cucina",
    "Impianti obsoleti o mal progettati che causano consumi energetici eccessivi",
  ],
  soluzione: {
    intro: "Il nostro team specializzato copre ogni aspetto dell'impianto di ventilazione: dal primo sopralluogo alla progettazione tecnica, dalla produzione di disegni professionali fino all'installazione completa.",
    punti: [
      "Progettazione su misura: analizziamo il locale, il tipo di cotture e il contesto edilizio per dimensionare l'impianto ideale",
      "Installazione cappe e canalizzazioni in acciaio inox con filtri antigrasso ad alta efficienza",
      "Sistema di immissione aria fresca con dispositivi gas interlock per il bilanciamento dei flussi",
      "Sistemi di abbattimento odori e attenuazione acustica per il rispetto dei limiti di emissione",
      "Integrazione con abbattitori ZAPPER® per il trattamento completo dei fumi di cottura",
      "Assistenza per pratiche edilizie e permessi, con documentazione tecnica e disegni a norma",
    ],
  },
  approfondimenti: [
    {
      title: "Ventilazione su misura per ogni cucina",
      paragraphs: [
        "Una ventilazione adeguata tramite estrazione dei fumi e ricambio d'aria fresca è obbligatoria in tutti gli ambienti commerciali dove si preparano e cuociono alimenti. Le normative e i requisiti possono variare significativamente in base alla posizione del locale, alla struttura dell'edificio e agli edifici circostanti.",
        "I nostri tecnici considerano tutti i fattori che influenzano il progetto: tipologia e volume delle cotture, layout della cucina, caratteristiche strutturali e vincoli urbanistici. Il risultato è un sistema su misura, progettato specificamente per le tue esigenze.",
      ],
      image: cappaImg,
      imageAlt: "Cappa di aspirazione professionale in acciaio inox installata in cucina ristorante",
      imagePosition: "right",
    },
    {
      title: "Un team di specialisti dedicato",
      paragraphs: [
        "Gestiamo internamente ogni fase del progetto: progettisti esperti, tecnici elettrici e ingegneri impiantisti lavorano in sinergia per garantire che ogni componente funzioni perfettamente.",
        "Semplifichiamo la complessità dell'implementazione coordinandoci con tutti i professionisti coinvolti — idraulici, muratori, elettricisti — per assicurare che ogni aspetto dei lavori sia perfettamente sincronizzato con l'installazione dell'impianto.",
      ],
      bullets: [
        "Progettisti con esperienza decennale nel settore Ho.Re.Ca.",
        "Tecnici elettrici qualificati per collegamenti e automazioni",
        "Ingegneri impiantisti per il dimensionamento ottimale",
        "Coordinamento completo con le altre maestranze del cantiere",
      ],
      image: progettazioneImg,
      imageAlt: "Tecnico ZAPPER® analizza il progetto dell'impianto di aspirazione su tablet",
      imagePosition: "left",
    },
    {
      title: "Aria fresca e conformità normativa",
      paragraphs: [
        "Quando l'aria calda e carica di fumi viene estratta dall'edificio, deve essere sostituita in misura quasi uguale da aria pulita proveniente dall'esterno attraverso un sistema di immissione con dispositivi gas interlock che monitorano il bilanciamento in modo accurato.",
        "Alcune aree o edifici sono soggetti a controlli rigorosi sui volumi di odore, fumo e grassi che è consentito emettere, con ulteriori restrizioni sul rumore. Se queste regole si applicano alla tua attività, prescriviamo i metodi più appropriati di purificazione dell'aria e sistemi di attenuazione acustica per garantire la conformità.",
      ],
      bullets: [
        "Sistemi di immissione aria fresca con gas interlock integrato",
        "Abbattimento odori conforme ai limiti di legge",
        "Attenuazione acustica per il rispetto delle soglie di rumore",
        "Sistemi antincendio automatici integrabili su richiesta",
      ],
      image: ariaFrescaImg,
      imageAlt: "Sistema di immissione aria fresca con ventilazione e dispositivo gas interlock",
      imagePosition: "right",
    },
  ],
  benefici: [
    "Cucina fresca, sicura e conforme alle normative vigenti",
    "Eliminazione completa di fumi, vapori e odori dalla zona di cottura",
    "Ambiente di lavoro salubre per il personale, con temperatura controllata",
    "Zero lamentele da clienti e vicini grazie all'abbattimento delle emissioni",
    "Riduzione del rischio incendio con condotti puliti e sistemi antincendio",
    "Risparmio energetico grazie a impianti correttamente dimensionati",
  ],
  offerta: [
    "Sopralluogo tecnico e consulenza iniziale gratuiti",
    "Progettazione su misura con disegni tecnici professionali",
    "Installazione chiavi in mano senza interruzione dell'attività",
  ],
  bonus: "Integrazione con abbattitori ZAPPER® per trattamento completo fumi e odori",
  showContactForm: true,
};

export default function ImpiantiAspirazioneFumi() {
  return <ServizioTemplate data={data} />;
}
