import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { sendContactEmails } from "@/lib/emailService";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/zapper-chat`;
const VISITOR_ID_KEY = "zapper_visitor_id";
const VISITOR_NAME_KEY = "zapper_visitor_name";
const VISITOR_SUBMITTED_KEY = "zapper_contact_submitted";
const POPUP_DISMISSED_KEY = "zapper_popup_dismissed";
const LEAD_CAPTURED_KEY = "zapper_lead_captured";

type Msg = { role: "user" | "assistant"; content: string };

function getOrCreateVisitorId(): string {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) { id = crypto.randomUUID(); localStorage.setItem(VISITOR_ID_KEY, id); }
  return id;
}

function getBrowserLang(): string {
  const pathLang = window.location.pathname.split("/").filter(Boolean)[0];
  const supported = ["it", "en", "fr", "de", "es"];
  if (pathLang && supported.includes(pathLang.toLowerCase())) return pathLang.toLowerCase();
  return "it";
}

/* ─── i18n strings ─── */
const WELCOME: Record<string, string> = {
  it: "Ciao! 👋 Sono l'assistente ZAPPER®. Descrivi il tuo impianto o problema e ti suggerirò la soluzione più adatta.",
  en: "Hello! 👋 I'm the ZAPPER® assistant. Describe your system or issue and I'll suggest the best solution!",
  fr: "Bonjour! 👋 Je suis l'assistant ZAPPER®. Décrivez votre installation ou votre problème !",
  de: "Hallo! 👋 Ich bin der ZAPPER®-Assistent. Beschreiben Sie Ihre Anlage oder Ihr Problem!",
  es: "¡Hola! 👋 Soy el asistente ZAPPER®. ¡Describe tu instalación o problema!",
};
const WELCOME_BACK: Record<string, string> = {
  it: "Bentornato! 👋 Come posso aiutarti oggi?",
  en: "Welcome back! 👋 How can I help you today?",
  fr: "Content de vous revoir ! 👋 Comment puis-je vous aider ?",
  de: "Willkommen zurück! 👋 Wie kann ich Ihnen heute helfen?",
  es: "¡Bienvenido de nuevo! 👋 ¿Cómo puedo ayudarte hoy?",
};
const CALLBACK_ASK_PHONE: Record<string, string> = {
  it: "Sarà fatto! 📞 Qual è il tuo numero di telefono?",
  en: "Sure thing! 📞 What's your phone number?",
  fr: "Avec plaisir ! 📞 Quel est votre numéro de téléphone ?",
  de: "Sehr gern! 📞 Wie lautet Ihre Telefonnummer?",
  es: "¡Por supuesto! 📞 ¿Cuál es tu número de teléfono?",
};
const CALLBACK_CONFIRM: Record<string, string> = {
  it: "Perfetto! Ti chiameremo il prima possibile 🤙",
  en: "Got it! We'll call you as soon as possible 🤙",
  fr: "Parfait ! Nous vous appellerons dès que possible 🤙",
  de: "Perfekt! Wir rufen Sie so schnell wie möglich an 🤙",
  es: "¡Perfecto! Te llamaremos lo antes posible 🤙",
};
const POPUP_TITLE: Record<string, string> = {
  it: "Vorresti che ti chiamassimo? 📲",
  en: "Would you like us to call you? 📲",
  fr: "Souhaitez-vous qu'on vous appelle ? 📲",
  de: "Möchten Sie, dass wir Sie anrufen? 📲",
  es: "¿Te gustaría que te llamemos? 📲",
};
const POPUP_YES: Record<string, string> = {
  it: "Sì, grazie!", en: "Yes, please!", fr: "Oui, merci !", de: "Ja, bitte!", es: "¡Sí, por favor!",
};
const POPUP_NO: Record<string, string> = {
  it: "No, grazie.", en: "No, thanks.", fr: "Non, merci.", de: "Nein, danke.", es: "No, gracias.",
};
const MOBILE_BUBBLE: Record<string, string> = {
  it: "💬 Chiedimi tutto!", en: "💬 Ask me anything!", fr: "💬 Demandez-moi tout !", de: "💬 Frag mich alles!", es: "💬 ¡Pregúntame todo!",
};
const PLACEHOLDER: Record<string, string> = {
  it: "Scrivi il tuo messaggio...", en: "Type your message...", fr: "Écrivez votre message...", de: "Schreiben Sie Ihre Nachricht...", es: "Escribe tu mensaje...",
};
const SUBTITLE: Record<string, string> = {
  it: "Consulenza tecnica in tempo reale", en: "Real-time technical support", fr: "Conseil technique en temps réel", de: "Technische Beratung in Echtzeit", es: "Asesoría técnica en tiempo real",
};
const LEAD_GATE_TITLE: Record<string, string> = {
  it: "Prima di continuare, lasciaci i tuoi dati 📋",
  en: "Before we continue, leave us your details 📋",
  fr: "Avant de continuer, laissez-nous vos coordonnées 📋",
  de: "Bevor wir fortfahren, hinterlassen Sie uns Ihre Daten 📋",
  es: "Antes de continuar, déjanos tus datos 📋",
};
const LEAD_GATE_NAME: Record<string, string> = {
  it: "Nome e cognome", en: "Full name", fr: "Nom complet", de: "Vollständiger Name", es: "Nombre completo",
};
const LEAD_GATE_PHONE: Record<string, string> = {
  it: "Numero di telefono", en: "Phone number", fr: "Numéro de téléphone", de: "Telefonnummer", es: "Número de teléfono",
};
const LEAD_GATE_SUBMIT: Record<string, string> = {
  it: "Continua la consulenza →", en: "Continue consultation →", fr: "Continuer la consultation →", de: "Beratung fortsetzen →", es: "Continuar la consulta →",
};
const LEAD_GATE_THANKS: Record<string, string> = {
  it: "Grazie! Ora possiamo continuare la tua consulenza tecnica personalizzata 🚀",
  en: "Thanks! Now we can continue your personalized technical consultation 🚀",
  fr: "Merci ! Nous pouvons maintenant poursuivre votre consultation technique personnalisée 🚀",
  de: "Danke! Jetzt können wir Ihre personalisierte technische Beratung fortsetzen 🚀",
  es: "¡Gracias! Ahora podemos continuar tu consulta técnica personalizada 🚀",
};

/* ─── Mobile draggable FAB ─── */
function MobileDraggableFAB({ lang, showBubble, onOpen }: { lang: string; showBubble: boolean; onOpen: () => void }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number; startX: number; startY: number } | null>(null);
  const moved = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    dragStart.current = { x: pos.x, y: pos.y, startX: t.clientX, startY: t.clientY };
    moved.current = false;
  }, [pos]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragStart.current) return;
    const t = e.touches[0];
    const dx = t.clientX - dragStart.current.startX;
    const dy = t.clientY - dragStart.current.startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      moved.current = true;
      setDragging(true);
    }
    setPos({ x: dragStart.current.x + dx, y: dragStart.current.y + dy });
  }, []);

  const handleTouchEnd = useCallback(() => {
    setDragging(false);
    if (!moved.current) onOpen();
    dragStart.current = null;
  }, [onOpen]);

  return (
    <div
      className="fixed z-50 flex items-center gap-2 md:hidden"
      style={{
        bottom: `calc(4.5rem + ${-pos.y}px)`,
        right: `calc(1rem + ${-pos.x}px)`,
        transition: dragging ? "none" : "transform 0.2s ease",
      }}
    >
      {showBubble && !dragging && (
        <button
          onClick={onOpen}
          className="bg-card text-foreground text-sm font-medium px-4 py-2 rounded-full shadow-lg border border-border animate-fade-in whitespace-nowrap"
        >
          {MOBILE_BUBBLE[lang] || MOBILE_BUBBLE.it}
        </button>
      )}
      <button
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`w-12 h-12 rounded-full bg-accent text-accent-foreground shadow-lg flex items-center justify-center relative ${dragging ? "scale-110" : ""} transition-transform`}
        aria-label="Apri assistente AI"
      >
        <MessageCircle className="w-5 h-5" />
      </button>
    </div>
  );
}

/* ─── Inline lead gate form ─── */
function LeadGateForm({ lang, onSubmit }: { lang: string; onSubmit: (name: string, phone: string) => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const canSubmit = name.trim().length >= 2 && phone.trim().length >= 6;

  return (
    <div className="flex gap-2 justify-start">
      <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
        <Bot className="w-4 h-4 text-accent" />
      </div>
      <div className="max-w-[85%] rounded-2xl bg-muted text-foreground rounded-bl-md px-4 py-3 space-y-3">
        <p className="text-sm font-semibold">{LEAD_GATE_TITLE[lang] || LEAD_GATE_TITLE.it}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={LEAD_GATE_NAME[lang] || LEAD_GATE_NAME.it}
          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/50"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={LEAD_GATE_PHONE[lang] || LEAD_GATE_PHONE.it}
          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/50"
        />
        <button
          onClick={() => canSubmit && onSubmit(name.trim(), phone.trim())}
          disabled={!canSubmit}
          className="w-full bg-accent text-accent-foreground text-sm font-semibold py-2.5 rounded-lg disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          {LEAD_GATE_SUBMIT[lang] || LEAD_GATE_SUBMIT.it}
        </button>
      </div>
    </div>
  );
}

/* ─── Shared message list ─── */
function ChatMessages({ messages, isLoading, bottomRef, showLeadForm, lang, onLeadSubmit }: {
  messages: Msg[]; isLoading: boolean; bottomRef: React.RefObject<HTMLDivElement>;
  showLeadForm: boolean; lang: string; onLeadSubmit: (name: string, phone: string) => void;
}) {
  return (
    <>
      {messages.map((msg, i) => (
        <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
          {msg.role === "assistant" && (
            <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Bot className="w-4 h-4 text-accent" />
            </div>
          )}
          <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${msg.role === "user" ? "bg-accent text-accent-foreground rounded-br-md" : "bg-muted text-foreground rounded-bl-md"}`}>
            {msg.role === "assistant" ? (
              <div className="prose prose-sm max-w-none [&_p]:m-0"><ReactMarkdown>{msg.content}</ReactMarkdown></div>
            ) : msg.content}
          </div>
          {msg.role === "user" && (
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <User className="w-4 h-4 text-primary" />
            </div>
          )}
        </div>
      ))}
      {isLoading && messages[messages.length - 1]?.role === "user" && (
        <div className="flex gap-2">
          <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 text-accent" />
          </div>
          <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      )}
      {showLeadForm && <LeadGateForm lang={lang} onSubmit={onLeadSubmit} />}
      <div ref={bottomRef} />
    </>
  );
}

