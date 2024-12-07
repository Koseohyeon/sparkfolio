import React, { useEffect, useState } from 'react';
import { updateUserInfo } from '../api/auth';
import Navbar from '../components/Navbar';

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", interest: "" });
  
// 로컬 스토리지에서 사용자 정보를 불러오기
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({ name: parsedUser.name, interest: parsedUser.interest,email:parsedUser.email });
    }
  }, []);
   // 사용자 정보가 변경될 때 로컬 스토리지를 업데이트
   useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // formData를 기반으로 사용자 정보를 업데이트
      const updatedProfile = { ...user, ...formData }; // user의 기존 데이터와 formData를 합칩니다.
      const response = await updateUserInfo(updatedProfile); // 수정된 데이터를 바로 전송
      setUser(response); // 상태 업데이트
      localStorage.setItem("user", JSON.stringify(response));
      setIsEditing(false); // 편집 모드 종료
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("프로필 업데이트 실패: " + (error.message || "알 수 없는 오류"));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
                    value={formData.name}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    style={styles.input}
                  />
                </div>
                <div style={styles.infoItem}>
  <label style={styles.label}>Email</label>
  <input
  type="email"
  name="email"
  value={formData.email || ""}
  onChange={handleChange}
  readOnly={!isEditing}
  style={{
    ...styles.input,
    backgroundColor: isEditing ? '#f0f0f0' : 'rgba(255, 255, 255, 0.9)', // Edit 모드에서 회색 배경
  }}
/>
</div>
                <div style={styles.infoItem}>
                  <label style={styles.label}>Interest</label>
                  <input
                    type="text"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    style={styles.input}
                  />
                </div>
              </div>
            </div>
            {!isEditing ? (
  <button
    style={{
      ...styles.button,
      backgroundColor: '#5588FC', // Edit 모드가 아닌 경우 색상
    }}
    onClick={handleEdit}
  >
    Edit
  </button>
) : (
  <button
    style={{
      ...styles.button,
      backgroundColor: '#8A2BE2', // Edit 모드인 경우 색상
    }}
    onClick={handleSave}
  >
    Save
  </button>
)}
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
    color: '#5588FC',
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
    backgroundColor: '#5588FC', // 기존 스타일 복원
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

export default MyPage;
