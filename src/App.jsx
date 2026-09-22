import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact';
import { LiveViewersProvider } from './components/ViewerCount';
import ProjectDetails from './pages/ProjectDetails';
import { useVisitorAnalytics } from './hooks/useVisitorAnalytics';

const HomePage = () => (
  <>
    <Hero />
    <Experience />
  </>
);

function App() {
  useVisitorAnalytics();

  useEffect(() => {
    document.title = 'Jean Marc Aguilar | Full Stack Developer';
  }, []);

  return (
    <LiveViewersProvider>
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <div className="grow min-w-0 flex flex-col relative">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
          </Routes>
        </main>
      </div>
    </div>
    </LiveViewersProvider>
  );
}

export default App;