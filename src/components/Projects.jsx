import { useProjects } from '../contexts/ProjectContext';
import './Projects.css';

const Projects = () => {
  const { projects } = useProjects();

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title text-gradient">Featured Projects</h2>
        
        {projects.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No projects added yet.</p>
        ) : (
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card panel">
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="tech-stack">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="project-footer">
                  <a href={project.github} className="project-link github-link" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                  <a href={project.demo} className="project-link demo-link" target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
