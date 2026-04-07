import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index";
import Contatti from "./pages/Contatti";
import Interventi from "./pages/Interventi";
import Settori from "./pages/Settori";
import Applicazioni from "./pages/Applicazioni";
import Modelli from "./pages/Modelli";
import Agevolazioni from "./pages/Agevolazioni";
import Industria40 from "./pages/agevolazioni/Industria40";
import BandoInailIsi from "./pages/agevolazioni/BandoInailIsi";
import Professionale from "./pages/settori/Professionale";
import Domestico from "./pages/settori/Domestico";
import Industriale from "./pages/settori/Industriale";
import Pizzerie from "./pages/ambiti/professionale/Pizzerie";
import Panifici from "./pages/ambiti/professionale/Panifici";
import Bracerie from "./pages/ambiti/professionale/Bracerie";
import CucineProfessionali from "./pages/ambiti/professionale/CucineProfessionali";
import CaldaieBiomassaDom from "./pages/ambiti/domestico/CaldaieBiomassa";
import Camini from "./pages/ambiti/domestico/Camini";
import Stufe from "./pages/ambiti/domestico/Stufe";
import Torrefazioni from "./pages/ambiti/industriale/Torrefazioni";
import Caseifici from "./pages/ambiti/industriale/Caseifici";
import Affumicatori from "./pages/ambiti/industriale/Affumicatori";
import ForniIndustrialiAmbito from "./pages/ambiti/industriale/ForniIndustriali";
import ForniALegna from "./pages/applicazioni/ForniALegna";
import BraciCarbone from "./pages/applicazioni/BraciCarbone";
import CaldaieBiomassaApp from "./pages/applicazioni/CaldaieBiomassa";
import CaminiApp from "./pages/applicazioni/Camini";
import Cappe from "./pages/applicazioni/Cappe";
import ForniIndustrialiApp from "./pages/applicazioni/ForniIndustriali";
import TorrefazioniApp from "./pages/applicazioni/Torrefazioni";
import AffumicatoriApp from "./pages/applicazioni/Affumicatori";
import TaglioLaser from "./pages/applicazioni/TaglioLaser";
import ForniElettrici from "./pages/applicazioni/ForniElettrici";
// Modelli imports
import ZPZ from "./pages/modelli/ZPZ";
import ZPZMax from "./pages/modelli/ZPZMax";
import ZPZNuvolaL from "./pages/modelli/ZPZNuvolaL";
import ZPZNuvola from "./pages/modelli/ZPZNuvola";
import ZPF from "./pages/modelli/ZPF";
import ZPFMax from "./pages/modelli/ZPFMax";
import ZBRS from "./pages/modelli/ZBRS";
import ZBRMax from "./pages/modelli/ZBRMax";
import ZGR from "./pages/modelli/ZGR";
import ZGRMax from "./pages/modelli/ZGRMax";
import Destink from "./pages/modelli/Destink";
import DestinkMax from "./pages/modelli/DestinkMax";
import DestinkUltra from "./pages/modelli/DestinkUltra";
import DestinkUltraMax from "./pages/modelli/DestinkUltraMax";
import ZCL from "./pages/modelli/ZCL";
import ZCLMax from "./pages/modelli/ZCLMax";
import ZCM from "./pages/modelli/ZCM";
import ZMax from "./pages/modelli/ZMax";
import ZTRF from "./pages/modelli/ZTRF";
import ZTRFMax from "./pages/modelli/ZTRFMax";
import ZTRFMaxDesk from "./pages/modelli/ZTRFMaxDesk";
import ZAF from "./pages/modelli/ZAF";
import ZAFMax from "./pages/modelli/ZAFMax";
import ZTGL from "./pages/modelli/ZTGL";
import ZTGLMax from "./pages/modelli/ZTGLMax";
import ZTGLMaxUltra from "./pages/modelli/ZTGLMaxUltra";
import Calcolatore from "./pages/Calcolatore";
import Shop from "./pages/Shop";
import ShopProduct from "./pages/ShopProduct";
import ShopCheckout from "./pages/ShopCheckout";
import BlogList from "./pages/BlogList";
import BlogPostPage from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
// Admin pages
import AdminAuth from "./pages/admin/AdminAuth";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminModels from "./pages/admin/AdminModels";
import AdminInterventions from "./pages/admin/AdminInterventions";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminShop from "./pages/admin/AdminShop";
import AdminPartners from "./pages/admin/AdminPartners";
import PartnerLogin from "./pages/partner/PartnerLogin";
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import AIChatWidget from "./components/chat/AIChatWidget";
import WhatsAppButton from "./components/chat/WhatsAppButton";
const queryClient = new QueryClient();

