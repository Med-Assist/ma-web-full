import { Navbar } from '@/shared/ui/Navbar';
import { HeroSection } from '@/features/landing/components/HeroSection';
import { NewsSection } from '@/features/landing/components/NewsSection';
import { CoreTechSection } from '@/features/landing/components/CoreTechSection';
import { ContactSection } from '@/features/landing/components/ContactSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1121] text-slate-300 font-sans selection:bg-cyan-500/30">
      <Navbar />
      <HeroSection />
      <NewsSection />
      <CoreTechSection />
      <ContactSection />
    </main>
  );
}       