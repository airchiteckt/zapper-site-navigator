import { useAnalytics } from "@/hooks/useAnalytics";

/**
 * Mounted dentro BrowserRouter, traccia pageview/scroll/tempo su ogni route change.
 */
export default function AnalyticsTracker() {
  useAnalytics();
  return null;
}
