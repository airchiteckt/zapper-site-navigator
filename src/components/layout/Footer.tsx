import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import logoBianco from "@/assets/logo-zapper-bianco.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    settori: [
      { name: "Professionale", href: "/settori/professionale" },
      { name: "Domestico", href: "/settori/domestico" },
      { name: "Industriale", href: "/settori/industriale" },
    ],
    applicazioni: [
      { name: "Forni a legna", href: "/applicazioni/forni-a-legna" },
      { name: "Braci e carbone", href: "/applicazioni/braci-carbone" },
      { name: "Caldaie biomassa", href: "/applicazioni/caldaie-biomassa" },
      { name: "Camini", href: "/applicazioni/camini" },
    ],
    risorse: [
      { name: "Guide", href: "/guide" },
      { name: "Case study", href: "/clienti" },
      { name: "Partner", href: "/partner" },
      { name: "Contatti", href: "/contatti" },
    ],
  };

  return (
    <footer className="bg-zapper-black text-white">
      {/* Main Footer */}
      <div className="container px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 mb-4 sm:mb-0">
            <Link to="/" className="inline-block mb-4 sm:mb-6">
              <img 
                src={logoBianco} 
                alt="ZAPPER®" 
                className="h-8 sm:h-10 w-auto"
              />
            </Link>
            <p className="text-white/70 text-sm sm:text-base mb-4 sm:mb-6 max-w-sm">
              Sistemi di abbattimento fumi e polveri per il settore professionale, domestico e industriale. 
              Tecnologia italiana per aria più pulita.
            </p>
            <div className="flex gap-3 sm:gap-4">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-200"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-display font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white">Settori</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.settori.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-primary transition-colors duration-200 text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white">Applicazioni</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.applicazioni.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-primary transition-colors duration-200 text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-display font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white">Risorse</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.risorse.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-primary transition-colors duration-200 text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
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
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between text-xs sm:text-sm text-white/50">
            <p>© {currentYear} ZAPPER®. Tutti i diritti riservati.</p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/cookie" className="hover:text-primary transition-colors">Cookie Policy</Link>
              <Link to="/termini" className="hover:text-primary transition-colors">Termini di servizio</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
