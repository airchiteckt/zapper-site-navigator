import { useState, useEffect } from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";

const StickyBottomCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const buttons = [
    {
      icon: Phone,
      label: "Chiama",
      href: "tel:+390811996843",
      className: "bg-primary text-primary-foreground",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:info@smokezapper.it",
      className: "bg-foreground text-background",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/390811996843",
      className: "bg-[#25D366] text-white",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-lg sm:hidden animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-stretch divide-x divide-border">
        {buttons.map((btn) => (
          <a
            key={btn.label}
            href={btn.href}
            target={btn.label === "WhatsApp" ? "_blank" : undefined}
            rel={btn.label === "WhatsApp" ? "noopener noreferrer" : undefined}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 ${btn.className} transition-opacity active:opacity-80`}
          >
            <btn.icon className="w-5 h-5" />
            <span className="text-[11px] font-semibold">{btn.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default StickyBottomCTA;
