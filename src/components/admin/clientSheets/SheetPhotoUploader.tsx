import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Trash2, Upload, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  PHOTO_CATEGORIES,
  type ClientSheetPhoto,
  type PhotoCategory,
} from "@/types/clientSheet";
import {
  deleteSheetPhoto,
  updateSheetPhoto,
  uploadSheetPhoto,
  useClientSheetPhotos,
} from "@/hooks/useClientSheets";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  sheetId: string;
}

export default function SheetPhotoUploader({ sheetId }: Props) {
  const { data: photos = [] } = useClientSheetPhotos(sheetId);
  const qc = useQueryClient();
  const { toast } = useToast();
  const [uploadingCat, setUploadingCat] = useState<PhotoCategory | null>(null);
  const inputRefs = useRef<Record<PhotoCategory, HTMLInputElement | null>>(
    {} as Record<PhotoCategory, HTMLInputElement | null>,
  );

  const refresh = () => qc.invalidateQueries({ queryKey: ["client_sheet_photos", sheetId] });

  const handleUpload = async (category: PhotoCategory, files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadingCat(category);
    try {
      for (const file of Array.from(files)) {
        await uploadSheetPhoto({ sheetId, file, category, isPublic: true });
      }
      toast({ title: "Foto caricate" });
      refresh();
    } catch (err) {
      toast({
        title: "Errore upload",
        description: err instanceof Error ? err.message : "Riprova",
        variant: "destructive",
      });
    } finally {
      setUploadingCat(null);
    }
  };

  const togglePublic = async (photo: ClientSheetPhoto) => {
    await updateSheetPhoto(photo.id, { is_public: !photo.is_public });
    refresh();
  };

  const remove = async (photo: ClientSheetPhoto) => {
    if (!confirm("Eliminare questa foto?")) return;
    await deleteSheetPhoto(photo.id);
    refresh();
  };

  return (
    <div className="space-y-6">
      {PHOTO_CATEGORIES.map((cat) => {
        const catPhotos = photos.filter((p) => p.category === cat.value);
        const isUp = uploadingCat === cat.value;
        return (
          <div key={cat.value} className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <p className="font-medium">
                  {cat.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {catPhotos.length} foto caricate
                </p>
              </div>
              <input
                ref={(el) => (inputRefs.current[cat.value] = el)}
                type="file"
                accept="image/*"
                capture="environment"
                multiple
                hidden
                onChange={(e) => {
                  handleUpload(cat.value, e.target.files);
                  if (e.target) e.target.value = "";
                }}
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={isUp}
                onClick={() => inputRefs.current[cat.value]?.click()}
              >
                {isUp ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                Carica / Scatta
              </Button>
            </div>
            {catPhotos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {catPhotos.map((p) => (
                  <div key={p.id} className="relative aspect-square rounded-md overflow-hidden bg-muted group">
                    <img src={p.url} alt={cat.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors" />
                    <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="secondary"
                        type="button"
                        className="h-7 w-7"
                        onClick={() => togglePublic(p)}
                        title={p.is_public ? "Nascondi al cliente" : "Mostra al cliente"}
                      >
                        {p.is_public ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        type="button"
                        className="h-7 w-7"
                        onClick={() => remove(p)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    {!p.is_public && (
                      <span className="absolute bottom-1 left-1 text-[10px] bg-foreground text-background px-1.5 py-0.5 rounded">
                        Privata
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
