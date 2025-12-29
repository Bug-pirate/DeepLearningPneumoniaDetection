import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glass">
        <div className="footer-container">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-icon">🫁</span>
              <span className="footer-logo-text">PneumoAI</span>
            </Link>
            <p className="footer-tagline">
              AI-powered pneumonia detection for educational and research purposes.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links-group">
            <h4 className="footer-heading">Quick Links</h4>
            <nav className="footer-nav">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/detection" className="footer-link">Detection</Link>
            </nav>
          </div>

          {/* Technology */}
          <div className="footer-links-group">
            <h4 className="footer-heading">Technology</h4>
            <div className="footer-tech-tags">
              <span className="footer-tech-tag">PyTorch</span>
              <span className="footer-tech-tag">React</span>
              <span className="footer-tech-tag">Deep Learning</span>
            </div>
          </div>

          {/* Contact/Info */}
          <div className="footer-links-group">
            <h4 className="footer-heading">Important Note</h4>
            <p className="footer-note">
              This tool is for educational purposes only and should not replace professional medical diagnosis.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} PneumoAI. Built for educational purposes.
            </p>
            <div className="footer-bottom-links">
              <span className="footer-made-with">
                Made with <span className="heart">❤️</span> using React & PyTorch
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
