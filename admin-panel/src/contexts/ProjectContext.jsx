import { createContext, useState, useEffect, useContext } from 'react';

const ProjectContext = createContext();

const defaultProjects = [
  {
    id: '1',
    title: 'AI Health Analyzer',
    description: 'An AI-powered diagnostic tool that analyzes symptoms and medical records to provide preliminary health insights.',
    tech: ['React', 'Python', 'TensorFlow'],
    github: '#',
    demo: '#'
  },
  {
    id: '2',
    title: 'EcoTrack Blockchain',
    description: 'A decentralized application for tracking carbon footprints and trading carbon credits securely on the blockchain.',
    tech: ['Next.js', 'Solidity', 'Ethereum'],
    github: '#',
    demo: '#'
  },
  {
    id: '3',
    title: 'Smart City Dash',
    description: 'Real-time dashboard for visualizing city metrics like traffic flow, air quality, and energy consumption.',
    tech: ['Vue.js', 'Node.js', 'MongoDB'],
    github: '#',
    demo: '#'
  }
];

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('quad-tech-projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultProjects;
      }
    }
    return defaultProjects;
  });

  useEffect(() => {
    localStorage.setItem('quad-tech-projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (project) => {
    setProjects([...projects, { ...project, id: Date.now().toString() }]);
  };

  const updateProject = (id, updatedProject) => {
    setProjects(projects.map(p => p.id === id ? { ...updatedProject, id } : p));
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
