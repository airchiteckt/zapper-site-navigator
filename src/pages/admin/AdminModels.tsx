import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Pencil, Trash2, Search, Image, Video, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Model, ModelInsert, Specification, LinkItem, DatasheetUrls } from '@/types/admin';
import ImageUpload from '@/components/admin/ImageUpload';
import VideoUpload from '@/components/admin/VideoUpload';
import MultilingualFileUpload from '@/components/admin/MultilingualFileUpload';
import LinkListEditor from '@/components/admin/LinkListEditor';

export default function AdminModels() {
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { isAdmin, profile } = useAuth();
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState<ModelInsert>({
    model_id: '',
    name: '',
    tagline: '',
    description: '',
    diameter: '',
    specifications: [],
    photos: [],
    videos: [],
    datasheet_url: {},
    ambiti_ideali: [],
    applicazioni_compatibili: [],
    settori_utilizzo: [],
  });

  const fetchModels = async () => {
    try {
      const { data, error } = await supabase
        .from('models')
        .select('*')
        .order('name');

      if (error) throw error;

      // Parse JSONB fields with proper type assertion
      const parsedModels = (data || []).map((model): Model => ({
        id: model.id,
        model_id: model.model_id,
        name: model.name,
        tagline: model.tagline,
        description: model.description,
        diameter: model.diameter,
        specifications: (model.specifications as unknown as Specification[]) || [],
        photos: (model.photos as unknown as string[]) || [],
        videos: (model.videos as unknown as string[]) || [],
        ambiti_ideali: (model.ambiti_ideali as unknown as LinkItem[]) || [],
        applicazioni_compatibili: (model.applicazioni_compatibili as unknown as LinkItem[]) || [],
        settori_utilizzo: (model.settori_utilizzo as unknown as LinkItem[]) || [],
        datasheet_url: (model.datasheet_url as unknown as DatasheetUrls) || {},
        created_by: model.created_by,
        updated_by: model.updated_by,
        created_at: model.created_at,
        updated_at: model.updated_at,
      }));

      setModels(parsedModels);
    } catch (error) {
      console.error('Error fetching models:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile caricare i modelli.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleOpenDialog = (model?: Model) => {
    if (model) {
      setEditingModel(model);
      setFormData({
        model_id: model.model_id,
        name: model.name,
        tagline: model.tagline || '',
        description: model.description || '',
        diameter: model.diameter || '',
        specifications: model.specifications || [],
        photos: model.photos || [],
        videos: model.videos || [],
        datasheet_url: model.datasheet_url || {},
      });
    } else {
      setEditingModel(null);
      setFormData({
        model_id: '',
        name: '',
        tagline: '',
        description: '',
        diameter: '',
        specifications: [],
        photos: [],
        videos: [],
        datasheet_url: {},
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.model_id || !formData.name) {
      toast({
        title: 'Campi obbligatori',
        description: 'ID modello e nome sono obbligatori.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);

    try {
      if (editingModel) {
        // Update existing model
        const updateData: any = {
          model_id: formData.model_id,
          name: formData.name,
          tagline: formData.tagline,
          description: formData.description,
          diameter: formData.diameter,
          specifications: formData.specifications || [],
          photos: formData.photos || [],
          videos: formData.videos || [],
          datasheet_url: formData.datasheet_url || {},
          ambiti_ideali: formData.ambiti_ideali || [],
          applicazioni_compatibili: formData.applicazioni_compatibili || [],
          settori_utilizzo: formData.settori_utilizzo || [],
          updated_by: profile?.id,
        };

        const { error } = await supabase
          .from('models')
          .update(updateData)
          .eq('id', editingModel.id);

        if (error) throw error;

        toast({
          title: 'Modello aggiornato',
          description: 'Le modifiche sono state salvate.',
        });
      } else {
        // Create new model
        const insertData: any = {
          model_id: formData.model_id,
          name: formData.name,
          tagline: formData.tagline || null,
          description: formData.description || null,
          diameter: formData.diameter || null,
          specifications: formData.specifications || [],
          photos: formData.photos || [],
          videos: formData.videos || [],
          datasheet_url: formData.datasheet_url || {},
          ambiti_ideali: formData.ambiti_ideali || [],
          applicazioni_compatibili: formData.applicazioni_compatibili || [],
          settori_utilizzo: formData.settori_utilizzo || [],
          created_by: profile?.id,
          updated_by: profile?.id,
        };

        const { error } = await supabase.from('models').insert(insertData);

        if (error) throw error;

        toast({
          title: 'Modello creato',
          description: 'Il nuovo modello è stato aggiunto.',
        });
      }

      setIsDialogOpen(false);
      fetchModels();
    } catch (error: any) {
      console.error('Error saving model:', error);
      if (error.code === '23505') {
        toast({
          title: 'ID già esistente',
          description: 'Esiste già un modello con questo ID.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Errore',
          description: 'Impossibile salvare il modello.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (model: Model) => {
    if (!isAdmin) {
      toast({
        title: 'Permesso negato',
        description: 'Solo gli admin possono eliminare i modelli.',
        variant: 'destructive',
      });
      return;
    }

    if (!confirm(`Sei sicuro di voler eliminare "${model.name}"?`)) {
      return;
    }

    try {
      const { error } = await supabase.from('models').delete().eq('id', model.id);

      if (error) throw error;

      toast({
        title: 'Modello eliminato',
        description: 'Il modello è stato rimosso.',
      });

      fetchModels();
    } catch (error) {
      console.error('Error deleting model:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile eliminare il modello.',
        variant: 'destructive',
      });
    }
  };

  const filteredModels = models.filter(
    (model) =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.model_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="Gestione Modelli">
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca modello..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Nuovo Modello
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingModel ? 'Modifica Modello' : 'Nuovo Modello'}
                </DialogTitle>
                <DialogDescription>
                  {editingModel
                    ? 'Modifica le informazioni del modello'
                    : 'Inserisci le informazioni del nuovo modello'}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="model_id">ID Modello *</Label>
                    <Input
                      id="model_id"
                      value={formData.model_id}
                      onChange={(e) =>
                        setFormData({ ...formData, model_id: e.target.value })
                      }
                      placeholder="zpz-max"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="ZPZ MAX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={formData.tagline || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, tagline: e.target.value })
                    }
                    placeholder="Alta portata per forni intensivi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diameter">Diametro</Label>
                  <Input
                    id="diameter"
                    value={formData.diameter || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, diameter: e.target.value })
                    }
                    placeholder="Ø 300–350 mm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrizione</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Descrizione dettagliata del modello..."
                    rows={4}
                  />
                </div>

                {/* Image Upload */}
                <ImageUpload
                  label="Foto prodotto"
                  value={formData.photos || []}
                  onChange={(urls) => setFormData({ ...formData, photos: urls })}
                  maxImages={5}
                  folder={`models/${formData.model_id || 'new'}`}
                />

                {/* Video Upload */}
                <VideoUpload
                  label="Video installazione / montaggio"
                  value={formData.videos || []}
                  onChange={(urls) => setFormData({ ...formData, videos: urls })}
                  maxVideos={3}
                  folder={`models/${formData.model_id || 'new'}/videos`}
                />

                {/* Multilingual PDF Upload */}
                <MultilingualFileUpload
                  label="Schede tecniche (PDF)"
                  value={formData.datasheet_url || {}}
                  onChange={(urls) => setFormData({ ...formData, datasheet_url: urls })}
                  folder={`datasheets/${formData.model_id || 'new'}`}
                />

                {/* Link editors for relationships */}
                <LinkListEditor
                  label="Ambiti ideali"
                  value={formData.ambiti_ideali || []}
                  onChange={(items) => setFormData({ ...formData, ambiti_ideali: items })}
                  category="ambiti"
                />

                <LinkListEditor
                  label="Applicazioni compatibili"
                  value={formData.applicazioni_compatibili || []}
                  onChange={(items) => setFormData({ ...formData, applicazioni_compatibili: items })}
                  category="applicazioni"
                />

                <LinkListEditor
                  label="Settori di utilizzo"
                  value={formData.settori_utilizzo || []}
                  onChange={(items) => setFormData({ ...formData, settori_utilizzo: items })}
                  category="settori"
                />

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Annulla
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Salvataggio...' : 'Salva'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : filteredModels.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {searchQuery
                  ? 'Nessun modello trovato.'
                  : 'Nessun modello presente. Crea il primo!'}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tagline</TableHead>
                    <TableHead>Diametro</TableHead>
                    <TableHead className="text-center">Media</TableHead>
                    <TableHead className="text-center">Scheda</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredModels.map((model) => (
                    <TableRow key={model.id}>
                      <TableCell className="font-mono text-sm">
                        {model.model_id}
                      </TableCell>
                      <TableCell className="font-medium">{model.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {model.tagline || '-'}
                      </TableCell>
                      <TableCell>{model.diameter || '-'}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Image className="h-3 w-3" />
                            {model.photos?.length || 0}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Video className="h-3 w-3" />
                            {model.videos?.length || 0}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {model.datasheet_url && Object.keys(model.datasheet_url).length > 0 ? (
                          <div className="flex items-center justify-center gap-1">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-xs text-muted-foreground">
                              {Object.keys(model.datasheet_url).length}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(model)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          {isAdmin && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDelete(model)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
