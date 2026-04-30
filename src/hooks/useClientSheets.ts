import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ClientSheet, ClientSheetPhoto, PhotoCategory } from "@/types/clientSheet";
import { DEFAULT_VISIBILITY } from "@/types/clientSheet";

const SHEETS_KEY = ["client_sheets"] as const;

export function useClientSheets() {
  return useQuery({
    queryKey: SHEETS_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_sheets")
        .select("id, public_token, status, business_name, contact_name, contact_phone, business_type, created_at, updated_at, quote_total_cents")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useClientSheet(id: string | undefined) {
  return useQuery({
    queryKey: ["client_sheet", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_sheets")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as unknown as ClientSheet;
    },
  });
}

export function useClientSheetPhotos(sheetId: string | undefined) {
  return useQuery({
    queryKey: ["client_sheet_photos", sheetId],
    enabled: !!sheetId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_sheet_photos")
        .select("*")
        .eq("sheet_id", sheetId!)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as ClientSheetPhoto[];
    },
  });
}

export function useCreateClientSheet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { business_name: string; contact_phone?: string }) => {
      const { data: userData } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("client_sheets")
        .insert({
          business_name: input.business_name,
          contact_phone: input.contact_phone ?? null,
          section_visibility: DEFAULT_VISIBILITY,
          created_by: userData.user?.id ?? null,
          updated_by: userData.user?.id ?? null,
        })
        .select("id, public_token")
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SHEETS_KEY });
    },
  });
}

export function useUpdateClientSheet(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patch: Partial<ClientSheet>) => {
      const { data: userData } = await supabase.auth.getUser();
      const { error } = await supabase
        .from("client_sheets")
        .update({ ...patch, updated_by: userData.user?.id ?? null } as never)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["client_sheet", id] });
      qc.invalidateQueries({ queryKey: SHEETS_KEY });
    },
  });
}

export function useDeleteClientSheet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("client_sheets").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: SHEETS_KEY }),
  });
}

export async function uploadSheetPhoto(opts: {
  sheetId: string;
  file: File;
  category: PhotoCategory;
  isPublic: boolean;
}) {
  const { sheetId, file, category, isPublic } = opts;
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("File troppo grande (max 10MB)");
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("Solo immagini consentite");
  }
  const ext = file.name.split(".").pop() || "jpg";
  const path = `client-sheets/${sheetId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error: upErr } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (upErr) throw upErr;
  const { data: pub } = supabase.storage.from("media").getPublicUrl(path);
  const { data, error } = await supabase
    .from("client_sheet_photos")
    .insert({
      sheet_id: sheetId,
      category,
      url: pub.publicUrl,
      is_public: isPublic,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as ClientSheetPhoto;
}

export async function deleteSheetPhoto(photoId: string) {
  const { error } = await supabase.from("client_sheet_photos").delete().eq("id", photoId);
  if (error) throw error;
}

export async function updateSheetPhoto(photoId: string, patch: Partial<ClientSheetPhoto>) {
  const { error } = await supabase
    .from("client_sheet_photos")
    .update(patch as never)
    .eq("id", photoId);
  if (error) throw error;
}

// Lettura pubblica via funzione SECURITY DEFINER
export function usePublicClientSheet(token: string | undefined) {
  return useQuery({
    queryKey: ["public_client_sheet", token],
    enabled: !!token,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_public_client_sheet", { _token: token! });
      if (error) throw error;
      return data as Record<string, unknown> | null;
    },
  });
}
