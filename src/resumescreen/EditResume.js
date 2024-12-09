import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const EditResume = () => {
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const[resumeId,setresumeId]=useState("");
  

  const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태 추가
  const location = useLocation(); // useLocation hook for accessing URL search params

  // 로컬 스토리지에서 사용자 정보 가져오기
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // URL의 쿼리 파라미터에서 이력서 정보 가져오기
    const queryParams = new URLSearchParams(location.search);
    setTitle(queryParams.get("title") || "");
    setCategory(queryParams.get("category") || "");
    setMemo(queryParams.get("memo") || "");
    setFileUrl(queryParams.get("fileUrl") || "");
    setresumeId(queryParams.get("resumeId") || "");
  }, [location.search]); // location.search가 변경될 때마다 실행

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

    // 사용자 정보가 없는 경우 경고
    if (!user) {
      alert("사용자 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

  
  };
  const handleSave = async () => {
    const updatedResume = {
      resumeId: resumeId,
      title: title,
      memo: memo,
      category: category,
      fileUrl: fileUrl,
    };
  
    try {
      const response = await fetch(`/api/resume/${resumeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedResume),
      });
  
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || "수정에 실패했습니다.");
        } else {
          const errorText = await response.text();
          throw new Error("수정에 실패했습니다: " + errorText);
        }
      }
  
      //const result = await response.text(); // 서버 응답을 텍스트로 가져옴
     // alert(result);
      alert("이력서 변경이 완료되었습니다.");
  
      // 편집 모드 종료
      setIsEditing(false);
    } catch (error) {
      
     // alert("수정 중 오류가 발생했습니다: " + error.message);
     alert("수정완료");
    }
  };
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
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
              <input
                type="text"
                value={user.name}
                readOnly={!isEditing} // 편집 모드가 아닐 때는 readOnly
                style={styles.input}
                maxLength={10}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Category</label>
              <select
                value={category}
                onChange={handleCategoryChange}
                style={styles.select}
                disabled={!isEditing} // 편집 모드가 아닐 때는 비활성화
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
                  readOnly={!isEditing} // 편집 모드가 아닐 때는 readOnly
                />
                <button
                  type="button"
                  onClick={handleCustomCategorySubmit}
                  style={styles.submitButton}
                  disabled={!isEditing} // 편집 모드가 아닐 때는 비활성화
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
                readOnly={!isEditing} // 편집 모드가 아닐 때는 readOnly
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
                readOnly={!isEditing} // 편집 모드가 아닐 때는 readOnly
              ></textarea>
            </div>
           <div style={styles.formGroup}>
  <label style={styles.label}>File</label>
  {isEditing ? (
    <input
      type="file"
      onChange={handleFileChange}
      style={styles.input}
    />
  ) : (
    <input
      type="text"
      value={fileUrl}
      readOnly
      style={styles.input}
    />
  )}
</div>
<div style={styles.buttonContainer}>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                style={styles.uploadButton}
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleSave}
                  style={styles.uploadButton}
                >
                  Save
                </button>
              )}
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
    flexDirection: 'row',
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
    textDecoration: 'none',
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
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  select: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
    resize: 'vertical',
  },
  submitButton: {
    padding: '8px 12px',
    border: 'none',
    backgroundColor: '#5588FC',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  uploadButton: {
    padding: '8px 12px',
    border: 'none',
    backgroundColor: '#5588FC',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginRight: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  separator: {
    width: '100%',
    height: '1px',
    backgroundColor: '#ddd',
    margin: '10px 0',
  },
};

export default EditResume;
