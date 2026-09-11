import { useState, useEffect } from 'react';
import { ProjectProvider } from './contexts/ProjectContext';
import { MemberProvider } from './contexts/MemberContext';

// Main Site Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Team from './components/Team';
import Footer from './components/Footer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ProjectProvider>
      <MemberProvider>
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Hero />
        <Projects />
        <Team />
        <Footer />
      </MemberProvider>
    </ProjectProvider>
  );
}

export default App;
