import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './loginscreen/Home';
import SignUp from './loginscreen/Signup';
import LogIn from './loginscreen/Login';
import FindJob from './Jobscreen/FindJob';

function App() {
  return (
    <Router>
      <div style={styles.app}>
        <nav style={styles.navbar}>
          <Link to="/Home" style={styles.navLink}>Home</Link>
          <Link to="/FindJob" style={styles.navLink}>Find a job</Link>
          <Link to="/signup" style={styles.navLink}>Sign Up</Link>
          <Link to="/login" style={styles.navLink}>Log in</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/FindJob" element={<FindJob />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  app: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(135deg, #d4eaff, #FDF8E2)',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '20px',
  },
  navLink: {
    margin: '0 30px',
    textDecoration: 'none',
    color: 'black',
    fontWeight: 'bold',
    position: 'relative',
    transition: 'color 0.3s ease',
    fontSize: '28px',
  },
};

export default App;
