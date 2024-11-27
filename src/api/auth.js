import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json', // JSON 요청 명시
  },
  withCredentials: true, // 세션 쿠키를 자동으로 전송
});

// 로그인 요청
export async function login(email, password) {
  try {
    const response = await api.post('/api/member/login', { email, password });
    const { userData } = response.data; // 사용자 데이터 추출
    return userData; // userData 반환
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

//프로필 불러오기
export async function getProfile() {
  try {
    const response = await api.get('/api/member/profile');
    return response.data;
  } catch (error) {
    console.error("프로필 불러오기 에러:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error;
  }
}

// 로그아웃 요청 함수
export async function logout() {
  try {
    const response = await api.post('/api/member/logout');
    return response.data; // 로그아웃 성공 시 반환되는 데이터
  } catch (error) {
    console.error('로그아웃 에러:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error;
  }
}
// 프로필 업데이트 함수
export const updateUserInfo = async (data) => {
  try {
    // 로컬 스토리지에서 사용자 정보를 가져와 이메일을 추가
    const user = JSON.parse(localStorage.getItem("user")); // 사용자 정보가 로컬 스토리지에 저장되어 있다고 가정

    // 사용자 이메일을 data에 추가
    const updatedData = {
      ...data,
      email: user ? user.email : null, // 로컬 스토리지에 사용자 정보가 없으면 null 처리
    };

    const response = await api.put("/api/member/update", updatedData);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error;
  }
};