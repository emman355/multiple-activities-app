import Features from '@/components/features';
import Footer from '@/components/footer';
import HeroSection from '@/components/hero-section';

export default async function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <Footer />
    </>
  );
}
