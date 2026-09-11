import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar glass-panel">
      <div className="container nav-container">
        <a href="#" className="logo text-gradient">
          <span className="logo-icon">⬡</span>
          Quad Tech
        </a>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#team">Team</a></li>
        </ul>
        <button className="contact-btn">Contact Us</button>
      </div>
    </nav>
  );
};

export default Navbar;
