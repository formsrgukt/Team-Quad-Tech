import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge glass-panel">🏆 Hackathon Innovators</div>
          <h1 className="hero-title">
            We are <span className="text-gradient">Team Quad Tech</span>
          </h1>
          <p className="hero-subtitle">
            Building the future, one line of code at a time. We specialize in innovative solutions, rapid prototyping, and pushing the boundaries of web technologies.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn primary-btn">View Our Projects</a>
            <a href="#team" className="btn secondary-btn glass-panel">Meet the Team</a>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="glow-sphere main-glow"></div>
          <div className="glow-sphere secondary-glow"></div>
          <div className="glass-panel visual-card">
            <div className="code-block">
              <span className="keyword">const</span> team = <span className="string">"Quad Tech"</span>;
              <br/>
              <span className="keyword">let</span> innovation = <span className="boolean">true</span>;
              <br/>
              <span className="function">buildAwesomeThings</span>();
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
