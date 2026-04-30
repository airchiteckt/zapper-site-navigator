import { useParams } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import logoVerde from "@/assets/logo-zapper-verde.svg";
import { usePublicClientSheet } from "@/hooks/useClientSheets";
import { SECTION_LABELS, type SectionVisibility } from "@/types/clientSheet";

const formatEUR = (cents: number) =>
  `€ ${(cents / 100).toLocaleString("it-IT", { minimumFractionDigits: 2 })}`;

interface PublicSheet {
  id: string;
  business_name: string;
  status: string;
  section_visibility: SectionVisibility;
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
  address?: string;
  business_type?: string;
  opening_hours?: string;
  intervention_hours?: string;
  kitchen_hood?: Record<string, unknown>;
  cooking_area?: Record<string, unknown>;
  ductwork?: Record<string, unknown>;
  exhaust_system?: Record<string, unknown>;
  carbon_filters?: Record<string, unknown>;
  operating_conditions?: Record<string, unknown>;
  risks?: Record<string, unknown>;
  intervention_estimate?: Record<string, unknown>;
  quote_items?: Array<{ id: string; label: string; description?: string; frequency?: string; price_cents: number; included: boolean }>;
  quote_notes?: string;
  quote_total_cents?: number;
  internal_evaluation?: Record<string, unknown>;
  photos?: Array<{ id: string; category: string; url: string; caption?: string }>;
}

const STATE_LABELS: Record<string, string> = {
  good: "🟢 Buono / Pulito",
  medium: "🟡 Medio",
  bad: "🔴 Critico / Da intervenire",
  light: "Leggero",
  heavy: "Intenso",
  easy: "Facile",
  hard: "Difficile",
  low: "Bassa",
  high: "Alta",
  internal: "Interno",
  external: "Esterno",
  roof: "Tetto",
  wall: "Parete",
  technical_room: "Vano tecnico",
  ladder: "Scala",
  platform: "Piattaforma necessaria",
  none: "Nessuno",
  strong: "Forte",
  central: "Centrale",
  island: "Isola",
  wide: "Ampio",
  limited: "Limitato",
};

const lbl = (v: unknown) =>
  typeof v === "string" && STATE_LABELS[v] ? STATE_LABELS[v] : (v as string);

