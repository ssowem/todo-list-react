import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from './AxiosInstance';

function Login() {

  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!userName || !password) {
      alert("로그인 정보를 입력해주세요.")
    } else {

      const url = '/auth/signin'
      const body = { userId: userName, password: password }
      // const options = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'accept': '*/*'
      //   }
      // }

      try {
        const response = await AxiosInstance.post(url, body);
        // debugger;
        sessionStorage.setItem('accessToken', response.data.data.accessToken);
        console.log("로그인 성공", response);
        navigate("/Content")
      } catch (error) {
        console.log("로그인 실패");
      }

    }
  }

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  }
  return (
    <form className="login-form" onKeyDown={activeEnter}>
      <input type="text" placeholder="아이디" onChange={(e) => setUserName(e.target.value)} onClick={activeEnter} />
      <input type="password" placeholder="비밀번호" autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
      <div className="row-wrap">
        <div className='keep-check'>
          <input type="checkbox" id='keep' />
          <label htmlFor="keep">아이디 기억하기</label>
        </div>
        <div className="join">
          <Link to="/Join">회원가입</Link>
        </div>
      </div>

      <button type="button" onClick={handleLogin}>계정 로그인</button>
    </form>
  );
}

export default Login;
