import { lazy, Suspense, type ReactNode } from "react";

// Eager: homepage (critical path)
import Index from "@/pages/Index";

// Lazy load all other pages
const Contatti = lazy(() => import("@/pages/Contatti"));
const Interventi = lazy(() => import("@/pages/Interventi"));
const Settori = lazy(() => import("@/pages/Settori"));
const Applicazioni = lazy(() => import("@/pages/Applicazioni"));
const Modelli = lazy(() => import("@/pages/Modelli"));
const Agevolazioni = lazy(() => import("@/pages/Agevolazioni"));
const Industria40 = lazy(() => import("@/pages/agevolazioni/Industria40"));
const BandoInailIsi = lazy(() => import("@/pages/agevolazioni/BandoInailIsi"));
const Professionale = lazy(() => import("@/pages/settori/Professionale"));
const Domestico = lazy(() => import("@/pages/settori/Domestico"));
const Industriale = lazy(() => import("@/pages/settori/Industriale"));
const Pizzerie = lazy(() => import("@/pages/ambiti/professionale/Pizzerie"));
const Panifici = lazy(() => import("@/pages/ambiti/professionale/Panifici"));
const Bracerie = lazy(() => import("@/pages/ambiti/professionale/Bracerie"));
const CucineProfessionali = lazy(() => import("@/pages/ambiti/professionale/CucineProfessionali"));
const CaldaieBiomassaDom = lazy(() => import("@/pages/ambiti/domestico/CaldaieBiomassa"));
const Camini = lazy(() => import("@/pages/ambiti/domestico/Camini"));
const Stufe = lazy(() => import("@/pages/ambiti/domestico/Stufe"));
const Torrefazioni = lazy(() => import("@/pages/ambiti/industriale/Torrefazioni"));
const Caseifici = lazy(() => import("@/pages/ambiti/industriale/Caseifici"));
const Affumicatori = lazy(() => import("@/pages/ambiti/industriale/Affumicatori"));
const ForniIndustrialiAmbito = lazy(() => import("@/pages/ambiti/industriale/ForniIndustriali"));
const ForniALegna = lazy(() => import("@/pages/applicazioni/ForniALegna"));
const BraciCarbone = lazy(() => import("@/pages/applicazioni/BraciCarbone"));
const CaldaieBiomassaApp = lazy(() => import("@/pages/applicazioni/CaldaieBiomassa"));
const CaminiApp = lazy(() => import("@/pages/applicazioni/Camini"));
const Cappe = lazy(() => import("@/pages/applicazioni/Cappe"));
const ForniIndustrialiApp = lazy(() => import("@/pages/applicazioni/ForniIndustriali"));
const TorrefazioniApp = lazy(() => import("@/pages/applicazioni/Torrefazioni"));
const AffumicatoriApp = lazy(() => import("@/pages/applicazioni/Affumicatori"));
const TaglioLaser = lazy(() => import("@/pages/applicazioni/TaglioLaser"));
const ForniElettrici = lazy(() => import("@/pages/applicazioni/ForniElettrici"));
const ZPZ = lazy(() => import("@/pages/modelli/ZPZ"));
const ZPZMax = lazy(() => import("@/pages/modelli/ZPZMax"));
const ZPZNuvolaL = lazy(() => import("@/pages/modelli/ZPZNuvolaL"));
const ZPZNuvola = lazy(() => import("@/pages/modelli/ZPZNuvola"));
const ZPF = lazy(() => import("@/pages/modelli/ZPF"));
const ZPFMax = lazy(() => import("@/pages/modelli/ZPFMax"));
const ZBRS = lazy(() => import("@/pages/modelli/ZBRS"));
const ZBRMax = lazy(() => import("@/pages/modelli/ZBRMax"));
const ZGR = lazy(() => import("@/pages/modelli/ZGR"));
const ZGRMax = lazy(() => import("@/pages/modelli/ZGRMax"));
const Destink = lazy(() => import("@/pages/modelli/Destink"));
const DestinkMax = lazy(() => import("@/pages/modelli/DestinkMax"));
const DestinkUltra = lazy(() => import("@/pages/modelli/DestinkUltra"));
const DestinkUltraMax = lazy(() => import("@/pages/modelli/DestinkUltraMax"));
const ZCL = lazy(() => import("@/pages/modelli/ZCL"));
const ZCLMax = lazy(() => import("@/pages/modelli/ZCLMax"));
const ZCM = lazy(() => import("@/pages/modelli/ZCM"));
const ZMax = lazy(() => import("@/pages/modelli/ZMax"));
const ZTRF = lazy(() => import("@/pages/modelli/ZTRF"));
const ZTRFMax = lazy(() => import("@/pages/modelli/ZTRFMax"));
const ZTRFMaxDesk = lazy(() => import("@/pages/modelli/ZTRFMaxDesk"));
const ZAF = lazy(() => import("@/pages/modelli/ZAF"));
const ZAFMax = lazy(() => import("@/pages/modelli/ZAFMax"));
const ZTGL = lazy(() => import("@/pages/modelli/ZTGL"));
const ZTGLMax = lazy(() => import("@/pages/modelli/ZTGLMax"));
const ZTGLMaxUltra = lazy(() => import("@/pages/modelli/ZTGLMaxUltra"));
const Calcolatore = lazy(() => import("@/pages/Calcolatore"));
const Servizi = lazy(() => import("@/pages/Servizi"));
const PuliziaCucineProfessionali = lazy(() => import("@/pages/servizi/PuliziaCucineProfessionali"));
const DisinfestazioneCucine = lazy(() => import("@/pages/servizi/DisinfestazioneCucine"));
const ManutenzioneCucineIndustriali = lazy(() => import("@/pages/servizi/ManutenzioneCucineIndustriali"));
const ImpiantiAspirazioneFumi = lazy(() => import("@/pages/servizi/ImpiantiAspirazioneFumi"));
const InterventiElettriciCucine = lazy(() => import("@/pages/servizi/InterventiElettriciCucine"));
const ManutenzioneImpianti = lazy(() => import("@/pages/servizi/ManutenzioneImpianti"));
const Shop = lazy(() => import("@/pages/Shop"));
const ShopProduct = lazy(() => import("@/pages/ShopProduct"));
const ShopCheckout = lazy(() => import("@/pages/ShopCheckout"));
const BlogList = lazy(() => import("@/pages/BlogList"));
const BlogPostPage = lazy(() => import("@/pages/BlogPost"));
const Grazie = lazy(() => import("@/pages/Grazie"));
const AdminAuth = lazy(() => import("@/pages/admin/AdminAuth"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminModels = lazy(() => import("@/pages/admin/AdminModels"));
const AdminInterventions = lazy(() => import("@/pages/admin/AdminInterventions"));
const AdminUsers = lazy(() => import("@/pages/admin/AdminUsers"));
const AdminShop = lazy(() => import("@/pages/admin/AdminShop"));
const AdminPartners = lazy(() => import("@/pages/admin/AdminPartners"));
const AdminBlog = lazy(() => import("@/pages/admin/AdminBlog"));
const AdminChatLogs = lazy(() => import("@/pages/admin/AdminChatLogs"));
const AdminAnalytics = lazy(() => import("@/pages/admin/AdminAnalytics"));
const AdminLeads = lazy(() => import("@/pages/admin/AdminLeads"));
const PartnerLogin = lazy(() => import("@/pages/partner/PartnerLogin"));
const PartnerMap = lazy(() => import("@/pages/PartnerMap"));
const LandingPartners = lazy(() => import("@/pages/LandingPartners"));
const PartnerDashboard = lazy(() => import("@/pages/partner/PartnerDashboard"));
const Scopri = lazy(() => import("@/pages/Scopri"));

// Suspense wrapper for lazy pages
const S = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  }>
    {children}
  </Suspense>
);

