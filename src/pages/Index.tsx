import SiteHeader from "@/components/water/SiteHeader";
import HeroSection from "@/components/water/HeroSection";
import ContentSections from "@/components/water/ContentSections";

export default function Index() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Golos Text', system-ui, sans-serif", color: "#1A2332" }}>
      <SiteHeader />
      <HeroSection />
      <ContentSections />
    </div>
  );
}
