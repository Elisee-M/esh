import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import OurWork from './components/OurWork'
import Capabilities from './components/Capabilities'
import WhyESH from './components/WhyESH'

function App() {
  return (
    <div className="bg-esh-black min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <OurWork />
        <Capabilities />
        <WhyESH />
      </main>
    </div>
  )
}

export default App
