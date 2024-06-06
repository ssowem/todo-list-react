import axios from 'axios'

const baseURL = process.env.REACT_APP_API_BASE_URL;

const AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 3000, //서버에 응답을 기다려주는 시간(서버요청에 응답을 못받는상황이 있을수있다)
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
      console.log('401에러확인됨',error)
      alert(error.response.data.message)
    }
    return Promise.reject(error);
  }
)


export default AxiosInstance;