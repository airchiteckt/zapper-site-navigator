import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Inbox, AlertTriangle, CheckCircle2, Clock, Search, Download, Trash2, Phone, Mail, MessageSquare,
} from "lucide-react";

interface FormSubmission {
  id: string;
  source: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  sector: string | null;
  message: string | null;
  extra: any;
  page_url: string | null;
  user_agent: string | null;
  email_sent: boolean;
  email_error: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

const STATUS_LABELS: Record<string, { label: string; variant: any }> = {
  new: { label: "Nuovo", variant: "default" },
  contacted: { label: "Contattato", variant: "secondary" },
  qualified: { label: "Qualificato", variant: "default" },
  closed: { label: "Chiuso", variant: "outline" },
  spam: { label: "Spam", variant: "destructive" },
};

export default function AdminLeads() {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [emailFilter, setEmailFilter] = useState<string>("all");
  const [selected, setSelected] = useState<FormSubmission | null>(null);
  const [notes, setNotes] = useState("");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) {
      toast({ title: "Errore", description: error.message, variant: "destructive" });
    } else {
      setSubmissions(data as FormSubmission[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const sources = useMemo(
    () => Array.from(new Set(submissions.map((s) => s.source))).sort(),
    [submissions]
  );

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      if (statusFilter !== "all" && s.status !== statusFilter) return false;
      if (sourceFilter !== "all" && s.source !== sourceFilter) return false;
      if (emailFilter === "sent" && !s.email_sent) return false;
      if (emailFilter === "failed" && s.email_sent) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = `${s.name || ""} ${s.email || ""} ${s.phone || ""} ${s.message || ""} ${s.source}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [submissions, search, statusFilter, sourceFilter, emailFilter]);

  const stats = useMemo(() => {
    const total = submissions.length;
    const failed = submissions.filter((s) => !s.email_sent).length;
    const newCount = submissions.filter((s) => s.status === "new").length;
    const last24h = submissions.filter(
      (s) => new Date(s.created_at).getTime() > Date.now() - 86400000
    ).length;
    return { total, failed, newCount, last24h };
  }, [submissions]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("form_submissions").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Errore", description: error.message, variant: "destructive" });
    } else {
      setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
      if (selected?.id === id) setSelected({ ...selected, status });
    }
  };

  const updateNotes = async () => {
    if (!selected) return;
    const { error } = await supabase
      .from("form_submissions")
      .update({ notes })
      .eq("id", selected.id);
    if (error) {
      toast({ title: "Errore", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Note salvate" });
      setSubmissions((prev) =>
        prev.map((s) => (s.id === selected.id ? { ...s, notes } : s))
      );
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm("Eliminare definitivamente questo lead?")) return;
    const { error } = await supabase.from("form_submissions").delete().eq("id", id);
    if (error) {
      toast({ title: "Errore", description: error.message, variant: "destructive" });
    } else {
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  };

  const exportCsv = () => {
    const rows = [
      ["Data", "Sorgente", "Nome", "Email", "Telefono", "Settore", "Messaggio", "Email Inviata", "Status", "Note"],
      ...filtered.map((s) => [
        new Date(s.created_at).toLocaleString("it-IT"),
        s.source,
        s.name || "",
        s.email || "",
        s.phone || "",
        s.sector || "",
        (s.message || "").replace(/\n/g, " "),
        s.email_sent ? "Sì" : "NO",
        s.status,
        (s.notes || "").replace(/\n/g, " "),
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lead-zapper-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openDetail = (s: FormSubmission) => {
    setSelected(s);
    setNotes(s.notes || "");
  };

  return (
    <AdminLayout title="Lead / Form ricevuti">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Inbox className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Totale</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Ultime 24h</p>
                <p className="text-2xl font-bold">{stats.last24h}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Da gestire</p>
                <p className="text-2xl font-bold">{stats.newCount}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <div>
                <p className="text-xs text-muted-foreground">Email FALLITE</p>
                <p className="text-2xl font-bold text-destructive">{stats.failed}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filtri */}
        <Card className="p-4">
          <div className="grid gap-3 md:grid-cols-5">
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cerca nome, email, telefono..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti gli status</SelectItem>
                <SelectItem value="new">Nuovi</SelectItem>
                <SelectItem value="contacted">Contattati</SelectItem>
                <SelectItem value="qualified">Qualificati</SelectItem>
                <SelectItem value="closed">Chiusi</SelectItem>
                <SelectItem value="spam">Spam</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger><SelectValue placeholder="Sorgente" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte le sorgenti</SelectItem>
                {sources.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={emailFilter} onValueChange={setEmailFilter}>
              <SelectTrigger><SelectValue placeholder="Email" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte</SelectItem>
                <SelectItem value="sent">Email inviata ✓</SelectItem>
                <SelectItem value="failed">Email FALLITA ✗</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              {filtered.length} lead {filtered.length !== submissions.length && `(su ${submissions.length})`}
            </p>
            <Button variant="outline" size="sm" onClick={exportCsv}>
              <Download className="w-4 h-4 mr-2" />Esporta CSV
            </Button>
          </div>
        </Card>

        {/* Tabella */}
        <Card className="overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Caricamento...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Nessun lead trovato</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left p-3 font-medium">Data</th>
                    <th className="text-left p-3 font-medium">Nome</th>
                    <th className="text-left p-3 font-medium">Contatti</th>
                    <th className="text-left p-3 font-medium">Sorgente</th>
                    <th className="text-left p-3 font-medium">Email</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr
                      key={s.id}
                      className="border-b hover:bg-muted/30 cursor-pointer"
                      onClick={() => openDetail(s)}
                    >
                      <td className="p-3 whitespace-nowrap text-xs text-muted-foreground">
                        {new Date(s.created_at).toLocaleString("it-IT", {
                          day: "2-digit", month: "2-digit", year: "2-digit",
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </td>
                      <td className="p-3 font-medium">{s.name || "—"}</td>
                      <td className="p-3 text-xs">
                        {s.phone && <div className="flex items-center gap-1"><Phone className="w-3 h-3" />{s.phone}</div>}
                        {s.email && <div className="flex items-center gap-1 text-muted-foreground"><Mail className="w-3 h-3" />{s.email}</div>}
                      </td>
                      <td className="p-3 text-xs">{s.source}</td>
                      <td className="p-3">
                        {s.email_sent ? (
                          <Badge variant="outline" className="text-xs"><CheckCircle2 className="w-3 h-3 mr-1" />Inviata</Badge>
                        ) : (
                          <Badge variant="destructive" className="text-xs"><AlertTriangle className="w-3 h-3 mr-1" />FALLITA</Badge>
                        )}
                      </td>
                      <td className="p-3">
                        <Badge variant={STATUS_LABELS[s.status]?.variant || "default"}>
                          {STATUS_LABELS[s.status]?.label || s.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => { e.stopPropagation(); deleteSubmission(s.id); }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Dettaglio Modal */}
        <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Dettaglio Lead</DialogTitle>
            </DialogHeader>
            {selected && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <Badge variant={STATUS_LABELS[selected.status]?.variant || "default"}>
                    {STATUS_LABELS[selected.status]?.label}
                  </Badge>
                  {selected.email_sent ? (
                    <Badge variant="outline"><CheckCircle2 className="w-3 h-3 mr-1" />Email inviata</Badge>
                  ) : (
                    <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Email FALLITA</Badge>
                  )}
                  <span className="text-xs text-muted-foreground ml-auto">
                    {new Date(selected.created_at).toLocaleString("it-IT")}
                  </span>
                </div>

                {selected.email_error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-xs text-destructive">
                    <strong>Errore email:</strong> {selected.email_error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><strong>Nome:</strong> {selected.name || "—"}</div>
                  <div><strong>Sorgente:</strong> {selected.source}</div>
                  <div><strong>Telefono:</strong> {selected.phone || "—"}</div>
                  <div><strong>Email:</strong> {selected.email || "—"}</div>
                  <div><strong>Settore:</strong> {selected.sector || "—"}</div>
                </div>

                {selected.message && (
                  <div className="p-3 bg-muted/50 rounded-lg text-sm">
                    <strong className="block mb-1">Messaggio:</strong>
                    <p className="whitespace-pre-wrap">{selected.message}</p>
                  </div>
                )}

                {selected.extra && Object.keys(selected.extra).length > 0 && (
                  <div className="p-3 bg-muted/30 rounded-lg text-xs">
                    <strong className="block mb-1">Dati extra:</strong>
                    <pre className="whitespace-pre-wrap">{JSON.stringify(selected.extra, null, 2)}</pre>
                  </div>
                )}

                {selected.page_url && (
                  <div className="text-xs text-muted-foreground break-all">
                    <strong>Pagina:</strong> {selected.page_url}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  {selected.phone && (
                    <Button asChild size="sm" variant="outline">
                      <a href={`tel:${selected.phone}`}><Phone className="w-4 h-4 mr-1" />Chiama</a>
                    </Button>
                  )}
                  {selected.phone && (
                    <Button asChild size="sm" variant="outline">
                      <a href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="w-4 h-4 mr-1" />WhatsApp
                      </a>
                    </Button>
                  )}
                  {selected.email && (
                    <Button asChild size="sm" variant="outline">
                      <a href={`mailto:${selected.email}`}><Mail className="w-4 h-4 mr-1" />Email</a>
                    </Button>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1">Status</label>
                  <Select value={selected.status} onValueChange={(v) => updateStatus(selected.id, v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Nuovo</SelectItem>
                      <SelectItem value="contacted">Contattato</SelectItem>
                      <SelectItem value="qualified">Qualificato</SelectItem>
                      <SelectItem value="closed">Chiuso</SelectItem>
                      <SelectItem value="spam">Spam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1">Note interne</label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Note sulla gestione del lead..."
                  />
                  <Button size="sm" className="mt-2" onClick={updateNotes}>Salva note</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
