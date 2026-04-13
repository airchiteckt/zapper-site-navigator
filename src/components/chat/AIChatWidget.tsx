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

/* ─── Shared message list ─── */
function ChatMessages({ messages, isLoading, bottomRef }: { messages: Msg[]; isLoading: boolean; bottomRef: React.RefObject<HTMLDivElement> }) {
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

  const [open, setOpen] = useState(false);
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
  const sessionIdRef = useRef<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  /* ─── Popup after 20s ─── */
  useEffect(() => {
    if (popupAlreadyDismissed || hasSubmittedBefore) return;
    let shown = false;
    const show = () => { if (!shown) { shown = true; setShowPopup(true); } };

    const timer = setTimeout(show, 35000);

    const onScroll = () => {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPct >= 0.6) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, [popupAlreadyDismissed, hasSubmittedBefore]);

  /* ─── Mobile bubble after 15s ─── */
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;
    const timer = setTimeout(() => {
      setShowMobileBubble(true);
      setTimeout(() => setShowMobileBubble(false), 5000);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => { if (open) setShowPulse(false); }, [open]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

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
        body: JSON.stringify({ messages: allMessages, lang }),
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

  /* ─── Send sound ─── */
  const playSendSound = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch {}
  }, []);

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
      localStorage.setItem(VISITOR_SUBMITTED_KEY, "true");

      // Save phone as lead
      supabase.from("datasheet_requests").insert({
        first_name: "-", last_name: "-", email: "-", phone: text.trim(),
      }).then(() => {});
      // Send notification to both addresses
      const callbackNotification = {
        name: "Richiesta di richiamata",
        email: "info@smokezapper.it",
        phone: text.trim(),
        source: "Chat AI ZAPPER® - Callback",
        message: "Richiesta di richiamata dal popup del sito.",
      };
      supabase.functions.invoke('send-email', {
        body: {
          to: ['info@smokezapper.it', 'stanislaoelefante@gmail.com'],
          subject: `📞 Richiesta di richiamata: ${text.trim()}`,
          html: `<h2>Nuova richiesta di richiamata</h2><p><strong>Telefono:</strong> ${text.trim()}</p><p><strong>Fonte:</strong> Chat AI ZAPPER® - Popup callback</p><p><strong>Data:</strong> ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}</p>`,
          from: 'ZAPPER® <info@email.smokezapper.it>',
          replyTo: 'info@smokezapper.it',
        },
      });

      ensureSession().then(async (sid) => {
        if (!sid) return;
        saveMessage(sid, "user", text.trim());
        saveMessage(sid, "assistant", confirmMsg);
        try { await supabase.from("chat_sessions").update({ contact_submitted: true, visitor_phone: text.trim() }).eq("id", sid); } catch {}
      });
      return;
    }

    /* Normal chat */
    setMessages((prev) => {
      const updated = [...prev, userMsg];
      callAI(updated);
      return updated;
    });
    ensureSession().then((sid) => { if (sid) saveMessage(sid, "user", text.trim()); });
  }, [isLoading, callbackMode, lang, callAI, ensureSession, saveMessage, playSendSound]);

  const placeholder = PLACEHOLDER[lang] || PLACEHOLDER.it;

  return (
    <>
      {/* ─── Floating callback card near FAB ─── */}
      {showPopup && !open && (
        <>
          {/* Desktop: anchored above FAB */}
          <div className="fixed bottom-24 right-6 z-[60] hidden md:block animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-card rounded-2xl shadow-2xl p-5 w-72 border border-border">
              <div className="flex items-start justify-between mb-3">
                <p className="text-base font-semibold text-foreground pr-2">
                  {POPUP_TITLE[lang] || POPUP_TITLE.it}
                </p>
                <button onClick={dismissPopup} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors flex-shrink-0">
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
              <hr className="border-border mb-3" />
              <button onClick={acceptCallback} className="block w-full text-left text-accent font-semibold text-base py-1.5 hover:opacity-80 transition-opacity">
                {POPUP_YES[lang] || POPUP_YES.it}
              </button>
              <button onClick={dismissPopup} className="block w-full text-left text-accent font-semibold text-base py-1.5 hover:opacity-80 transition-opacity">
                {POPUP_NO[lang] || POPUP_NO.it}
              </button>
            </div>
          </div>
          {/* Mobile: anchored above FAB */}
          <div className="fixed bottom-20 right-4 z-[60] md:hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-card rounded-2xl shadow-2xl p-5 w-72 border border-border">
              <div className="flex items-start justify-between mb-3">
                <p className="text-base font-semibold text-foreground pr-2">
                  {POPUP_TITLE[lang] || POPUP_TITLE.it}
                </p>
                <button onClick={dismissPopup} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors flex-shrink-0">
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
              <hr className="border-border mb-3" />
              <button onClick={acceptCallback} className="block w-full text-left text-accent font-semibold text-base py-1.5 hover:opacity-80 transition-opacity">
                {POPUP_YES[lang] || POPUP_YES.it}
              </button>
              <button onClick={dismissPopup} className="block w-full text-left text-accent font-semibold text-base py-1.5 hover:opacity-80 transition-opacity">
                {POPUP_NO[lang] || POPUP_NO.it}
              </button>
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

      {/* Mobile FAB + bubble */}
      {!open && (
        <div className="fixed bottom-5 right-4 z-50 flex items-center gap-2 md:hidden">
          {showMobileBubble && (
            <button onClick={() => { setShowMobileBubble(false); setOpen(true); }} className="bg-card text-foreground text-sm font-medium px-4 py-2 rounded-full shadow-lg border border-border animate-fade-in whitespace-nowrap">
              {MOBILE_BUBBLE[lang] || MOBILE_BUBBLE.it}
            </button>
          )}
          <button onClick={() => { setShowMobileBubble(false); setOpen(true); }} className="w-12 h-12 rounded-full bg-accent text-accent-foreground shadow-lg flex items-center justify-center relative" aria-label="Apri assistente AI">
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Chat panel */}
      {open && (
        <>
          {/* Mobile fullscreen */}
          <div className="fixed inset-0 z-50 bg-card flex flex-col md:hidden" style={{ height: "100dvh" }}>
            <ChatHeader lang={lang} onClose={() => setOpen(false)} mobile />
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <ChatMessages messages={messages} isLoading={isLoading} bottomRef={bottomRef} />
            </div>
            <ChatInput inputRef={inputRef} input={input} setInput={setInput} onSend={() => send(input)} disabled={isLoading} placeholder={placeholder} mobile />
          </div>

          {/* Desktop floating panel */}
          <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-2rem)] max-w-md bg-card border border-border rounded-2xl shadow-2xl flex-col overflow-hidden transform-gpu hidden md:flex" style={{ height: "min(500px, calc(100dvh - 10rem))" }}>
            <ChatHeader lang={lang} onClose={() => setOpen(false)} />
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <ChatMessages messages={messages} isLoading={isLoading} bottomRef={bottomRef} />
            </div>
            <ChatInput inputRef={inputRef} input={input} setInput={setInput} onSend={() => send(input)} disabled={isLoading} placeholder={placeholder} />
          </div>
        </>
      )}
    </>
  );
}
