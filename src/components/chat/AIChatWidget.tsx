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

type Msg = { role: "user" | "assistant"; content: string };

function getOrCreateVisitorId(): string {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

function getBrowserLang(): string {
  // Try to get lang from URL prefix first
  const pathLang = window.location.pathname.split("/").filter(Boolean)[0];
  const supported = ["it", "en", "fr", "de", "es"];
  if (pathLang && supported.includes(pathLang.toLowerCase())) return pathLang.toLowerCase();
  return "it";
}

const WELCOME_MESSAGES: Record<string, string> = {
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

const INTRO_MESSAGES: Record<string, string> = {
  it: "Prima di risponderti, avrei bisogno cortesemente di queste informazioni. Presentiamoci! 😊",
  en: "Before I answer, I'd kindly need some information. Let's introduce ourselves! 😊",
  fr: "Avant de vous répondre, j'aurais besoin de quelques informations. Faisons connaissance ! 😊",
  de: "Bevor ich antworte, bräuchte ich bitte einige Informationen. Stellen wir uns vor! 😊",
  es: "Antes de responder, necesitaría amablemente esta información. ¡Presentémonos! 😊",
};

const FORM_LABELS: Record<string, { title: string; name: string; email: string; phone: string; submit: string; submitting: string }> = {
  it: { title: "📋 Lascia i tuoi dati per essere ricontattato:", name: "Nome e Cognome", email: "Email", phone: "Telefono", submit: "Invia i miei dati", submitting: "Invio..." },
  en: { title: "📋 Leave your details and we'll get back to you:", name: "Full Name", email: "Email", phone: "Phone", submit: "Send my details", submitting: "Sending..." },
  fr: { title: "📋 Laissez vos coordonnées, nous vous recontacterons :", name: "Nom complet", email: "Email", phone: "Téléphone", submit: "Envoyer mes données", submitting: "Envoi..." },
  de: { title: "📋 Hinterlassen Sie Ihre Daten, wir melden uns bei Ihnen:", name: "Vollständiger Name", email: "E-Mail", phone: "Telefon", submit: "Meine Daten senden", submitting: "Senden..." },
  es: { title: "📋 Deja tus datos y te contactaremos:", name: "Nombre completo", email: "Email", phone: "Teléfono", submit: "Enviar mis datos", submitting: "Enviando..." },
};

const THANK_YOU: Record<string, string> = {
  it: "Grazie! 🎉 Ora rispondo alla tua domanda...",
  en: "Thank you! 🎉 Now let me answer your question...",
  fr: "Merci ! 🎉 Maintenant, laissez-moi répondre à votre question...",
  de: "Danke! 🎉 Jetzt beantworte ich Ihre Frage...",
  es: "¡Gracias! 🎉 Ahora respondo a tu pregunta...",
};

const MOBILE_BUBBLE: Record<string, string> = {
  it: "💬 Chiedimi tutto!",
  en: "💬 Ask me anything!",
  fr: "💬 Demandez-moi tout !",
  de: "💬 Frag mich alles!",
  es: "💬 ¡Pregúntame todo!",
};

const PLACEHOLDER: Record<string, string> = {
  it: "Scrivi il tuo messaggio...",
  en: "Type your message...",
  fr: "Écrivez votre message...",
  de: "Schreiben Sie Ihre Nachricht...",
  es: "Escribe tu mensaje...",
};

function ContactForm({ onSubmitted, lang }: { onSubmitted: (name: string, email?: string, phone?: string) => void; lang: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const labels = FORM_LABELS[lang] || FORM_LABELS.it;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim() && !form.phone.trim()) return;
    setSubmitting(true);
    try {
      await supabase.from("datasheet_requests").insert({
        first_name: form.name.split(" ")[0] || "-",
        last_name: form.name.split(" ").slice(1).join(" ") || "-",
        email: form.email || "-",
        phone: form.phone || "-",
      });

      sendContactEmails({
        name: form.name || "Visitatore",
        email: form.email,
        phone: form.phone,
        source: "Chat AI ZAPPER®",
        message: "Contatto generato dall'assistente AI del sito.",
      });

      onSubmitted(form.name.split(" ")[0] || "", form.email || undefined, form.phone || undefined);
    } catch {
      onSubmitted(form.name.split(" ")[0] || "", form.email || undefined, form.phone || undefined);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-accent/5 border border-accent/20 rounded-xl p-3 space-y-2 my-1">
      <p className="text-xs font-medium text-foreground">{labels.title}</p>
      <input
        placeholder={labels.name}
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        className="w-full text-base md:text-sm rounded-lg border border-border bg-background px-3 py-2 outline-none focus:ring-1 focus:ring-accent"
        maxLength={100}
      />
      <input
        type="email"
        placeholder={labels.email}
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        className="w-full text-base md:text-sm rounded-lg border border-border bg-background px-3 py-2 outline-none focus:ring-1 focus:ring-accent"
        maxLength={255}
      />
      <input
        type="tel"
        placeholder={labels.phone}
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        className="w-full text-base md:text-sm rounded-lg border border-border bg-background px-3 py-2 outline-none focus:ring-1 focus:ring-accent"
        maxLength={20}
      />
      <Button type="submit" size="sm" className="w-full" disabled={submitting}>
        {submitting ? labels.submitting : labels.submit}
      </Button>
    </form>
  );
}

/* ─── Shared message list renderer ─── */
function ChatMessages({
  messages,
  contactFormShown,
  contactSubmitted,
  isLoading,
  lang,
  onContactSubmitted,
  bottomRef,
}: {
  messages: Msg[];
  contactFormShown: boolean;
  contactSubmitted: boolean;
  isLoading: boolean;
  lang: string;
  onContactSubmitted: (name: string, email?: string, phone?: string) => void;
  bottomRef: React.RefObject<HTMLDivElement>;
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
              <div className="prose prose-sm max-w-none [&_p]:m-0">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ) : msg.content}
          </div>
          {msg.role === "user" && (
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <User className="w-4 h-4 text-primary" />
            </div>
          )}
        </div>
      ))}
      {contactFormShown && !contactSubmitted && (
        <ContactForm onSubmitted={onContactSubmitted} lang={lang} />
      )}
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

