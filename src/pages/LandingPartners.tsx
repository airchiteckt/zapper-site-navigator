import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight, CheckCircle, Loader2, TrendingUp,
  Globe, Wrench, ShieldCheck, Megaphone, Users, Star, Phone, Mail
} from "lucide-react";
import SEO from "@/components/SEO";
import { sendContactEmails } from "@/lib/emailService";
import { useToast } from "@/hooks/use-toast";
import logoWhite from "@/assets/logo-zapper-bianco.svg";
import heroImg from "@/assets/landing-partners-hero.jpg";

const STATS = [
  { value: "30+", label: "Modelli a catalogo" },
  { value: "500+", label: "Installazioni completate" },
  { value: "15+", label: "Paesi raggiunti" },
  { value: "95%", label: "Abbattimento fumi garantito" },
];

const BENEFITS = [
  {
    icon: Megaphone,
    title: "Campagne pubblicitarie dedicate",
    desc: "Investiamo in advertising mirato nella tua area per generare lead qualificati e portarti clienti pronti all'acquisto.",
  },
  {
    icon: TrendingUp,
    title: "Margini competitivi",
    desc: "Listini riservati con sconti dedicati e margini interessanti su ogni vendita e installazione.",
  },
  {
    icon: Globe,
    title: "Esclusiva territoriale",
    desc: "Proteggiamo la tua zona: nessun altro partner nella stessa area geografica.",
  },
  {
    icon: Wrench,
    title: "Formazione tecnica completa",
    desc: "Training approfondito su installazione, manutenzione e vendita con supporto continuo.",
  },
  {
    icon: ShieldCheck,
    title: "Materiale marketing incluso",
    desc: "Video, foto professionali, schede tecniche e materiale promozionale pronti all'uso.",
  },
  {
    icon: Users,
    title: "Dashboard partner dedicata",
    desc: "Accesso riservato a listini, documenti tecnici, video formativi e storico ordini.",
  },
];

const PARTNER_TYPES = [
  {
    value: "installatore",
    label: "Installatore",
    color: "#59d153",
    desc: "Installi e manutieni sistemi di aspirazione, ventilazione o trattamento aria? Diventa il riferimento ZAPPER® nella tua zona.",
  },
  {
    value: "rivenditore",
    label: "Rivenditore",
    color: "#3b82f6",
    desc: "Vendi forni, attrezzature per ristorazione o edilizia? Aggiungi ZAPPER® al tuo catalogo per differenziarti.",
  },
  {
    value: "importatore",
    label: "Importatore",
    color: "#f59e0b",
    desc: "Operi in un mercato estero? Diventa importatore esclusivo ZAPPER® nel tuo paese.",
  },
];

const TESTIMONIALS = [
  {
    text: "Da quando siamo partner ZAPPER®, il fatturato nella divisione trattamento fumi è cresciuto del 40%. Le campagne pubblicitarie dedicate ci portano clienti già informati.",
    author: "Marco R.",
    role: "Installatore - Lombardia",
  },
  {
    text: "La qualità del prodotto parla da sola. I clienti sono soddisfatti e il supporto tecnico è sempre disponibile. Un vero win-win.",
    author: "Pierre D.",
    role: "Importatore - Francia",
  },
];

