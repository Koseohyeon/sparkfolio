// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.navItem}>🏠</Link>
      <Link to="/MyPageEdit" style={styles.navItem}>➕</Link>
      <Link to="/files" style={styles.navItem}>📁</Link>
      <Link to="/Mypage" style={styles.navItem}>👤</Link>
    </nav>
  );
};

const styles = {
  nav: {
    height: '70%',
    width: '45px',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '10px',
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px 0 0 10px',
  },
  navItem: {
    marginTop: '10px',
    fontSize: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    textDecoration: 'none'
  },
};

export default Navbar;
