import { useState } from 'react';
import { useProjects } from '../contexts/ProjectContext';
import './AdminProjects.css';

const AdminProjects = () => {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState({ title: '', description: '', tech: '', github: '', demo: '' });

  const handleEdit = (project) => {
    setCurrentProject({ ...project, tech: project.tech.join(', ') });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const projectData = {
      ...currentProject,
      tech: currentProject.tech.split(',').map(t => t.trim()).filter(t => t)
    };

    if (currentProject.id) {
      updateProject(currentProject.id, projectData);
    } else {
      addProject(projectData);
    }
    
    setIsEditing(false);
    setCurrentProject({ title: '', description: '', tech: '', github: '', demo: '' });
  };

  const handleAddNew = () => {
    setCurrentProject({ title: '', description: '', tech: '', github: '', demo: '' });
    setIsEditing(true);
  };

  return (
    <div className="admin-projects">
      <div className="admin-projects-header">
        <h3>Manage Projects</h3>
        {!isEditing && (
          <button className="btn primary-btn" onClick={handleAddNew}>+ Add New Project</button>
        )}
      </div>

      {isEditing ? (
        <div className="panel form-panel">
          <h4>{currentProject.id ? 'Edit Project' : 'Add New Project'}</h4>
          <form onSubmit={handleSave} className="admin-form">
            <div className="form-group">
              <label>Project Title</label>
              <input 
                type="text" 
                required 
                value={currentProject.title} 
                onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})} 
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                required 
                rows="3"
                value={currentProject.description} 
                onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})} 
              />
            </div>
            <div className="form-group">
              <label>Tech Stack (comma separated)</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. React, Node.js, MongoDB"
                value={currentProject.tech} 
                onChange={(e) => setCurrentProject({...currentProject, tech: e.target.value})} 
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>GitHub Link</label>
                <input 
                  type="text" 
                  value={currentProject.github} 
                  onChange={(e) => setCurrentProject({...currentProject, github: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>Live Demo Link</label>
                <input 
                  type="text" 
                  value={currentProject.demo} 
                  onChange={(e) => setCurrentProject({...currentProject, demo: e.target.value})} 
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn secondary-btn" onClick={() => setIsEditing(false)}>Cancel</button>
              <button type="submit" className="btn primary-btn">Save Project</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="panel table-panel">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Tech Stack</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>No projects found.</td>
                </tr>
              ) : (
                projects.map(project => (
                  <tr key={project.id}>
                    <td><strong>{project.title}</strong></td>
                    <td>{project.tech.join(', ')}</td>
                    <td>
                      <div className="table-actions">
                        <button className="icon-btn edit-btn" onClick={() => handleEdit(project)}>Edit</button>
                        <button className="icon-btn delete-btn" onClick={() => handleDelete(project.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
