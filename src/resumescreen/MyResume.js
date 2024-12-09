import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchResumes } from "../api/auth";

const MyResume = () => {
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]); // 이력서 데이터
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // 한 페이지에 7개의 데이터
  const [pageRange, setPageRange] = useState([1, 7]); // 페이징 번호 범위

  useEffect(() => {
    // 사용자 정보 로드
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // 이력서 데이터 가져오기
    const loadResumes = async () => {
      try {
        const data = await fetchResumes(); // API 호출
        console.log(data); // 데이터 확인
        setResumes(data);
      } catch (error) {
        console.error("이력서 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    loadResumes();
  }, []);

  const totalPages = Math.ceil(resumes.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    // 페이지 번호 범위를 자동으로 업데이트
    if (page > pageRange[1]) {
      setPageRange([pageRange[1] + 1, pageRange[1] + 7]);
    } else if (page < pageRange[0]) {
      setPageRange([pageRange[0] - 7, pageRange[0] - 1]);
    }
  };

  const displayedResumes = resumes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            <span style={styles.name}>{user?.name}</span>
          </h1>
          <div style={styles.separator}></div>
        </header>
        <main>
          <h2 style={styles.subtitle}>My Resume</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>File</th>
                <th style={styles.th}>Date</th>
              </tr>
            </thead>
            <tbody>
            {displayedResumes.map((resume, index) => (
                <tr key={index} style={styles.tr}>
                  <td style={styles.td}>
                    <Link
                       to={`/EditResume?resumeId=${encodeURIComponent(resume.id)}&title=${encodeURIComponent(resume.title)}&category=${encodeURIComponent(resume.category)}&memo=${encodeURIComponent(resume.memo)}&fileUrl=${encodeURIComponent(resume.fileUrl)}`}
                      style={styles.link}
                    >
                      {resume.title}
                    </Link>
                  </td>
                  <td style={styles.td}>{resume.category}</td>
                  <td style={styles.td}>
                    <a href={`/${resume.fileUrl}`} style={styles.link} download>
                      {resume.fileUrl}
                    </a>
                  </td>
                  <td style={styles.td}>{resume.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.pagination}>
            {pageRange[0] > 1 && (
              <button
                onClick={() => setPageRange([pageRange[0] - 7, pageRange[1] - 7])}
                style={styles.pageButton}
              >
                ◀
              </button>
            )}
            {Array.from(
              { length: Math.min(totalPages - pageRange[0] + 1, 7) },
              (_, index) => pageRange[0] + index
            ).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                style={{
                  ...styles.pageButton,
                  backgroundColor: currentPage === page ? "#5588FC" : "#f0f0f0",
                  color: currentPage === page ? "#fff" : "#333",
                }}
              >
                {page}
              </button>
            ))}
            {pageRange[1] < totalPages && (
              <button
                onClick={() => setPageRange([pageRange[0] + 7, pageRange[1] + 7])}
                style={styles.pageButton}
              >
                ▶
              </button>
            )}
          </div>
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
  separator: {
    width: '100%',
    height: '1px',
    backgroundColor: '#ddd',
    marginTop: '50px',
  },
  subtitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '30px',
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  th: {
    backgroundColor: "#f5f5f5",
    color: "#333",
    fontWeight: "bold",
    padding: "10px",
    border: "1px solid #ddd",
  },
  tr: {
    textAlign: "center",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
  },
  link: {
    color: "#5588FC",
    textDecoration: "none",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    position: "sticky",
    bottom: "20px",
    background: "#fff",
    padding: "10px 0",
    zIndex: 1000,
  },
  pageButton: {
    margin: "0 5px",
    padding: "5px 10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default MyResume;
