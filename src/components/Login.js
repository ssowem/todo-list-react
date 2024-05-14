import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const navigate = useNavigate();

  // "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzE1MDkyMDYxLCJleHAiOjE3MTUwOTU2NjF9.gj164sbyeRWwOxjX7de6a4VuXXiLGr-b6kqOxl1pz4QHYQeQE9dbee5Xyg-AW26sehNwzSsfA29SZVIFFp61OA"

  const [error, setError] = useState("");
  const login = async () => {
    if (!username || !password) {
      alert("로그인 정보를 입력해주세요.")
    } else {

      const url = 'https://api.todo.ssobility.me/to-do-list/api/v1/auth/signin'
      const body = { userId: username, password: password }
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        }
      }

      try {
        const response = await axios.post(url, body, options);
        // debugger;
        localStorage.setItem('accessToken', response.data.data.accessToken);
        console.log("로그인 성공", response);
        navigate("/Content")
      } catch (error) {
        console.log("로그인 실패", error);
        alert(error.response.data.message)
      }
    }
  }

  const nonMemberLogin = () => {
    navigate('/Content');
  }

  return (
    <form className="login-form">
      <input type="text" placeholder="이메일 계정" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="비밀번호" autoComplete ="off" onChange={(e) => setPassword(e.target.value)} />
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
