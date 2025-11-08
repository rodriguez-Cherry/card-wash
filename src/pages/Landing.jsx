import { Navigation } from "../components/Navigation";
import { HeroSection } from "../components/HeroSection";
import { Services } from "../components/Services";
import { Pricing } from "../components/Pricing";
import { Footer } from "../components/Footer";

export function Landing() {
  return (
    <>
      <div>
        <Navigation />
        <HeroSection />
        <Services />
        <Pricing />
        <Footer />
      </div>
    </>
  );
}


