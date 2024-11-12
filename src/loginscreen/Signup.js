import React, { useState } from 'react';

function SignUp() {
  // 상태 설정
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [interest, setInterest] = useState('');

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 리로드 방지
    if (password !== passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }
    // 여기에 실제 가입 처리 로직 추가 (예: API 요청)
    console.log({ name, email, password, interest });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', margin: '10px', width: '100%' }}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Email.@naver.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', margin: '10px', width: '100%' }}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', margin: '10px', width: '100%' }}
        />

        <label>Password Confirm</label>
        <input
          type="password"
          placeholder="password confirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          style={{ padding: '10px', margin: '10px', width: '100%' }}
        />

        <label>Interest</label>
        <input
          type="text"
          placeholder="interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          style={{ padding: '10px', margin: '10px', width: '100%' }}
        />

        <button type="submit" style={{ padding: '10px 20px', marginTop: '20px' }}>Sign Up</button>
      </form>
      <footer style={{ marginTop: '20px' }}>Sparkfolio</footer>
    </div>
  );
}

export default SignUp;
