import type { ReactNode } from "react";
import Index from "@/pages/Index";
import Contatti from "@/pages/Contatti";
import Interventi from "@/pages/Interventi";
import Settori from "@/pages/Settori";
import Applicazioni from "@/pages/Applicazioni";
import Modelli from "@/pages/Modelli";
import Agevolazioni from "@/pages/Agevolazioni";
import Industria40 from "@/pages/agevolazioni/Industria40";
import BandoInailIsi from "@/pages/agevolazioni/BandoInailIsi";
import Professionale from "@/pages/settori/Professionale";
import Domestico from "@/pages/settori/Domestico";
import Industriale from "@/pages/settori/Industriale";
import Pizzerie from "@/pages/ambiti/professionale/Pizzerie";
import Panifici from "@/pages/ambiti/professionale/Panifici";
import Bracerie from "@/pages/ambiti/professionale/Bracerie";
import CucineProfessionali from "@/pages/ambiti/professionale/CucineProfessionali";
import CaldaieBiomassaDom from "@/pages/ambiti/domestico/CaldaieBiomassa";
import Camini from "@/pages/ambiti/domestico/Camini";
import Stufe from "@/pages/ambiti/domestico/Stufe";
import Torrefazioni from "@/pages/ambiti/industriale/Torrefazioni";
import Caseifici from "@/pages/ambiti/industriale/Caseifici";
import Affumicatori from "@/pages/ambiti/industriale/Affumicatori";
import ForniIndustrialiAmbito from "@/pages/ambiti/industriale/ForniIndustriali";
import ForniALegna from "@/pages/applicazioni/ForniALegna";
import BraciCarbone from "@/pages/applicazioni/BraciCarbone";
import CaldaieBiomassaApp from "@/pages/applicazioni/CaldaieBiomassa";
import CaminiApp from "@/pages/applicazioni/Camini";
import Cappe from "@/pages/applicazioni/Cappe";
import ForniIndustrialiApp from "@/pages/applicazioni/ForniIndustriali";
import TorrefazioniApp from "@/pages/applicazioni/Torrefazioni";
import AffumicatoriApp from "@/pages/applicazioni/Affumicatori";
import TaglioLaser from "@/pages/applicazioni/TaglioLaser";
import ForniElettrici from "@/pages/applicazioni/ForniElettrici";
import ZPZ from "@/pages/modelli/ZPZ";
import ZPZMax from "@/pages/modelli/ZPZMax";
import ZPZNuvolaL from "@/pages/modelli/ZPZNuvolaL";
import ZPZNuvola from "@/pages/modelli/ZPZNuvola";
import ZPF from "@/pages/modelli/ZPF";
import ZPFMax from "@/pages/modelli/ZPFMax";
import ZBRS from "@/pages/modelli/ZBRS";
import ZBRMax from "@/pages/modelli/ZBRMax";
import ZGR from "@/pages/modelli/ZGR";
import ZGRMax from "@/pages/modelli/ZGRMax";
import Destink from "@/pages/modelli/Destink";
import DestinkMax from "@/pages/modelli/DestinkMax";
import DestinkUltra from "@/pages/modelli/DestinkUltra";
import DestinkUltraMax from "@/pages/modelli/DestinkUltraMax";
import ZCL from "@/pages/modelli/ZCL";
import ZCLMax from "@/pages/modelli/ZCLMax";
import ZCM from "@/pages/modelli/ZCM";
import ZMax from "@/pages/modelli/ZMax";
import ZTRF from "@/pages/modelli/ZTRF";
import ZTRFMax from "@/pages/modelli/ZTRFMax";
import ZTRFMaxDesk from "@/pages/modelli/ZTRFMaxDesk";
import ZAF from "@/pages/modelli/ZAF";
import ZAFMax from "@/pages/modelli/ZAFMax";
import ZTGL from "@/pages/modelli/ZTGL";
import ZTGLMax from "@/pages/modelli/ZTGLMax";
import ZTGLMaxUltra from "@/pages/modelli/ZTGLMaxUltra";
import Calcolatore from "@/pages/Calcolatore";
import Servizi from "@/pages/Servizi";
import PuliziaCucineProfessionali from "@/pages/servizi/PuliziaCucineProfessionali";
import DisinfestazioneCucine from "@/pages/servizi/DisinfestazioneCucine";
import ManutenzioneCucineIndustriali from "@/pages/servizi/ManutenzioneCucineIndustriali";
import ImpiantiAspirazioneFumi from "@/pages/servizi/ImpiantiAspirazioneFumi";
import InterventiElettriciCucine from "@/pages/servizi/InterventiElettriciCucine";
import ManutenzioneImpianti from "@/pages/servizi/ManutenzioneImpianti";
import Shop from "@/pages/Shop";
import ShopProduct from "@/pages/ShopProduct";
import ShopCheckout from "@/pages/ShopCheckout";
import BlogList from "@/pages/BlogList";
import BlogPostPage from "@/pages/BlogPost";
import Grazie from "@/pages/Grazie";
import AdminAuth from "@/pages/admin/AdminAuth";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminModels from "@/pages/admin/AdminModels";
import AdminInterventions from "@/pages/admin/AdminInterventions";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminShop from "@/pages/admin/AdminShop";
import AdminPartners from "@/pages/admin/AdminPartners";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminChatLogs from "@/pages/admin/AdminChatLogs";
import PartnerLogin from "@/pages/partner/PartnerLogin";
import PartnerMap from "@/pages/PartnerMap";
import LandingPartners from "@/pages/LandingPartners";
import PartnerDashboard from "@/pages/partner/PartnerDashboard";

