import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/**
 * Notifies Microsoft Clarity of virtual page navigations in the SPA,
 * preventing "broken" or single-page recordings.
 */
export default function ClarityPageView() {
  const location = useLocation();

  useEffect(() => {
    if (window.clarity) {
      window.clarity("set", "page", location.pathname);
      window.clarity("upgrade", "SPA");
    }
  }, [location.pathname]);

  return null;
}
