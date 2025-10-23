import './App.css'
import { Navigation } from './components/Navigation'
import { HeroSection } from './components/HeroSection'
import { Services } from './components/Services'
import { Pricing } from './components/Pricing'
import { Footer } from './components/Footer'

function App() {

  return (
    <>
      <div>
        {/* <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
        <Navigation />
        <HeroSection />
        <Services />
        <Pricing /> 
        <Footer />
      </div>
    </>
  )
}

export default App