export default function LandingPartners() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "", city: "", country: "",
    partnerType: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.phone || !formData.partnerType) return;
    setIsSubmitting(true);
    try {
      const result = await sendContactEmails({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Candidatura Partner - Tipo: ${formData.partnerType}\nAzienda: ${formData.company}\nCittà: ${formData.city}, ${formData.country}\n\n${formData.message}`,
        source: "Landing Partner",
      });
      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", company: "", city: "", country: "", partnerType: "", message: "" });
      } else {
        toast({ title: "Errore", description: "Si è verificato un errore. Riprova.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Errore", description: "Si è verificato un errore. Riprova.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("partner-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SEO
        title="Diventa Partner ZAPPER® | Opportunità di business"
        description="Entra nella rete ZAPPER®: campagne pubblicitarie dedicate, margini competitivi e supporto completo. Candidati come installatore, rivenditore o importatore."
        noindex
      />

      {/* Sticky mini header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur border-b border-primary/10">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <img src={logoWhite} alt="ZAPPER®" className="h-7" />
          <Button variant="accent" size="sm" onClick={scrollToForm}>
            Candidati ora <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </header>

      <main className="bg-foreground text-primary-foreground">
        {/* HERO */}
        <section className="relative min-h-[90vh] flex items-center pt-14">
          <div className="absolute inset-0">
            <img src={heroImg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
            <div className="absolute inset-0 bg-foreground/80" />
          </div>
          <div className="relative container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-3xl">
              <span className="inline-block bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-6">
                Programma Partner ZAPPER®
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Fai crescere il tuo business con
                <span className="text-primary block mt-2">la tecnologia n°1 in Italia</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl leading-relaxed">
                Diventa partner ZAPPER® e accedi a campagne pubblicitarie dedicate per attrarre clienti nella tua area.
                Un modello <strong className="text-primary-foreground">win-win</strong> che genera risultati concreti per entrambi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" onClick={scrollToForm}>
                  Diventa Partner
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <a href="tel:+3908119968436" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold text-lg">
                  <Phone className="w-5 h-5" />
                  +39 081 199 68 436
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="border-y border-primary/10 bg-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {STATS.map((s, i) => (
                <div key={i} className={`py-8 md:py-10 text-center ${i > 0 ? 'border-l border-primary/10' : ''}`}>
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY PARTNER */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Perché diventare Partner <span className="text-primary">ZAPPER®</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Non sei solo un rivenditore: sei un partner strategico. Investiamo attivamente nel tuo successo.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BENEFITS.map((b, i) => (
                <div
                  key={i}
                  className="bg-card/5 border border-primary/10 rounded-2xl p-6 hover:border-primary/30 transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <b.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AD CAMPAIGNS HIGHLIGHT */}
        <section className="py-16 md:py-24 bg-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                  Il nostro vantaggio competitivo
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                  Campagne pubblicitarie <span className="text-primary">dedicate</span> per ogni partner
                </h2>
                <p className="text-muted-foreground text-base mb-6 leading-relaxed">
                  Investiamo in campagne Google Ads e Meta Ads geo-localizzate nella tua area operativa.
                  I lead generati vengono indirizzati direttamente a te, creando un flusso costante di clienti qualificati.
                </p>
                <div className="space-y-4">
                  {[
                    "Campagne Google Ads localizzate nella tua zona",
                    "Lead qualificati inviati direttamente a te",
                    "Materiale creativo professionale incluso",
                    "Report mensile sulle performance",
                    "ROI misurabile e trasparente",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-foreground border border-primary/20 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6 text-center">Il modello Win-Win</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 text-primary font-bold">1</div>
                    <div>
                      <p className="font-semibold mb-1">ZAPPER® investe in pubblicità</p>
                      <p className="text-sm text-muted-foreground">Campagne dedicate nella tua area geografica</p>
                    </div>
                  </div>
                  <div className="w-px h-6 bg-primary/20 ml-5" />
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 text-primary font-bold">2</div>
                    <div>
                      <p className="font-semibold mb-1">I clienti ti contattano</p>
                      <p className="text-sm text-muted-foreground">Lead qualificati pronti all'acquisto</p>
                    </div>
                  </div>
                  <div className="w-px h-6 bg-primary/20 ml-5" />
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 text-primary font-bold">3</div>
                    <div>
                      <p className="font-semibold mb-1">Tu vendi e installi</p>
                      <p className="text-sm text-muted-foreground">Con il nostro supporto tecnico completo</p>
                    </div>
                  </div>
                  <div className="w-px h-6 bg-primary/20 ml-5" />
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1 text-primary">Entrambi cresciamo</p>
                      <p className="text-sm text-muted-foreground">Margini garantiti e clienti fidelizzati</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNER TYPES */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Scegli il tuo ruolo
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Tre modi per entrare nella rete ZAPPER® e far crescere il tuo business.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {PARTNER_TYPES.map((pt) => (
                <div
                  key={pt.value}
                  className="bg-card/5 border rounded-2xl p-8 text-center hover:border-opacity-60 transition-all hover:-translate-y-1 cursor-pointer"
                  style={{ borderColor: pt.color + '30' }}
                  onClick={() => {
                    setFormData(f => ({ ...f, partnerType: pt.value }));
                    scrollToForm();
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: pt.color + '15' }}
                  >
                    <Wrench className="w-8 h-8" style={{ color: pt.color }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: pt.color }}>
                    {pt.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {pt.desc}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 hover:bg-primary/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormData(f => ({ ...f, partnerType: pt.value }));
                      scrollToForm();
                    }}
                  >
                    Candidati come {pt.label.toLowerCase()}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 md:py-20 bg-card/5 border-y border-primary/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                I nostri partner dicono
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="bg-foreground border border-primary/10 rounded-2xl p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-primary-foreground/80 italic mb-4 leading-relaxed">
                    "{t.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-sm">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEAD CAPTURE FORM */}
        <section id="partner-form" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Candidati come Partner
                </h2>
                <p className="text-muted-foreground">
                  Compila il modulo e ti ricontatteremo entro 24 ore per discutere le opportunità nella tua area.
                </p>
              </div>

              {isSuccess ? (
                <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Candidatura inviata!</h3>
                  <p className="text-muted-foreground mb-6">
                    Grazie per il tuo interesse. Il nostro team commerciale ti contatterà entro 24 ore
                    per discutere le opportunità di partnership nella tua area.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="tel:+3908119968436" className="inline-flex items-center gap-2 text-primary font-semibold">
                      <Phone className="w-4 h-4" /> +39 081 199 68 436
                    </a>
                    <a href="mailto:info@smokezapper.it" className="inline-flex items-center gap-2 text-primary font-semibold">
                      <Mail className="w-4 h-4" /> info@smokezapper.it
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card/5 border border-primary/20 rounded-2xl p-6 md:p-8 space-y-4">
                  {/* Partner Type */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Tipo di partnership *</label>
                    <div className="grid grid-cols-3 gap-3">
                      {PARTNER_TYPES.map((pt) => (
                        <button
                          key={pt.value}
                          type="button"
                          onClick={() => setFormData(f => ({ ...f, partnerType: pt.value }))}
                          className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                            formData.partnerType === pt.value
                              ? 'border-transparent text-primary-foreground'
                              : 'border-primary/20 text-muted-foreground hover:border-primary/40'
                          }`}
                          style={formData.partnerType === pt.value
                            ? { backgroundColor: pt.color }
                            : {}
                          }
                        >
                          {pt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Nome e Cognome *</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))}
                        placeholder="Mario Rossi"
                        className="bg-background text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Azienda</label>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData(f => ({ ...f, company: e.target.value }))}
                        placeholder="Nome azienda"
                        className="bg-background text-base"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Email *</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))}
                        placeholder="mario@azienda.it"
                        className="bg-background text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Telefono *</label>
                      <Input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData(f => ({ ...f, phone: e.target.value }))}
                        placeholder="+39 333 123 4567"
                        className="bg-background text-base"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Città</label>
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData(f => ({ ...f, city: e.target.value }))}
                        placeholder="Milano"
                        className="bg-background text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Paese</label>
                      <Input
                        value={formData.country}
                        onChange={(e) => setFormData(f => ({ ...f, country: e.target.value }))}
                        placeholder="Italia"
                        className="bg-background text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Messaggio</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData(f => ({ ...f, message: e.target.value }))}
                      placeholder="Raccontaci della tua attività e della zona che vorresti coprire..."
                      rows={3}
                      className="bg-background text-base"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting || !formData.partnerType}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Invio in corso...</>
                    ) : (
                      <>Invia la tua candidatura <ArrowRight className="w-4 h-4 ml-2" /></>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Inviando questo modulo acconsenti al trattamento dei dati personali ai sensi del GDPR.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-12 md:py-16 bg-primary/10 border-t border-primary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Hai domande? Parliamone.
            </h2>
            <p className="text-muted-foreground mb-6">
              Contattaci direttamente per discutere le opportunità di partnership.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+3908119968436"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-5 h-5" /> Chiama ora
              </a>
              <a
                href="mailto:info@smokezapper.it"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                <Mail className="w-5 h-5" /> Scrivici
              </a>
            </div>
          </div>
        </section>

        {/* Footer minimal */}
        <footer className="py-6 border-t border-primary/10 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ZAPPER® — Tutti i diritti riservati
          </p>
        </footer>
      </main>
    </>
  );
}
