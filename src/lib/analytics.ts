import { supabase } from "@/integrations/supabase/client";

const VISITOR_KEY = "zapper_visitor_id";
const SESSION_KEY = "zapper_session_id";
const SESSION_TS_KEY = "zapper_session_ts";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 min

function uuid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = uuid();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return uuid();
  }
}

function getSessionId(): string {
  try {
    const now = Date.now();
    const ts = parseInt(sessionStorage.getItem(SESSION_TS_KEY) || "0", 10);
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid || now - ts > SESSION_TIMEOUT_MS) {
      sid = uuid();
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    sessionStorage.setItem(SESSION_TS_KEY, String(now));
    return sid;
  } catch {
    return uuid();
  }
}

function detectDevice(): string {
  const ua = navigator.userAgent;
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  return "desktop";
}

let sessionInitialized = false;

async function ensureSession() {
  if (sessionInitialized) return;
  sessionInitialized = true;
  const visitorId = getVisitorId();
  const sessionId = getSessionId();
  const url = new URL(window.location.href);
  const params = url.searchParams;

  try {
    // Upsert session
    await supabase.from("analytics_sessions").upsert(
      {
        session_id: sessionId,
        visitor_id: visitorId,
        landing_page: window.location.pathname,
        referrer: document.referrer || null,
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        user_agent: navigator.userAgent,
        device_type: detectDevice(),
        language: navigator.language,
        last_activity_at: new Date().toISOString(),
      },
      { onConflict: "session_id", ignoreDuplicates: false }
    );
  } catch (err) {
    console.warn("[analytics] session init failed", err);
  }
}

export async function trackEvent(
  eventType: string,
  eventName?: string,
  metadata: Record<string, unknown> = {}
) {
  try {
    await ensureSession();
    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    await supabase.from("analytics_events").insert({
      session_id: sessionId,
      visitor_id: visitorId,
      event_type: eventType,
      event_name: eventName || null,
      page_url: window.location.pathname,
      page_title: document.title,
      metadata: metadata as never,
    });
  } catch (err) {
    // Silent fail — non vogliamo che il tracking rompa l'app
    console.warn("[analytics] event failed", err);
  }
}

export async function trackPageview() {
  await ensureSession();
  await trackEvent("pageview", null, {
    referrer: document.referrer || null,
    search: window.location.search || null,
  });
  // bump pageview count
  try {
    const sessionId = getSessionId();
    await supabase.rpc as never; // no-op placeholder
    const { data } = await supabase
      .from("analytics_sessions")
      .select("pageview_count")
      .eq("session_id", sessionId)
      .maybeSingle();
    const next = (data?.pageview_count || 0) + 1;
    await supabase
      .from("analytics_sessions")
      .update({ pageview_count: next, last_activity_at: new Date().toISOString() })
      .eq("session_id", sessionId);
  } catch {
    /* silent */
  }
}

export function trackCTA(name: string, metadata: Record<string, unknown> = {}) {
  return trackEvent("cta_click", name, metadata);
}

export function trackClick(name: string, metadata: Record<string, unknown> = {}) {
  return trackEvent("click", name, metadata);
}

export function trackFormStart(formName: string) {
  return trackEvent("form_start", formName);
}

export function trackFormSubmit(formName: string) {
  return trackEvent("form_submit", formName);
}

export function trackFormAbandon(formName: string, lastField: string, filledFields: string[]) {
  return trackEvent("form_abandon", formName, { lastField, filledFields });
}

export function trackScroll(depth: number) {
  return trackEvent("scroll", `${depth}%`, { depth });
}

export function trackTimeOnPage(seconds: number) {
  return trackEvent("time_on_page", null, { seconds });
}
