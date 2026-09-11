import { useState } from 'react';
import { useProjects } from '../contexts/ProjectContext';
import './AdminProjects.css';

const AdminProjects = () => {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState('');
  const [currentProject, setCurrentProject] = useState({ 
    title: '', 
    description: '', 
    tech: '', 
    github: '', 
    demo: '' 
  });

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleEdit = (project) => {
    setCurrentProject({ 
      ...project, 
      tech: Array.isArray(project.tech) ? project.tech.join(', ') : project.tech 
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      deleteProject(id);
      showToast(`Removed project "${title}"`);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const techArray = typeof currentProject.tech === 'string'
      ? currentProject.tech.split(',').map(t => t.trim()).filter(Boolean)
      : currentProject.tech;

    const projectData = {
      ...currentProject,
      tech: techArray
    };

    if (currentProject.id) {
      updateProject(currentProject.id, projectData);
      showToast(`Updated "${currentProject.title}" successfully!`);
    } else {
      addProject(projectData);
      showToast(`Added new project "${currentProject.title}"!`);
    }
    
    setIsEditing(false);
    setCurrentProject({ title: '', description: '', tech: '', github: '', demo: '' });
  };

  const handleAddNew = () => {
    setCurrentProject({ title: '', description: '', tech: '', github: '', demo: '' });
    setIsEditing(true);
  };

  // Stats calculation
  const totalProjects = projects.length;
  const uniqueTechs = new Set(
    projects.flatMap(p => Array.isArray(p.tech) ? p.tech : [p.tech])
  ).size;

  // Search filtering
  const filteredProjects = projects.filter(p => {
    const q = searchQuery.toLowerCase();
    const titleMatch = p.title?.toLowerCase().includes(q);
    const techMatch = Array.isArray(p.tech) 
      ? p.tech.some(t => t.toLowerCase().includes(q))
      : p.tech?.toLowerCase().includes(q);
    return titleMatch || techMatch;
  });

  // Dynamic tag color helper
  const getTagColorClass = (techName) => {
    const t = techName.toLowerCase();
    if (t.includes('react') || t.includes('vue') || t.includes('front')) return 'tag-cyan';
    if (t.includes('node') || t.includes('python') || t.includes('solidity')) return 'tag-indigo';
    if (t.includes('mongo') || t.includes('sql') || t.includes('data')) return 'tag-emerald';
    if (t.includes('ai') || t.includes('tensor') || t.includes('chain')) return 'tag-violet';
    return 'tag-blue';
  };

  return (
    <div className="admin-projects animate-fade-in">
      {/* Toast alert */}
      {notification && (
        <div className="admin-toast">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{notification}</span>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card panel">
          <div className="metric-icon metric-icon-primary">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <div className="metric-info">
            <span className="metric-label">Active Projects</span>
            <div className="metric-value-row">
              <h3 className="metric-value">{totalProjects}</h3>
              <span className="metric-trend">Live in Production</span>
            </div>
          </div>
        </div>

        <div className="metric-card panel">
          <div className="metric-icon metric-icon-cyan">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
          <div className="metric-info">
            <span className="metric-label">Technologies In Use</span>
            <div className="metric-value-row">
              <h3 className="metric-value">{uniqueTechs}</h3>
              <span className="metric-trend">Frameworks & Tools</span>
            </div>
          </div>
        </div>

        <div className="metric-card panel">
          <div className="metric-icon metric-icon-green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div className="metric-info">
            <span className="metric-label">Deployment Status</span>
            <div className="metric-value-row">
              <h3 className="metric-value">100%</h3>
              <span className="metric-trend status-ok">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Header */}
      <div className="admin-projects-header">
        <div className="header-titles">
          <h2 className="section-heading">Manage Projects</h2>
          <p className="section-subtext">Add, update, or reorganize team showcases and repositories</p>
        </div>

        {!isEditing && (
          <button className="btn primary-btn pulse-button" onClick={handleAddNew}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add New Project</span>
          </button>
        )}
      </div>

      {/* Edit / Create Form */}
      {isEditing ? (
        <div className="panel form-panel animate-fade-in">
          <div className="form-header">
            <div>
              <h4>{currentProject.id ? 'Edit Project' : 'Create New Project'}</h4>
              <p className="form-subtext">Fill in the details below to update the portfolio showcase</p>
            </div>
            <button className="close-btn" onClick={() => setIsEditing(false)}>✕</button>
          </div>

          <form onSubmit={handleSave} className="admin-form">
            <div className="form-group">
              <label>Project Title <span className="req">*</span></label>
              <input 
                type="text" 
                required 
                placeholder="e.g. AI Health Analyzer"
                value={currentProject.title} 
                onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})} 
              />
            </div>

            <div className="form-group">
              <label>Description <span className="req">*</span></label>
              <textarea 
                required 
                rows="3"
                placeholder="Briefly describe what makes this project stand out..."
                value={currentProject.description} 
                onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})} 
              />
            </div>

            <div className="form-group">
              <label>Tech Stack <span className="req">*</span> <small>(comma-separated)</small></label>
              <input 
                type="text" 
                required 
                placeholder="e.g. React, Python, TensorFlow, Tailwind"
                value={currentProject.tech} 
                onChange={(e) => setCurrentProject({...currentProject, tech: e.target.value})} 
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>GitHub Repository URL</label>
                <input 
                  type="url" 
                  placeholder="https://github.com/..."
                  value={currentProject.github} 
                  onChange={(e) => setCurrentProject({...currentProject, github: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>Live Demo URL</label>
                <input 
                  type="url" 
                  placeholder="https://..."
                  value={currentProject.demo} 
                  onChange={(e) => setCurrentProject({...currentProject, demo: e.target.value})} 
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn secondary-btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button type="submit" className="btn primary-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                <span>Save Project</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Projects Table with Search */
        <div className="panel table-panel">
          <div className="table-controls">
            <div className="search-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Search projects or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>

            <div className="table-count-badge">
              Showing <strong>{filteredProjects.length}</strong> of {totalProjects}
            </div>
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '32%' }}>PROJECT</th>
                  <th style={{ width: '45%' }}>TECH STACK</th>
                  <th style={{ width: '23%', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="empty-state-cell">
                      <div className="empty-state">
                        <span className="empty-icon">📁</span>
                        <h4>No projects found</h4>
                        <p>{searchQuery ? 'Try matching a different keyword' : 'Click "+ Add New Project" to get started!'}</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project, idx) => (
                    <tr 
                      key={project.id} 
                      className="table-row-item"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <td>
                        <div className="project-title-cell">
                          <div className="project-bullet"></div>
                          <div>
                            <span className="project-title-text">{project.title}</span>
                            {project.description && (
                              <p className="project-desc-preview">{project.description}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="tags-container">
                          {(Array.isArray(project.tech) ? project.tech : [project.tech]).map((tech, tIdx) => (
                            <span key={tIdx} className={`tech-pill ${getTagColorClass(tech)}`}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button 
                            className="action-btn edit-action" 
                            title="Edit Project"
                            onClick={() => handleEdit(project)}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            <span>Edit</span>
                          </button>
                          <button 
                            className="action-btn delete-action" 
                            title="Delete Project"
                            onClick={() => handleDelete(project.id, project.title)}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