const renderObj = (obj: Record<string, unknown> | undefined, mapping: { key: string; label: string; format?: (v: unknown) => string }[]) => {
  if (!obj) return null;
  const entries = mapping
    .map((m) => ({ ...m, value: obj[m.key] }))
    .filter((e) => e.value !== undefined && e.value !== null && e.value !== "" && e.value !== false);
  if (entries.length === 0) return <p className="text-sm text-muted-foreground italic">Nessun dato disponibile.</p>;
  return (
    <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
      {entries.map((e) => (
        <div key={e.key} className="flex justify-between gap-3 py-1 border-b border-border/50">
          <dt className="text-muted-foreground">{e.label}</dt>
          <dd className="font-medium text-right">
            {e.format ? e.format(e.value) : typeof e.value === "boolean" ? "Sì" : String(lbl(e.value))}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default function PublicClientSheet() {
  const { token } = useParams<{ token: string }>();
  const { data, isLoading, error } = usePublicClientSheet(token);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <SEO title="Scheda non trovata" description="La scheda richiesta non esiste o è stata rimossa." noindex />
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-2">Scheda non disponibile</h1>
          <p className="text-muted-foreground">
            Il link che hai usato non è più valido. Contatta ZAPPER® per ricevere il link aggiornato.
          </p>
        </div>
      </div>
    );
  }

  const sheet = data as unknown as PublicSheet;
  const v = sheet.section_visibility;

  return (
    <div className="min-h-screen bg-muted/30">
      <SEO
        title={`Scheda tecnica — ${sheet.business_name}`}
        description={`Quadro generale dei servizi ZAPPER® per ${sheet.business_name}.`}
        noindex
      />

      {/* Header brand */}
      <header className="bg-foreground text-background py-6 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <img src={logoVerde} alt="ZAPPER®" className="h-10" />
          <span className="text-xs text-background/70 hidden sm:inline">Scheda tecnica riservata</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Hero */}
        <section className="text-center space-y-2">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">Quadro generale</p>
          <h1 className="text-3xl sm:text-4xl font-bold">{sheet.business_name}</h1>
          {sheet.business_type && v.general && (
            <p className="text-muted-foreground">{sheet.business_type}</p>
          )}
        </section>

        {/* 1. Dati generali */}
        {v.general && (
          <Card>
            <CardHeader><CardTitle className="text-lg">{SECTION_LABELS.general}</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              {sheet.contact_name && <p className="flex items-center gap-2"><strong>Referente:</strong> {sheet.contact_name}</p>}
              {sheet.contact_phone && <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {sheet.contact_phone}</p>}
              {sheet.contact_email && <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> {sheet.contact_email}</p>}
              {sheet.address && <p className="flex items-start gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5" /> {sheet.address}</p>}
              {sheet.opening_hours && <p className="flex items-start gap-2"><Clock className="h-4 w-4 text-primary mt-0.5" /> Apertura: {sheet.opening_hours}</p>}
              {sheet.intervention_hours && <p className="flex items-start gap-2"><Clock className="h-4 w-4 text-accent-blue mt-0.5" /> Disponibilità intervento: {sheet.intervention_hours}</p>}
            </CardContent>
          </Card>
        )}

        {/* 2. Cappa + foto */}
        {v.kitchen_hood && (
          <Card>
            <CardHeader><CardTitle className="text-lg">{SECTION_LABELS.kitchen_hood}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {renderObj(sheet.kitchen_hood, [
                { key: "count", label: "Numero cappe" },
                { key: "type", label: "Tipologia" },
                { key: "length_cm", label: "Lunghezza", format: (v) => `${v} cm` },
                { key: "depth_cm", label: "Profondità", format: (v) => `${v} cm` },
                { key: "height_cm", label: "Altezza da terra", format: (v) => `${v} cm` },
                { key: "state", label: "Stato attuale" },
              ])}
              {sheet.photos && sheet.photos.length > 0 && (
                <div className="pt-3 border-t">
                  <p className="text-sm font-medium mb-2">Documentazione fotografica</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {sheet.photos.map((p) => (
                      <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="block aspect-square rounded-md overflow-hidden bg-muted">
                        <img src={p.url} alt={p.caption ?? p.category} className="w-full h-full object-cover hover:scale-105 transition-transform" loading="lazy" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {v.cooking_area && (
          <Card>
            <CardHeader><CardTitle className="text-lg">{SECTION_LABELS.cooking_area}</CardTitle></CardHeader>
            <CardContent>
              {renderObj(sheet.cooking_area, [
                { key: "burner_count", label: "Numero fuochi" },
                { key: "types", label: "Tipologie", format: (v) => (v as string[]).join(", ") },
                { key: "dirt_level", label: "Livello sporco" },
                { key: "has_critical_buildup", label: "Incrostazioni critiche" },
              ])}
            </CardContent>
          </Card>
        )}

        {v.ductwork && (
          <Card>
            <CardHeader><CardTitle className="text-lg">{SECTION_LABELS.ductwork}</CardTitle></CardHeader>
            <CardContent>
              {renderObj(sheet.ductwork, [
                { key: "present", label: "Presente" },
                { key: "length_m", label: "Lunghezza", format: (v) => `${v} m` },
                { key: "curves_count", label: "Numero curve" },
                { key: "accessibility", label: "Accessibilità" },
                { key: "has_inspection_hatches", label: "Botole di ispezione" },
              ])}
            </CardContent>
          </Card>
        )}

        {v.exhaust_system && (
          <Card>
            <CardHeader><CardTitle className="text-lg">{SECTION_LABELS.exhaust_system}</CardTitle></CardHeader>
            <CardContent>
              {renderObj(sheet.exhaust_system, [
                { key: "motor_position", label: "Posizione motore" },
                { key: "location", label: "Collocazione" },
                { key: "accessibility", label: "Accessibilità" },
                { key: "state", label: "Stato" },
              ])}
            </CardContent>
          </Card>
        )}

        {v.carbon_filters && (
          <Card>
            <CardHeader><CardTitle className="text-lg">{SECTION_LABELS.carbon_filters}</CardTitle></CardHeader>
            <CardContent>
              {renderObj(sheet.carbon_filters, [
                { key: "units_count", label: "Numero centrali" },
                { key: "brand_model", label: "Marca / modello" },
                { key: "filter_count", label: "Numero filtri" },
                { key: "state", label: "Stato attuale" },
                { key: "last_maintenance", label: "Ultima manutenzione" },
                { key: "odor_level", label: "Odori percepiti" },
              ])}
            </CardContent>
          </Card>
        )}

        {v.operating_conditions && (
          <Card>
            <CardHeader><CardTitle className="text-lg">{SECTION_LABELS.operating_conditions}</CardTitle></CardHeader>
            <CardContent>
              {renderObj(sheet.operating_conditions, [
                { key: "water_supply", label: "Presa acqua" },
                { key: "water_drain", label: "Scarico acqua" },
                { key: "power_supply", label: "Presa elettrica" },
                { key: "workspace", label: "Spazio di lavoro" },
              ])}
            </CardContent>
          </Card>
        )}

        {v.risks && (
          <Card>
            <CardHeader><CardTitle className="text-lg">{SECTION_LABELS.risks}</CardTitle></CardHeader>
            <CardContent>
              {renderObj(sheet.risks, [
                { key: "high_work", label: "Altezza elevata" },
                { key: "delicate_materials", label: "Materiali delicati" },
                { key: "electrical_proximity", label: "Vicinanza impianti elettrici" },
                { key: "difficult_access", label: "Accesso difficile" },
                { key: "specific_ppe", label: "DPI specifici" },
                { key: "notes", label: "Note" },
              ])}
            </CardContent>
          </Card>
        )}

        {v.intervention_estimate && (
          <Card>
            <CardHeader><CardTitle className="text-lg">{SECTION_LABELS.intervention_estimate}</CardTitle></CardHeader>
            <CardContent>
              {renderObj(sheet.intervention_estimate, [
                { key: "operators", label: "Operatori" },
                { key: "estimated_hours", label: "Ore stimate" },
                { key: "complexity", label: "Complessità" },
              ])}
            </CardContent>
          </Card>
        )}

        {/* 10. PREVENTIVO */}
        {v.quote && sheet.quote_items && sheet.quote_items.length > 0 && (
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="text-lg">Servizi proposti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sheet.quote_items.filter((i) => i.included).map((item) => (
                <div key={item.id} className="flex justify-between gap-3 py-2 border-b last:border-0">
                  <div className="flex-1">
                    <p className="font-medium">{item.label}</p>
                    {item.frequency && <p className="text-xs text-muted-foreground">Frequenza: {item.frequency}</p>}
                    {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
                  </div>
                  <span className="font-semibold whitespace-nowrap">{formatEUR(item.price_cents)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3 border-t-2">
                <span className="text-lg font-bold">Totale</span>
                <span className="text-2xl font-bold text-primary">
                  {formatEUR(sheet.quote_total_cents ?? 0)}
                </span>
              </div>
              {sheet.quote_notes && (
                <p className="text-sm text-muted-foreground whitespace-pre-line pt-3 border-t">{sheet.quote_notes}</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* CTA finale */}
        <Card className="bg-foreground text-background">
          <CardContent className="py-6 space-y-3 text-center">
            <h2 className="text-xl font-bold">Hai domande sulla proposta?</h2>
            <p className="text-background/80 text-sm">
              Contatta ZAPPER® per chiarimenti o per confermare l'intervento.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
              <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary/90">
                <a href="https://wa.me/390811996843" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Scrivici su WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-background text-background hover:bg-background/10">
                <a href="tel:+390811996843">
                  <Phone className="h-4 w-4 mr-2" />
                  +39 081 199 68 436
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground py-4">
          Documento riservato generato da ZAPPER® · Sistemi di abbattimento fumi e odori
        </p>
      </main>
    </div>
  );
}
