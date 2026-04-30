// Tipi per le schede tecniche cliente

export type SheetStatus = "draft" | "sent" | "closed";

export type StateLevel = "good" | "medium" | "bad";
export type DirtLevel = "light" | "medium" | "heavy";
export type Difficulty = "easy" | "medium" | "hard";
export type ComplexityLevel = "low" | "medium" | "high";
export type ProbabilityLevel = "high" | "medium" | "low";
export type UrgencyLevel = "low" | "medium" | "high";

export interface KitchenHood {
  count?: number;
  type?: "wall" | "central" | "island";
  length_cm?: number;
  depth_cm?: number;
  height_cm?: number;
  state?: StateLevel;
}

export interface CookingArea {
  burner_count?: number;
  types?: string[]; // gas, induction, fry_top, grill, oven
  dirt_level?: DirtLevel;
  has_critical_buildup?: boolean;
}

export interface Ductwork {
  present?: boolean;
  length_m?: number;
  curves_count?: number;
  accessibility?: Difficulty;
  has_inspection_hatches?: boolean;
}

export interface ExhaustSystem {
  motor_position?: "internal" | "external";
  location?: "roof" | "wall" | "technical_room";
  accessibility?: "easy" | "ladder" | "platform";
  state?: StateLevel;
}

export interface CarbonFilters {
  units_count?: number;
  brand_model?: string;
  filter_count?: number;
  state?: StateLevel;
  last_maintenance?: string; // ISO date
  odor_level?: "none" | "medium" | "strong";
}

export interface OperatingConditions {
  water_supply?: boolean;
  water_drain?: boolean;
  power_supply?: boolean;
  workspace?: "wide" | "limited";
}

export interface Risks {
  high_work?: boolean;
  delicate_materials?: boolean;
  electrical_proximity?: boolean;
  difficult_access?: boolean;
  specific_ppe?: boolean;
  notes?: string;
}

export interface InterventionEstimate {
  operators?: number;
  estimated_hours?: number;
  complexity?: ComplexityLevel;
}

export interface QuoteItem {
  id: string;
  label: string;
  description?: string;
  frequency?: string; // es. "mensile", "trimestrale"
  price_cents: number;
  included: boolean;
}

export interface InternalEvaluation {
  sensitivity?: ("price" | "quality" | "safety" | "regulations")[];
  urgency?: UrgencyLevel;
  closing_probability?: ProbabilityLevel;
  notes?: string;
}

export type SectionKey =
  | "general"
  | "kitchen_hood"
  | "cooking_area"
  | "ductwork"
  | "exhaust_system"
  | "carbon_filters"
  | "operating_conditions"
  | "risks"
  | "intervention_estimate"
  | "quote"
  | "evaluation";

export type SectionVisibility = Record<SectionKey, boolean>;

export const DEFAULT_VISIBILITY: SectionVisibility = {
  general: true,
  kitchen_hood: true,
  cooking_area: false,
  ductwork: false,
  exhaust_system: false,
  carbon_filters: true,
  operating_conditions: false,
  risks: false,
  intervention_estimate: false,
  quote: true,
  evaluation: false,
};

export interface ClientSheet {
  id: string;
  public_token: string;
  status: SheetStatus;
  business_name: string;
  contact_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  address: string | null;
  business_type: string | null;
  opening_hours: string | null;
  intervention_hours: string | null;
  kitchen_hood: KitchenHood;
  cooking_area: CookingArea;
  ductwork: Ductwork;
  exhaust_system: ExhaustSystem;
  carbon_filters: CarbonFilters;
  operating_conditions: OperatingConditions;
  risks: Risks;
  intervention_estimate: InterventionEstimate;
  quote_items: QuoteItem[];
  quote_notes: string | null;
  quote_total_cents: number;
  internal_evaluation: InternalEvaluation;
  section_visibility: SectionVisibility;
  created_at: string;
  updated_at: string;
}

export type PhotoCategory =
  | "hood_front"
  | "hood_inside"
  | "filters"
  | "cooking_area"
  | "ductwork"
  | "exhaust"
  | "other";

export const PHOTO_CATEGORIES: { value: PhotoCategory; label: string; required?: boolean }[] = [
  { value: "hood_front", label: "Frontale cappa", required: true },
  { value: "hood_inside", label: "Interno cappa", required: true },
  { value: "filters", label: "Filtri", required: true },
  { value: "cooking_area", label: "Zona fuochi", required: true },
  { value: "ductwork", label: "Canalizzazione", required: false },
  { value: "exhaust", label: "Aspirazione/Motore", required: false },
  { value: "other", label: "Altro", required: false },
];

export interface ClientSheetPhoto {
  id: string;
  sheet_id: string;
  category: PhotoCategory;
  url: string;
  caption: string | null;
  is_public: boolean;
  sort_order: number;
  created_at: string;
}

export const SECTION_LABELS: Record<SectionKey, string> = {
  general: "1. Dati generali cliente",
  kitchen_hood: "2. Cappa aspirante",
  cooking_area: "3. Fuochi e piano cottura",
  ductwork: "4. Canalizzazione fumi",
  exhaust_system: "5. Sistema aspirazione",
  carbon_filters: "6. Centrali con filtri a carbone",
  operating_conditions: "7. Condizioni operative",
  risks: "8. Rischi e criticità",
  intervention_estimate: "9. Stima intervento",
  quote: "10. Opportunità commerciali / Preventivo",
  evaluation: "11. Valutazione generale (interna)",
};
