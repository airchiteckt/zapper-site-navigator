import ServizioTemplate, { ServizioData } from "./ServizioTemplate";
import heroImg from "@/assets/servizi/disinfestazione-cucine.jpg";
import imgIspezione from "@/assets/servizi/disinfestazione-ispezione.jpg";
import imgMonitoraggio from "@/assets/servizi/disinfestazione-monitoraggio.jpg";
import imgEsclusione from "@/assets/servizi/disinfestazione-esclusione.jpg";
import imgTrattamento from "@/assets/servizi/disinfestazione-trattamento.jpg";

const data: ServizioData = {
  slug: "disinfestazione-cucine",
  heroImage: heroImg,
  title: "Disinfestazione Cucine",
  metaDescription: "Disinfestazione professionale HACCP per cucine: interventi rapidi contro insetti e roditori, monitoraggio continuo e piani di prevenzione personalizzati.",
  hero: {
    headline: "Insetti o infestazioni in cucina? Rischi chiusura immediata.",
    sublines: [
      "Interventi professionali HACCP",
      "Soluzioni rapide e sicure",
    ],
    cta: "Intervento urgente",
  },
  problemi: [
    "Blatte e scarafaggi nelle aree di preparazione possono trasmettere E.coli e Salmonella",
    "Topi e ratti contaminano scorte alimentari e superfici con escrementi e urina",
    "Mosche e insetti volanti accedono dalla porta di servizio e finestre aperte",
    "Formiche nelle dispense compromettono la conservazione degli alimenti",
    "Rischio di chiusura immediata da parte delle autorità sanitarie (ASL/NAS)",
    "Danni reputazionali devastanti: una sola recensione negativa può far perdere clienti per mesi",
  ],
  soluzione: {
    intro: "Un approccio integrato in 4 fasi per eliminare il problema e prevenire il ritorno:",
    punti: [
      "Esclusione: sigillatura punti di ingresso e barriere fisiche anti-intrusione",
      "Restrizione: eliminazione delle condizioni favorevoli (residui, umidità, fessure)",
      "Eliminazione: trattamenti mirati rapidi ed efficaci con prodotti certificati",
      "Monitoraggio: dispositivi di controllo continuo per intercettare nuove attività",
    ],
  },
  approfondimenti: [
    {
      title: "Perché anche una cucina pulita può avere infestazioni",
      paragraphs: [
        "Molti ristoratori pensano che una cucina ben tenuta sia automaticamente al sicuro dalle infestazioni. In realtà, anche i locali più curati possono essere vulnerabili: basta una crepa nel muro, un tubo non sigillato o una consegna di merce con imballaggi contaminati per introdurre insetti o roditori nell'ambiente.",
        "Le cucine professionali offrono le condizioni ideali per la proliferazione degli infestanti: calore costante, abbondanza di acqua e residui alimentari. Senza un piano di prevenzione strutturato, il rischio è concreto e indipendente dal livello di igiene quotidiana.",
      ],
      bullets: [
        "I blatte possono entrare attraverso scarichi e tubature",
        "I roditori necessitano di aperture di soli 6mm per infiltrarsi",
        "Le consegne di materie prime sono un vettore frequente di infestazioni",
      ],
      image: imgIspezione,
      imageAlt: "Ispezione professionale cucina ristorante",
      imagePosition: "right",
    },
    {
      title: "Monitoraggio continuo: prevenire è meglio che curare",
      paragraphs: [
        "Un singolo intervento di disinfestazione risolve il problema nell'immediato, ma senza un sistema di monitoraggio attivo, il rischio di re-infestazione resta elevato. Le cucine professionali sono ambienti dinamici dove le condizioni cambiano rapidamente: nuove consegne, variazioni stagionali, lavori di manutenzione possono creare nuovi punti di accesso.",
        "Il nostro servizio prevede l'installazione di dispositivi di monitoraggio discreti e non invasivi, posizionati strategicamente nei punti critici. Questi permettono di rilevare tempestivamente qualsiasi segnale di attività, consentendo interventi mirati prima che il problema diventi un'infestazione.",
      ],
      bullets: [
        "Stazioni di monitoraggio discrete e non visibili ai clienti",
        "Controlli periodici programmati con report dettagliato",
        "Allarme precoce che permette interventi tempestivi",
        "Documentazione completa per conformità HACCP e audit",
      ],
      image: imgMonitoraggio,
      imageAlt: "Sistema di monitoraggio infestanti in cucina professionale",
      imagePosition: "left",
    },
    {
      title: "Aree esterne: un rischio spesso sottovalutato",
      paragraphs: [
        "Le aree esterne del locale — dehors, parcheggi, zone di stoccaggio rifiuti — sono spesso il punto di partenza delle infestazioni. Roditori nei pressi dei bidoni, vespe attirate dai tavoli all'aperto, volatili che nidificano sotto le grondaie: ogni situazione richiede una strategia specifica di prevenzione e controllo.",
        "Un piano di pest management efficace deve includere anche la gestione perimetrale del locale: dalla sigillatura dei punti di ingresso alla corretta gestione dei rifiuti, fino all'installazione di barriere fisiche che impediscano l'accesso agli infestanti dall'esterno verso le aree di preparazione alimentare.",
      ],
      image: imgEsclusione,
      imageAlt: "Protezione aree esterne ristorante da infestanti",
      imagePosition: "right",
    },
    {
      title: "Trattamenti sicuri e conformi alle normative alimentari",
      paragraphs: [
        "In un ambiente dove si preparano alimenti, la scelta dei prodotti e delle tecniche di disinfestazione è fondamentale. Utilizziamo esclusivamente trattamenti certificati per l'uso in ambienti alimentari, che eliminano gli infestanti senza lasciare residui tossici sulle superfici a contatto con il cibo.",
        "Ogni intervento viene pianificato per ridurre al minimo i tempi di fermo della cucina. I nostri tecnici operano con discrezione, programmando i trattamenti negli orari di chiusura e garantendo che il locale sia pienamente operativo alla riapertura. Al termine, riceverete un report fotografico e documentale completo per il vostro dossier HACCP.",
      ],
      bullets: [
        "Prodotti biocidi autorizzati per ambienti alimentari",
        "Interventi programmati fuori dall'orario di apertura",
        "Nessun residuo chimico su superfici di lavoro",
        "Report completo per audit e conformità sanitaria",
      ],
      image: imgTrattamento,
      imageAlt: "Trattamento disinfestazione sicuro in cucina professionale",
      imagePosition: "left",
    },
  ],
  benefici: [
    "Ambiente sicuro e conforme agli standard HACCP",
    "Rispetto di tutte le normative igienico-sanitarie",
    "Zero rischi di sanzioni durante i controlli ASL/NAS",
    "Protezione della reputazione del locale",
    "Monitoraggio continuo con documentazione per audit",
    "Interventi discreti senza impatto sull'attività",
  ],
  offerta: [
    "Sopralluogo gratuito con valutazione del rischio",
    "Piano prevenzione personalizzato con monitoraggio continuo",
    "Intervento d'urgenza entro 24h",
  ],
  bonus: "Report fotografico pre/post intervento incluso",
  crossSell: {
    testo: "La pulizia profonda riduce il rischio infestazioni",
    link: "/pulizia-cucine-professionali",
    linkLabel: "Scopri la pulizia professionale",
  },
};

export default function DisinfestazioneCucine() {
  return <ServizioTemplate data={data} />;
}
