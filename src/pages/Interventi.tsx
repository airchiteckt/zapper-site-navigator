import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, ArrowRight, MapPin, CheckCircle, Wrench, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";

interface InterventionData {
  id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  location: string | null;
  client_name: string | null;
  model_used: string | null;
  application_type: string | null;
  problem: string | null;
}

const getYouTubeEmbedUrl = (url: string): string | null => {
  try {
    // Handle youtube.com/shorts/ID
    const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&]+)/);
    if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
    // Handle youtube.com/watch?v=ID
    const watchMatch = url.match(/[?&]v=([^?&]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
    // Handle youtu.be/ID
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
    return null;
  } catch {
    return null;
  }
};

const Interventi = () => {
  const [interventi, setInterventi] = useState<InterventionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInterventi = async () => {
      const { data, error } = await supabase
        .from('interventions')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setInterventi(data);
      }
      setIsLoading(false);
    };
    fetchInterventi();
  }, []);

  return (
    <div className="min-h-screen">
      <SEO title="Interventi Reali" description="Scopri gli interventi reali ZAPPER® su forni, caldaie e impianti industriali. Sopralluoghi, installazioni e casi di successo documentati." />
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Interventi reali su impianti a combustione
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Sopralluoghi, installazioni e risoluzione di problemi concreti su forni, caldaie e impianti industriali.
              </p>
            </div>
          </div>
        </section>

        {/* Interventi Grid */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Caricamento interventi...</p>
              </div>
            ) : interventi.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nessun intervento disponibile al momento.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {interventi.map((intervento, index) => (
                  <article
                    key={intervento.id}
                    className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Video / Thumbnail */}
                    <div className="relative aspect-video bg-muted overflow-hidden">
                      {intervento.video_url && getYouTubeEmbedUrl(intervento.video_url) ? (
                        <iframe
                          src={getYouTubeEmbedUrl(intervento.video_url)!}
                          title={intervento.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <>
                          <img
                            src={intervento.thumbnail_url || "/placeholder.svg"}
                            alt={intervento.title}
                            className="w-full h-full object-cover"
                          />
                          {intervento.location && (
                            <div className="absolute top-3 left-3 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
                              <MapPin className="w-3 h-3 text-accent" />
                              <span className="text-xs font-medium text-foreground">{intervento.location}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <h3 className="font-display text-lg font-bold text-foreground mb-2">
                        {intervento.title}
                      </h3>

                      {/* Details */}
                      <div className="space-y-2 text-sm mb-3">
                        {intervento.location && (
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                            <div>
                              <span className="text-muted-foreground">Città: </span>
                              <span className="text-foreground font-medium">{intervento.location}</span>
                            </div>
                          </div>
                        )}
                        {intervento.application_type && (
                          <div className="flex items-start gap-2">
                            <Wrench className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            <div>
                              <span className="text-muted-foreground">Applicazione: </span>
                              <span className="text-foreground font-medium">{intervento.application_type}</span>
                            </div>
                          </div>
                        )}
                        {intervento.problem && (
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                            <div>
                              <span className="text-muted-foreground">Problema: </span>
                              <span className="text-foreground">{intervento.problem}</span>
                            </div>
                          </div>
                        )}
                        {intervento.description && (
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <div>
                              <span className="text-muted-foreground">Risultato: </span>
                              <span className="text-foreground font-medium">{intervento.description}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {intervento.model_used && (
                        <div className="mt-3 p-3 bg-accent/10 rounded-lg flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-sm font-semibold text-accent">
                            Modello: {intervento.model_used}
                          </span>
                        </div>
                      )}

                      <Button variant="outline" className="w-full mt-4 group/btn" asChild>
                        <Link to="/contatti">
                          Hai un problema simile?
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-zapper-black">
          <div className="container text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Hai un problema simile?
            </h2>
            <p className="text-white/80 text-lg mb-2 max-w-2xl mx-auto">
              Richiedi una valutazione tecnica gratuita.
            </p>
            <p className="text-white/60 text-sm mb-8 max-w-2xl mx-auto">
              Analizziamo il tuo impianto da remoto e definiamo la soluzione ZAPPER® più adatta.
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link to="/contatti">
                Richiedi una valutazione tecnica
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Interventi;
