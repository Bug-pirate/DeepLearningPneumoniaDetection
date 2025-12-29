import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🫁</span>
          <span className="logo-text">PneumoAI</span>
        </Link>
        
        <button 
          className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger"></span>
        </button>

        <div className={`nav-right ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
              >
                🏠 Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/detection" 
                className={location.pathname === '/detection' ? 'nav-link active' : 'nav-link'}
              >
                🔬 Detection
              </Link>
            </li>
          </ul>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
