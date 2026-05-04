import AppleHeader from "@/components/water/AppleHeader";
import AppleHero from "@/components/water/AppleHero";
import AppleContent from "@/components/water/AppleContent";

export default function Index() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <AppleHeader />
      <AppleHero />
      <AppleContent />
    </div>
  );
}
