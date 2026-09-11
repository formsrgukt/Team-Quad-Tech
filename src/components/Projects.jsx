import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'AI Health Analyzer',
    description: 'An AI-powered diagnostic tool that analyzes symptoms and medical records to provide preliminary health insights.',
    tech: ['React', 'Python', 'TensorFlow'],
    github: '#',
    demo: '#'
  },
  {
    id: 2,
    title: 'EcoTrack Blockchain',
    description: 'A decentralized application for tracking carbon footprints and trading carbon credits securely on the blockchain.',
    tech: ['Next.js', 'Solidity', 'Ethereum'],
    github: '#',
    demo: '#'
  },
  {
    id: 3,
    title: 'Smart City Dash',
    description: 'Real-time dashboard for visualizing city metrics like traffic flow, air quality, and energy consumption.',
    tech: ['Vue.js', 'Node.js', 'MongoDB'],
    github: '#',
    demo: '#'
  }
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title text-gradient">Featured Projects</h2>
        
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card glass-panel">
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="tech-stack">
                  {project.tech.map(tech => (
                    <span key={tech} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="project-footer">
                <a href={project.github} className="project-link github-link">
                  GitHub
                </a>
                <a href={project.demo} className="project-link demo-link">
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
