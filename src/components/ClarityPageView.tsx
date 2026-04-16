import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/**
 * Notifies Microsoft Clarity of every virtual page navigation in the SPA.
 * Fires on mount (initial page) AND on every subsequent route change.
 */
export default function ClarityPageView() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const notify = () => {
      if (!window.clarity) return;
      // Tag the current virtual page so Clarity can segment recordings
      window.clarity("set", "page", location.pathname + location.search);
      // "upgrade" ensures this session is always recorded (not sampled out)
      window.clarity("upgrade", "SPA navigation");
    };

    // On first render the script may still be loading — retry briefly
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!window.clarity) {
        const t = setTimeout(notify, 1500);
        return () => clearTimeout(t);
      }
    }

    notify();
  }, [location.pathname, location.search]);

  return null;
}
