import React, { useState } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import { login } from '../api/auth';

function LogIn() {
  // 상태 설정
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

 // 로그인 처리
 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const result = await login(email, password); // API 호출
    alert(`로그인 성공! 환영합니다, ${result.name}`);
    localStorage.setItem('token', result.token); // 토큰 저장
    navigate('/MyPage'); // 로그인 후 대시보드로 이동 (원하는 페이지로 변경)
  } catch (error) {
    alert(error.message || '로그인 실패. 다시 시도해주세요.');
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
