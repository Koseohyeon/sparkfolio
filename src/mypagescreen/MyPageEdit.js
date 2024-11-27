import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { updateProfile } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const MypageEdit = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate(); // useNavigate 훅 사용
  
    // 로컬 스토리지에서 사용자 정보를 가져옴
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }else {
        navigate('/LogIn'); // 로그인 페이지로 리다이렉트
      }
    }, [navigate]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUser({
        ...user,
        [name]: value,
      });
    };
  
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const handleSaveClick = async () => {
      try {
        const updatedProfile = {
          name: user.name,
          interest: user.interest,
        };
        
        // 서버에 프로필 업데이트 요청
        const response = await updateProfile(updatedProfile);
  
        console.log("프로필 업데이트 성공:", response);
        setIsEditing(false);
        
        // 로컬 스토리지에 사용자 정보 업데이트
        localStorage.setItem("user", JSON.stringify(response));
      } catch (error) {
        console.error("프로필 업데이트 실패:", error);
      }
    };
  
    if (!user) {
      return <div>Loading...</div>;
    }
  
    return (
      <div style={styles.container}>
        <Navbar />
        <div style={styles.content}>
          <header style={styles.header}>
            <h1 style={styles.title}>
              Welcome,<br />
              <span style={styles.name}>{user.name}</span>
            </h1>
            <div style={styles.separator}></div>
          </header>
          <main>
            <h3 style={styles.subtitle}>My page</h3>
            <div style={styles.f}>
              <div style={styles.profileInfo}>
                <div style={styles.profilePicture}>
                  <div style={styles.imagePlaceholder}>이미지</div>
                  <p style={styles.name}>{user.name}</p>
                </div>
                <div style={styles.infoDetails}>
                  <div style={styles.infoItem}>
                    <label style={styles.label}>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.infoItem}>
                    <label style={styles.label}>Email</label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.infoItem}>
                    <label style={styles.label}>Interest</label>
                    <input
                      type="text"
                      name="interest"
                      value={user.interest}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      style={styles.input}
                    />
                  </div>
                </div>
              </div>
              <button
                style={styles.button}
                onClick={isEditing ? handleSaveClick : handleEditClick}
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  };
// 스타일 정의
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row', // 가로로 배치
    height: '100vh',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: '50px',
    padding: 0,
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  content: {
    height: '67.5%',
    flexGrow: 1,
    maxWidth: '1000px',
    minWidth: '550px',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '0 10px 10px 0',
    padding: '20px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#333',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)',
  },
  subtitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '30px',
  },
  profileInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // 수평 중앙 정렬
    width: '100%',
  
  },
  profilePicture: {
    marginLeft: '100px', // 프로필 이미지와 나머지 정보 사이에 여백 추가
    textAlign: 'center',
    
  },
  imagePlaceholder: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
  },
  name: {
    marginTop: '50px',
    fontWeight: 'bold',
    fontSize:'24px'
  },
  infoDetails: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column', // 세로로 정렬
    justifyContent: 'flex-start',
  },
  infoItem: {
    display: 'flex',
    justifyContent: 'flex-start', // 오른쪽 라벨, 왼쪽 입력 필드 배치
    alignItems: 'center',
    marginBottom: '20px',
    width: '100%',
  },
  label: {
    marginRight: '10px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
    width: '30%',
  },
  input: {
    width: '70%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    background: 'rgba(255, 255, 255, 0.9)',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#5588FC',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '10%',
    marginTop: '30px',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  separator: {
    width: '100%',
    height: '1px',
    backgroundColor: '#ddd',
    marginTop: '50px',
  },
};

export default MypageEdit;
