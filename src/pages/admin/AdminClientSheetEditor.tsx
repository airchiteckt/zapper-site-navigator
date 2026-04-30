import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClientSheet, useUpdateClientSheet } from "@/hooks/useClientSheets";
import ClientSheetSections from "@/components/admin/clientSheets/ClientSheetSections";
import type { ClientSheet } from "@/types/clientSheet";
import { ArrowLeft, Copy, ExternalLink, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminClientSheetEditor() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useClientSheet(id);
  const update = useUpdateClientSheet(id ?? "");
  const navigate = useNavigate();
  const { toast } = useToast();

  const [local, setLocal] = useState<ClientSheet | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (data) {
      setLocal(data);
      setDirty(false);
    }
  }, [data]);

  const patch = (p: Partial<ClientSheet>) => {
    setLocal((prev) => (prev ? { ...prev, ...p } : prev));
    setDirty(true);
  };

  const save = async () => {
    if (!local) return;
    try {
      const { id: _i, public_token, created_at, updated_at, ...rest } = local;
      await update.mutateAsync(rest);
      setDirty(false);
      toast({ title: "Scheda salvata" });
    } catch (err) {
      toast({
        title: "Errore salvataggio",
        description: err instanceof Error ? err.message : "Riprova",
        variant: "destructive",
      });
    }
  };

  const copyLink = () => {
    if (!local) return;
    const url = `${window.location.origin}/scheda/${local.public_token}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Link copiato", description: url });
  };

  if (isLoading || !local) {
    return (
      <AdminLayout title="Scheda cliente">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  const publicUrl = `${window.location.origin}/scheda/${local.public_token}`;

  return (
    <AdminLayout title={local.business_name || "Scheda cliente"}>
      <div className="mb-4 flex items-center gap-2 flex-wrap">
        <Button variant="ghost" size="sm" onClick={() => navigate("/admin/clienti")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Tutte le schede
        </Button>
      </div>

      {/* Toolbar sticky */}
      <div className="sticky top-16 lg:top-0 z-20 bg-background/95 backdrop-blur border rounded-lg p-3 mb-6 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <Select value={local.status} onValueChange={(v) => patch({ status: v as ClientSheet["status"] })}>
            <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Bozza</SelectItem>
              <SelectItem value="sent">Inviata</SelectItem>
              <SelectItem value="closed">Chiusa</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground truncate max-w-[300px]">
            Link pubblico: <code className="text-xs">{publicUrl}</code>
          </span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant="outline" onClick={copyLink}>
            <Copy className="h-3 w-3 mr-1" /> Copia link
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href={`/scheda/${local.public_token}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 mr-1" /> Anteprima cliente
            </a>
          </Button>
          <Button size="sm" onClick={save} disabled={!dirty || update.isPending}>
            {update.isPending ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-1" />
            )}
            {dirty ? "Salva modifiche" : "Salvato"}
          </Button>
        </div>
      </div>

      <ClientSheetSections sheet={local} onPatch={patch} />

      <div className="mt-6 flex justify-end">
        <Button onClick={save} disabled={!dirty || update.isPending}>
          {update.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Salva tutto
        </Button>
      </div>
    </AdminLayout>
  );
}
