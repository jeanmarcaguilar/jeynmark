import { useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingNav from './components/FloatingNav';

function App() {
  useEffect(() => {
    document.title = 'Jean Marc Aguilar | Full Stack Developer';
    // ... (rest of your useEffect code remains the same)
  }, []);

  return (
    <div className="min-h-screen">
      {/* Add the Floating Nav here so it stays on all pages */}
      <FloatingNav /> 
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;