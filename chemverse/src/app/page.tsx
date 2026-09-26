import type { Metadata } from 'next';
import Hero from '@/components/Hero/Hero';
import SearchSection from '@/components/Search/SearchSection';
import FeatureCards from '@/components/FeatureCards/FeatureCards';
import ElementOfTheDay from '@/components/ElementOfTheDay/ElementOfTheDay';
import ChemistryAroundYou from '@/components/ChemistryAroundYou/ChemistryAroundYou';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'Methyle Molecule — Explore the World of Chemistry',
  description:
    'Discover elements, build molecules, and explore real-world chemistry. An interactive exploration platform for students of all levels.',
};

export default function HomePage() {
  return (
    <>
      {/* ① Hero — immediate first impression */}
      <Hero />

      {/* ② Search — universal gateway */}
      <SearchSection />

      {/* ③ Core entry point cards */}
      <FeatureCards />

      {/* ④ Element of the Day */}
      <ElementOfTheDay />

      {/* ⑤ Chemistry Around You — contextual discovery */}
      <ChemistryAroundYou />

      {/* Footer */}
      <Footer />
    </>
  );
}
