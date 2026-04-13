import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { AlertTriangle, CheckCircle2, Sparkles, Gift, ArrowRight, Phone, MessageCircle, Send } from "lucide-react";
import { sendContactEmails } from "@/lib/emailService";
import { useToast } from "@/hooks/use-toast";
import daAlfonso from "@/assets/clients/da-alfonso.webp";
import pummarolaNcoppa from "@/assets/clients/pummarola-ncoppa.webp";
import daMichele from "@/assets/clients/da-michele.webp";
import hakunaMatata from "@/assets/clients/hakuna-matata.webp";
import francuccio from "@/assets/clients/francuccio.webp";

export interface ApprofondimentoSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  image?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
}

export interface ServizioData {
  slug: string;
  title: string;
  metaDescription: string;
  heroImage?: string;
  hero: {
    headline: string;
    sublines: string[];
    cta: string;
  };
  problemi: string[];
  soluzione: {
    intro?: string;
    punti: string[];
  };
  approfondimenti?: ApprofondimentoSection[];
  benefici: string[];
  offerta: string[];
  crossSell?: {
    testo: string;
    link: string;
    linkLabel: string;
  };
  bonus?: string;
  showContactForm?: boolean;
}

function ContactFormSection({ source }: { source: string }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.phone) return;
    setIsSubmitting(true);
    try {
      const result = await sendContactEmails({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        source,
      });
      if (result.success) {
        const lang = i18n.language || "it";
        navigate(`/${lang}/grazie`);
      } else {
        toast({ title: "Errore", description: "Invio non riuscito, riprova.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Errore", description: "Invio non riuscito, riprova.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(`Ciao, vorrei informazioni su: ${source}`);

  return (
    <section className="py-16 md:py-20 bg-muted" id="contatti">
      <div className="container px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Richiedi un preventivo gratuito
          </h2>
          <p className="text-muted-foreground text-lg">
            Compila il modulo oppure contattaci direttamente
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="border-primary/20">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="cf-name">Nome</Label>
                  <Input id="cf-name" placeholder="Il tuo nome" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                  <Label htmlFor="cf-email">Email *</Label>
                  <Input id="cf-email" type="email" required placeholder="email@esempio.it" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div>
                  <Label htmlFor="cf-phone">Telefono *</Label>
                  <Input id="cf-phone" type="tel" required placeholder="+39 ..." value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} />
                </div>
                <div>
                  <Label htmlFor="cf-message">Messaggio</Label>
                  <Textarea id="cf-message" placeholder="Descrivi la tua esigenza..." rows={3} value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} />
                </div>
                <Button type="submit" variant="cta" size="lg" className="w-full" disabled={isSubmitting}>
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Invio..." : "Invia richiesta"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Direct contact */}
          <div className="flex flex-col justify-center gap-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">Chiamaci subito</h3>
                </div>
                <p className="text-muted-foreground mb-4">Parla direttamente con un nostro tecnico</p>
                <div className="space-y-2">
                  <a href="tel:+3908119968436" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium">
                    📞 +39 081 199 68 436
                  </a>
                  <a href="tel:+393248996189" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium">
                    📱 +39 324 899 6189
                  </a>
                </div>
              </CardContent>
            </Card>

            <Button variant="hero" size="xl" className="bg-[#25D366] hover:bg-[#20BD5A] text-white" asChild>
              <a href={`https://wa.me/3908119968436?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Scrivici su WhatsApp
              </a>
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              ✉️ <a href="mailto:info@smokezapper.it" className="text-primary hover:underline">info@smokezapper.it</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServizioTemplate({ data }: { data: ServizioData }) {
  return (
    <>
      <SEO
        title={data.title}
        description={data.metaDescription}
        canonical={`/${data.slug}`}
      />
      <Header />
      <main className="pt-20">
        {/* HERO */}
        <section className="relative bg-zapper-black text-white py-20 md:py-28 overflow-hidden">
          {data.heroImage && (
            <div className="absolute inset-0">
              <img src={data.heroImage} alt={data.title} className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-zapper-black via-zapper-black/70 to-zapper-black/50" />
            </div>
          )}
          <div className="container px-4 sm:px-6 max-w-4xl text-center relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {data.hero.headline}
            </h1>
            <div className="space-y-2 mb-8">
              {data.hero.sublines.map((line, i) => (
                <p key={i} className="text-lg md:text-xl text-white/80">
                  👉 {line}
                </p>
              ))}
            </div>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contatti">{data.hero.cta}</Link>
            </Button>
          </div>
        </section>

        {/* PROBLEMA */}
        <section className="py-16 md:py-20 bg-muted">
          <div className="container px-4 sm:px-6 max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Il problema</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.problemi.map((p, i) => (
                <Card key={i} className="border-destructive/20">
                  <CardContent className="p-5 flex items-start gap-3">
                    <span className="text-destructive mt-0.5">✗</span>
                    <p className="text-foreground">{p}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUZIONE */}
        <section className="py-16 md:py-20">
          <div className="container px-4 sm:px-6 max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle2 className="w-8 h-8 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">La soluzione</h2>
            </div>
            {data.soluzione.intro && (
              <p className="text-lg text-muted-foreground mb-6">{data.soluzione.intro}</p>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              {data.soluzione.punti.map((p, i) => (
                <Card key={i} className="border-primary/20 bg-primary/5">
                  <CardContent className="p-5 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-foreground">{p}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* APPROFONDIMENTI */}
        {data.approfondimenti && data.approfondimenti.length > 0 && (
          <section className="py-16 md:py-20">
            <div className="container px-4 sm:px-6 max-w-4xl space-y-16">
              {data.approfondimenti.map((section, i) => (
                <div key={i} className={`flex flex-col ${section.image ? (section.imagePosition === "left" ? "md:flex-row-reverse" : "md:flex-row") : ""} gap-8 items-center`}>
                  <div className={section.image ? "md:w-1/2" : "w-full"}>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">{section.title}</h3>
                    <div className="space-y-3">
                      {section.paragraphs.map((p, j) => (
                        <p key={j} className="text-muted-foreground leading-relaxed">{p}</p>
                      ))}
                    </div>
                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {section.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {section.image && (
                    <div className="md:w-1/2">
                      <img
                        src={section.image}
                        alt={section.imageAlt || section.title}
                        className="w-full h-auto rounded-xl shadow-lg"
                        loading="lazy"
                        width={800}
                        height={536}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BENEFICI */}
        <section className="py-16 md:py-20 bg-zapper-black text-white">
          <div className="container px-4 sm:px-6 max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">I benefici</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.benefici.map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-white/5">
                  <span className="text-primary">✓</span>
                  <p>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SCELTI DA */}
        <section className="py-12 md:py-16">
          <div className="container px-4 sm:px-6 max-w-4xl">
            <p className="text-center text-muted-foreground text-sm uppercase tracking-wider mb-8">
              Scelto da
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {[
                { src: daAlfonso, alt: "Da Alfonso" },
                { src: pummarolaNcoppa, alt: "Pummarola 'Ncoppa" },
                { src: daMichele, alt: "Da Michele" },
                { src: hakunaMatata, alt: "Hakuna Matata" },
                { src: francuccio, alt: "Francuccio" },
              ].map((client) => (
                <img
                  key={client.alt}
                  src={client.src}
                  alt={client.alt}
                  className="h-12 sm:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>

        {/* OFFERTA + BONUS */}
        <section className="py-16 md:py-20 bg-muted">
          <div className="container px-4 sm:px-6 max-w-4xl text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Gift className="w-8 h-8 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">L'offerta</h2>
            </div>
            <div className="space-y-3 mb-8">
              {data.offerta.map((o, i) => (
                <p key={i} className="text-lg text-foreground">👉 {o}</p>
              ))}
            </div>
            {data.bonus && (
              <p className="text-primary font-semibold text-lg mb-8">💥 {data.bonus}</p>
            )}
            <Button variant="hero" size="xl" asChild>
              <Link to="/contatti">{data.hero.cta}</Link>
            </Button>
          </div>
        </section>

        {/* CROSS SELL */}
        {data.crossSell && (
          <section className="py-12 md:py-16">
            <div className="container px-4 sm:px-6 max-w-4xl">
              <Card className="border-primary/20">
                <CardContent className="p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-lg text-foreground font-medium">{data.crossSell.testo}</p>
                  <Button variant="outline" asChild className="shrink-0">
                    <Link to={data.crossSell.link}>
                      {data.crossSell.linkLabel} <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* CONTACT FORM */}
        {data.showContactForm && (
          <ContactFormSection source={data.title} />
        )}
      </main>
      <Footer />
    </>
  );
}
