import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";

const Grazie = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "it";

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
      });
    }
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={t("grazie.seoTitle")}
        description={t("grazie.seoDescription")}
      />
      <Header />

      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container px-4 max-w-lg text-center">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("grazie.title")}
          </h1>

          <p className="text-muted-foreground text-lg mb-2">
            {t("grazie.subtitle")}
          </p>
          <p
            className="text-muted-foreground mb-8"
            dangerouslySetInnerHTML={{ __html: t("grazie.responseTime") }}
          />

          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <p className="text-sm text-muted-foreground mb-3">
              {t("grazie.whatsappPrompt")}
            </p>
            <a
              href="https://wa.me/393248996189?text=Ciao%2C%20ho%20appena%20compilato%20il%20form%20sul%20vostro%20sito%20e%20vorrei%20maggiori%20info."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="accent" size="lg" className="w-full">
                <Phone className="w-5 h-5 mr-2" />
                {t("grazie.whatsappButton")}
              </Button>
            </a>
          </div>

          <Link to={`/${lang}`}>
            <Button variant="outline">
              {t("grazie.backHome")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Grazie;
