import { lazy, Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ClientLogos from "@/components/home/ClientLogos";
import SEO from "@/components/SEO";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/StructuredData";

// Lazy load below-the-fold sections
const ProblemSection = lazy(() => import("@/components/home/ProblemSection"));
const SectorsSection = lazy(() => import("@/components/home/SectorsSection"));
const HowItWorksSection = lazy(() => import("@/components/home/HowItWorksSection"));
const ProfessionalSection = lazy(() => import("@/components/home/ProfessionalSection"));
const UTASection = lazy(() => import("@/components/home/UTASection"));
const IndustrialSection = lazy(() => import("@/components/home/IndustrialSection"));
const SelfDiscoverySection = lazy(() => import("@/components/home/SelfDiscoverySection"));
const IncentivesCarousel = lazy(() => import("@/components/home/IncentivesCarousel"));
const CaseStudyTeaser = lazy(() => import("@/components/home/CaseStudyTeaser"));
const TrustpilotSection = lazy(() => import("@/components/home/TrustpilotSection"));
const BlogSection = lazy(() => import("@/components/home/BlogSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

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
        <ClientLogos />
        <Suspense fallback={null}>
          <ProblemSection />
          <SectorsSection />
          <HowItWorksSection />
          <ProfessionalSection />
          <UTASection />
          <IndustrialSection />
          <SelfDiscoverySection />
          <IncentivesCarousel />
          <CaseStudyTeaser />
          <TrustpilotSection />
          <BlogSection />
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
