import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Users, Eye, MousePointerClick, FileX, TrendingUp, Smartphone, Monitor, Tablet } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface SessionRow {
  id: string;
  visitor_id: string;
  session_id: string;
  started_at: string;
  landing_page: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  device_type: string | null;
  language: string | null;
  pageview_count: number;
}

interface EventRow {
  id: string;
  session_id: string;
  visitor_id: string;
  event_type: string;
  event_name: string | null;
  page_url: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

const RANGES = {
  "24h": 1,
  "7d": 7,
  "30d": 30,
} as const;

type RangeKey = keyof typeof RANGES;

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--muted-foreground))", "#888"];

export default function AdminAnalytics() {
  const [range, setRange] = useState<RangeKey>("7d");
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const since = new Date(Date.now() - RANGES[range] * 24 * 60 * 60 * 1000).toISOString();
      const [sRes, eRes] = await Promise.all([
        supabase.from("analytics_sessions").select("*").gte("started_at", since).order("started_at", { ascending: false }).limit(1000),
        supabase.from("analytics_events").select("*").gte("created_at", since).order("created_at", { ascending: false }).limit(5000),
      ]);
      setSessions((sRes.data as SessionRow[]) || []);
      setEvents((eRes.data as EventRow[]) || []);
      setLoading(false);
    };
    fetchData();
  }, [range]);

  // Aggregations
  const uniqueVisitors = new Set(sessions.map((s) => s.visitor_id)).size;
  const totalPageviews = events.filter((e) => e.event_type === "pageview").length;
  const totalCtaClicks = events.filter((e) => e.event_type === "cta_click").length;
  const formStarts = events.filter((e) => e.event_type === "form_start").length;
  const formSubmits = events.filter((e) => e.event_type === "form_submit").length;
  const formAbandons = formStarts - formSubmits;
  const conversionRate = formStarts > 0 ? ((formSubmits / formStarts) * 100).toFixed(1) : "0";

  // Top pages
  const pageCounts: Record<string, number> = {};
  for (const e of events) {
    if (e.event_type === "pageview") {
      pageCounts[e.page_url] = (pageCounts[e.page_url] || 0) + 1;
    }
  }
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([page, count]) => ({ page: page.length > 35 ? page.slice(0, 35) + "…" : page, count }));

  // Top CTA
  const ctaCounts: Record<string, number> = {};
  for (const e of events) {
    if (e.event_type === "cta_click" && e.event_name) {
      ctaCounts[e.event_name] = (ctaCounts[e.event_name] || 0) + 1;
    }
  }
  const topCtas = Object.entries(ctaCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  // Devices
  const deviceCounts: Record<string, number> = {};
  for (const s of sessions) {
    const d = s.device_type || "unknown";
    deviceCounts[d] = (deviceCounts[d] || 0) + 1;
  }
  const deviceData = Object.entries(deviceCounts).map(([name, value]) => ({ name, value }));

  // Sources
  const sourceCounts: Record<string, number> = {};
  for (const s of sessions) {
    const src = s.utm_source || (s.referrer ? new URL(s.referrer).hostname : "direct");
    sourceCounts[src] = (sourceCounts[src] || 0) + 1;
  }
  const topSources = Object.entries(sourceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([source, count]) => ({ source, count }));

  // Daily trend
  const dailyVisitors: Record<string, Set<string>> = {};
  for (const s of sessions) {
    const day = s.started_at.slice(0, 10);
    if (!dailyVisitors[day]) dailyVisitors[day] = new Set();
    dailyVisitors[day].add(s.visitor_id);
  }
  const trendData = Object.entries(dailyVisitors)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([day, vset]) => ({ day: day.slice(5), visitors: vset.size }));

  // Scroll depth distribution
  const scrollCounts: Record<string, number> = { "25%": 0, "50%": 0, "75%": 0, "100%": 0 };
  for (const e of events) {
    if (e.event_type === "scroll" && e.event_name && scrollCounts[e.event_name] !== undefined) {
      scrollCounts[e.event_name]++;
    }
  }
  const scrollData = Object.entries(scrollCounts).map(([depth, count]) => ({ depth, count }));

  // Recent visitors
  const recentSessions = sessions.slice(0, 20);

  const kpis = [
    { label: "Visitatori unici", value: uniqueVisitors, icon: Users },
    { label: "Pagine viste", value: totalPageviews, icon: Eye },
    { label: "Click CTA", value: totalCtaClicks, icon: MousePointerClick },
    { label: "Form abbandonati", value: formAbandons, icon: FileX },
    { label: "Conversione form", value: `${conversionRate}%`, icon: TrendingUp },
  ];

  return (
    <AdminLayout title="Analytics">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Comportamento dei visitatori in tempo reale (dati propri, no Clarity).
          </p>
          <Select value={range} onValueChange={(v) => setRange(v as RangeKey)}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Ultime 24h</SelectItem>
              <SelectItem value="7d">Ultimi 7 giorni</SelectItem>
              <SelectItem value="30d">Ultimi 30 giorni</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <Card key={k.label}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{k.label}</p>
                      <p className="text-2xl font-bold">{loading ? "—" : k.value}</p>
                    </div>
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Panoramica</TabsTrigger>
            <TabsTrigger value="pages">Pagine</TabsTrigger>
            <TabsTrigger value="cta">CTA & Form</TabsTrigger>
            <TabsTrigger value="sources">Sorgenti</TabsTrigger>
            <TabsTrigger value="visitors">Visitatori</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Visitatori unici nel tempo</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                    <Line type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader><CardTitle className="text-base">Dispositivi</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                        {deviceData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Profondità di scroll</CardTitle><CardDescription className="text-xs">Quanti scrollano fino a...</CardDescription></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={scrollData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="depth" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                      <Bar dataKey="count" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pages">
            <Card>
              <CardHeader><CardTitle className="text-base">Pagine più visitate</CardTitle></CardHeader>
              <CardContent>
                {topPages.length === 0 ? <p className="text-sm text-muted-foreground">Nessun dato</p> : (
                  <div className="space-y-2">
                    {topPages.map((p) => (
                      <div key={p.page} className="flex items-center justify-between border-b py-2 last:border-0">
                        <span className="text-sm font-mono">{p.page}</span>
                        <span className="text-sm font-bold text-primary">{p.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cta" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Funnel form contatto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold">{formStarts}</p>
                    <p className="text-xs text-muted-foreground">Form iniziati</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">{formSubmits}</p>
                    <p className="text-xs text-muted-foreground">Form inviati</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-destructive">{formAbandons}</p>
                    <p className="text-xs text-muted-foreground">Abbandonati</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-base">CTA più cliccate</CardTitle></CardHeader>
              <CardContent>
                {topCtas.length === 0 ? <p className="text-sm text-muted-foreground">Nessun click registrato. Le CTA verranno tracciate progressivamente.</p> : (
                  <div className="space-y-2">
                    {topCtas.map((c) => (
                      <div key={c.name} className="flex items-center justify-between border-b py-2 last:border-0">
                        <span className="text-sm">{c.name}</span>
                        <span className="text-sm font-bold text-primary">{c.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources">
            <Card>
              <CardHeader><CardTitle className="text-base">Sorgenti di traffico</CardTitle></CardHeader>
              <CardContent>
                {topSources.length === 0 ? <p className="text-sm text-muted-foreground">Nessun dato</p> : (
                  <div className="space-y-2">
                    {topSources.map((s) => (
                      <div key={s.source} className="flex items-center justify-between border-b py-2 last:border-0">
                        <span className="text-sm">{s.source}</span>
                        <span className="text-sm font-bold text-primary">{s.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visitors">
            <Card>
              <CardHeader><CardTitle className="text-base">Visitatori recenti</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="text-muted-foreground border-b">
                      <tr>
                        <th className="text-left py-2">Quando</th>
                        <th className="text-left">Landing</th>
                        <th className="text-left">Sorgente</th>
                        <th className="text-left">Device</th>
                        <th className="text-right">Pagine</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentSessions.map((s) => {
                        const DeviceIcon = s.device_type === "mobile" ? Smartphone : s.device_type === "tablet" ? Tablet : Monitor;
                        const src = s.utm_source || (s.referrer ? new URL(s.referrer).hostname : "direct");
                        return (
                          <tr key={s.id} className="border-b last:border-0">
                            <td className="py-2">{new Date(s.started_at).toLocaleString("it-IT")}</td>
                            <td className="font-mono">{s.landing_page}</td>
                            <td>{src}</td>
                            <td><DeviceIcon className="h-4 w-4 inline" /></td>
                            <td className="text-right font-bold">{s.pageview_count}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
