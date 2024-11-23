import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json', // JSON 요청 명시
  },
});

// 로그인 요청
export async function login(email, password) {
  try {
    const response = await api.post('/api/member/login', { email, password });
    return response.data;
  } catch (error) {
    console.error("로그인 에러:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error;
  }
}

// 회원가입 요청
export async function signup(name, email, password, interest, profilePhoto) {
  try {
    console.log("회원가입 요청 데이터:", { name, email, password, interest, profilePhoto });
    const response = await api.post('/api/member/signup', {
      name,
      email,
      password,
      interest,
      profilePhoto,
    });
    console.log("응답 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("회원가입 에러:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error;
  }
}
