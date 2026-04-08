import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoBianco from "@/assets/logo-zapper-bianco.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const footerLinks = {
    settori: [
      { name: t("footer.professional"), href: "/settori/professionale" },
      { name: t("footer.domestic"), href: "/settori/domestico" },
      { name: t("footer.industrial"), href: "/settori/industriale" },
    ],
    applicazioni: [
      { name: t("footer.woodOvens"), href: "/applicazioni/forni-a-legna" },
      { name: t("footer.charcoalGrills"), href: "/applicazioni/braci-carbone" },
      { name: t("footer.biomassBoilers"), href: "/applicazioni/caldaie-biomassa" },
      { name: t("footer.fireplaces"), href: "/applicazioni/camini" },
    ],
    risorse: [
      { name: t("footer.guides"), href: "/guide" },
      { name: t("footer.caseStudy"), href: "/clienti" },
      { name: t("footer.partner"), href: "/partner" },
      { name: t("footer.contacts"), href: "/contatti" },
    ],
  };

  return (
    <footer className="bg-zapper-black text-white">
      <div className="container px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <div className="col-span-2 lg:col-span-2 mb-4 sm:mb-0">
            <Link to="/" className="inline-block mb-4 sm:mb-6">
              <img src={logoBianco} alt="ZAPPER®" className="h-8 sm:h-10 w-auto" />
            </Link>
            <p className="text-white/70 text-sm sm:text-base mb-4 sm:mb-6 max-w-sm">
              {t("footer.description")}
            </p>
            <div className="flex gap-3 sm:gap-4">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-200">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white">{t("footer.settori")}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.settori.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-white/70 hover:text-primary transition-colors duration-200 text-sm sm:text-base">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white">{t("footer.applicazioni")}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.applicazioni.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-white/70 hover:text-primary transition-colors duration-200 text-sm sm:text-base">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-display font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white">{t("footer.risorse")}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.risorse.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-white/70 hover:text-primary transition-colors duration-200 text-sm sm:text-base">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            <a href="tel:+3908119968436" className="flex items-center gap-2 sm:gap-3 text-white/70 hover:text-primary transition-colors text-sm sm:text-base">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              <span>+39 081 199 68 436</span>
            </a>
            <a href="mailto:info@smokezapper.it" className="flex items-center gap-2 sm:gap-3 text-white/70 hover:text-primary transition-colors text-sm sm:text-base">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              <span>info@smokezapper.it</span>
            </a>
            <div className="flex items-center gap-2 sm:gap-3 text-white/70 text-sm sm:text-base">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              <span>Via Galileo Ferraris 24, Scafati (SA) 84018 - Italy</span>
            </div>
          </div>
          <a
            href="https://wa.me/393248996189?text=Ciao%2C%20vorrei%20informazioni%20sui%20sistemi%20ZAPPER%C2%AE"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3 rounded-full md:hidden"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t("footer.whatsappCta")}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between text-xs sm:text-sm text-white/50">
            <p>{t("footer.copyright", { year: currentYear })}</p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <Link to="/privacy" className="hover:text-primary transition-colors">{t("footer.privacyPolicy")}</Link>
              <Link to="/cookie" className="hover:text-primary transition-colors">{t("footer.cookiePolicy")}</Link>
              <Link to="/termini" className="hover:text-primary transition-colors">{t("footer.termsOfService")}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
