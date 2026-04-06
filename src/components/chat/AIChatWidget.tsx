import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/zapper-chat`;

type Msg = { role: "user" | "assistant"; content: string };

const CONTACT_TRIGGER = "Lascia i tuoi dati";

function ContactForm({ onSubmitted }: { onSubmitted: (name: string) => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("datasheet_requests").insert({
        first_name: form.name.split(" ")[0] || form.name,
        last_name: form.name.split(" ").slice(1).join(" ") || "-",
        email: form.email,
        phone: form.phone,
      });
      if (error) throw error;
      onSubmitted(form.name.split(" ")[0]);
    } catch {
      toast({ title: "Errore nell'invio", description: "Riprova più tardi.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-accent/5 border border-accent/20 rounded-xl p-3 space-y-2 my-1">
      <p className="text-xs font-medium text-foreground">📋 Lascia i tuoi dati per essere ricontattato:</p>
      <input
        placeholder="Nome e Cognome"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        className="w-full text-sm rounded-lg border border-border bg-background px-3 py-2 outline-none focus:ring-1 focus:ring-accent"
        required
        maxLength={100}
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        className="w-full text-sm rounded-lg border border-border bg-background px-3 py-2 outline-none focus:ring-1 focus:ring-accent"
        required
        maxLength={255}
      />
      <input
        type="tel"
        placeholder="Telefono"
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        className="w-full text-sm rounded-lg border border-border bg-background px-3 py-2 outline-none focus:ring-1 focus:ring-accent"
        required
        maxLength={20}
      />
      <Button type="submit" size="sm" className="w-full" disabled={submitting}>
        {submitting ? "Invio..." : "Invia i miei dati"}
      </Button>
    </form>
  );
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: "Ciao! 👋 Sono l'assistente ZAPPER®. Descrivi il tuo impianto o problema e ti suggerirò la soluzione più adatta.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [contactFormShown, setContactFormShown] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSound = useCallback((freq: number, duration = 0.15) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {}
  }, []);

  // Auto-open after 5 seconds
  useEffect(() => {
    if (hasAutoOpened) return;
    const timer = setTimeout(() => {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = 800;
        osc.type = "sine";
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.4);
      } catch {}
      setOpen(true);
      setHasAutoOpened(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [hasAutoOpened]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, contactFormShown]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Detect contact trigger in last assistant message
  useEffect(() => {
    if (contactSubmitted) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.role === "assistant" && lastMsg.content.includes(CONTACT_TRIGGER)) {
      setContactFormShown(true);
    }
  }, [messages, contactSubmitted]);

  const handleContactSubmitted = (name: string) => {
    setContactSubmitted(true);
    setContactFormShown(false);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: `Grazie ${name}! 🎉 Un nostro tecnico ti contatterà al più presto.` },
    ]);
  };

  const send = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;
      playSound(600, 0.1); // send sound
      const userMsg: Msg = { role: "user", content: text.trim() };
      const allMessages = [...messages, userMsg];
      setMessages(allMessages);
      setInput("");
      setIsLoading(true);

      let assistantSoFar = "";
      let playedReceiveSound = false;

      const upsertAssistant = (chunk: string) => {
        if (!playedReceiveSound) {
          playSound(900, 0.12); // receive sound
          playedReceiveSound = true;
        }
        assistantSoFar += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && prev.length > allMessages.length) {
            return prev.map((m, i) =>
              i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
            );
          }
          return [...prev.slice(0, allMessages.length), { role: "assistant", content: assistantSoFar }];
        });
      };

      try {
        const resp = await fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: allMessages }),
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
            } catch {
              textBuffer = line + "\n" + textBuffer;
              break;
            }
          }
        }
      } catch {
        upsertAssistant("Mi dispiace, si è verificato un errore. Riprova o contattaci direttamente.");
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  const renderMessageContent = (msg: Msg) => {
    // Strip the trigger phrase from displayed content
    const displayContent = msg.content.replace(CONTACT_TRIGGER, "").trim();
    if (msg.role === "assistant") {
      return (
        <div className="prose prose-sm max-w-none [&_p]:m-0">
          <ReactMarkdown>{displayContent || msg.content}</ReactMarkdown>
        </div>
      );
    }
    return msg.content;
  };

  return (
    <>
      {/* Desktop floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:scale-105 md:flex hidden"
        aria-label="Apri assistente AI"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Mobile AI icon */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-20 right-4 z-50 w-12 h-12 rounded-full bg-accent text-accent-foreground shadow-lg flex items-center justify-center md:hidden"
        aria-label="Apri assistente AI"
      >
        {open ? <X className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-4 md:bottom-24 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-md bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ height: "min(500px, calc(100vh - 10rem))" }}
        >
          {/* Header */}
          <div className="bg-accent text-accent-foreground px-4 py-3 flex items-center gap-3">
            <Bot className="w-5 h-5" />
            <div>
              <p className="font-semibold text-sm">Assistente ZAPPER®</p>
              <p className="text-xs opacity-80">Consulenza tecnica AI</p>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto hover:opacity-70">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === "user"
                      ? "bg-accent text-accent-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  {renderMessageContent(msg)}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
            ))}

            {/* Inline contact form */}
            {contactFormShown && !contactSubmitted && (
              <ContactForm onSubmitted={handleContactSubmitted} />
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
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-border px-3 py-2 flex gap-2"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Scrivi il tuo messaggio..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              disabled={!input.trim() || isLoading}
              className="h-8 w-8 text-accent hover:text-accent"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
