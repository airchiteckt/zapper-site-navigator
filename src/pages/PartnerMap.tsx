import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { supabase } from '@/integrations/supabase/client';

interface PartnerLocation {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  city: string | null;
  country: string;
  latitude: number;
  longitude: number;
  website: string | null;
  phone: string | null;
  email: string | null;
}

export default function PartnerMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [locations, setLocations] = useState<PartnerLocation[]>([]);
  const [mapToken, setMapToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);

  // Fetch Mapbox token
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('mapbox-token');
        if (error) throw error;
        setMapToken(data.token);
      } catch (err) {
        console.error('Failed to fetch Mapbox token:', err);
      }
    };
    fetchToken();
  }, []);

  // Fetch partner locations
  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase
        .from('partner_locations')
        .select('*')
        .order('sort_order');
      if (data) setLocations(data as PartnerLocation[]);
      if (error) console.error('Error fetching locations:', error);
      setIsLoading(false);
    };
    fetchLocations();
  }, []);

  // Initialize map after container is rendered
  const mapRef = useCallback((node: HTMLDivElement | null) => {
    if (!node || !mapToken || map.current) return;
    mapContainer.current = node;

    mapboxgl.accessToken = mapToken;
    map.current = new mapboxgl.Map({
      container: node,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [12.5, 42],
      zoom: 4,
      projection: 'globe',
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgb(20, 20, 20)',
        'high-color': 'rgb(30, 40, 30)',
        'horizon-blend': 0.08,
        'space-color': 'rgb(10, 10, 10)',
        'star-intensity': 0.4,
      });
    });

    map.current.on('load', () => setMapReady(true));
  }, [mapToken]);

  // Add markers
  useEffect(() => {
    if (!map.current || locations.length === 0) return;

    locations.forEach((loc) => {
      const popup = new mapboxgl.Popup({ offset: 25, className: 'partner-popup' }).setHTML(`
        <div style="font-family: 'Inter', sans-serif; padding: 4px;">
          <h3 style="margin: 0 0 4px; font-size: 14px; font-weight: 600; color: #1c1e1c;">${loc.name}</h3>
          ${loc.city ? `<p style="margin: 0 0 2px; font-size: 12px; color: #666;">${loc.city}${loc.country !== 'Italia' ? ', ' + loc.country : ''}</p>` : ''}
          ${loc.address ? `<p style="margin: 0 0 4px; font-size: 11px; color: #888;">${loc.address}</p>` : ''}
          ${loc.phone ? `<p style="margin: 0; font-size: 11px;"><a href="tel:${loc.phone}" style="color: #59d153;">${loc.phone}</a></p>` : ''}
          ${loc.email ? `<p style="margin: 0; font-size: 11px;"><a href="mailto:${loc.email}" style="color: #59d153;">${loc.email}</a></p>` : ''}
          ${loc.website ? `<p style="margin: 4px 0 0; font-size: 11px;"><a href="${loc.website}" target="_blank" rel="noopener" style="color: #59d153;">Visita il sito →</a></p>` : ''}
        </div>
      `);

      const el = document.createElement('div');
      el.className = 'partner-marker';
      el.style.width = '16px';
      el.style.height = '16px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = '#59d153';
      el.style.border = '3px solid rgba(89, 209, 83, 0.3)';
      el.style.boxShadow = '0 0 12px rgba(89, 209, 83, 0.5)';
      el.style.cursor = 'pointer';

      new mapboxgl.Marker(el)
        .setLngLat([loc.longitude, loc.latitude])
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [locations, mapReady]);

  return (
    <>
      <SEO
        title="Rete Partner | ZAPPER® - Trova il rivenditore più vicino"
        description="Scopri la rete di partner e rivenditori ZAPPER® nel mondo. Trova il rivenditore autorizzato più vicino a te."
      />
      <Header />
      <main className="min-h-screen bg-foreground">
        {/* Hero */}
        <section className="pt-28 pb-12 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 font-display">
              La nostra rete nel mondo
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trova il rivenditore o partner ZAPPER® autorizzato più vicino a te.
              Una rete globale al tuo servizio.
            </p>
          </div>
        </section>

        {/* Map */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl overflow-hidden border border-primary/20 shadow-2xl">
              {isLoading || !mapToken ? (
                <div className="h-[600px] flex items-center justify-center bg-card/5">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div ref={mapRef} className="h-[600px] w-full" />
              )}
            </div>

            {/* Stats */}
            {locations.length > 0 && (
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card/5 border border-primary/10 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-primary">{locations.length}</p>
                  <p className="text-sm text-muted-foreground mt-1">Partner attivi</p>
                </div>
                <div className="bg-card/5 border border-primary/10 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {new Set(locations.map(l => l.country)).size}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Paesi</p>
                </div>
                <div className="bg-card/5 border border-primary/10 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {new Set(locations.map(l => l.city).filter(Boolean)).size}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Città</p>
                </div>
                <div className="bg-card/5 border border-primary/10 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-muted-foreground mt-1">Supporto</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Partner List */}
        {locations.length > 0 && (
          <section className="pb-20">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-primary-foreground mb-8 font-display">
                I nostri partner
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {locations.map((loc) => (
                  <div
                    key={loc.id}
                    className="bg-card/5 border border-primary/10 rounded-xl p-5 hover:border-primary/30 transition-colors"
                  >
                    <h3 className="font-semibold text-primary-foreground">{loc.name}</h3>
                    {loc.city && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {loc.city}{loc.country !== 'Italia' ? `, ${loc.country}` : ''}
                      </p>
                    )}
                    {loc.description && (
                      <p className="text-sm text-muted-foreground mt-2">{loc.description}</p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-3 text-xs">
                      {loc.phone && (
                        <a href={`tel:${loc.phone}`} className="text-primary hover:underline">
                          {loc.phone}
                        </a>
                      )}
                      {loc.email && (
                        <a href={`mailto:${loc.email}`} className="text-primary hover:underline">
                          {loc.email}
                        </a>
                      )}
                      {loc.website && (
                        <a href={loc.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Sito web →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
