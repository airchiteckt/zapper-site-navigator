import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useClientSheets, useCreateClientSheet, useDeleteClientSheet } from "@/hooks/useClientSheets";
import { Plus, ExternalLink, Trash2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    draft: "bg-muted text-muted-foreground",
    sent: "bg-accent-blue/10 text-accent-blue",
    closed: "bg-primary/10 text-primary",
  };
  return map[status] ?? map.draft;
};

export default function AdminClientSheets() {
  const { data: sheets = [], isLoading } = useClientSheets();
  const create = useCreateClientSheet();
  const del = useDeleteClientSheet();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");

  const handleCreate = async () => {
    if (!businessName.trim()) return;
    try {
      const res = await create.mutateAsync({ business_name: businessName.trim(), contact_phone: phone || undefined });
      setOpen(false);
      setBusinessName("");
      setPhone("");
      navigate(`/admin/clienti/${res.id}`);
    } catch (err) {
      toast({
        title: "Errore",
        description: err instanceof Error ? err.message : "Impossibile creare la scheda",
        variant: "destructive",
      });
    }
  };

  const copyLink = (token: string) => {
    const url = `${window.location.origin}/scheda/${token}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Link copiato", description: url });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Eliminare questa scheda? L'azione è irreversibile.")) return;
    await del.mutateAsync(id);
    toast({ title: "Scheda eliminata" });
  };

  return (
    <AdminLayout title="Schede Cliente">
      <div className="flex justify-between items-center mb-6 gap-3 flex-wrap">
        <p className="text-muted-foreground">
          Crea schede tecniche e condividile col cliente tramite link pubblico.
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuova scheda cliente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nuova scheda cliente</DialogTitle>
              <DialogDescription>
                Inserisci i dati minimi per iniziare. Potrai compilare il resto in seguito.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>Ragione sociale *</Label>
                <Input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Es. Pizzeria Mario"
                  autoFocus
                />
              </div>
              <div>
                <Label>Telefono referente</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+39 ..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Annulla
              </Button>
              <Button onClick={handleCreate} disabled={!businessName.trim() || create.isPending}>
                Crea e apri
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading && <p className="text-muted-foreground">Caricamento...</p>}

      {!isLoading && sheets.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Nessuna scheda cliente. Creane una per iniziare.
          </CardContent>
        </Card>
      )}

      <div className="grid gap-3">
        {sheets.map((s) => (
          <Card key={s.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start gap-3 flex-wrap">
                <div>
                  <CardTitle className="text-lg">
                    <Link to={`/admin/clienti/${s.id}`} className="hover:underline">
                      {s.business_name}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {s.business_type ?? "—"} · {s.contact_name ?? "Senza referente"} · {s.contact_phone ?? "—"}
                  </CardDescription>
                </div>
                <span className={`text-xs px-2 py-1 rounded-md ${statusBadge(s.status)}`}>
                  {s.status === "draft" ? "Bozza" : s.status === "sent" ? "Inviata" : "Chiusa"}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex justify-between items-center gap-3 flex-wrap pt-0">
              <span className="text-sm text-muted-foreground">
                Preventivo: <strong>€ {(s.quote_total_cents / 100).toLocaleString("it-IT", { minimumFractionDigits: 2 })}</strong>
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => copyLink(s.public_token)}>
                  <Copy className="h-3 w-3 mr-1" />
                  Copia link
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href={`/scheda/${s.public_token}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Apri
                  </a>
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(s.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
