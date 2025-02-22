
import { Navbar } from "@/components/Navbar";
import { TermsModal } from "@/components/TermsModal";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ChatSection } from "@/components/home/ChatSection";
import { AboutSection } from "@/components/home/AboutSection";
import { Footer } from "@/components/home/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-accent/10">
      <TermsModal />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ChatSection />
      <AboutSection />
      <Footer />
    </div>
  );
}
