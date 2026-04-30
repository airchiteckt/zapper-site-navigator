import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SECTION_LABELS, type ClientSheet, type HoodUnit, type DuctLine, type FilterDetail, type CarbonFilterUnit, type FilterKind, type SectionKey } from "@/types/clientSheet";
import SheetPhotoUploader from "./SheetPhotoUploader";
import QuoteEditor from "./QuoteEditor";

interface Props {
  sheet: ClientSheet;
  onPatch: (patch: Partial<ClientSheet>) => void;
}

function VisibilityBadge({
  sectionKey,
  visible,
  onToggle,
}: {
  sectionKey: SectionKey;
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="flex items-center gap-2 text-xs px-2 py-1 rounded-md bg-muted"
      onClick={(e) => e.stopPropagation()}
    >
      {visible ? (
        <Eye className="h-3 w-3 text-primary" />
      ) : (
        <EyeOff className="h-3 w-3 text-muted-foreground" />
      )}
      <span className="hidden sm:inline">{visible ? "Pubblica" : "Interna"}</span>
      <Switch
        checked={visible}
        onCheckedChange={onToggle}
        aria-label={`Visibilità sezione ${sectionKey}`}
      />
    </div>
  );
}

export default function ClientSheetSections({ sheet, onPatch }: Props) {
  const v = sheet.section_visibility;
  const toggleVis = (key: SectionKey) =>
    onPatch({ section_visibility: { ...v, [key]: !v[key] } });

  return (
    <Accordion type="multiple" defaultValue={["general"]} className="space-y-2">
      {/* 1. DATI GENERALI */}
      <AccordionItem value="general" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full pr-2 gap-3">
            <span className="text-left">{SECTION_LABELS.general}</span>
            <VisibilityBadge sectionKey="general" visible={v.general} onToggle={() => toggleVis("general")} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-3 pt-2">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label>Ragione sociale *</Label>
              <Input
                value={sheet.business_name}
                onChange={(e) => onPatch({ business_name: e.target.value })}
              />
            </div>
            <div>
              <Label>Tipologia attività</Label>
              <Input
                value={sheet.business_type ?? ""}
                onChange={(e) => onPatch({ business_type: e.target.value })}
                placeholder="Pizzeria, ristorante, hotel..."
              />
            </div>
            <div>
              <Label>Nome referente</Label>
              <Input
                value={sheet.contact_name ?? ""}
                onChange={(e) => onPatch({ contact_name: e.target.value })}
              />
            </div>
            <div>
              <Label>Telefono</Label>
              <Input
                value={sheet.contact_phone ?? ""}
                onChange={(e) => onPatch({ contact_phone: e.target.value })}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={sheet.contact_email ?? ""}
                onChange={(e) => onPatch({ contact_email: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Indirizzo completo</Label>
              <Input
                value={sheet.address ?? ""}
                onChange={(e) => onPatch({ address: e.target.value })}
              />
            </div>
            <div>
              <Label>Giorni e orari di apertura</Label>
              <Input
                value={sheet.opening_hours ?? ""}
                onChange={(e) => onPatch({ opening_hours: e.target.value })}
                placeholder="Lun-Sab 12:00-15:00 / 19:00-23:00"
              />
            </div>
            <div>
              <Label>Orari disponibili per intervento</Label>
              <Input
                value={sheet.intervention_hours ?? ""}
                onChange={(e) => onPatch({ intervention_hours: e.target.value })}
                placeholder="Mattino prima dell'apertura"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 2. CAPPA */}
      <AccordionItem value="kitchen_hood" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full pr-2 gap-3">
            <span className="text-left">{SECTION_LABELS.kitchen_hood}</span>
            <VisibilityBadge sectionKey="kitchen_hood" visible={v.kitchen_hood} onToggle={() => toggleVis("kitchen_hood")} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pt-2">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label>Numero totale cappe</Label>
              <Input
                type="number"
                min={0}
                value={sheet.kitchen_hood.count ?? ""}
                onChange={(e) =>
                  onPatch({ kitchen_hood: { ...sheet.kitchen_hood, count: Number(e.target.value) || undefined } })
                }
              />
            </div>
          </div>

          {/* Cappa principale */}
          <div className="rounded-lg border p-3 space-y-3 bg-muted/30">
            <p className="text-sm font-semibold">Cappa #1 (principale)</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <Label>Tipologia</Label>
                <Select
                  value={sheet.kitchen_hood.type ?? ""}
                  onValueChange={(val) =>
                    onPatch({ kitchen_hood: { ...sheet.kitchen_hood, type: val as "wall" | "central" | "island" } })
                  }
                >
                  <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wall">Parete</SelectItem>
                    <SelectItem value="central">Centrale</SelectItem>
                    <SelectItem value="island">Isola</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Stato visivo</Label>
                <Select
                  value={sheet.kitchen_hood.state ?? ""}
                  onValueChange={(val) =>
                    onPatch({ kitchen_hood: { ...sheet.kitchen_hood, state: val as "good" | "medium" | "bad" } })
                  }
                >
                  <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">🟢 Pulita</SelectItem>
                    <SelectItem value="medium">🟡 Media</SelectItem>
                    <SelectItem value="bad">🔴 Molto sporca</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Lunghezza (cm)</Label>
                <Input
                  type="number"
                  value={sheet.kitchen_hood.length_cm ?? ""}
                  onChange={(e) =>
                    onPatch({ kitchen_hood: { ...sheet.kitchen_hood, length_cm: Number(e.target.value) || undefined } })
                  }
                />
              </div>
              <div>
                <Label>Profondità (cm)</Label>
                <Input
                  type="number"
                  value={sheet.kitchen_hood.depth_cm ?? ""}
                  onChange={(e) =>
                    onPatch({ kitchen_hood: { ...sheet.kitchen_hood, depth_cm: Number(e.target.value) || undefined } })
                  }
                />
              </div>
              <div>
                <Label>Altezza da terra (cm)</Label>
                <Input
                  type="number"
                  value={sheet.kitchen_hood.height_cm ?? ""}
                  onChange={(e) =>
                    onPatch({ kitchen_hood: { ...sheet.kitchen_hood, height_cm: Number(e.target.value) || undefined } })
                  }
                />
              </div>
            </div>
          </div>

          {/* Cappe aggiuntive */}
          {(sheet.kitchen_hood.units ?? []).map((unit, idx) => {
            const updateUnit = (patch: Partial<HoodUnit>) => {
              const units = [...(sheet.kitchen_hood.units ?? [])];
              units[idx] = { ...units[idx], ...patch };
              onPatch({ kitchen_hood: { ...sheet.kitchen_hood, units } });
            };
            const removeUnit = () => {
              const units = (sheet.kitchen_hood.units ?? []).filter((_, i) => i !== idx);
              onPatch({ kitchen_hood: { ...sheet.kitchen_hood, units } });
            };
            return (
              <div key={idx} className="rounded-lg border p-3 space-y-3 bg-muted/30">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Cappa #{idx + 2}</p>
                  <Button type="button" variant="ghost" size="sm" onClick={removeUnit}>
                    <Trash2 className="h-4 w-4 mr-1" /> Rimuovi
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label>Tipologia</Label>
                    <Select
                      value={unit.type ?? ""}
                      onValueChange={(val) => updateUnit({ type: val as "wall" | "central" | "island" })}
                    >
                      <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wall">Parete</SelectItem>
                        <SelectItem value="central">Centrale</SelectItem>
                        <SelectItem value="island">Isola</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Stato visivo</Label>
                    <Select
                      value={unit.state ?? ""}
                      onValueChange={(val) => updateUnit({ state: val as "good" | "medium" | "bad" })}
                    >
                      <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="good">🟢 Pulita</SelectItem>
                        <SelectItem value="medium">🟡 Media</SelectItem>
                        <SelectItem value="bad">🔴 Molto sporca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Lunghezza (cm)</Label>
                    <Input
                      type="number"
                      value={unit.length_cm ?? ""}
                      onChange={(e) => updateUnit({ length_cm: Number(e.target.value) || undefined })}
                    />
                  </div>
                  <div>
                    <Label>Profondità (cm)</Label>
                    <Input
                      type="number"
                      value={unit.depth_cm ?? ""}
                      onChange={(e) => updateUnit({ depth_cm: Number(e.target.value) || undefined })}
                    />
                  </div>
                  <div>
                    <Label>Altezza da terra (cm)</Label>
                    <Input
                      type="number"
                      value={unit.height_cm ?? ""}
                      onChange={(e) => updateUnit({ height_cm: Number(e.target.value) || undefined })}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const units = [...(sheet.kitchen_hood.units ?? []), {} as HoodUnit];
              const currentCount = sheet.kitchen_hood.count ?? 1;
              onPatch({
                kitchen_hood: {
                  ...sheet.kitchen_hood,
                  units,
                  count: Math.max(currentCount, units.length + 1),
                },
              });
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Aggiungi cappa
          </Button>

          <div className="pt-3 border-t">
            <p className="text-sm font-medium mb-3">📷 Foto del sopralluogo (opzionali)</p>
            <SheetPhotoUploader sheetId={sheet.id} />
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 3. FUOCHI */}
      <AccordionItem value="cooking_area" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full pr-2 gap-3">
            <span className="text-left">{SECTION_LABELS.cooking_area}</span>
            <VisibilityBadge sectionKey="cooking_area" visible={v.cooking_area} onToggle={() => toggleVis("cooking_area")} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-3 pt-2">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label>Numero fuochi</Label>
              <Input
                type="number"
                value={sheet.cooking_area.burner_count ?? ""}
                onChange={(e) =>
                  onPatch({ cooking_area: { ...sheet.cooking_area, burner_count: Number(e.target.value) || undefined } })
                }
              />
            </div>
            <div>
              <Label>Livello sporco</Label>
              <Select
                value={sheet.cooking_area.dirt_level ?? ""}
                onValueChange={(val) =>
                  onPatch({ cooking_area: { ...sheet.cooking_area, dirt_level: val as "light" | "medium" | "heavy" } })
                }
              >
                <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Leggero</SelectItem>
                  <SelectItem value="medium">Medio</SelectItem>
                  <SelectItem value="heavy">Intenso</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label>Tipologie (separate da virgola)</Label>
              <Input
                value={(sheet.cooking_area.types ?? []).join(", ")}
                onChange={(e) =>
                  onPatch({
                    cooking_area: {
                      ...sheet.cooking_area,
                      types: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    },
                  })
                }
                placeholder="gas, induzione, fry top, griglia, forno"
              />
            </div>
            <label className="flex items-center gap-2 sm:col-span-2">
              <input
                type="checkbox"
                checked={sheet.cooking_area.has_critical_buildup ?? false}
                onChange={(e) =>
                  onPatch({ cooking_area: { ...sheet.cooking_area, has_critical_buildup: e.target.checked } })
                }
              />
              Presenza incrostazioni critiche
            </label>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 4. CANALIZZAZIONE */}
      <AccordionItem value="ductwork" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full pr-2 gap-3">
            <span className="text-left">{SECTION_LABELS.ductwork}</span>
            <VisibilityBadge sectionKey="ductwork" visible={v.ductwork} onToggle={() => toggleVis("ductwork")} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pt-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sheet.ductwork.present ?? false}
              onChange={(e) => onPatch({ ductwork: { ...sheet.ductwork, present: e.target.checked } })}
            />
            Canalizzazione presente
          </label>

          {/* Canalizzazione principale */}
          <div className="rounded-lg border p-3 space-y-3 bg-muted/30">
            <p className="text-sm font-semibold">Canalizzazione principale</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <Label>Lunghezza stimata (m)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={sheet.ductwork.length_m ?? ""}
                  onChange={(e) =>
                    onPatch({ ductwork: { ...sheet.ductwork, length_m: Number(e.target.value) || undefined } })
                  }
                />
              </div>
              <div>
                <Label>Diametro (cm)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={sheet.ductwork.diameter_cm ?? ""}
                  onChange={(e) =>
                    onPatch({ ductwork: { ...sheet.ductwork, diameter_cm: Number(e.target.value) || undefined } })
                  }
                />
              </div>
              <div>
                <Label>Numero curve</Label>
                <Input
                  type="number"
                  value={sheet.ductwork.curves_count ?? ""}
                  onChange={(e) =>
                    onPatch({ ductwork: { ...sheet.ductwork, curves_count: Number(e.target.value) || undefined } })
                  }
                />
              </div>
              <div>
                <Label>Accessibilità</Label>
                <Select
                  value={sheet.ductwork.accessibility ?? ""}
                  onValueChange={(val) =>
                    onPatch({ ductwork: { ...sheet.ductwork, accessibility: val as "easy" | "medium" | "hard" } })
                  }
                >
                  <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Facile</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="hard">Difficile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <label className="flex items-center gap-2 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={sheet.ductwork.has_inspection_hatches ?? false}
                  onChange={(e) =>
                    onPatch({ ductwork: { ...sheet.ductwork, has_inspection_hatches: e.target.checked } })
                  }
                />
                Botole di ispezione presenti
              </label>
            </div>
          </div>

          {/* Canalizzazioni aggiuntive */}
          {(sheet.ductwork.lines ?? []).map((line, idx) => {
            const updateLine = (patch: Partial<DuctLine>) => {
              const lines = [...(sheet.ductwork.lines ?? [])];
              lines[idx] = { ...lines[idx], ...patch };
              onPatch({ ductwork: { ...sheet.ductwork, lines } });
            };
            const removeLine = () => {
              const lines = (sheet.ductwork.lines ?? []).filter((_, i) => i !== idx);
              onPatch({ ductwork: { ...sheet.ductwork, lines } });
            };
            return (
              <div key={idx} className="rounded-lg border p-3 space-y-3 bg-muted/30">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Canalizzazione aggiuntiva #{idx + 1}</p>
                  <Button type="button" variant="ghost" size="sm" onClick={removeLine}>
                    <Trash2 className="h-4 w-4 mr-1" /> Rimuovi
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <Label>Descrizione</Label>
                    <Input
                      value={line.description ?? ""}
                      placeholder="es. Canna fumaria forno, scarico friggitrice..."
                      onChange={(e) => updateLine({ description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Lunghezza (m)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={line.length_m ?? ""}
                      onChange={(e) => updateLine({ length_m: Number(e.target.value) || undefined })}
                    />
                  </div>
                  <div>
                    <Label>Diametro (cm)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={line.diameter_cm ?? ""}
                      onChange={(e) => updateLine({ diameter_cm: Number(e.target.value) || undefined })}
                    />
                  </div>
                  <div>
                    <Label>Numero curve</Label>
                    <Input
                      type="number"
                      value={line.curves_count ?? ""}
                      onChange={(e) => updateLine({ curves_count: Number(e.target.value) || undefined })}
                    />
                  </div>
                  <div>
                    <Label>Accessibilità</Label>
                    <Select
                      value={line.accessibility ?? ""}
                      onValueChange={(val) => updateLine({ accessibility: val as "easy" | "medium" | "hard" })}
                    >
                      <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Facile</SelectItem>
                        <SelectItem value="medium">Media</SelectItem>
                        <SelectItem value="hard">Difficile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <label className="flex items-center gap-2 sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={line.has_inspection_hatches ?? false}
                      onChange={(e) => updateLine({ has_inspection_hatches: e.target.checked })}
                    />
                    Botole di ispezione presenti
                  </label>
                </div>
              </div>
            );
          })}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const lines = [...(sheet.ductwork.lines ?? []), {} as DuctLine];
              onPatch({ ductwork: { ...sheet.ductwork, lines } });
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Aggiungi canalizzazione
          </Button>
        </AccordionContent>
      </AccordionItem>

      {/* 5. ASPIRAZIONE */}
      <AccordionItem value="exhaust_system" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full pr-2 gap-3">
            <span className="text-left">{SECTION_LABELS.exhaust_system}</span>
            <VisibilityBadge sectionKey="exhaust_system" visible={v.exhaust_system} onToggle={() => toggleVis("exhaust_system")} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-3 pt-2">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label>Posizione motore</Label>
              <Select
                value={sheet.exhaust_system.motor_position ?? ""}
                onValueChange={(val) =>
                  onPatch({ exhaust_system: { ...sheet.exhaust_system, motor_position: val as "internal" | "external" } })
                }
              >
                <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal">Interno</SelectItem>
                  <SelectItem value="external">Esterno</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Collocazione</Label>
              <Select
                value={sheet.exhaust_system.location ?? ""}
                onValueChange={(val) =>
                  onPatch({ exhaust_system: { ...sheet.exhaust_system, location: val as "roof" | "wall" | "technical_room" } })
                }
              >
                <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="roof">Tetto</SelectItem>
                  <SelectItem value="wall">Parete</SelectItem>
                  <SelectItem value="technical_room">Vano tecnico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Accessibilità</Label>
              <Select
                value={sheet.exhaust_system.accessibility ?? ""}
                onValueChange={(val) =>
                  onPatch({ exhaust_system: { ...sheet.exhaust_system, accessibility: val as "easy" | "ladder" | "platform" } })
                }
              >
                <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Facile</SelectItem>
                  <SelectItem value="ladder">Scala</SelectItem>
                  <SelectItem value="platform">Piattaforma necessaria</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Stato visivo</Label>
              <Select
                value={sheet.exhaust_system.state ?? ""}
                onValueChange={(val) =>
                  onPatch({ exhaust_system: { ...sheet.exhaust_system, state: val as "good" | "medium" | "bad" } })
                }
              >
                <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="good">Pulito</SelectItem>
                  <SelectItem value="medium">Sporco</SelectItem>
                  <SelectItem value="bad">Molto sporco</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 6. FILTRI CARBONE */}
      <AccordionItem value="carbon_filters" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full pr-2 gap-3">
            <span className="text-left">{SECTION_LABELS.carbon_filters}</span>
            <VisibilityBadge sectionKey="carbon_filters" visible={v.carbon_filters} onToggle={() => toggleVis("carbon_filters")} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pt-2">
          {/* Centrale principale */}
          <div className="rounded-lg border p-3 space-y-3 bg-muted/30">
            <p className="text-sm font-semibold">Centrale principale</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <Label>Numero centrali totali</Label>
                <Input
                  type="number"
                  value={sheet.carbon_filters.units_count ?? ""}
                  onChange={(e) =>
                    onPatch({ carbon_filters: { ...sheet.carbon_filters, units_count: Number(e.target.value) || undefined } })
                  }
                />
              </div>
              <div>
                <Label>Marca / Modello</Label>
                <Input
                  value={sheet.carbon_filters.brand_model ?? ""}
                  onChange={(e) =>
                    onPatch({ carbon_filters: { ...sheet.carbon_filters, brand_model: e.target.value } })
                  }
                />
              </div>
              <div>
                <Label>Numero filtri carbone</Label>
                <Input
                  type="number"
                  value={sheet.carbon_filters.filter_count ?? ""}
                  onChange={(e) =>
                    onPatch({ carbon_filters: { ...sheet.carbon_filters, filter_count: Number(e.target.value) || undefined } })
                  }
                />
              </div>
              <div>
                <Label>Stato</Label>
                <Select
                  value={sheet.carbon_filters.state ?? ""}
                  onValueChange={(val) =>
                    onPatch({ carbon_filters: { ...sheet.carbon_filters, state: val as "good" | "medium" | "bad" } })
                  }
                >
                  <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">🟢 Buono</SelectItem>
                    <SelectItem value="medium">🟡 Da pulire</SelectItem>
                    <SelectItem value="bad">🔴 Da sostituire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Ultima manutenzione</Label>
                <Input
                  type="date"
                  value={sheet.carbon_filters.last_maintenance ?? ""}
                  onChange={(e) =>
                    onPatch({ carbon_filters: { ...sheet.carbon_filters, last_maintenance: e.target.value } })
                  }
                />
              </div>
              <div>
                <Label>Odori percepiti</Label>
                <Select
                  value={sheet.carbon_filters.odor_level ?? ""}
                  onValueChange={(val) =>
                    onPatch({ carbon_filters: { ...sheet.carbon_filters, odor_level: val as "none" | "medium" | "strong" } })
                  }
                >
                  <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nessuno</SelectItem>
                    <SelectItem value="medium">Medio</SelectItem>
                    <SelectItem value="strong">Forte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dettaglio filtri della centrale principale */}
            <FilterDetailsEditor
              filters={sheet.carbon_filters.filters ?? []}
              onChange={(filters) =>
                onPatch({ carbon_filters: { ...sheet.carbon_filters, filters } })
              }
            />
          </div>

          {/* Centrali aggiuntive */}
          {(sheet.carbon_filters.units ?? []).map((unit, idx) => {
            const updateUnit = (patch: Partial<CarbonFilterUnit>) => {
              const units = [...(sheet.carbon_filters.units ?? [])];
              units[idx] = { ...units[idx], ...patch };
              onPatch({ carbon_filters: { ...sheet.carbon_filters, units } });
            };
            const removeUnit = () => {
              const units = (sheet.carbon_filters.units ?? []).filter((_, i) => i !== idx);
              onPatch({ carbon_filters: { ...sheet.carbon_filters, units } });
            };
            return (
              <div key={idx} className="rounded-lg border p-3 space-y-3 bg-muted/30">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Centrale aggiuntiva #{idx + 1}</p>
                  <Button type="button" variant="ghost" size="sm" onClick={removeUnit}>
                    <Trash2 className="h-4 w-4 mr-1" /> Rimuovi
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <Label>Etichetta</Label>
                    <Input
                      value={unit.label ?? ""}
                      placeholder="es. Centrale zona pizzeria"
                      onChange={(e) => updateUnit({ label: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Marca / Modello</Label>
                    <Input
                      value={unit.brand_model ?? ""}
                      onChange={(e) => updateUnit({ brand_model: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Numero filtri carbone</Label>
                    <Input
                      type="number"
                      value={unit.filter_count ?? ""}
                      onChange={(e) => updateUnit({ filter_count: Number(e.target.value) || undefined })}
                    />
                  </div>
                  <div>
                    <Label>Stato</Label>
                    <Select
                      value={unit.state ?? ""}
                      onValueChange={(val) => updateUnit({ state: val as "good" | "medium" | "bad" })}
                    >
                      <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="good">🟢 Buono</SelectItem>
                        <SelectItem value="medium">🟡 Da pulire</SelectItem>
                        <SelectItem value="bad">🔴 Da sostituire</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Ultima manutenzione</Label>
                    <Input
                      type="date"
                      value={unit.last_maintenance ?? ""}
                      onChange={(e) => updateUnit({ last_maintenance: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Odori</Label>
                    <Select
                      value={unit.odor_level ?? ""}
                      onValueChange={(val) => updateUnit({ odor_level: val as "none" | "medium" | "strong" })}
                    >
                      <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nessuno</SelectItem>
                        <SelectItem value="medium">Medio</SelectItem>
                        <SelectItem value="strong">Forte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <FilterDetailsEditor
                  filters={unit.filters ?? []}
                  onChange={(filters) => updateUnit({ filters })}
                />
              </div>
            );
          })}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const units = [...(sheet.carbon_filters.units ?? []), {} as CarbonFilterUnit];
              onPatch({ carbon_filters: { ...sheet.carbon_filters, units } });
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Aggiungi centrale
          </Button>
        </AccordionContent>
      </AccordionItem>

      {/* 7. CONDIZIONI OPERATIVE */}
      <AccordionItem value="operating_conditions" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full pr-2 gap-3">
            <span className="text-left">{SECTION_LABELS.operating_conditions}</span>
            <VisibilityBadge sectionKey="operating_conditions" visible={v.operating_conditions} onToggle={() => toggleVis("operating_conditions")} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-3 pt-2">
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { key: "water_supply" as const, label: "Presa acqua disponibile" },
              { key: "water_drain" as const, label: "Scarico acqua" },
              { key: "power_supply" as const, label: "Presa elettrica" },
            ].map((f) => (
              <label key={f.key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={(sheet.operating_conditions[f.key] as boolean) ?? false}
                  onChange={(e) =>
                    onPatch({
                      operating_conditions: { ...sheet.operating_conditions, [f.key]: e.target.checked },
                    })
                  }
                />
                {f.label}
              </label>
            ))}
            <div>
              <Label>Spazio di lavoro</Label>
              <Select
                value={sheet.operating_conditions.workspace ?? ""}
                onValueChange={(val) =>
                  onPatch({
                    operating_conditions: { ...sheet.operating_conditions, workspace: val as "wide" | "limited" },
                  })
                }
              >
                <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="wide">Ampio</SelectItem>
                  <SelectItem value="limited">Limitato</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 8. RISCHI */}
      <AccordionItem value="risks" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full pr-2 gap-3">
            <span className="text-left">{SECTION_LABELS.risks}</span>
            <VisibilityBadge sectionKey="risks" visible={v.risks} onToggle={() => toggleVis("risks")} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-3 pt-2">
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { key: "high_work" as const, label: "Altezza lavoro elevata" },
              { key: "delicate_materials" as const, label: "Presenza materiali delicati" },
              { key: "electrical_proximity" as const, label: "Vicinanza impianti elettrici" },
              { key: "difficult_access" as const, label: "Accesso difficile" },
              { key: "specific_ppe" as const, label: "Necessità DPI specifici" },
            ].map((f) => (
              <label key={f.key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={(sheet.risks[f.key] as boolean) ?? false}
                  onChange={(e) => onPatch({ risks: { ...sheet.risks, [f.key]: e.target.checked } })}
                />
                {f.label}
              </label>
            ))}
          </div>
          <div>
            <Label>Note rischi</Label>
            <Textarea
              rows={2}
              value={sheet.risks.notes ?? ""}
              onChange={(e) => onPatch({ risks: { ...sheet.risks, notes: e.target.value } })}
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 9. STIMA INTERVENTO */}
      <AccordionItem value="intervention_estimate" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full pr-2 gap-3">
            <span className="text-left">{SECTION_LABELS.intervention_estimate}</span>
            <VisibilityBadge sectionKey="intervention_estimate" visible={v.intervention_estimate} onToggle={() => toggleVis("intervention_estimate")} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-3 pt-2">
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <Label>Operatori</Label>
              <Input
                type="number"
                value={sheet.intervention_estimate.operators ?? ""}
                onChange={(e) =>
                  onPatch({
                    intervention_estimate: { ...sheet.intervention_estimate, operators: Number(e.target.value) || undefined },
                  })
                }
              />
            </div>
            <div>
              <Label>Ore stimate</Label>
              <Input
                type="number"
                step="0.5"
                value={sheet.intervention_estimate.estimated_hours ?? ""}
                onChange={(e) =>
                  onPatch({
                    intervention_estimate: {
                      ...sheet.intervention_estimate,
                      estimated_hours: Number(e.target.value) || undefined,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label>Complessità</Label>
              <Select
                value={sheet.intervention_estimate.complexity ?? ""}
                onValueChange={(val) =>
                  onPatch({
                    intervention_estimate: {
                      ...sheet.intervention_estimate,
                      complexity: val as "low" | "medium" | "high",
                    },
                  })
                }
              >
                <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Bassa</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 10. PREVENTIVO */}
      <AccordionItem value="quote" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full pr-2 gap-3">
            <span className="text-left">{SECTION_LABELS.quote}</span>
            <VisibilityBadge sectionKey="quote" visible={v.quote} onToggle={() => toggleVis("quote")} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-2">
          <QuoteEditor
            items={sheet.quote_items}
            notes={sheet.quote_notes}
            onChange={(quote_items, quote_notes, quote_total_cents) =>
              onPatch({ quote_items, quote_notes, quote_total_cents })
            }
          />
        </AccordionContent>
      </AccordionItem>

      {/* 11. VALUTAZIONE INTERNA */}
      <AccordionItem value="evaluation" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full pr-2 gap-3">
            <span className="text-left">{SECTION_LABELS.evaluation}</span>
            <VisibilityBadge sectionKey="evaluation" visible={v.evaluation} onToggle={() => toggleVis("evaluation")} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-3 pt-2">
          <div>
            <Label>Sensibilità cliente (separati da virgola)</Label>
            <Input
              value={(sheet.internal_evaluation.sensitivity ?? []).join(", ")}
              onChange={(e) =>
                onPatch({
                  internal_evaluation: {
                    ...sheet.internal_evaluation,
                    sensitivity: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean) as ("price" | "quality" | "safety" | "regulations")[],
                  },
                })
              }
              placeholder="price, quality, safety, regulations"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label>Urgenza percepita</Label>
              <Select
                value={sheet.internal_evaluation.urgency ?? ""}
                onValueChange={(val) =>
                  onPatch({
                    internal_evaluation: { ...sheet.internal_evaluation, urgency: val as "low" | "medium" | "high" },
                  })
                }
              >
                <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Bassa</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Probabilità chiusura</Label>
              <Select
                value={sheet.internal_evaluation.closing_probability ?? ""}
                onValueChange={(val) =>
                  onPatch({
                    internal_evaluation: {
                      ...sheet.internal_evaluation,
                      closing_probability: val as "high" | "medium" | "low",
                    },
                  })
                }
              >
                <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">🟢 Alta</SelectItem>
                  <SelectItem value="medium">🟡 Media</SelectItem>
                  <SelectItem value="low">🔴 Bassa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Note interne</Label>
            <Textarea
              rows={3}
              value={sheet.internal_evaluation.notes ?? ""}
              onChange={(e) =>
                onPatch({
                  internal_evaluation: { ...sheet.internal_evaluation, notes: e.target.value },
                })
              }
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
