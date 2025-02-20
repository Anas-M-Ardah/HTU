// Footer.jsx
import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          © {currentYear} <span className="footer-name">Anas-M-Ardah</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;