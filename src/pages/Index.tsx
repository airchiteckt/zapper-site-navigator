import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import SectorsSection from "@/components/home/SectorsSection";
import ClientLogos from "@/components/home/ClientLogos";
import ProblemSection from "@/components/home/ProblemSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import SelfDiscoverySection from "@/components/home/SelfDiscoverySection";
import IncentivesCarousel from "@/components/home/IncentivesCarousel";
import CaseStudyTeaser from "@/components/home/CaseStudyTeaser";
import TrustpilotSection from "@/components/home/TrustpilotSection";
import CTASection from "@/components/home/CTASection";
import BlogSection from "@/components/home/BlogSection";
import IndustrialSection from "@/components/home/IndustrialSection";
import ProfessionalSection from "@/components/home/ProfessionalSection";
import UTASection from "@/components/home/UTASection";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <SEO
        title="ZAPPER®"
        description="ZAPPER® progetta e produce sistemi di abbattimento fumi, odori e polveri per pizzerie, bracerie, forni a legna, camini e industria. Tecnologia italiana certificata."
        canonical="/"
      />
      <Header />
      <main>
        <HeroSection />
        <SectorsSection />
        <ClientLogos />
        <ProblemSection />
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
