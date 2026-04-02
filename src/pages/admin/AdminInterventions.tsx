import { useEffect, useState, useMemo } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Pencil, Trash2, Search, ExternalLink, ChevronsUpDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Intervention, InterventionInsert, SectorType } from '@/types/admin';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AdminInterventions() {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [models, setModels] = useState<{ id: string; name: string; model_id: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIntervention, setEditingIntervention] = useState<Intervention | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [modelPopoverOpen, setModelPopoverOpen] = useState(false);
  const { isAdmin, profile } = useAuth();
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState<InterventionInsert>({
    title: '',
    description: '',
    video_url: '',
    thumbnail_url: '',
    location: '',
    client_name: '',
    model_used: '',
    application_type: '',
    problem: '',
    sector: null,
  });

  const fetchInterventions = async () => {
    try {
      const { data, error } = await supabase
        .from('interventions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setInterventions((data || []) as Intervention[]);
    } catch (error) {
      console.error('Error fetching interventions:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile caricare gli interventi.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchModels = async () => {
    const { data } = await supabase
      .from('models')
      .select('id, name, model_id')
      .order('name');
    setModels(data || []);
  };

  useEffect(() => {
    fetchInterventions();
    fetchModels();
  }, []);

  const handleOpenDialog = (intervention?: Intervention) => {
    if (intervention) {
      setEditingIntervention(intervention);
      setFormData({
        title: intervention.title,
        description: intervention.description || '',
        video_url: intervention.video_url || '',
        thumbnail_url: intervention.thumbnail_url || '',
        location: intervention.location || '',
        client_name: intervention.client_name || '',
        model_used: intervention.model_used || '',
        application_type: intervention.application_type || '',
        problem: intervention.problem || '',
        sector: (intervention as any).sector || null,
      });
    } else {
      setEditingIntervention(null);
      setFormData({
        title: '',
        description: '',
        video_url: '',
        thumbnail_url: '',
        location: '',
        client_name: '',
        model_used: '',
        application_type: '',
        problem: '',
        sector: null,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title) {
      toast({
        title: 'Campo obbligatorio',
        description: 'Il titolo è obbligatorio.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);

    try {
      if (editingIntervention) {
        // Update existing intervention
        const { error } = await supabase
          .from('interventions')
          .update({
            title: formData.title,
            description: formData.description,
            video_url: formData.video_url,
            thumbnail_url: formData.thumbnail_url,
            location: formData.location,
            client_name: formData.client_name,
            model_used: formData.model_used,
            application_type: formData.application_type,
            problem: formData.problem,
            sector: formData.sector,
            updated_by: profile?.id,
          } as any)
          .eq('id', editingIntervention.id);

        if (error) throw error;

        toast({
          title: 'Intervento aggiornato',
          description: 'Le modifiche sono state salvate.',
        });
      } else {
        // Create new intervention
        const { error } = await supabase.from('interventions').insert({
          ...formData,
          created_by: profile?.id,
          updated_by: profile?.id,
        } as any);

        if (error) throw error;

        toast({
          title: 'Intervento creato',
          description: 'Il nuovo intervento è stato aggiunto.',
        });
      }

      setIsDialogOpen(false);
      fetchInterventions();
    } catch (error) {
      console.error('Error saving intervention:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile salvare l\'intervento.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (intervention: Intervention) => {
    if (!isAdmin) {
      toast({
        title: 'Permesso negato',
        description: 'Solo gli admin possono eliminare gli interventi.',
        variant: 'destructive',
      });
      return;
    }

    if (!confirm(`Sei sicuro di voler eliminare "${intervention.title}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('interventions')
        .delete()
        .eq('id', intervention.id);

      if (error) throw error;

      toast({
        title: 'Intervento eliminato',
        description: 'L\'intervento è stato rimosso.',
      });

      fetchInterventions();
    } catch (error) {
      console.error('Error deleting intervention:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile eliminare l\'intervento.',
        variant: 'destructive',
      });
    }
  };

  const filteredInterventions = interventions.filter(
    (intervention) =>
      intervention.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intervention.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intervention.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="Gestione Interventi">
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca intervento..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Nuovo Intervento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingIntervention ? 'Modifica Intervento' : 'Nuovo Intervento'}
                </DialogTitle>
                <DialogDescription>
                  {editingIntervention
                    ? 'Modifica le informazioni dell\'intervento'
                    : 'Inserisci le informazioni del nuovo intervento'}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titolo *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Installazione pizzeria Da Mario"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client_name">Nome cliente</Label>
                    <Input
                      id="client_name"
                      value={formData.client_name || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, client_name: e.target.value })
                      }
                      placeholder="Pizzeria Da Mario"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Località</Label>
                    <Input
                      id="location"
                      value={formData.location || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="Milano, Italia"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model_used">Modello utilizzato</Label>
                  <Popover open={modelPopoverOpen} onOpenChange={setModelPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={modelPopoverOpen}
                        className="w-full justify-between font-normal"
                      >
                        {formData.model_used || 'Seleziona modello...'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Cerca modello..." />
                        <CommandList>
                          <CommandEmpty>Nessun modello trovato.</CommandEmpty>
                          <CommandGroup>
                            {models.map((model) => (
                              <CommandItem
                                key={model.id}
                                value={model.name}
                                onSelect={() => {
                                  setFormData({ ...formData, model_used: model.name });
                                  setModelPopoverOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.model_used === model.name ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {model.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="application_type">Applicazione</Label>
                    <Input
                      id="application_type"
                      value={formData.application_type || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, application_type: e.target.value })
                      }
                      placeholder="es. Forno a legna, Caldaia..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="problem">Problema</Label>
                    <Input
                      id="problem"
                      value={formData.problem || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, problem: e.target.value })
                      }
                      placeholder="es. Fumi neri, Odori persistenti..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="video_url">URL Video (YouTube/Vimeo)</Label>
                  <Input
                    id="video_url"
                    value={formData.video_url || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, video_url: e.target.value })
                    }
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail_url">URL Thumbnail</Label>
                  <Input
                    id="thumbnail_url"
                    value={formData.thumbnail_url || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, thumbnail_url: e.target.value })
                    }
                    placeholder="https://..."
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
                    placeholder="Descrizione dell'intervento..."
                    rows={4}
                  />
                </div>

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
            ) : filteredInterventions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {searchQuery
                  ? 'Nessun intervento trovato.'
                  : 'Nessun intervento presente. Crea il primo!'}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titolo</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Località</TableHead>
                    <TableHead>Modello</TableHead>
                    <TableHead>Video</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInterventions.map((intervention) => (
                    <TableRow key={intervention.id}>
                      <TableCell className="font-medium">
                        {intervention.title}
                      </TableCell>
                      <TableCell>{intervention.client_name || '-'}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {intervention.location || '-'}
                      </TableCell>
                      <TableCell>{intervention.model_used || '-'}</TableCell>
                      <TableCell>
                        {intervention.video_url ? (
                          <a
                            href={intervention.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Apri
                          </a>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(intervention)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          {isAdmin && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDelete(intervention)}
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
