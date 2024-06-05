import axios from 'axios'
import { Navigate } from 'react-router-dom';

const AxiosInstance = axios.create({
  baseURL: "https://api.todo.ssobility.me/to-do-list/api/v1",
  timeout: 1000, //요청을 취소하는데 걸리는 시간..
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
AxiosInstance.interceptors.request.use(
  config => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
)

// 응답 인터셉터
AxiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      alert("시간이 초과되어 로그인 화면으로 이동됩니다.")
      sessionStorage.removeItem("accessToken");
      Navigate('/login')
    }
    return Promise.reject(error);
  }
)


export default AxiosInstance;