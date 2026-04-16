import { Shield, Clock, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const TrustBar = () => {
  const { t } = useTranslation();

  const items = [
    { icon: Star, text: t("trustBar.satisfied") },
    { icon: Shield, text: t("trustBar.warranty") },
    { icon: Clock, text: t("trustBar.install") },
  ];

  return (
    <section className="py-4 sm:py-5 bg-muted/50 border-y border-border">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {items.map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-foreground">{item.text}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-500 text-sm">★★★★★</span>
            <span className="text-xs sm:text-sm font-medium text-foreground">Trustpilot</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
