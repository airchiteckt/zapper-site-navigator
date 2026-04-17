import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageview, trackScroll, trackTimeOnPage } from "@/lib/analytics";

/**
 * Hook globale: traccia pageview, scroll depth e tempo speso su pagina.
 * Va usato UNA volta sola (in App), dentro BrowserRouter.
 */
export function useAnalytics() {
  const location = useLocation();
  const pageEnterRef = useRef<number>(Date.now());
  const reachedDepthsRef = useRef<Set<number>>(new Set());

  // Pageview + reset metriche su ogni cambio pagina
  useEffect(() => {
    pageEnterRef.current = Date.now();
    reachedDepthsRef.current = new Set();
    trackPageview();

    const sendTime = () => {
      const seconds = Math.round((Date.now() - pageEnterRef.current) / 1000);
      if (seconds >= 3) trackTimeOnPage(seconds);
    };

    window.addEventListener("beforeunload", sendTime);
    return () => {
      sendTime();
      window.removeEventListener("beforeunload", sendTime);
    };
  }, [location.pathname]);

  // Scroll depth: 25, 50, 75, 100
  useEffect(() => {
    const depths = [25, 50, 75, 100];
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        for (const d of depths) {
          if (pct >= d && !reachedDepthsRef.current.has(d)) {
            reachedDepthsRef.current.add(d);
            trackScroll(d);
          }
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);
}
