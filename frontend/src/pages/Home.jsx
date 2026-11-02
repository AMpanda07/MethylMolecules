import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import PeriodicTableSection from '@/components/sections/PeriodicTableSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PeriodicTableSection />
      </main>
    </>
  )
}
