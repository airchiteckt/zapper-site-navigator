import { lazy, ComponentType } from "react";

/**
 * Wrap React.lazy with automatic recovery from "Failed to fetch dynamically imported module"
 * errors. This typically happens after a new deploy: the user has the old index.html cached
 * and references chunk hashes that no longer exist on the server.
 *
 * Strategy:
 *  1. If the dynamic import fails, force a single hard reload (flag stored in sessionStorage
 *     so we don't loop infinitely if the failure is genuine).
 *  2. After a successful load, clear the flag so future stale-deploy errors can recover again.
 */
const RELOAD_FLAG = "lovable:chunk-reload-attempted";

export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      const mod = await factory();
      // Successful load → clear the flag so a future stale deploy can trigger a reload again
      try {
        sessionStorage.removeItem(RELOAD_FLAG);
      } catch {}
      return mod;
    } catch (err: any) {
      const msg = String(err?.message || err || "");
      const isChunkError =
        /Failed to fetch dynamically imported module/i.test(msg) ||
        /Loading chunk \d+ failed/i.test(msg) ||
        /Importing a module script failed/i.test(msg) ||
        /error loading dynamically imported module/i.test(msg);

      if (isChunkError) {
        let alreadyReloaded = false;
        try {
          alreadyReloaded = sessionStorage.getItem(RELOAD_FLAG) === "1";
        } catch {}

        if (!alreadyReloaded) {
          try {
            sessionStorage.setItem(RELOAD_FLAG, "1");
          } catch {}
          // Hard reload to fetch fresh index.html with current chunk hashes
          window.location.reload();
          // Return a never-resolving promise to keep React's Suspense boundary in fallback
          // until the reload happens.
          return new Promise<never>(() => {});
        }
      }
      throw err;
    }
  });
}