const CartSyncWrapper = ({ children }: { children: React.ReactNode }) => {
  useCartSync();
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
        <CartSyncWrapper>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contatti" element={<Contatti />} />
            <Route path="/interventi" element={<Interventi />} />
            <Route path="/settori" element={<Settori />} />
            <Route path="/applicazioni" element={<Applicazioni />} />
            <Route path="/modelli" element={<Modelli />} />
            <Route path="/calcolatore" element={<Calcolatore />} />
            <Route path="/agevolazioni" element={<Agevolazioni />} />
            <Route path="/agevolazioni/industria-40" element={<Industria40 />} />
            <Route path="/agevolazioni/bando-inail-isi" element={<BandoInailIsi />} />
            <Route path="/settori/professionale" element={<Professionale />} />
            <Route path="/settori/domestico" element={<Domestico />} />
            <Route path="/settori/industriale" element={<Industriale />} />
            <Route path="/professionale/pizzerie" element={<Pizzerie />} />
            <Route path="/professionale/panifici" element={<Panifici />} />
            <Route path="/professionale/bracerie" element={<Bracerie />} />
            <Route path="/professionale/cucine-professionali" element={<CucineProfessionali />} />
            <Route path="/domestico/caldaie-biomassa" element={<CaldaieBiomassaDom />} />
            <Route path="/domestico/camini" element={<Camini />} />
            <Route path="/domestico/stufe" element={<Stufe />} />
            <Route path="/industriale/torrefazioni" element={<Torrefazioni />} />
            <Route path="/industriale/caseifici" element={<Caseifici />} />
            <Route path="/industriale/affumicatori" element={<Affumicatori />} />
            <Route path="/industriale/forni-industriali" element={<ForniIndustrialiAmbito />} />
            <Route path="/applicazioni/forni-a-legna" element={<ForniALegna />} />
            <Route path="/applicazioni/braci-carbone" element={<BraciCarbone />} />
            <Route path="/applicazioni/caldaie-biomassa" element={<CaldaieBiomassaApp />} />
            <Route path="/applicazioni/camini" element={<CaminiApp />} />
            <Route path="/applicazioni/cappe" element={<Cappe />} />
            <Route path="/applicazioni/forni-industriali" element={<ForniIndustrialiApp />} />
            <Route path="/applicazioni/torrefazioni" element={<TorrefazioniApp />} />
            <Route path="/applicazioni/affumicatori" element={<AffumicatoriApp />} />
            <Route path="/applicazioni/taglio-laser" element={<TaglioLaser />} />
            <Route path="/applicazioni/forni-elettrici" element={<ForniElettrici />} />
            {/* Modelli routes */}
            <Route path="/modelli/zpz" element={<ZPZ />} />
            <Route path="/modelli/zpz-max" element={<ZPZMax />} />
            <Route path="/modelli/zpz-nuvola-l" element={<ZPZNuvolaL />} />
            <Route path="/modelli/zpz-nuvola" element={<ZPZNuvola />} />
            <Route path="/modelli/zpz-nuvola-l-elettrico" element={<ZPZNuvolaL />} />
            <Route path="/modelli/zpf" element={<ZPF />} />
            <Route path="/modelli/zpf-max" element={<ZPFMax />} />
            <Route path="/modelli/zbr-s" element={<ZBRS />} />
            <Route path="/modelli/zbr-max" element={<ZBRMax />} />
            <Route path="/modelli/zgr" element={<ZGR />} />
            <Route path="/modelli/zgr-max" element={<ZGRMax />} />
            <Route path="/modelli/destink" element={<Destink />} />
            <Route path="/modelli/destink-max" element={<DestinkMax />} />
            <Route path="/modelli/destink-ultra" element={<DestinkUltra />} />
            <Route path="/modelli/destink-ultra-max" element={<DestinkUltraMax />} />
            <Route path="/modelli/zcl" element={<ZCL />} />
            <Route path="/modelli/zcl-max" element={<ZCLMax />} />
            <Route path="/modelli/zcl-max-res" element={<ZCLMax />} />
            <Route path="/modelli/zcl-ind" element={<ZCL />} />
            <Route path="/modelli/zcl-max-ind" element={<ZCLMax />} />
            <Route path="/modelli/zcm" element={<ZCM />} />
            <Route path="/modelli/z-max" element={<ZMax />} />
            <Route path="/modelli/ztrf" element={<ZTRF />} />
            <Route path="/modelli/ztrf-max" element={<ZTRFMax />} />
            <Route path="/modelli/ztrf-max-desk" element={<ZTRFMaxDesk />} />
            <Route path="/modelli/zaf" element={<ZAF />} />
            <Route path="/modelli/zaf-max" element={<ZAFMax />} />
            <Route path="/modelli/ztgl" element={<ZTGL />} />
            <Route path="/modelli/ztgl-max" element={<ZTGLMax />} />
            <Route path="/modelli/ztgl-max-ultra" element={<ZTGLMaxUltra />} />
            {/* Shop routes (hidden - not in nav) */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/product/:handle" element={<ShopProduct />} />
            <Route path="/shop/checkout" element={<ShopCheckout />} />
            {/* Admin routes */}
            <Route path="/admin/auth" element={<AdminAuth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/models" element={<AdminModels />} />
            <Route path="/admin/interventions" element={<AdminInterventions />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/shop" element={<AdminShop />} />
            <Route path="/admin/partners" element={<AdminPartners />} />
            {/* Partner routes */}
            <Route path="/partner" element={<PartnerLogin />} />
            <Route path="/partner/dashboard" element={<PartnerDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <AIChatWidget />
        <WhatsAppButton />
        </CartSyncWrapper>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
