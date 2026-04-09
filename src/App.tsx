import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import ClarityPageView from "@/components/ClarityPageView";
import LanguageRouteSync from "@/components/LanguageRouteSync";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { useCartSync } from "@/hooks/useCartSync";
import NotFound from "./pages/NotFound";
import { appRoutes, getLocalizedRoutePath } from "@/routes/appRoutes";
import AIChatWidget from "./components/chat/AIChatWidget";

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
          <ClarityPageView />
          <LanguageRouteSync />
          <Routes>
            {appRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
            {appRoutes.map((route) => (
              <Route
                key={`localized-${route.path}`}
                path={getLocalizedRoutePath(route.path)}
                element={route.element}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <AIChatWidget />
        
        </CartSyncWrapper>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