/* ─── Chat header ─── */
function ChatHeader({ lang, onClose, mobile }: { lang: string; onClose: () => void; mobile?: boolean }) {
  return (
    <div className="bg-accent text-accent-foreground px-4 py-3 flex items-center gap-3 flex-shrink-0">
      <Bot className="w-5 h-5" />
      <div>
        <p className="font-semibold text-sm">Assistente ZAPPER®</p>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <p className="text-xs opacity-90">{SUBTITLE[lang] || SUBTITLE.it}</p>
        </div>
      </div>
      <button onClick={onClose} className={`ml-auto hover:opacity-70 ${mobile ? "p-2 -mr-2" : ""}`}>
        <X className={mobile ? "w-6 h-6" : "w-5 h-5"} />
      </button>
    </div>
  );
}

/* ─── Chat input bar ─── */
function ChatInput({ inputRef, input, setInput, onSend, disabled, placeholder, mobile }: {
  inputRef: React.RefObject<HTMLInputElement>; input: string; setInput: (v: string) => void;
  onSend: () => void; disabled: boolean; placeholder: string; mobile?: boolean;
}) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSend(); }}
      className={`border-t border-border px-3 py-2 flex gap-2 ${mobile ? "flex-shrink-0" : ""}`}
      style={mobile ? { paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" } : undefined}
    >
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className={`flex-1 bg-transparent outline-none placeholder:text-muted-foreground/60 ${mobile ? "text-base" : "text-sm"}`}
        disabled={disabled}
        autoComplete="off"
      />
      <Button type="submit" size="icon" variant="ghost" disabled={!input.trim() || disabled} className="h-8 w-8 text-accent hover:text-accent">
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}

/* ═══════════════════════════════════════════ */
/*              MAIN WIDGET                    */
/* ═══════════════════════════════════════════ */
export default function AIChatWidget() {
  const [lang] = useState(getBrowserLang);
  const [visitorId] = useState(getOrCreateVisitorId);

  const savedName = localStorage.getItem(VISITOR_NAME_KEY);
  const hasSubmittedBefore = localStorage.getItem(VISITOR_SUBMITTED_KEY) === "true";
  const popupAlreadyDismissed = localStorage.getItem(POPUP_DISMISSED_KEY) === "true";
  const leadAlreadyCaptured = localStorage.getItem(LEAD_CAPTURED_KEY) === "true";

  const [open, setOpen] = useState(false);

  // Allow external components to open the chat via custom event
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-zapper-chat", handler);
    return () => window.removeEventListener("open-zapper-chat", handler);
  }, []);
  const [messages, setMessages] = useState<Msg[]>([{
    role: "assistant",
    content: hasSubmittedBefore
      ? savedName ? (WELCOME_BACK[lang] || WELCOME_BACK.it).replace("!", ` ${savedName}!`) : (WELCOME_BACK[lang] || WELCOME_BACK.it)
      : (WELCOME[lang] || WELCOME.it),
  }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [showMobileBubble, setShowMobileBubble] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [callbackMode, setCallbackMode] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(hasSubmittedBefore);
  const [leadCaptured, setLeadCaptured] = useState(leadAlreadyCaptured);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [pendingUserMsg, setPendingUserMsg] = useState<Msg | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const userMsgCountRef = useRef(0);

  /* ─── Session persistence ─── */
  const ensureSession = useCallback(async () => {
    if (sessionIdRef.current) return sessionIdRef.current;
    try {
      const { data, error } = await supabase
        .from("chat_sessions")
        .insert({ visitor_id: visitorId, page_url: window.location.pathname, user_agent: navigator.userAgent.slice(0, 500) })
        .select("id").single();
      if (error) throw error;
      sessionIdRef.current = data.id;
      return data.id;
    } catch (err) { console.error("Failed to create chat session:", err); return null; }
  }, [visitorId]);

  const saveMessage = useCallback(async (sid: string | null, role: string, content: string) => {
    if (!sid) return;
    try {
      await supabase.from("chat_messages").insert({ session_id: sid, role, content });
      await supabase.from("chat_sessions").update({ message_count: messages.length + 1 }).eq("id", sid);
    } catch (err) { console.error("Failed to save message:", err); }
  }, [messages.length]);

  /* ─── Popup after 25s or 60% scroll ─── */
  useEffect(() => {
    if (popupAlreadyDismissed || hasSubmittedBefore) return;
    let shown = false;
    const show = () => {
      if (!shown) {
        shown = true;
        setShowPopup(true);
        // Play notification sound
        try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          if (ctx.state === 'suspended') ctx.resume();
          const now = ctx.currentTime;
          [0, 0.15].forEach((delay, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(i === 0 ? 523 : 659, now + delay);
            gain.gain.setValueAtTime(0.2, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.3);
            osc.start(now + delay);
            osc.stop(now + delay + 0.3);
          });
        } catch {}
        // Vibrate on mobile
        try { navigator.vibrate?.([100, 50, 100]); } catch {}
      }
    };

    const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    const delay = isMobile ? 20000 : 25000;
    const timer = setTimeout(show, delay);

    const onScroll = () => {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPct >= 0.6) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, [popupAlreadyDismissed, hasSubmittedBefore]);

  useEffect(() => { if (open) setShowPulse(false); }, [open]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, showLeadForm]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  /* Mobile auto-open chat removed: at 20s mobile users now see the callback popup instead. */


  /* ─── Popup handlers ─── */
  const dismissPopup = useCallback(() => {
    setShowPopup(false);
    localStorage.setItem(POPUP_DISMISSED_KEY, "true");
  }, []);

  const acceptCallback = useCallback(() => {
    dismissPopup();
    setCallbackMode(true);
    setOpen(true);
    setShowMobileBubble(false);
    const popupQ = POPUP_TITLE[lang] || POPUP_TITLE.it;
    const yesText = POPUP_YES[lang] || POPUP_YES.it;
    const askPhone = CALLBACK_ASK_PHONE[lang] || CALLBACK_ASK_PHONE.it;
    setMessages([
      { role: "assistant", content: popupQ },
      { role: "user", content: yesText },
      { role: "assistant", content: askPhone },
    ]);
  }, [lang, dismissPopup]);

  /* ─── AI call ─── */
  const callAI = useCallback(async (allMessages: Msg[]) => {
    setIsLoading(true);
    const sid = await ensureSession();
    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && assistantSoFar.startsWith(last.content.slice(0, 10)))
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ messages: allMessages, lang, leadCaptured }),
      });
      if (!resp.ok || !resp.body) throw new Error("Stream failed");
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });
        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try { const p = JSON.parse(jsonStr); const c = p.choices?.[0]?.delta?.content; if (c) upsertAssistant(c); }
          catch { textBuffer = line + "\n" + textBuffer; break; }
        }
      }
      if (assistantSoFar && sid) saveMessage(sid, "assistant", assistantSoFar);
    } catch { upsertAssistant("Mi dispiace, si è verificato un errore. Riprova o contattaci direttamente."); }
    finally { setIsLoading(false); }
  }, [lang, ensureSession, saveMessage]);

  /* ─── Sound helpers ─── */
  const playTone = useCallback((freq1: number, freq2: number, duration = 0.2, volume = 0.15) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(freq1, ctx.currentTime);
      osc.frequency.setValueAtTime(freq2, ctx.currentTime + duration * 0.4);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {}
  }, []);

  const playSendSound = useCallback(() => playTone(880, 1100), [playTone]);

  const playNotificationSound = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;
      // Two-tone chime
      [0, 0.15].forEach((delay, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(i === 0 ? 523 : 659, now + delay);
        gain.gain.setValueAtTime(0.2, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.3);
        osc.start(now + delay);
        osc.stop(now + delay + 0.3);
      });
    } catch {}
  }, []);

  /* ─── Lead form submit handler ─── */
  const handleLeadSubmit = useCallback((name: string, phone: string) => {
    setShowLeadForm(false);
    setLeadCaptured(true);
    localStorage.setItem(LEAD_CAPTURED_KEY, "true");
    localStorage.setItem(VISITOR_NAME_KEY, name);
    localStorage.setItem(VISITOR_SUBMITTED_KEY, "true");
    setContactSubmitted(true);

    const thanksMsg = LEAD_GATE_THANKS[lang] || LEAD_GATE_THANKS.it;
    setMessages((prev) => [...prev, { role: "assistant", content: thanksMsg }]);
    playSendSound();

    // Save lead
    supabase.from("datasheet_requests").insert({
      first_name: name.split(" ")[0] || name,
      last_name: name.split(" ").slice(1).join(" ") || "-",
      email: "-",
      phone,
    }).then(() => {});

    // Salva il lead in form_submissions (visibile in /admin/leads) + invia email branded
    sendContactEmails({
      name,
      email: "non fornita",
      phone,
      source: "chat_lead_gate",
      message: "Lead acquisito tramite Chat AI - Lead Gate",
      extra: { page_url: window.location.pathname },
    }).catch((err) => console.error("sendContactEmails (lead gate) failed:", err));

    // GTM dataLayer event - invio form chat assistente
    try {
      (window as any).dataLayer = (window as any).dataLayer || [];
      const payload = {
        event: "invio_chat_assistente",
        form_source: "chat_lead_gate",
        page_url: window.location.pathname,
        lang,
      };
      (window as any).dataLayer.push(payload);
      console.log("[GTM dataLayer push]", payload);
    } catch (e) { console.warn("[GTM] push failed", e); }

    // Update session
    ensureSession().then(async (sid) => {
      if (!sid) return;
      try {
        await supabase.from("chat_sessions").update({
          contact_submitted: true,
          visitor_name: name,
          visitor_phone: phone,
        }).eq("id", sid);
      } catch {}
    });

    // Resume pending message if any
    if (pendingUserMsg) {
      const msg = pendingUserMsg;
      setPendingUserMsg(null);
      setTimeout(() => {
        setMessages((prev) => {
          const updated = [...prev, msg];
          callAI(updated);
          return updated;
        });
        ensureSession().then((sid) => { if (sid) saveMessage(sid, "user", msg.content); });
      }, 800);
    }
  }, [lang, playSendSound, pendingUserMsg, callAI, ensureSession, saveMessage]);

  /* ─── Send ─── */
  const send = useCallback((text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    setInput("");
    playSendSound();

    /* Callback mode: user is giving their phone number */
    if (callbackMode) {
      const confirmMsg = CALLBACK_CONFIRM[lang] || CALLBACK_CONFIRM.it;
      setMessages((prev) => [...prev, userMsg, { role: "assistant" as const, content: confirmMsg }]);
      setCallbackMode(false);
      setContactSubmitted(true);
      setLeadCaptured(true);
      localStorage.setItem(VISITOR_SUBMITTED_KEY, "true");
      localStorage.setItem(LEAD_CAPTURED_KEY, "true");

      const phoneTrim = text.trim();
      const pageUrl = window.location.pathname;

      // 1) PRIORITÀ: salvataggio immediato e diretto in DB (non dipendente dalle email)
      //    così la richiesta non viene mai persa, anche se l'utente chiude la tab.
      supabase.from("form_submissions").insert({
        source: "chat_callback_popup",
        name: "Richiesta richiamata",
        phone: phoneTrim,
        message: "Richiesta di richiamata dal popup della Chat AI",
        page_url: pageUrl,
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
        extra: { page_url: pageUrl },
      }).then(({ error }) => {
        if (error) console.error("[callback] form_submissions insert failed:", error);
      });

      // 2) Crea/aggiorna chat_session così la richiesta appare anche in /admin/chat-logs
      (async () => {
        try {
          let sid = sessionIdRef.current;
          if (!sid) {
            const { data, error } = await supabase
              .from("chat_sessions")
              .insert({
                visitor_id: visitorId,
                page_url: pageUrl,
                user_agent: navigator.userAgent.slice(0, 500),
                visitor_phone: phoneTrim,
                visitor_name: "Richiesta richiamata",
                contact_submitted: true,
                message_count: 1,
              })
              .select("id").single();
            if (error) throw error;
            sid = data.id;
            sessionIdRef.current = sid;
          } else {
            await supabase.from("chat_sessions").update({
              visitor_phone: phoneTrim,
              visitor_name: "Richiesta richiamata",
              contact_submitted: true,
            }).eq("id", sid);
          }
          // Salva i messaggi
          await supabase.from("chat_messages").insert([
            { session_id: sid, role: "user", content: phoneTrim },
            { session_id: sid, role: "assistant", content: confirmMsg },
          ]);
        } catch (err) {
          console.error("[callback] chat_session save failed:", err);
        }
      })();

      // 3) Backup legacy: datasheet_requests
      supabase.from("datasheet_requests").insert({
        first_name: "-", last_name: "-", email: "-", phone: phoneTrim,
      }).then(() => {});

      // 4) Email branded (fire-and-forget, non blocca il salvataggio)
      sendContactEmails({
        name: "Richiesta richiamata",
        email: "non fornita",
        phone: phoneTrim,
        source: "chat_callback_popup",
        message: "Richiesta di richiamata dal popup della Chat AI",
        extra: { page_url: pageUrl },
      }).catch((err) => console.error("sendContactEmails (callback) failed:", err));

      // GTM dataLayer event - invio form chat assistente
      try {
        (window as any).dataLayer = (window as any).dataLayer || [];
        const payload = {
          event: "invio_chat_assistente",
          form_source: "chat_callback_popup",
          page_url: window.location.pathname,
          lang,
        };
        (window as any).dataLayer.push(payload);
        console.log("[GTM dataLayer push]", payload);
      } catch (e) { console.warn("[GTM] push failed", e); }

      // (chat_session + messaggi già salvati sopra in modo prioritario)
      return;
    }

    /* Lead gate: show form after first user message if not captured yet */
    userMsgCountRef.current += 1;
    if (!leadCaptured && userMsgCountRef.current === 1) {
      // Show the user message, get AI response, then show lead form
      setMessages((prev) => {
        const updated = [...prev, userMsg];
        // Call AI first, then show lead form after response
        (async () => {
          setIsLoading(true);
          const sid = await ensureSession();
          let assistantSoFar = "";
          const upsertAssistant = (chunk: string) => {
            assistantSoFar += chunk;
            setMessages((prev2) => {
              const last = prev2[prev2.length - 1];
              if (last?.role === "assistant" && assistantSoFar.startsWith(last.content.slice(0, 10)))
                return prev2.map((m, i) => i === prev2.length - 1 ? { ...m, content: assistantSoFar } : m);
              return [...prev2, { role: "assistant", content: assistantSoFar }];
            });
          };
          try {
            const resp = await fetch(CHAT_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
              body: JSON.stringify({ messages: updated, lang, leadCaptured: true }),
            });
            if (!resp.ok || !resp.body) throw new Error("Stream failed");
            const reader = resp.body.getReader();
            const decoder = new TextDecoder();
            let textBuffer = "";
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              textBuffer += decoder.decode(value, { stream: true });
              let newlineIndex: number;
              while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
                let line = textBuffer.slice(0, newlineIndex);
                textBuffer = textBuffer.slice(newlineIndex + 1);
                if (line.endsWith("\r")) line = line.slice(0, -1);
                if (line.startsWith(":") || line.trim() === "") continue;
                if (!line.startsWith("data: ")) continue;
                const jsonStr = line.slice(6).trim();
                if (jsonStr === "[DONE]") break;
                try { const p = JSON.parse(jsonStr); const c = p.choices?.[0]?.delta?.content; if (c) upsertAssistant(c); }
                catch { textBuffer = line + "\n" + textBuffer; break; }
              }
            }
            if (assistantSoFar && sid) saveMessage(sid, "assistant", assistantSoFar);
          } catch { upsertAssistant("Mi dispiace, si è verificato un errore. Riprova o contattaci direttamente."); }
          finally {
            setIsLoading(false);
            // Show lead form after AI response
            setShowLeadForm(true);
          }
        })();
        return updated;
      });
      ensureSession().then((sid) => { if (sid) saveMessage(sid, "user", text.trim()); });
      return;
    }

    /* Normal chat (lead already captured) */
    setMessages((prev) => {
      const updated = [...prev, userMsg];
      callAI(updated);
      return updated;
    });
    ensureSession().then((sid) => { if (sid) saveMessage(sid, "user", text.trim()); });
  }, [isLoading, callbackMode, lang, callAI, ensureSession, saveMessage, playSendSound, leadCaptured]);

  const placeholder = PLACEHOLDER[lang] || PLACEHOLDER.it;
  const inputDisabled = isLoading || showLeadForm;

  return (
    <>
      {/* ─── Floating callback card near FAB ─── */}
      {showPopup && !open && (
        <>
          {/* Desktop */}
          <div className="fixed bottom-24 right-6 z-[60] hidden md:block animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-card rounded-2xl shadow-2xl p-5 w-72 border border-border">
              <div className="flex items-start justify-between mb-3">
                <p className="text-base font-semibold text-foreground pr-2">{POPUP_TITLE[lang] || POPUP_TITLE.it}</p>
                <button onClick={dismissPopup} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors flex-shrink-0">
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
              <hr className="border-border mb-3" />
              <button onClick={acceptCallback} className="block w-full text-left text-accent font-semibold text-base py-1.5 hover:opacity-80 transition-opacity">{POPUP_YES[lang] || POPUP_YES.it}</button>
              <button onClick={dismissPopup} className="block w-full text-left text-accent font-semibold text-base py-1.5 hover:opacity-80 transition-opacity">{POPUP_NO[lang] || POPUP_NO.it}</button>
            </div>
          </div>
          {/* Mobile */}
          <div className="fixed bottom-20 right-4 z-[60] md:hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-card rounded-2xl shadow-2xl p-5 w-72 border border-border">
              <div className="flex items-start justify-between mb-3">
                <p className="text-base font-semibold text-foreground pr-2">{POPUP_TITLE[lang] || POPUP_TITLE.it}</p>
                <button onClick={dismissPopup} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors flex-shrink-0">
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
              <hr className="border-border mb-3" />
              <button onClick={acceptCallback} className="block w-full text-left text-accent font-semibold text-base py-1.5 hover:opacity-80 transition-opacity">{POPUP_YES[lang] || POPUP_YES.it}</button>
              <button onClick={dismissPopup} className="block w-full text-left text-accent font-semibold text-base py-1.5 hover:opacity-80 transition-opacity">{POPUP_NO[lang] || POPUP_NO.it}</button>
            </div>
          </div>
        </>
      )}

      {/* Desktop FAB */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:shadow-xl transition-all items-center justify-center hover:scale-105 hidden md:flex"
        aria-label="Apri assistente AI"
      >
        {showPulse && !open && <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-30" />}
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Mobile FAB + bubble — draggable */}
      {!open && (
        <MobileDraggableFAB
          lang={lang}
          showBubble={showMobileBubble}
          onOpen={() => { setShowMobileBubble(false); setOpen(true); }}
        />
      )}

      {/* Chat panel */}
      {open && (
        <>
          {/* Mobile fullscreen */}
          <div className="fixed inset-0 z-50 bg-card flex flex-col md:hidden" style={{ height: "100dvh" }}>
            <ChatHeader lang={lang} onClose={() => setOpen(false)} mobile />
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <ChatMessages messages={messages} isLoading={isLoading} bottomRef={bottomRef} showLeadForm={showLeadForm} lang={lang} onLeadSubmit={handleLeadSubmit} />
            </div>
            <ChatInput inputRef={inputRef} input={input} setInput={setInput} onSend={() => send(input)} disabled={inputDisabled} placeholder={placeholder} mobile />
          </div>

          {/* Desktop floating panel */}
          <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-2rem)] max-w-md bg-card border border-border rounded-2xl shadow-2xl flex-col overflow-hidden transform-gpu hidden md:flex" style={{ height: "min(500px, calc(100dvh - 10rem))" }}>
            <ChatHeader lang={lang} onClose={() => setOpen(false)} />
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <ChatMessages messages={messages} isLoading={isLoading} bottomRef={bottomRef} showLeadForm={showLeadForm} lang={lang} onLeadSubmit={handleLeadSubmit} />
            </div>
            <ChatInput inputRef={inputRef} input={input} setInput={setInput} onSend={() => send(input)} disabled={inputDisabled} placeholder={placeholder} />
          </div>
        </>
      )}
    </>
  );
}
