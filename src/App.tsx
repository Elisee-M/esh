import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'

function App() {
  return (
    <div className="bg-esh-black min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
      </main>
    </div>
  )
}

export default App
