import { Phone } from "lucide-react";
import { trackCTA } from "@/lib/analytics";

const StickyBottomCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-foreground border-t border-white/10 shadow-lg sm:hidden">
      <a
        href="tel:+3908119968436"
        onClick={() => trackCTA("sticky_call_mobile")}
        className="flex items-center justify-center gap-2 py-4 text-background font-semibold text-base active:opacity-90 transition-opacity"
      >
        <Phone className="w-5 h-5" />
        <span>Chiama ora</span>
      </a>
    </div>
  );
};

export default StickyBottomCTA;