export interface AppRouteConfig {
  path: string;
  element: ReactNode;
}

export const appRoutes: AppRouteConfig[] = [
  { path: "/", element: <Index /> },
  { path: "/contatti", element: <Contatti /> },
  { path: "/interventi", element: <Interventi /> },
  { path: "/settori", element: <Settori /> },
  { path: "/applicazioni", element: <Applicazioni /> },
  { path: "/modelli", element: <Modelli /> },
  { path: "/calcolatore", element: <Calcolatore /> },
  { path: "/servizi", element: <Servizi /> },
  { path: "/pulizia-cucine-professionali", element: <PuliziaCucineProfessionali /> },
  { path: "/disinfestazione-cucine", element: <DisinfestazioneCucine /> },
  { path: "/manutenzione-cucine-industriali", element: <ManutenzioneCucineIndustriali /> },
  { path: "/impianti-aspirazione-fumi", element: <ImpiantiAspirazioneFumi /> },
  { path: "/interventi-elettrici-cucine", element: <InterventiElettriciCucine /> },
  { path: "/manutenzione-impianti", element: <ManutenzioneImpianti /> },
  { path: "/agevolazioni", element: <Agevolazioni /> },
  { path: "/agevolazioni/industria-40", element: <Industria40 /> },
  { path: "/agevolazioni/bando-inail-isi", element: <BandoInailIsi /> },
  { path: "/settori/professionale", element: <Professionale /> },
  { path: "/settori/domestico", element: <Domestico /> },
  { path: "/settori/industriale", element: <Industriale /> },
  { path: "/professionale/pizzerie", element: <Pizzerie /> },
  { path: "/professionale/panifici", element: <Panifici /> },
  { path: "/professionale/bracerie", element: <Bracerie /> },
  { path: "/professionale/cucine-professionali", element: <CucineProfessionali /> },
  { path: "/domestico/caldaie-biomassa", element: <CaldaieBiomassaDom /> },
  { path: "/domestico/camini", element: <Camini /> },
  { path: "/domestico/stufe", element: <Stufe /> },
  { path: "/industriale/torrefazioni", element: <Torrefazioni /> },
  { path: "/industriale/caseifici", element: <Caseifici /> },
  { path: "/industriale/affumicatori", element: <Affumicatori /> },
  { path: "/industriale/forni-industriali", element: <ForniIndustrialiAmbito /> },
  { path: "/applicazioni/forni-a-legna", element: <ForniALegna /> },
  { path: "/applicazioni/braci-carbone", element: <BraciCarbone /> },
  { path: "/applicazioni/caldaie-biomassa", element: <CaldaieBiomassaApp /> },
  { path: "/applicazioni/camini", element: <CaminiApp /> },
  { path: "/applicazioni/cappe", element: <Cappe /> },
  { path: "/applicazioni/forni-industriali", element: <ForniIndustrialiApp /> },
  { path: "/applicazioni/torrefazioni", element: <TorrefazioniApp /> },
  { path: "/applicazioni/affumicatori", element: <AffumicatoriApp /> },
  { path: "/applicazioni/taglio-laser", element: <TaglioLaser /> },
  { path: "/applicazioni/forni-elettrici", element: <ForniElettrici /> },
  { path: "/modelli/zpz", element: <ZPZ /> },
  { path: "/modelli/zpz-max", element: <ZPZMax /> },
  { path: "/modelli/zpz-nuvola-l", element: <ZPZNuvolaL /> },
  { path: "/modelli/zpz-nuvola", element: <ZPZNuvola /> },
  { path: "/modelli/zpz-nuvola-l-elettrico", element: <ZPZNuvolaL /> },
  { path: "/modelli/zpf", element: <ZPF /> },
  { path: "/modelli/zpf-max", element: <ZPFMax /> },
  { path: "/modelli/zbr-s", element: <ZBRS /> },
  { path: "/modelli/zbr-max", element: <ZBRMax /> },
  { path: "/modelli/zgr", element: <ZGR /> },
  { path: "/modelli/zgr-max", element: <ZGRMax /> },
  { path: "/modelli/destink", element: <Destink /> },
  { path: "/modelli/destink-max", element: <DestinkMax /> },
  { path: "/modelli/destink-ultra", element: <DestinkUltra /> },
  { path: "/modelli/destink-ultra-max", element: <DestinkUltraMax /> },
  { path: "/modelli/zcl", element: <ZCL /> },
  { path: "/modelli/zcl-max", element: <ZCLMax /> },
  { path: "/modelli/zcl-max-res", element: <ZCLMax /> },
  { path: "/modelli/zcl-ind", element: <ZCL /> },
  { path: "/modelli/zcl-max-ind", element: <ZCLMax /> },
  { path: "/modelli/zcm", element: <ZCM /> },
  { path: "/modelli/z-max", element: <ZMax /> },
  { path: "/modelli/ztrf", element: <ZTRF /> },
  { path: "/modelli/ztrf-max", element: <ZTRFMax /> },
  { path: "/modelli/ztrf-max-desk", element: <ZTRFMaxDesk /> },
  { path: "/modelli/zaf", element: <ZAF /> },
  { path: "/modelli/zaf-max", element: <ZAFMax /> },
  { path: "/modelli/ztgl", element: <ZTGL /> },
  { path: "/modelli/ztgl-max", element: <ZTGLMax /> },
  { path: "/modelli/ztgl-max-ultra", element: <ZTGLMaxUltra /> },
  { path: "/blog", element: <BlogList /> },
  { path: "/blog/:slug", element: <BlogPostPage /> },
  { path: "/shop", element: <Shop /> },
  { path: "/shop/product/:handle", element: <ShopProduct /> },
  { path: "/shop/checkout", element: <ShopCheckout /> },
  { path: "/admin/auth", element: <AdminAuth /> },
  { path: "/admin", element: <AdminDashboard /> },
  { path: "/admin/models", element: <AdminModels /> },
  { path: "/admin/interventions", element: <AdminInterventions /> },
  { path: "/admin/users", element: <AdminUsers /> },
  { path: "/admin/shop", element: <AdminShop /> },
  { path: "/admin/partners", element: <AdminPartners /> },
  { path: "/admin/blog", element: <AdminBlog /> },
  { path: "/admin/chat-logs", element: <AdminChatLogs /> },
  { path: "/partners", element: <PartnerMap /> },
  { path: "/landing-partners", element: <LandingPartners /> },
  { path: "/partner", element: <PartnerLogin /> },
  { path: "/partner/dashboard", element: <PartnerDashboard /> },
  { path: "/grazie", element: <Grazie /> },
];

export const getLocalizedRoutePath = (path: string) => (path === "/" ? "/:lang" : `/:lang${path}`);