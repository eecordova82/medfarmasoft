import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import WhyUs from './components/WhyUs'
import Pricing from './components/Pricing'
import HowItWorks from './components/HowItWorks'
import Platforms from './components/Platforms'

import Blog from './components/Blog'
import Contact from './components/Contact'
import Cta from './components/Cta'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <WhyUs />
      <Pricing />
      <HowItWorks />
      <Platforms />

      <Blog />
      <Contact />
      <Cta />
      <Footer />
    </div>
  )
}

export default App
