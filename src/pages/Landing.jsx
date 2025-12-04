import { Navigation } from "../components/landingComponentes/Navigation";
import { HeroSection } from "../components/landingComponentes/HeroSection";
import { Services } from "../components/landingComponentes/Services";
import { Footer } from "../components/landingComponentes/Footer";

export function Landing() {
  return (
    <>
      <div>
        <Navigation />
        <HeroSection />
        <Services />
        <Footer />
      </div>
    </>
  );
}


