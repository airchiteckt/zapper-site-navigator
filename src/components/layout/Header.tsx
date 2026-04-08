import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/LanguageSelector";
import logoVerde from "@/assets/logo-zapper-verde.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navigation = [
    { name: t("nav.settori"), href: "/settori" },
    { name: t("nav.applicazioni"), href: "/applicazioni" },
    { name: t("nav.modelli"), href: "/modelli" },
    { name: t("nav.servizi"), href: "/servizi" },
    { name: t("nav.interventi"), href: "/interventi" },
    { name: t("nav.contatti"), href: "/contatti" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <img src={logoVerde} alt="ZAPPER®" className="h-8 md:h-10 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-muted-foreground hover:text-foreground font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector />
            <a href="tel:+3908119968436" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="w-4 h-4" />
              <span className="font-medium">{t("nav.callNow")}</span>
            </a>
            <Button variant="accent" size="lg" asChild>
              <Link to="/contatti">{t("nav.freeTechnicalAssessment")}</Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSelector />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border animate-fade-in-down">
          <div className="container px-4 sm:px-6 py-4">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="py-3 px-4 text-foreground font-medium hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-border">
                <Button variant="accent" className="w-full" size="lg" asChild>
                  <Link to="/contatti">{t("nav.freeTechnicalAssessment")}</Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
