import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function LogIn() {
  // 상태 설정
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // 로그인 처리
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Email과 Password를 입력해주세요!');
      return;
    }
    // 실제 로그인 로직 (예: API 요청)
    console.log('로그인 시도:', { email, password });

    // 예시 로직: 로그인 성공/실패 알림
    if (email === 'test@example.com' && password === '1234') {
      alert('로그인 성공!');
    } else {
      alert('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Log In</h1>
      <form style={styles.form} onSubmit={handleLogin}>
        <label style={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <div style={styles.inputContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <span 
            onClick={() => setShowPassword(!showPassword)}
            style={styles.icon}
          >
            {showPassword ? '👁️' : '🙈'}
          </span>
        </div>

        <button type="submit" style={styles.button}>Log In</button>
        <div style={styles.signupLink}>
        회원이 아니신가요?{'    '}
        <Link to="/Signup" style={styles.link}>
          회원가입
        </Link>
        </div>
      </form>
      <footer style={styles.footer}>Sparkfolio</footer>
    </div>
  );
}

// 스타일 객체
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    height: '100vh', // 화면 크기에 맞춤
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '10px', // padding 조정
    boxSizing: 'border-box', // overflow 방지
    paddingTop: '50px', // 상단 여백 추가 (조금 아래로)
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    padding: '40px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '90%', // 작은 화면에서도 잘 보이도록 조정
    maxWidth: '400px', // 최대 크기 제한


  },
  label: {
    display: 'block',
    margin: '12px 0 6px',
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  icon: {
    position: 'absolute',
    right: '10px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    color: '#888',
  },
  button: {
    padding: '12px 30px',
    backgroundColor: '#5588FC',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '20px',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  signupLink: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#333',
  },
  link: {
    textDecoration: 'underline',
    color: '#5588FC',
    cursor: 'pointer',
  },
  footer: {
    marginTop: '50px',
    fontSize: '14px',
    color: '#999',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  
};


export default LogIn;
