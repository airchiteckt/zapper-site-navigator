import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import type { QuoteItem } from "@/types/clientSheet";

interface Props {
  items: QuoteItem[];
  notes: string | null;
  onChange: (items: QuoteItem[], notes: string, total: number) => void;
}

const SUGGESTED: { label: string; frequency?: string }[] = [
  { label: "Pulizia periodica cappa", frequency: "trimestrale" },
  { label: "Sostituzione filtri carbone", frequency: "su valutazione" },
  { label: "Pulizia canalizzazione completa", frequency: "annuale" },
  { label: "Manutenzione motore aspirazione", frequency: "annuale" },
  { label: "Contratto abbonamento manutenzione", frequency: "annuale" },
];

export default function QuoteEditor({ items, notes, onChange }: Props) {
  const update = (next: QuoteItem[], nextNotes = notes ?? "") => {
    const total = next.filter((i) => i.included).reduce((s, i) => s + (i.price_cents || 0), 0);
    onChange(next, nextNotes, total);
  };

  const addItem = (preset?: { label: string; frequency?: string }) => {
    const item: QuoteItem = {
      id: crypto.randomUUID(),
      label: preset?.label ?? "",
      description: "",
      frequency: preset?.frequency ?? "",
      price_cents: 0,
      included: true,
    };
    update([...items, item]);
  };

  const updateItem = (id: string, patch: Partial<QuoteItem>) => {
    update(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  };

  const removeItem = (id: string) => update(items.filter((i) => i.id !== id));

  const total = items.filter((i) => i.included).reduce((s, i) => s + (i.price_cents || 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {SUGGESTED.map((s) => (
          <Button
            key={s.label}
            type="button"
            size="sm"
            variant="outline"
            onClick={() => addItem(s)}
          >
            <Plus className="h-3 w-3 mr-1" />
            {s.label}
          </Button>
        ))}
        <Button type="button" size="sm" variant="secondary" onClick={() => addItem()}>
          <Plus className="h-3 w-3 mr-1" />
          Voce libera
        </Button>
      </div>

      {items.length === 0 && (
        <p className="text-sm text-muted-foreground italic">Nessuna voce. Aggiungine una sopra.</p>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border p-3 space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-2 items-end">
              <div>
                <Label className="text-xs">Servizio</Label>
                <Input
                  value={item.label}
                  onChange={(e) => updateItem(item.id, { label: e.target.value })}
                  placeholder="Es. Pulizia cappa"
                />
              </div>
              <div>
                <Label className="text-xs">Frequenza</Label>
                <Input
                  value={item.frequency ?? ""}
                  onChange={(e) => updateItem(item.id, { frequency: e.target.value })}
                  placeholder="es. trimestrale"
                />
              </div>
              <div>
                <Label className="text-xs">Prezzo (€)</Label>
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  value={(item.price_cents / 100).toString()}
                  onChange={(e) =>
                    updateItem(item.id, {
                      price_cents: Math.round(parseFloat(e.target.value || "0") * 100),
                    })
                  }
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
            <Textarea
              rows={2}
              value={item.description ?? ""}
              onChange={(e) => updateItem(item.id, { description: e.target.value })}
              placeholder="Dettagli (visibili al cliente)"
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={item.included}
                onChange={(e) => updateItem(item.id, { included: e.target.checked })}
              />
              Includere nel preventivo (totale)
            </label>
          </div>
        ))}
      </div>

      <div>
        <Label>Note preventivo (visibili al cliente se sezione pubblica)</Label>
        <Textarea
          rows={3}
          value={notes ?? ""}
          onChange={(e) => update(items, e.target.value)}
          placeholder="Condizioni, validità offerta, modalità di pagamento..."
        />
      </div>

      <div className="rounded-lg bg-muted p-3 flex items-center justify-between">
        <span className="text-sm font-medium">Totale preventivo</span>
        <span className="text-xl font-bold">
          € {(total / 100).toLocaleString("it-IT", { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
}
