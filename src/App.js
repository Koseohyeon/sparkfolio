import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './loginscreen/Home';
import SignUp from './loginscreen/Signup';
import LogIn from './loginscreen/Login';
import MyPage from'./mypagescreen/MyPage';
//import MyPageEdit from'./mypagescreen/MyPageEdit';

function App() {
  return (
    <Router>
      <div style={styles.app}>
        <nav style={styles.navbar}>
        <div style={styles.logo}>Sparkfolio</div> 
          <NavLink to="/Home" label="Home" />
          <NavLink to="/signup" label="Sign Up" />
          <NavLink to="/login" label="Log In" />
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/MyPage" element={<MyPage />} />
         {/*  <Route path="/MyPageEdit" element={<MyPageEdit />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

// NavLink 컴포넌트로 hover 효과 적용
const NavLink = ({ to, label }) => {
  const [hover, setHover] = useState(false);

  return (
    <Link
      to={to}
      style={{
        ...styles.navLink,
        backgroundImage: hover ? 'linear-gradient(135deg, #ADD8EB, #DDAFFF)' : 'none',
        WebkitBackgroundClip: hover ? 'text' : 'none',
        backgroundClip: hover ? 'text' : 'none',
        color: hover ? 'transparent' : 'black',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label}
    </Link>
  );
};

const styles = {
  app: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(135deg, #BBD4F1, #F5ECE7,#FDF7E1)',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '20px',
  },
  navLink: {
    margin: '0 30px',
    textDecoration: 'none',
    fontWeight: 'bold',
    position: 'relative',
    transition: 'color 0.3s ease',
    fontSize: '25px',
  },
  logo: {
     marginRight: 'auto',  // 네비게이션의 왼쪽에 고정
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1A237E', // 남색 (딥 네이비)
    background: 'linear-gradient(45deg, #FFD700, #FF8C00)', // 금빛 그라데이션
    WebkitBackgroundClip: 'text', // 텍스트 색상으로 그라데이션 적용
    backgroundClip: 'text',
    textShadow: '0 0 10px white, 0 0 20px white', // 흰색 텍스트 그림자 적용
  },
};

export default App;