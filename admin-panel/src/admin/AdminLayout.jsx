import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('admin-theme');
    if (saved) return saved === 'dark';
    return true;
  });
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('admin-theme', 'dark');
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('admin-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const getPageTitle = () => {
    if (location.pathname.includes('/members')) return 'Team Management';
    return 'Projects Portfolio';
  };

  return (
    <div className="admin-container">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="admin-sidebar-overlay" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar panel ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="admin-logo">
          <div className="logo-badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="logo-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1"/>
                  <stop offset="0.5" stopColor="#3b82f6"/>
                  <stop offset="1" stopColor="#06b6d4"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-title">Quad <span className="text-gradient">Admin</span></span>
        </div>

        <nav className="admin-nav">
          <div className="nav-group-label">NAVIGATION</div>

          <NavLink 
            to="/admin" 
            end 
            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            <span>Projects</span>
            <span className="nav-pill">Active</span>
          </NavLink>

          <NavLink 
            to="/admin/members" 
            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>Team Members</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-card">
            <div className="status-indicator">
              <span className="pulse-dot"></span>
              <span>System Online</span>
            </div>
            <p className="version-tag">Quad Tech v1.2.0</p>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <main className="admin-main">
        <header className="admin-header panel">
          <div className="header-left">
            <button 
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className="header-breadcrumbs">
              <span className="crumb-parent">Quad Console</span>
              <span className="crumb-separator">/</span>
              <span className="crumb-current">{getPageTitle()}</span>
            </div>
          </div>

          <div className="header-right">
            {/* Animated SVG Theme Toggle Button */}
            <button 
              className={`theme-toggle-btn ${isDarkMode ? 'dark' : 'light'}`}
              onClick={toggleTheme}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              <div className="theme-toggle-track">
                {/* Sun SVG */}
                <svg 
                  className="theme-svg sun-svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>

                {/* Moon SVG */}
                <svg 
                  className="theme-svg moon-svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>

                <div className="theme-toggle-thumb"></div>
              </div>
            </button>

            <div className="status-badge">
              <span className="status-dot"></span>
              <span className="status-text">Production</span>
            </div>

            <div className="admin-user-profile">
              <div className="user-avatar">
                <span>AD</span>
                <span className="online-beacon"></span>
              </div>
              <div className="user-details">
                <span className="user-name">Admin User</span>
                <span className="user-role">Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
