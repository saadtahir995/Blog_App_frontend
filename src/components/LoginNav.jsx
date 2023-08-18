import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import { FiUser, FiMenu } from 'react-icons/fi';
import '../stylesheets/LoginNav.css'; // Import your Navbar CSS file

const LoginNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      <div className="logo">
        <h1>My Blog</h1>
      </div>
      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
      <Link to='/'>Home</Link>
        <Link to='/About'>About</Link>
        <Link to='/policy'>Privacy Policy</Link>
      </div>
      <div className="user-section">
        <div className="user-icon">
          <FiUser />
        </div>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <FiMenu />
      </div>
    </nav>
  );
};

export default LoginNav;
