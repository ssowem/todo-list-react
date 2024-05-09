import axios from 'axios';
import React, { useState } from 'react';
import { Link, Route, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const navigate = useNavigate();

  // "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzE1MDkyMDYxLCJleHAiOjE3MTUwOTU2NjF9.gj164sbyeRWwOxjX7de6a4VuXXiLGr-b6kqOxl1pz4QHYQeQE9dbee5Xyg-AW26sehNwzSsfA29SZVIFFp61OA"

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   //로그인 로직구현
  //   //onLogin(true)를 호출하여 App 컴포넌트에 로그인 상태를 알림
  //   onLogin(true);
  // };

  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    password: ""
  });

  const [error, setError] = useState("");

  const login = async () => {
    if (!username || !password) {
      alert("로그인 정보를 입력해주세요.")
    } else {
      console.log("아이디는", username)
      console.log("비밀번호는", password)
      const url = 'http://172.30.1.33:8080/to-do-list/api/v1/auth/signin'
      const body = { userId: username, password: password }
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        }
      }

      try {
        const response = await axios.post(url, body, options);
        localStorage.setItem('accessToken', response.data.accessToken);
        console.log("성공", response);
        navigate("/content")
      } catch (error) {
        console.log("실패", error);
        alert(error.response.data.message)
      }
    }
  }
  
  const nonMemberLogin = () => {
    navigate('/content');
  }
 


  return (
    <form className="login-form">
      <input type="text" placeholder="아이디" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
      <div className="row-wrap">
        <div className='keep-check'>
          <input type="checkbox" id='keep' />
          <label htmlFor="keep">아이디 기억하기</label>
        </div>
        <div className="join">
          <Link to="/Join">회원가입</Link>
        </div>
      </div>

      <button type="button" onClick={login}>계정 로그인</button>
      <button type="button" onClick={nonMemberLogin}>비회원 로그인</button>
    </form>
  );
}

export default Login;
