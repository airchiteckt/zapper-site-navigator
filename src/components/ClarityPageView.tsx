import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

/**
 * Notifies Microsoft Clarity of every virtual page navigation in the SPA.
 * - Waits for the Clarity script to be ready (it queues calls in window.clarity.q until loaded).
 * - Uses clarity("set", "page_path", ...) as a custom tag for segmentation.
 * - Uses clarity("event", "page_view") which IS the official way to trigger a new
 *   virtual pageview in Clarity for Single Page Applications.
 */
export default function ClarityPageView() {
  const location = useLocation();
  const lastTrackedRef = useRef<string | null>(null);

  useEffect(() => {
    const fullPath = location.pathname + location.search;

    // Avoid double-firing for the same URL (StrictMode, etc.)
    if (lastTrackedRef.current === fullPath) return;
    lastTrackedRef.current = fullPath;

    const notify = () => {
      if (typeof window === "undefined" || !window.clarity) return;
      try {
        // Custom tag (visible in Clarity dashboard filters)
        window.clarity("set", "page_path", fullPath);
        // Trigger a virtual pageview event for SPA navigation
        window.clarity("event", "page_view");
      } catch (err) {
        // Never let analytics break the app
        console.warn("[Clarity] tracking failed", err);
      }
    };

    // Clarity script may not be ready yet on initial load.
    // The script auto-creates window.clarity as a queueing function,
    // so calls are buffered until the real implementation loads.
    if (window.clarity) {
      notify();
    } else {
      // Poll briefly for the script to attach
      let attempts = 0;
      const interval = window.setInterval(() => {
        attempts++;
        if (window.clarity) {
          window.clearInterval(interval);
          notify();
        } else if (attempts > 20) {
          // Give up after ~4s
          window.clearInterval(interval);
        }
      }, 200);

      return () => window.clearInterval(interval);
    }
  }, [location.pathname, location.search]);

  return null;
}