export default function AIChatWidget() {
  const [lang] = useState(getBrowserLang);
  const [visitorId] = useState(getOrCreateVisitorId);

  const savedName = localStorage.getItem(VISITOR_NAME_KEY);
  const hasSubmittedBefore = localStorage.getItem(VISITOR_SUBMITTED_KEY) === "true";

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: hasSubmittedBefore
        ? savedName
          ? (WELCOME_BACK[lang] || WELCOME_BACK.it).replace("!", ` ${savedName}!`)
          : (WELCOME_BACK[lang] || WELCOME_BACK.it)
        : (WELCOME_MESSAGES[lang] || WELCOME_MESSAGES.it),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [contactFormShown, setContactFormShown] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(hasSubmittedBefore);
  const [showPulse, setShowPulse] = useState(true);
  const [showMobileBubble, setShowMobileBubble] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
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
        .select("id")
        .single();
      if (error) throw error;
      sessionIdRef.current = data.id;
      return data.id;
    } catch (err) {
      console.error("Failed to create chat session:", err);
      return null;
    }
  }, [visitorId]);

  const saveMessage = useCallback(async (sid: string | null, role: string, content: string) => {
    if (!sid) return;
    try {
      await supabase.from("chat_messages").insert({ session_id: sid, role, content });
      await supabase.from("chat_sessions").update({ message_count: messages.length + 1 }).eq("id", sid);
    } catch (err) { console.error("Failed to save message:", err); }
  }, [messages.length]);

  /* ─── Auto-open / mobile bubble ─── */
  useEffect(() => {
    if (hasAutoOpened) return;
    const isMobile = window.innerWidth < 768;
    const timer = setTimeout(() => {
      if (isMobile) {
        setShowMobileBubble(true);
        setHasAutoOpened(true);
        setTimeout(() => setShowMobileBubble(false), 5000);
      } else {
        setOpen(true);
        setHasAutoOpened(true);
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, [hasAutoOpened]);

  useEffect(() => { if (open) setShowPulse(false); }, [open]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, contactFormShown]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  /* ─── AI call ─── */
  const callAI = useCallback(async (allMessages: Msg[]) => {
    setIsLoading(true);
    const sid = await ensureSession();
    let assistantSoFar = "";

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && assistantSoFar.startsWith(last.content.slice(0, 10))) {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
        }
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
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) upsertAssistant(content);
          } catch { textBuffer = line + "\n" + textBuffer; break; }
        }
      }
      if (assistantSoFar && sid) saveMessage(sid, "assistant", assistantSoFar);
    } catch {
      upsertAssistant("Mi dispiace, si è verificato un errore. Riprova o contattaci direttamente.");
    } finally {
      setIsLoading(false);
    }
  }, [lang, ensureSession, saveMessage]);

  /* ─── Contact submitted ─── */
  const handleContactSubmitted = useCallback(async (name: string, email?: string, phone?: string) => {
    setContactSubmitted(true);
    setContactFormShown(false);
    if (name) localStorage.setItem(VISITOR_NAME_KEY, name);
    localStorage.setItem(VISITOR_SUBMITTED_KEY, "true");

    const thankYou = THANK_YOU[lang] || THANK_YOU.it;
    const nameMsg = name ? thankYou.replace("!", ` ${name}!`) : thankYou;
    setMessages((prev) => [...prev, { role: "assistant" as const, content: nameMsg }]);

    if (sessionIdRef.current) {
      try { await supabase.from("chat_sessions").update({ contact_submitted: true, visitor_name: name, visitor_email: email || null, visitor_phone: phone || null }).eq("id", sessionIdRef.current); } catch {}
    }

    setPendingMessage((pending) => {
      if (pending) {
        setTimeout(() => {
          setMessages((prev) => { callAI(prev); return prev; });
        }, 800);
      }
      return null;
    });
  }, [lang, callAI]);

  /* ─── Send ─── */
  const send = useCallback((text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    setInput("");

    if (!contactSubmitted) {
      const introMsg = INTRO_MESSAGES[lang] || INTRO_MESSAGES.it;
      setMessages((prev) => [...prev, userMsg, { role: "assistant" as const, content: introMsg }]);
      setContactFormShown(true);
      setPendingMessage(text.trim());
      ensureSession().then((sid) => { if (sid) saveMessage(sid, "user", text.trim()); });
    } else {
      setMessages((prev) => {
        const updated = [...prev, userMsg];
        callAI(updated);
        return updated;
      });
      ensureSession().then((sid) => { if (sid) saveMessage(sid, "user", text.trim()); });
    }
  }, [isLoading, contactSubmitted, lang, callAI, ensureSession, saveMessage]);

  const placeholder = PLACEHOLDER[lang] || PLACEHOLDER.it;

  return (
    <>
      {/* Desktop FAB */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:shadow-xl transition-all items-center justify-center hover:scale-105 hidden md:flex"
        aria-label="Apri assistente AI"
      >
        {showPulse && !open && (
          <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-30" />
        )}
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Mobile FAB + bubble (hidden when chat is open) */}
      {!open && (
        <div className="fixed bottom-5 right-4 z-50 flex items-center gap-2 md:hidden">
          {showMobileBubble && (
            <button
              onClick={() => { setShowMobileBubble(false); setOpen(true); }}
              className="bg-card text-foreground text-sm font-medium px-4 py-2 rounded-full shadow-lg border border-border animate-fade-in whitespace-nowrap"
            >
              {MOBILE_BUBBLE[lang] || MOBILE_BUBBLE.it}
            </button>
          )}
          <button
            onClick={() => { setShowMobileBubble(false); setOpen(true); }}
            className="w-12 h-12 rounded-full bg-accent text-accent-foreground shadow-lg flex items-center justify-center relative"
            aria-label="Apri assistente AI"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Chat panel */}
      {open && (
        <>
          {/* Mobile: full-screen overlay */}
          <div
            className="fixed inset-0 z-50 bg-card flex flex-col md:hidden"
            style={{ height: "100dvh" }}
          >
            <div className="bg-accent text-accent-foreground px-4 py-3 flex items-center gap-3 flex-shrink-0">
              <Bot className="w-5 h-5" />
              <div>
                <p className="font-semibold text-sm">Assistente ZAPPER®</p>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <p className="text-xs opacity-90">
                    {lang === "it" ? "Consulenza tecnica in tempo reale" : lang === "en" ? "Real-time technical support" : lang === "fr" ? "Conseil technique en temps réel" : lang === "de" ? "Technische Beratung in Echtzeit" : "Asesoría técnica en tiempo real"}
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="ml-auto hover:opacity-70 p-2 -mr-2">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <ChatMessages messages={messages} contactFormShown={contactFormShown} contactSubmitted={contactSubmitted} isLoading={isLoading} lang={lang} onContactSubmitted={handleContactSubmitted} bottomRef={bottomRef} />
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="border-t border-border px-3 py-2 flex gap-2 flex-shrink-0"
              style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground/60"
                disabled={isLoading || (contactFormShown && !contactSubmitted)}
                autoComplete="off"
              />
              <Button type="submit" size="icon" variant="ghost" disabled={!input.trim() || isLoading || (contactFormShown && !contactSubmitted)} className="h-8 w-8 text-accent hover:text-accent">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* Desktop: floating panel */}
          <div
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-2rem)] max-w-md bg-card border border-border rounded-2xl shadow-2xl flex-col overflow-hidden transform-gpu hidden md:flex"
            style={{ height: "min(500px, calc(100dvh - 10rem))" }}
          >
            <div className="bg-accent text-accent-foreground px-4 py-3 flex items-center gap-3">
              <Bot className="w-5 h-5" />
              <div>
                <p className="font-semibold text-sm">Assistente ZAPPER®</p>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <p className="text-xs opacity-90">
                    {lang === "it" ? "Consulenza tecnica in tempo reale" : lang === "en" ? "Real-time technical support" : lang === "fr" ? "Conseil technique en temps réel" : lang === "de" ? "Technische Beratung in Echtzeit" : "Asesoría técnica en tiempo real"}
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="ml-auto hover:opacity-70">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <ChatMessages messages={messages} contactFormShown={contactFormShown} contactSubmitted={contactSubmitted} isLoading={isLoading} lang={lang} onContactSubmitted={handleContactSubmitted} bottomRef={bottomRef} />
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="border-t border-border px-3 py-2 flex gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                disabled={isLoading || (contactFormShown && !contactSubmitted)}
                autoComplete="off"
              />
              <Button type="submit" size="icon" variant="ghost" disabled={!input.trim() || isLoading || (contactFormShown && !contactSubmitted)} className="h-8 w-8 text-accent hover:text-accent">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