export interface AppRouteConfig {
  path: string;
  element: ReactNode;
}

export const appRoutes: AppRouteConfig[] = [
  { path: "/", element: <Index /> },
  { path: "/contatti", element: <S><Contatti /></S> },
  { path: "/interventi", element: <S><Interventi /></S> },
  { path: "/settori", element: <S><Settori /></S> },
  { path: "/applicazioni", element: <S><Applicazioni /></S> },
  { path: "/modelli", element: <S><Modelli /></S> },
  { path: "/calcolatore", element: <S><Calcolatore /></S> },
  { path: "/servizi", element: <S><Servizi /></S> },
  { path: "/pulizia-cucine-professionali", element: <S><PuliziaCucineProfessionali /></S> },
  { path: "/disinfestazione-cucine", element: <S><DisinfestazioneCucine /></S> },
  { path: "/manutenzione-cucine-industriali", element: <S><ManutenzioneCucineIndustriali /></S> },
  { path: "/impianti-aspirazione-fumi", element: <S><ImpiantiAspirazioneFumi /></S> },
  { path: "/interventi-elettrici-cucine", element: <S><InterventiElettriciCucine /></S> },
  { path: "/manutenzione-impianti", element: <S><ManutenzioneImpianti /></S> },
  { path: "/agevolazioni", element: <S><Agevolazioni /></S> },
  { path: "/agevolazioni/industria-40", element: <S><Industria40 /></S> },
  { path: "/agevolazioni/bando-inail-isi", element: <S><BandoInailIsi /></S> },
  { path: "/settori/professionale", element: <S><Professionale /></S> },
  { path: "/settori/domestico", element: <S><Domestico /></S> },
  { path: "/settori/industriale", element: <S><Industriale /></S> },
  { path: "/professionale/pizzerie", element: <S><Pizzerie /></S> },
  { path: "/professionale/panifici", element: <S><Panifici /></S> },
  { path: "/professionale/bracerie", element: <S><Bracerie /></S> },
  { path: "/professionale/cucine-professionali", element: <S><CucineProfessionali /></S> },
  { path: "/domestico/caldaie-biomassa", element: <S><CaldaieBiomassaDom /></S> },
  { path: "/domestico/camini", element: <S><Camini /></S> },
  { path: "/domestico/stufe", element: <S><Stufe /></S> },
  { path: "/industriale/torrefazioni", element: <S><Torrefazioni /></S> },
  { path: "/industriale/caseifici", element: <S><Caseifici /></S> },
  { path: "/industriale/affumicatori", element: <S><Affumicatori /></S> },
  { path: "/industriale/forni-industriali", element: <S><ForniIndustrialiAmbito /></S> },
  { path: "/applicazioni/forni-a-legna", element: <S><ForniALegna /></S> },
  { path: "/applicazioni/braci-carbone", element: <S><BraciCarbone /></S> },
  { path: "/applicazioni/caldaie-biomassa", element: <S><CaldaieBiomassaApp /></S> },
  { path: "/applicazioni/camini", element: <S><CaminiApp /></S> },
  { path: "/applicazioni/cappe", element: <S><Cappe /></S> },
  { path: "/applicazioni/forni-industriali", element: <S><ForniIndustrialiApp /></S> },
  { path: "/applicazioni/torrefazioni", element: <S><TorrefazioniApp /></S> },
  { path: "/applicazioni/affumicatori", element: <S><AffumicatoriApp /></S> },
  { path: "/applicazioni/taglio-laser", element: <S><TaglioLaser /></S> },
  { path: "/applicazioni/forni-elettrici", element: <S><ForniElettrici /></S> },
  { path: "/modelli/zpz", element: <S><ZPZ /></S> },
  { path: "/modelli/zpz-max", element: <S><ZPZMax /></S> },
  { path: "/modelli/zpz-nuvola-l", element: <S><ZPZNuvolaL /></S> },
  { path: "/modelli/zpz-nuvola", element: <S><ZPZNuvola /></S> },
  { path: "/modelli/zpz-nuvola-l-elettrico", element: <S><ZPZNuvolaL /></S> },
  { path: "/modelli/zpf", element: <S><ZPF /></S> },
  { path: "/modelli/zpf-max", element: <S><ZPFMax /></S> },
  { path: "/modelli/zbr-s", element: <S><ZBRS /></S> },
  { path: "/modelli/zbr-max", element: <S><ZBRMax /></S> },
  { path: "/modelli/zgr", element: <S><ZGR /></S> },
  { path: "/modelli/zgr-max", element: <S><ZGRMax /></S> },
  { path: "/modelli/destink", element: <S><Destink /></S> },
  { path: "/modelli/destink-max", element: <S><DestinkMax /></S> },
  { path: "/modelli/destink-ultra", element: <S><DestinkUltra /></S> },
  { path: "/modelli/destink-ultra-max", element: <S><DestinkUltraMax /></S> },
  { path: "/modelli/zcl", element: <S><ZCL /></S> },
  { path: "/modelli/zcl-max", element: <S><ZCLMax /></S> },
  { path: "/modelli/zcl-max-res", element: <S><ZCLMax /></S> },
  { path: "/modelli/zcl-ind", element: <S><ZCL /></S> },
  { path: "/modelli/zcl-max-ind", element: <S><ZCLMax /></S> },
  { path: "/modelli/zcm", element: <S><ZCM /></S> },
  { path: "/modelli/z-max", element: <S><ZMax /></S> },
  { path: "/modelli/ztrf", element: <S><ZTRF /></S> },
  { path: "/modelli/ztrf-max", element: <S><ZTRFMax /></S> },
  { path: "/modelli/ztrf-max-desk", element: <S><ZTRFMaxDesk /></S> },
  { path: "/modelli/zaf", element: <S><ZAF /></S> },
  { path: "/modelli/zaf-max", element: <S><ZAFMax /></S> },
  { path: "/modelli/ztgl", element: <S><ZTGL /></S> },
  { path: "/modelli/ztgl-max", element: <S><ZTGLMax /></S> },
  { path: "/modelli/ztgl-max-ultra", element: <S><ZTGLMaxUltra /></S> },
  { path: "/blog", element: <S><BlogList /></S> },
  { path: "/blog/:slug", element: <S><BlogPostPage /></S> },
  { path: "/shop", element: <S><Shop /></S> },
  { path: "/shop/product/:handle", element: <S><ShopProduct /></S> },
  { path: "/shop/checkout", element: <S><ShopCheckout /></S> },
  { path: "/admin/auth", element: <S><AdminAuth /></S> },
  { path: "/admin", element: <S><AdminDashboard /></S> },
  { path: "/admin/models", element: <S><AdminModels /></S> },
  { path: "/admin/interventions", element: <S><AdminInterventions /></S> },
  { path: "/admin/users", element: <S><AdminUsers /></S> },
  { path: "/admin/shop", element: <S><AdminShop /></S> },
  { path: "/admin/partners", element: <S><AdminPartners /></S> },
  { path: "/admin/blog", element: <S><AdminBlog /></S> },
  { path: "/admin/chat-logs", element: <S><AdminChatLogs /></S> },
  { path: "/admin/analytics", element: <S><AdminAnalytics /></S> },
  { path: "/admin/leads", element: <S><AdminLeads /></S> },
  { path: "/partners", element: <S><PartnerMap /></S> },
  { path: "/landing-partners", element: <S><LandingPartners /></S> },
  { path: "/partner", element: <S><PartnerLogin /></S> },
  { path: "/partner/dashboard", element: <S><PartnerDashboard /></S> },
  { path: "/scopri", element: <S><Scopri /></S> },
  { path: "/grazie", element: <S><Grazie /></S> },
];

export const getLocalizedRoutePath = (path: string) => (path === "/" ? "/:lang" : `/:lang${path}`);
