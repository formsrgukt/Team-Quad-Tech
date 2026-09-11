import { createContext, useState, useEffect, useContext } from 'react';

const MemberContext = createContext();

const defaultMembers = [
  {
    id: '1',
    name: 'Alex Developer',
    role: 'Frontend Lead',
    bio: 'Passionate about React and UI/UX design. Loves building intuitive interfaces.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  },
  {
    id: '2',
    name: 'Sam Engineer',
    role: 'Backend Developer',
    bio: 'Node.js expert focusing on scalable architectures and API performance.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  },
  {
    id: '3',
    name: 'Jordan Designer',
    role: 'Product Designer',
    bio: 'Specializes in creating minimal, professional, and accessible design systems.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  },
  {
    id: '4',
    name: 'Taylor Data',
    role: 'AI Researcher',
    bio: 'Exploring the frontiers of machine learning and integrating AI into our projects.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  }
];

export const MemberProvider = ({ children }) => {
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('quad-tech-members');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultMembers;
      }
    }
    return defaultMembers;
  });

  useEffect(() => {
    localStorage.setItem('quad-tech-members', JSON.stringify(members));
  }, [members]);

  const addMember = (member) => {
    setMembers([...members, { ...member, id: Date.now().toString() }]);
  };

  const updateMember = (id, updatedMember) => {
    setMembers(members.map(m => m.id === id ? { ...updatedMember, id } : m));
  };

  const deleteMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  return (
    <MemberContext.Provider value={{ members, addMember, updateMember, deleteMember }}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMembers = () => useContext(MemberContext);
