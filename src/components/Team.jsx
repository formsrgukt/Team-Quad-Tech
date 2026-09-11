import { useMembers } from '../contexts/MemberContext';
import './Team.css';

const Team = () => {
  const { members } = useMembers();

  return (
    <section id="team" className="team-section">
      <div className="container">
        <h2 className="section-title text-gradient">Meet The Team</h2>
        
        {members.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No team members found.</p>
        ) : (
          <div className="team-grid">
            {members.map(member => (
              <div key={member.id} className="team-card panel">
                <div className="member-avatar">
                  {member.name.charAt(0)}
                </div>
                <h3 className="member-name">{member.name}</h3>
                <h4 className="member-role text-gradient">{member.role}</h4>
                <p className="member-bio">{member.bio}</p>
                <div className="member-socials">
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="social-link">
                      GitHub
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
