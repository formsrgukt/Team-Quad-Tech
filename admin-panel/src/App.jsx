import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectProvider } from './contexts/ProjectContext';
import { MemberProvider } from './contexts/MemberContext';

import AdminLayout from './admin/AdminLayout';
import AdminProjects from './admin/AdminProjects';
import AdminMembers from './admin/AdminMembers';
import './index.css';

function App() {
  return (
    <ProjectProvider>
      <MemberProvider>
        <BrowserRouter>
          <Routes>
            {/* Redirect root to /admin to ensure sidebar active states work correctly */}
            <Route path="/" element={<Navigate to="/admin" replace />} />
            
            {/* Admin Panel */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminProjects />} />
              <Route path="members" element={<AdminMembers />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MemberProvider>
    </ProjectProvider>
  );
}

export default App;
