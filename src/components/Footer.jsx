import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <h2 className="logo text-gradient">
            <span className="logo-icon">⬡</span>
            Quad Tech
          </h2>
          <p className="footer-text">
            Innovating at the speed of thought. We build the future today.
          </p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h3>Explore</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#team">Team</a></li>
            </ul>
          </div>
          
          <div className="link-group">
            <h3>Connect</h3>
            <ul>
              <li><a href="#">GitHub</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Team Quad Tech. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
