import { useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import FloatingNav from './components/FloatingNav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import HeroScene3D from './components/HeroScene3D';
import ProjectDetails from './pages/ProjectDetails';

const HomePage = () => (
  <>
    {/* Wrapper for Hero and About with shared sticky background */}
    <div className="relative">
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="sticky top-0 h-screen">
          <Suspense fallback={null}>
            <HeroScene3D />
          </Suspense>

          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-size-[50px_50px]" />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(5,5,5,0.72) 100%)' }} />
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
  </>
);

function App() {
  useEffect(() => {
    document.title = 'Jean Marc Aguilar | Full Stack Developer';
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      <FloatingNav />
      <div className="grow min-w-0 flex flex-col relative lg:pl-[180px] xl:pl-[200px]">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;