import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Play, AlertTriangle, FileDown } from "lucide-react";
import Header from "@/components/layout/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/layout/Footer";
import DatasheetRequestModal from "@/components/modelli/DatasheetRequestModal";
import { supabase } from "@/integrations/supabase/client";

import { DatasheetUrls } from "@/types/admin";

export interface ModelloData {
  id: string;
  name: string;
  diameter: string;
  tagline: string;
  description: string;
  ambitiIdeali: { name: string; href: string }[];
  applicazioniCompatibili: { name: string; href: string }[];
  settoriUtilizzo: { name: string; href: string }[];
  specifiche: { label: string; value: string }[];
  photos?: string[];
  datasheetUrl?: DatasheetUrls;
  // New fields
  inAzione?: {
    videoPlaceholder?: boolean;
    contestoBreve: string;
    interventoLink?: string;
  };
  quandoNon?: {
    casi: string[];
    alternativa: string;
    alternativaLink?: string;
  };
}

interface ModelloTemplateProps {
  data: ModelloData;
}

const ModelloTemplate = ({ data }: ModelloTemplateProps) => {
  const [isDatasheetModalOpen, setIsDatasheetModalOpen] = useState(false);
  const [dbPhotos, setDbPhotos] = useState<string[]>([]);
  const [dbVideos, setDbVideos] = useState<string[]>([]);
  const [dbDatasheetUrl, setDbDatasheetUrl] = useState<DatasheetUrls | null>(null);

  useEffect(() => {
    const fetchFromDb = async () => {
      const { data: dbModel } = await supabase
        .from('models')
        .select('photos, videos, datasheet_url')
        .eq('model_id', data.id)
        .maybeSingle();
      
      if (dbModel) {
        const photos = Array.isArray(dbModel.photos) ? dbModel.photos as string[] : [];
        if (photos.length > 0) setDbPhotos(photos);
        
        const videos = Array.isArray(dbModel.videos) ? dbModel.videos as string[] : [];
        if (videos.length > 0) setDbVideos(videos);

        if (dbModel.datasheet_url && typeof dbModel.datasheet_url === 'object' && Object.keys(dbModel.datasheet_url).length > 0) {
          setDbDatasheetUrl(dbModel.datasheet_url as DatasheetUrls);
        }
      }
    };
    fetchFromDb();
  }, [data.id]);

  // Merge: DB data takes priority over static data
  const photos = dbPhotos.length > 0 ? dbPhotos : (data.photos || []);
  const videos = dbVideos.length > 0 ? dbVideos : [];
  const datasheetUrl = dbDatasheetUrl || data.datasheetUrl;
  const hasDatasheet = datasheetUrl && Object.keys(datasheetUrl).length > 0;

  return (
    <div className="min-h-screen bg-background">
      <SEO title={`${data.name} – ${data.tagline}`} description={`${data.name} ZAPPER® (${data.diameter}): ${data.description.slice(0, 140)}`} />
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-zapper-black overflow-hidden">
          <div className="container px-4 sm:px-6">
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-6 flex-wrap">
              <Link to="/modelli" className="hover:text-white">Modelli</Link>
              <span>/</span>
              <span className="text-white">{data.name}</span>
            </nav>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Text content */}
              <div className="max-w-xl">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 break-words">
                  {data.name}
                </h1>
                <p className="text-lg md:text-xl text-primary font-semibold mb-2">{data.tagline}</p>
                <p className="text-base md:text-lg text-white/70 mb-4">{data.diameter}</p>
                <p className="text-base md:text-lg text-white/80 mb-8">{data.description}</p>
                
                {/* CTAs */}
                <div className="flex flex-col gap-3">
                  <Button
                    size="lg"
                    className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto whitespace-normal text-left h-auto py-3"
                    asChild
                  >
                    <Link to="/contatti">
                      <span className="flex-1">Verifica se {data.name} è adatto al tuo impianto</span>
                      <ArrowRight className="w-5 h-5 ml-2 flex-shrink-0" />
                    </Link>
                  </Button>
                  
                  {hasDatasheet && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto"
                      onClick={() => setIsDatasheetModalOpen(true)}
                    >
                      <FileDown className="w-5 h-5 mr-2" />
                      Scarica scheda tecnica
                    </Button>
                  )}
                </div>
                <p className="text-sm text-white/60 mt-3">Valutazione tecnica gratuita e senza impegno</p>
              </div>

              {/* Product image */}
              <div className="flex justify-center lg:justify-end">
                {photos.length > 0 ? (
                  <div className="relative">
                    <img 
                      src={photos[0]}
                      alt={`${data.name} - Abbattitore di fumi ZAPPER`}
                      className="max-w-full h-auto max-h-[400px] object-contain rounded-2xl shadow-2xl"
                    />
                    {/* Optional glow effect */}
                    <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-3xl -z-10 scale-110" />
                  </div>
                ) : (
                  <div className="w-full max-w-md aspect-square bg-white/5 rounded-2xl flex items-center justify-center">
                    <div className="text-center p-8">
                      <Zap className="w-16 h-16 text-white/20 mx-auto mb-4" />
                      <span className="text-white/40 text-sm">Foto prodotto</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Correlazioni */}
        <section className="py-12 md:py-16">
          <div className="container px-4 sm:px-6">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Ambiti ideali</h3>
                <div className="space-y-2">
                  {data.ambitiIdeali.map((a) => (
                    <Link
                      key={a.name}
                      to={a.href}
                      className="block text-primary hover:text-accent transition-colors"
                    >
                      {a.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Applicazioni</h3>
                <div className="space-y-2">
                  {data.applicazioniCompatibili.map((a) => (
                    <Link
                      key={a.name}
                      to={a.href}
                      className="block text-primary hover:text-accent transition-colors"
                    >
                      {a.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Settori</h3>
                <div className="space-y-2">
                  {data.settoriUtilizzo.map((s) => (
                    <Link
                      key={s.name}
                      to={s.href}
                      className="block text-primary hover:text-accent transition-colors"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specifiche tecniche */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
              Specifiche tecniche
            </h2>
            <div className="max-w-2xl mx-auto bg-card rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">
                {data.specifiche.map((s, i) => (
                  <div
                    key={i}
                    className="flex justify-between py-3 border-b border-border last:border-0"
                  >
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="font-semibold text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
              
              {/* Download datasheet CTA */}
              {hasDatasheet && (
                <div className="mt-6 pt-6 border-t border-border">
                  <Button
                    onClick={() => setIsDatasheetModalOpen(true)}
                    className="w-full"
                    size="lg"
                  >
                    <FileDown className="w-5 h-5 mr-2" />
                    Scarica scheda tecnica
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* In Azione */}
        {data.inAzione && (
          <section className="py-12 md:py-16">
            <div className="container px-4 sm:px-6">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
                🔥 {data.name} in azione
              </h2>
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Video */}
                {videos.length > 0 ? (
                  <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
                    <video
                      src={videos[0]}
                      controls
                      className="w-full h-full object-cover"
                      poster={photos.length > 1 ? photos[1] : undefined}
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center z-10">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    </div>
                    <span className="absolute bottom-4 left-4 text-sm text-muted-foreground">Video in arrivo</span>
                  </div>
                )}
                
                {/* Foto installazione */}
                {photos.length > 1 ? (
                  <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
                    <img
                      src={photos[1]}
                      alt={`${data.name} - Installazione`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center">
                    <div className="text-center p-6">
                      <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <span className="text-sm text-muted-foreground">Foto installazione</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Contesto */}
              <div className="max-w-2xl mx-auto mt-8 text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  {data.inAzione.contestoBreve}
                </p>
                <Link 
                  to={data.inAzione.interventoLink || "/interventi"}
                  className="inline-flex items-center text-primary hover:text-accent font-medium transition-colors"
                >
                  Vedi altri interventi simili
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Quando NON è questo modello */}
        {data.quandoNon && (
          <section className="py-12 md:py-16 bg-muted/30">
            <div className="container px-4 sm:px-6">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Quando {data.name} non è la soluzione ideale
                  </h2>
                </div>
                <ul className="space-y-3 mb-6">
                  {data.quandoNon.casi.map((caso, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{caso}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-foreground">
                  👉 In questi casi viene valutato{" "}
                  {data.quandoNon.alternativaLink ? (
                    <Link 
                      to={data.quandoNon.alternativaLink}
                      className="text-primary hover:text-accent font-semibold transition-colors"
                    >
                      {data.quandoNon.alternativa}
                    </Link>
                  ) : (
                    <span className="font-semibold">{data.quandoNon.alternativa}</span>
                  )}
                  .
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Come funziona la valutazione */}
        <section className="py-12 md:py-16">
          <div className="container px-4 sm:px-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                🔧 Come funziona la valutazione tecnica
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
                  <p className="text-muted-foreground pt-1">Ci invii alcune foto dell'impianto</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
                  <p className="text-muted-foreground pt-1">Analizziamo configurazione e diametri</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">3</span>
                  <p className="text-muted-foreground pt-1">Ti proponiamo il modello ZAPPER® più adatto</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">4</span>
                  <p className="text-muted-foreground pt-1">Ricevi indicazioni di installazione e offerta</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6 italic">
                La valutazione è da remoto e senza impegno.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Finale */}
        <section className="py-16 md:py-24 bg-accent overflow-hidden">
          <div className="container px-4 sm:px-6 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-accent-foreground mb-4">
              Conferma la soluzione con una valutazione
            </h2>
            <p className="text-accent-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Il modello non si sceglie, si conferma. Richiedi una valutazione tecnica gratuita per verificare
              che {data.name} sia la soluzione giusta per il tuo impianto.
            </p>
            <Button
              variant="default"
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              asChild
            >
              <Link to="/contatti">
                Richiedi una valutazione tecnica
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Datasheet Request Modal */}
        {hasDatasheet && datasheetUrl && (
          <DatasheetRequestModal
            isOpen={isDatasheetModalOpen}
            onClose={() => setIsDatasheetModalOpen(false)}
            modelId={data.id}
            modelName={data.name}
            datasheetUrls={datasheetUrl}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ModelloTemplate;
