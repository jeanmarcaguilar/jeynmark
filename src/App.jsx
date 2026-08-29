import { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Suspense } from 'react';
import HeroScene3D from './components/HeroScene3D';

function App() {
  useEffect(() => {
    document.title = 'Jean Marc Aguilar | Full Stack Developer';
    // ... (rest of your useEffect code remains the same)
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#050505] text-white">
      <Sidebar />
      <div className="grow min-w-0 flex flex-col relative">
        <main className="flex-1">
          {/* Wrapper for Hero and About with shared sticky background */}
          <div className="relative">
            {/* Absolutely positioned wrapper that spans the entire container height without pushing content down */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
              {/* Sticky Background that stays while scrolling through Hero and About */}
              <div className="sticky top-0 h-screen">
                {/* 3D Background Scene */}
                <Suspense fallback={null}>
                  <HeroScene3D />
                </Suspense>

                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
                  {/* Subtle grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-size-[50px_50px]" />
                  {/* Dark vignette edges so text stays readable */}
                  <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(5,5,5,0.72) 100%)' }} />
                  {/* Left-side fade so left content area is always legible */}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,5,5,0.6) 0%, transparent 50%, rgba(5,5,5,0.3) 100%)' }} />
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 10 }}>
              <Hero />
              <About />
              <Skills />
            </div>
          </div>

          {/* Other sections with normal background */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            <Projects />
            <Experience />
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;