import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';

type PartnerType = 'installatore' | 'rivenditore' | 'importatore';

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
  partner_type: PartnerType;
}

const TYPE_CONFIG: Record<PartnerType, { label: string; color: string; border: string; shadow: string }> = {
  installatore: { label: 'Installatori', color: '#59d153', border: 'rgba(89, 209, 83, 0.3)', shadow: 'rgba(89, 209, 83, 0.5)' },
  rivenditore: { label: 'Rivenditori', color: '#3b82f6', border: 'rgba(59, 130, 246, 0.3)', shadow: 'rgba(59, 130, 246, 0.5)' },
  importatore: { label: 'Importatori', color: '#f59e0b', border: 'rgba(245, 158, 11, 0.3)', shadow: 'rgba(245, 158, 11, 0.5)' },
};

const TYPE_LABELS: Record<PartnerType, string> = {
  installatore: 'Installatore',
  rivenditore: 'Rivenditore',
  importatore: 'Importatore',
};

export default function PartnerMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [locations, setLocations] = useState<PartnerLocation[]>([]);
  const [mapToken, setMapToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<PartnerType>>(new Set(['installatore', 'rivenditore', 'importatore']));

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

  // Add/update markers based on filters
  useEffect(() => {
    if (!map.current) return;

    // Remove old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Only show importatori on the map (they have real coordinates)
    const mappable = locations.filter(loc => loc.partner_type === 'importatore' && loc.latitude !== 0 && loc.longitude !== 0);

    mappable.forEach((loc) => {
      const cfg = TYPE_CONFIG[loc.partner_type];
      const popup = new mapboxgl.Popup({ offset: 25, className: 'partner-popup' }).setHTML(`
        <div style="font-family: 'Inter', sans-serif; padding: 4px;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
            <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${cfg.color};"></span>
            <span style="font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">${TYPE_LABELS[loc.partner_type]}</span>
          </div>
          <h3 style="margin: 0 0 4px; font-size: 14px; font-weight: 600; color: #1c1e1c;">${loc.name}</h3>
          ${loc.city ? `<p style="margin: 0 0 2px; font-size: 12px; color: #666;">${loc.city}${loc.country !== 'Italia' ? ', ' + loc.country : ''}</p>` : ''}
          ${loc.address ? `<p style="margin: 0 0 4px; font-size: 11px; color: #888;">${loc.address}</p>` : ''}
          ${loc.phone ? `<p style="margin: 0; font-size: 11px;"><a href="tel:${loc.phone}" style="color: ${cfg.color};">${loc.phone}</a></p>` : ''}
          ${loc.email ? `<p style="margin: 0; font-size: 11px;"><a href="mailto:${loc.email}" style="color: ${cfg.color};">${loc.email}</a></p>` : ''}
          ${loc.website ? `<p style="margin: 4px 0 0; font-size: 11px;"><a href="${loc.website}" target="_blank" rel="noopener" style="color: ${cfg.color};">Visita il sito →</a></p>` : ''}
        </div>
      `);

      const el = document.createElement('div');
      el.style.width = '16px';
      el.style.height = '16px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = cfg.color;
      el.style.border = `3px solid ${cfg.border}`;
      el.style.boxShadow = `0 0 12px ${cfg.shadow}`;
      el.style.cursor = 'pointer';

      const marker = new mapboxgl.Marker(el)
        .setLngLat([loc.longitude, loc.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  }, [locations, mapReady, activeFilters]);

  const toggleFilter = (type: PartnerType) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(type)) {
        if (next.size > 1) next.delete(type); // Keep at least one active
      } else {
        next.add(type);
      }
      return next;
    });
  };

  const filteredLocations = locations.filter(loc => activeFilters.has(loc.partner_type));

  return (
    <>
      <SEO
        title="Rete Partner | ZAPPER® - Trova il rivenditore più vicino"
        description="Scopri la rete di partner e rivenditori ZAPPER® nel mondo. Trova il rivenditore autorizzato più vicino a te."
      />
      <Header />
      <main className="min-h-screen bg-foreground">
        {/* Hero */}
        <section className="pt-28 pb-8 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 font-display">
              La nostra rete nel mondo
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Trova il rivenditore o partner ZAPPER® autorizzato più vicino a te.
              Una rete globale al tuo servizio.
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {(Object.entries(TYPE_CONFIG) as [PartnerType, typeof TYPE_CONFIG[PartnerType]][]).map(([type, cfg]) => {
                const isActive = activeFilters.has(type);
                const count = locations.filter(l => l.partner_type === type).length;
                return (
                  <button
                    key={type}
                    onClick={() => toggleFilter(type)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'border-transparent text-white shadow-lg'
                        : 'border-white/10 text-white/40 hover:text-white/60'
                    }`}
                    style={isActive ? { backgroundColor: cfg.color + '22', borderColor: cfg.color + '66' } : {}}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: isActive ? cfg.color : 'rgba(255,255,255,0.2)' }}
                    />
                    {cfg.label}
                    <span className="text-xs opacity-60">({count})</span>
                  </button>
                );
              })}
            </div>
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
                  <p className="text-3xl font-bold" style={{ color: TYPE_CONFIG.installatore.color }}>
                    {locations.filter(l => l.partner_type === 'installatore').length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Installatori</p>
                </div>
                <div className="bg-card/5 border border-primary/10 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold" style={{ color: TYPE_CONFIG.rivenditore.color }}>
                    {locations.filter(l => l.partner_type === 'rivenditore').length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Rivenditori</p>
                </div>
                <div className="bg-card/5 border border-primary/10 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold" style={{ color: TYPE_CONFIG.importatore.color }}>
                    {locations.filter(l => l.partner_type === 'importatore').length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Importatori</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Partner List by Type */}
        {filteredLocations.length > 0 && (
          <section className="pb-20">
            <div className="container mx-auto px-4">
              {(Object.entries(TYPE_CONFIG) as [PartnerType, typeof TYPE_CONFIG[PartnerType]][]).map(([type, cfg]) => {
                const typeLocations = filteredLocations.filter(l => l.partner_type === type);
                if (typeLocations.length === 0) return null;
                return (
                  <div key={type} className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cfg.color }} />
                      <h2 className="text-2xl font-bold text-primary-foreground font-display">
                        {cfg.label}
                      </h2>
                      <Badge variant="outline" className="text-xs" style={{ borderColor: cfg.color + '44', color: cfg.color }}>
                        {typeLocations.length}
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {typeLocations.map((loc) => (
                        <div
                          key={loc.id}
                          className="bg-card/5 border rounded-xl p-5 hover:border-opacity-50 transition-colors"
                          style={{ borderColor: cfg.color + '20' }}
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
                              <a href={`tel:${loc.phone}`} style={{ color: cfg.color }} className="hover:underline">
                                {loc.phone}
                              </a>
                            )}
                            {loc.email && (
                              <a href={`mailto:${loc.email}`} style={{ color: cfg.color }} className="hover:underline">
                                {loc.email}
                              </a>
                            )}
                            {loc.website && (
                              <a href={loc.website} target="_blank" rel="noopener noreferrer" style={{ color: cfg.color }} className="hover:underline">
                                Sito web →
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
