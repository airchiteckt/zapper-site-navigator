import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ChevronDown, ChevronUp, Trash2, User, Bot, Calendar, Globe, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { it } from "date-fns/locale";

interface ChatSession {
  id: string;
  visitor_id: string;
  page_url: string | null;
  started_at: string;
  message_count: number;
  contact_submitted: boolean;
  visitor_name: string | null;
  visitor_email: string | null;
  visitor_phone: string | null;
  created_at: string;
}

interface ChatMessage {
  id: string;
  session_id: string;
  role: string;
  content: string;
  created_at: string;
}

export default function AdminChatLogs() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const [sessionMessages, setSessionMessages] = useState<Record<string, ChatMessage[]>>({});
  const [loadingMessages, setLoadingMessages] = useState<string | null>(null);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("chat_sessions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) {
        toast({ title: "Errore", description: "Impossibile caricare le sessioni", variant: "destructive" });
      } else {
        setSessions((data as any[]) || []);
      }
    } catch (err) {
      console.error("Error fetching sessions:", err);
      toast({ title: "Errore", description: "Errore di rete", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const toggleSession = async (sessionId: string) => {
    if (expandedSession === sessionId) {
      setExpandedSession(null);
      return;
    }

    setExpandedSession(sessionId);

    if (!sessionMessages[sessionId]) {
      setLoadingMessages(sessionId);
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: true });

      if (!error && data) {
        setSessionMessages((prev) => ({ ...prev, [sessionId]: data as any[] }));
      }
      setLoadingMessages(null);
    }
  };

  const deleteSession = async (sessionId: string) => {
    if (!confirm("Eliminare questa conversazione?")) return;
    const { error } = await supabase.from("chat_sessions").delete().eq("id", sessionId);
    if (error) {
      toast({ title: "Errore", description: "Impossibile eliminare", variant: "destructive" });
    } else {
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      toast({ title: "Eliminata" });
    }
  };

  const contactSessions = sessions.filter((s) => s.contact_submitted);

  return (
    <AdminLayout title="Chat Logs">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4 pb-4">
              <p className="text-2xl font-bold">{sessions.length}</p>
              <p className="text-xs text-muted-foreground">Conversazioni totali</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <p className="text-2xl font-bold">{contactSessions.length}</p>
              <p className="text-xs text-muted-foreground">Con contatto</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <p className="text-2xl font-bold">
                {sessions.length > 0
                  ? Math.round((contactSessions.length / sessions.length) * 100)
                  : 0}%
              </p>
              <p className="text-xs text-muted-foreground">Tasso conversione</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <p className="text-2xl font-bold">
                {sessions.length > 0
                  ? Math.round(sessions.reduce((a, s) => a + s.message_count, 0) / sessions.length)
                  : 0}
              </p>
              <p className="text-xs text-muted-foreground">Msg medi/sessione</p>
            </CardContent>
          </Card>
        </div>

        {/* Sessions list */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : sessions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>Nessuna conversazione registrata</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <Card key={session.id} className="overflow-hidden">
                <CardHeader
                  className="cursor-pointer hover:bg-muted/50 transition-colors py-3 px-4"
                  onClick={() => toggleSession(session.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {session.contact_submitted ? (
                          <Badge variant="default" className="bg-green-600 text-xs">Lead</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">Chat</Badge>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          {session.visitor_name && (
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {session.visitor_name}
                            </span>
                          )}
                          {session.visitor_email && (
                            <span className="text-muted-foreground text-xs">{session.visitor_email}</span>
                          )}
                          {session.visitor_phone && (
                            <span className="text-muted-foreground text-xs flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {session.visitor_phone}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(session.created_at), "dd MMM yyyy HH:mm", { locale: it })}
                          </span>
                          {session.page_url && (
                            <span className="flex items-center gap-1 truncate">
                              <Globe className="w-3 h-3" />
                              {session.page_url}
                            </span>
                          )}
                          <span>{session.message_count} msg</span>
                          <span className="font-mono text-[10px] opacity-50">
                            {session.visitor_id.slice(0, 8)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.id);
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                      {expandedSession === session.id ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                {expandedSession === session.id && (
                  <CardContent className="border-t bg-muted/30 px-4 py-3">
                    {loadingMessages === session.id ? (
                      <div className="flex justify-center py-4">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {(sessionMessages[session.id] || []).map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            {msg.role === "assistant" && (
                              <Bot className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                            )}
                            <div
                              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                                msg.role === "user"
                                  ? "bg-accent text-accent-foreground"
                                  : "bg-background border"
                              }`}
                            >
                              {msg.content}
                            </div>
                            {msg.role === "user" && (
                              <User className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                            )}
                          </div>
                        ))}
                        {(sessionMessages[session.id] || []).length === 0 && (
                          <p className="text-center text-xs text-muted-foreground py-4">
                            Nessun messaggio salvato
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
