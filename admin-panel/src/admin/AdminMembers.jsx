import { useState } from 'react';
import { useMembers } from '../contexts/MemberContext';
import './AdminMembers.css';

const AdminMembers = () => {
  const { members, addMember, updateMember, deleteMember } = useMembers();
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState('');
  const [currentMember, setCurrentMember] = useState({ 
    name: '', 
    role: '', 
    bio: '', 
    github: '', 
    linkedin: '' 
  });

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleEdit = (member) => {
    setCurrentMember(member);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the team?`)) {
      deleteMember(id);
      showToast(`Removed team member "${name}"`);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentMember.id) {
      updateMember(currentMember.id, currentMember);
      showToast(`Updated profile for "${currentMember.name}"!`);
    } else {
      addMember(currentMember);
      showToast(`Welcome "${currentMember.name}" to the team!`);
    }
    setIsEditing(false);
    setCurrentMember({ name: '', role: '', bio: '', github: '', linkedin: '' });
  };

  const handleAddNew = () => {
    setCurrentMember({ name: '', role: '', bio: '', github: '', linkedin: '' });
    setIsEditing(true);
  };

  const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const filteredMembers = members.filter(m => {
    const q = searchQuery.toLowerCase();
    return m.name?.toLowerCase().includes(q) || m.role?.toLowerCase().includes(q);
  });

  return (
    <div className="admin-members animate-fade-in">
      {/* Toast Alert */}
      {notification && (
        <div className="admin-toast">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{notification}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card panel">
          <div className="metric-icon metric-icon-primary">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="metric-info">
            <span className="metric-label">Team Members</span>
            <div className="metric-value-row">
              <h3 className="metric-value">{members.length}</h3>
              <span className="metric-trend">Active Collaborators</span>
            </div>
          </div>
        </div>

        <div className="metric-card panel">
          <div className="metric-icon metric-icon-cyan">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <div className="metric-info">
            <span className="metric-label">Squad Roles</span>
            <div className="metric-value-row">
              <h3 className="metric-value">{new Set(members.map(m => m.role)).size}</h3>
              <span className="metric-trend">Distinct Specialties</span>
            </div>
          </div>
        </div>

        <div className="metric-card panel">
          <div className="metric-icon metric-icon-green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <div className="metric-info">
            <span className="metric-label">Workspace Health</span>
            <div className="metric-value-row">
              <h3 className="metric-value">Active</h3>
              <span className="metric-trend status-ok">Ready to Deploy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header Row */}
      <div className="admin-header-row">
        <div className="header-titles">
          <h2 className="section-heading">Manage Team Members</h2>
          <p className="section-subtext">Coordinate developer profiles, roles, and collaboration links</p>
        </div>

        {!isEditing && (
          <button className="btn primary-btn pulse-button" onClick={handleAddNew}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add New Member</span>
          </button>
        )}
      </div>

      {/* Member Form */}
      {isEditing ? (
        <div className="panel form-panel animate-fade-in">
          <div className="form-header">
            <div>
              <h4>{currentMember.id ? 'Edit Team Member' : 'Add New Member'}</h4>
              <p className="form-subtext">Set up contributor public information and social links</p>
            </div>
            <button className="close-btn" onClick={() => setIsEditing(false)}>✕</button>
          </div>

          <form onSubmit={handleSave} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name <span className="req">*</span></label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Vinay B"
                  value={currentMember.name} 
                  onChange={(e) => setCurrentMember({...currentMember, name: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>Role / Title <span className="req">*</span></label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Lead Full-Stack Engineer"
                  value={currentMember.role} 
                  onChange={(e) => setCurrentMember({...currentMember, role: e.target.value})} 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Short Bio <span className="req">*</span></label>
              <textarea 
                required 
                rows="3"
                placeholder="Share a short bio or areas of expertise..."
                value={currentMember.bio} 
                onChange={(e) => setCurrentMember({...currentMember, bio: e.target.value})} 
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>GitHub Profile Link</label>
                <input 
                  type="url" 
                  placeholder="https://github.com/username"
                  value={currentMember.github} 
                  onChange={(e) => setCurrentMember({...currentMember, github: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>LinkedIn Profile Link</label>
                <input 
                  type="url" 
                  placeholder="https://linkedin.com/in/username"
                  value={currentMember.linkedin} 
                  onChange={(e) => setCurrentMember({...currentMember, linkedin: e.target.value})} 
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
                <span>Save Member</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Members Table */
        <div className="panel table-panel">
          <div className="table-controls">
            <div className="search-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Search by name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>

            <div className="table-count-badge">
              Showing <strong>{filteredMembers.length}</strong> of {members.length}
            </div>
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '38%' }}>MEMBER</th>
                  <th style={{ width: '37%' }}>ROLE & BIO</th>
                  <th style={{ width: '25%', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="empty-state-cell">
                      <div className="empty-state">
                        <span className="empty-icon">👥</span>
                        <h4>No team members found</h4>
                        <p>{searchQuery ? 'Try another search keyword' : 'Add members using "+ Add New Member"'}</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((member, idx) => (
                    <tr 
                      key={member.id} 
                      className="table-row-item"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <td>
                        <div className="member-name-cell">
                          <div className="member-avatar">
                            {getInitials(member.name)}
                          </div>
                          <div>
                            <span className="member-name-text">{member.name}</span>
                            <div className="member-socials">
                              {member.github && (
                                <a 
                                  href={member.github} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="social-badge-icon"
                                  title="GitHub"
                                >
                                  GH
                                </a>
                              )}
                              {member.linkedin && (
                                <a 
                                  href={member.linkedin} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="social-badge-icon"
                                  title="LinkedIn"
                                >
                                  IN
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="member-role-cell">
                          <span className="role-pill">{member.role}</span>
                          {member.bio && (
                            <p className="member-bio-preview">{member.bio}</p>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button 
                            className="action-btn edit-action" 
                            title="Edit Member"
                            onClick={() => handleEdit(member)}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            <span>Edit</span>
                          </button>
                          <button 
                            className="action-btn delete-action" 
                            title="Delete Member"
                            onClick={() => handleDelete(member.id, member.name)}
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

export default AdminMembers;
