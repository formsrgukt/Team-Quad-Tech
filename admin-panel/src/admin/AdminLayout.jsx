import { Link, Outlet } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar panel">
        <div className="admin-logo">
          <span className="logo-icon">⬡</span> Quad Admin
        </div>
        <nav className="admin-nav">
          <Link to="/" className="admin-nav-link back-link">← Back to Site</Link>
          <Link to="/admin" className="admin-nav-link">Projects</Link>
          <Link to="/admin/members" className="admin-nav-link">Team Members</Link>
        </nav>
      </aside>
      
      <main className="admin-main">
        <header className="admin-header panel">
          <h2>Dashboard</h2>
          <div className="admin-user">Admin User</div>
        </header>
        
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
