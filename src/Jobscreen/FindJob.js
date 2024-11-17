import React, { useState } from 'react';

function FindJob() {
  // 직업 데이터 (샘플)
  const jobs = [
    { id: 1, title: 'Frontend Developer', location: 'Seoul', type: 'Full-time' },
    { id: 2, title: 'Backend Developer', location: 'Busan', type: 'Part-time' },
    { id: 3, title: 'Data Scientist', location: 'Seoul', type: 'Full-time' },
    { id: 4, title: 'UI/UX Designer', location: 'Incheon', type: 'Contract' },
  ];

  const [query, setQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  // 검색 처리
  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);

    // 검색 필터 적용
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery) ||
        job.location.toLowerCase().includes(searchQuery) ||
        job.type.toLowerCase().includes(searchQuery)
    );
    setFilteredJobs(filtered);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Find Your Job</h1>
      <input
        type="text"
        placeholder="Search by title, location, or type..."
        value={query}
        onChange={handleSearch}
        style={styles.input}
      />
      <div style={styles.jobList}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} style={styles.jobCard}>
              <h2 style={styles.jobTitle}>{job.title}</h2>
              <p style={styles.jobDetail}>Location: {job.location}</p>
              <p style={styles.jobDetail}>Type: {job.type}</p>
            </div>
          ))
        ) : (
          <p style={styles.noResults}>No jobs found</p>
        )}
      </div>
    </div>
  );
}

// 스타일 객체
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  jobList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  jobCard: {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  jobTitle: {
    fontSize: '1.5rem',
    margin: '0 0 10px',
    color: '#555',
  },
  jobDetail: {
    fontSize: '1rem',
    margin: '5px 0',
    color: '#777',
  },
  noResults: {
    fontSize: '1.2rem',
    color: '#999',
  },
};

export default FindJob;
