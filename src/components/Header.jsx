// Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../css/colors.css';
import '../css/Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className='header'>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/home">
            <img src={logo} alt="Logo" />
          </Link>

          {/* Hamburger Button */}
          <button
            className={`hamburger ${isOpen ? 'active' : ''}`}
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Menu Items */}
          <div className={`sidebar ${isOpen ? 'active' : ''}`}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive('/technical')}`}
                  to="/technical"
                  onClick={() => setIsOpen(false)}
                >
                  Technical
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive('/english')}`}
                  to="/english"
                  onClick={() => setIsOpen(false)}
                >
                  English
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive('/softskill')}`}
                  to="/softskill"
                  onClick={() => setIsOpen(false)}
                >
                  Soft Skills
                </Link>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link sign-out-btn"
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;