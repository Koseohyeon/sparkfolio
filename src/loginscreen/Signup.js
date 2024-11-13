import React, { useState } from 'react';

function SignUp() {
  // 상태 설정
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [interest, setInterest] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }
    console.log({ name, email, password, interest });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sign Up</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

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
            placeholder="Enter your password"
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

        <label style={styles.label}>Confirm Password</label>
        <div style={styles.inputContainer}>
          <input
            type={showPasswordConfirm ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            style={styles.input}
          />
          <span 
            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            style={styles.icon}
          >
            {showPasswordConfirm ? '👁️' : '🙈'}
          </span>
        </div>

        <label style={styles.label}>Interest</label>
        <input
          type="text"
          placeholder="Your interests"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
      <footer style={styles.footer}>Sparkfolio</footer>
    </div>
  );
}

// 스타일 객체
const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)',
  },
  form: {
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    maxWidth: '500px',
    width: '100%',
  },
  label: {
    display: 'block',
    textAlign: 'left',
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
    background: 'rgba(255, 255, 255, 0.9)',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border 0.3s, box-shadow 0.3s',
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
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    width: '100%',
    marginTop: '20px',
  },
  footer: {
    marginTop: '30px',
    fontSize: '16px',
    color: '#999',
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

export default SignUp;
