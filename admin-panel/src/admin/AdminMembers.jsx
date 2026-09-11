import { useState } from 'react';
import { useMembers } from '../contexts/MemberContext';
import './AdminMembers.css';

const AdminMembers = () => {
  const { members, addMember, updateMember, deleteMember } = useMembers();
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState({ name: '', role: '', bio: '', github: '', linkedin: '' });

  const handleEdit = (member) => {
    setCurrentMember(member);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      deleteMember(id);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentMember.id) {
      updateMember(currentMember.id, currentMember);
    } else {
      addMember(currentMember);
    }
    setIsEditing(false);
    setCurrentMember({ name: '', role: '', bio: '', github: '', linkedin: '' });
  };

  const handleAddNew = () => {
    setCurrentMember({ name: '', role: '', bio: '', github: '', linkedin: '' });
    setIsEditing(true);
  };

  return (
    <div className="admin-members">
      <div className="admin-header-row">
        <h3>Manage Team Members</h3>
        {!isEditing && (
          <button className="btn primary-btn" onClick={handleAddNew}>+ Add New Member</button>
        )}
      </div>

      {isEditing ? (
        <div className="panel form-panel">
          <h4>{currentMember.id ? 'Edit Team Member' : 'Add New Member'}</h4>
          <form onSubmit={handleSave} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={currentMember.name} 
                  onChange={(e) => setCurrentMember({...currentMember, name: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>Role / Title</label>
                <input 
                  type="text" 
                  required 
                  value={currentMember.role} 
                  onChange={(e) => setCurrentMember({...currentMember, role: e.target.value})} 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Short Bio</label>
              <textarea 
                required 
                rows="3"
                value={currentMember.bio} 
                onChange={(e) => setCurrentMember({...currentMember, bio: e.target.value})} 
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>GitHub Link (optional)</label>
                <input 
                  type="text" 
                  value={currentMember.github} 
                  onChange={(e) => setCurrentMember({...currentMember, github: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>LinkedIn Link (optional)</label>
                <input 
                  type="text" 
                  value={currentMember.linkedin} 
                  onChange={(e) => setCurrentMember({...currentMember, linkedin: e.target.value})} 
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn secondary-btn" onClick={() => setIsEditing(false)}>Cancel</button>
              <button type="submit" className="btn primary-btn">Save Member</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="panel table-panel">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>No team members found.</td>
                </tr>
              ) : (
                members.map(member => (
                  <tr key={member.id}>
                    <td><strong>{member.name}</strong></td>
                    <td>{member.role}</td>
                    <td>
                      <div className="table-actions">
                        <button className="icon-btn edit-btn" onClick={() => handleEdit(member)}>Edit</button>
                        <button className="icon-btn delete-btn" onClick={() => handleDelete(member.id)}>Delete</button>
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

export default AdminMembers;
