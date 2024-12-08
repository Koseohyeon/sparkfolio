import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { uploadResume } from "../api/auth";

const ResumeUpload = () => {
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [file, setFile] = useState(null); // 업로드할 파일 상태 추가
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory !== "기타") {
      setCustomCategory("");
    }
  };

  const handleCustomCategorySubmit = () => {
    if (customCategory.trim()) {
      setCategory(customCategory.trim());
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert('지원되지 않는 파일 형식입니다. PDF 또는 DOCX 파일만 업로드할 수 있습니다.');
        setFile(null);
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("파일을 선택해주세요!");
      return;
    }

    // 로컬 스토리지에서 사용자 정보를 가져와 이메일을 추가
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userEmail = storedUser ? storedUser.email : null;

    if (!userEmail) {
      alert("사용자 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

     // 사용자 정보에서 `author`를 설정
  const author = user ? user.name : 'Unknown'; // 'Unknown'으로 기본값 설정
    
    try {
      const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category === "기타" ? customCategory : category);
    formData.append("memo", memo);
    formData.append("file", file);
    formData.append("author", author); // `author` 추가

      const result = await uploadResume(formData);
      alert("이력서 업로드 성공!");
      console.log("서버 응답:", result);
      // 폼 초기화
      setTitle("");
      setCategory("");
      setCustomCategory("");
      setMemo("");
      setFile(null);
    } catch (error) {
      console.error("업로드 실패:", error);
      alert("업로드 중 오류가 발생했습니다.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      {/* 내비게이션 */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.navItem}>🏠</Link>
        <Link to="/ResumeUpload" style={styles.navItem}>➕</Link>
        <Link to="/MyResume" style={styles.navItem}>📁</Link>
        <Link to="/Mypage" style={styles.navItem}>👤</Link>
      </nav>
      <div style={styles.content}>
        <header style={styles.header}>
          <h1 style={styles.title}>
            Welcome, <br />
            <span style={styles.name}>{user.name}</span>
          </h1>
          <div style={styles.separator}></div>
        </header>
        <main>
          <h2 style={styles.subtitle}>Register Resume</h2>
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Author</label>
              <input type="text" value={user.name} readOnly style={styles.input} maxLength={10} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Category</label>
              <select
                value={category}
                onChange={handleCategoryChange}
                style={styles.select}
                maxLength={30}
              >
                <option value="">선택</option>
                <option>프로그래밍</option>
                <option>디자인</option>
                <option>마케팅</option>
                <option>광고</option>
                <option>기획</option>
                <option>기타</option>
              </select>
            </div>
            {category === "기타" && (
              <div style={styles.formGroup}>
                <label style={styles.label}>Custom Category</label>
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  style={styles.input}
                  placeholder="카테고리를 입력하세요"
                  maxLength={30}
                />
                <button
                  type="button"
                  onClick={handleCustomCategorySubmit}
                  style={styles.submitButton}
                >
                  확인
                </button>
              </div>
            )}
            <div style={styles.formGroup}>
              <label style={styles.label}>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
                placeholder="Project name"
                maxLength={100}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Memo</label>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                style={styles.textarea}
                placeholder="Memo"
                maxLength={300}
              ></textarea>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>File</label>
              <input type="file" onChange={handleFileChange} style={styles.input} />
            </div>
            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.uploadButton}>
                Upload
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};
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
      nav: {
        height: '87.5%',
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
      content: {
        height: '85%',
        flexGrow: 1,
        maxWidth: '1000px',
        minWidth: '550px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '0 10px 10px 0',
        padding: '20px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        overflow: 'auto',
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
  name: {
    color: '#5588FC',
  },
  subtitle: {
    fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
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
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #DDD',
    boxSizing: 'border-box',
  },
  select: {
    width: '70%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #DDD',
    backgroundColor: '#FFF',
  },
  textarea: {
    width: '70%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #DDD',
    minHeight: '100px',
    boxSizing: 'border-box',
    resize: 'none', // 크기 조절 비활성화
  },
  fileInput: {
    display: 'block',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #DDD',
  },
  uploadButton: {
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
   buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    marginTop: "10px",
    marginLeft: "10px",
    padding: "10px 15px",
    backgroundColor: "#5588FC",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default ResumeUpload;
