import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Join from "./Join";
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    //로그인 로직구현
    //onLogin(true)를 호출하여 App 컴포넌트에 로그인 상태를 알림
    onLogin(true);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="row-wrap">
        <div className='keep-check'>
          <input type="checkbox" id='keep' />
          <label htmlFor="keep">아이디 기억하기</label>
        </div>
        <div className="join">
          <Link to="/Join">회원가입</Link>
        </div>
      </div>

      <button type="submit">계정 로그인</button>
      <button type="submit">비회원 로그인</button>
    </form>
  );
}

export default Login;
