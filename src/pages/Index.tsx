import { lazy, Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import StickyBottomCTA from "@/components/home/StickyBottomCTA";
import SEO from "@/components/SEO";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/StructuredData";

// Lazy load below-the-fold sections
const ProblemSection = lazy(() => import("@/components/home/ProblemSection"));
const SectorsSection = lazy(() => import("@/components/home/SectorsSection"));
const TrustpilotSection = lazy(() => import("@/components/home/TrustpilotSection"));
const HowItWorksSection = lazy(() => import("@/components/home/HowItWorksSection"));
const FormFinaleSection = lazy(() => import("@/components/home/FormFinaleSection"));
const LeadMagnetBanner = lazy(() => import("@/components/LeadMagnetBanner"));

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <SEO
        title="ZAPPER®"
        description="ZAPPER® progetta e produce sistemi di abbattimento fumi, odori e polveri per pizzerie, bracerie, forni a legna, camini e industria. Tecnologia italiana certificata."
        canonical="/"
      />
      <OrganizationSchema />
      <LocalBusinessSchema />
      <Header />
      <main>
        <HeroSection />
        <TrustBar />
        <Suspense fallback={null}>
          <ProblemSection />
          <SectorsSection />
          <TrustpilotSection />
          <HowItWorksSection />
          <LeadMagnetBanner source="homepage" />
          <FormFinaleSection />
        </Suspense>
      </main>
      <Footer />
      <StickyBottomCTA />
    </div>
  );
};

export default Index;
