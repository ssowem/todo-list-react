import React, { useState } from 'react'

function Join() {
  const [emailValue, setEmailValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function idHandleChange(e) {
    const idInputValue = e.target.value;
    setEmailValue(idInputValue);
    if (idInputValue.length >= 3 && !showPassword) {
      setShowPassword(true);
    }
  }

  const [passwordValue, setPasswordValue] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function pwdHandleChange(e) {
    const pwInputValue = e.target.value;
    setPasswordValue(pwInputValue);
    if (pwInputValue.length >= 8) {
      setShowConfirmPassword(true);
    }
  }



  return (
    <form className="join-form">
      <h2>회원가입</h2>
      <div className="join-input-inner id">
        <div className="label-wrap">
          <label htmlFor="username">이메일</label>
          <span>이메일을 다시 확인해주세요.</span>
        </div>
        <input
          type="text"
          id="username"
          placeholder="이메일을 입력해주세요"
          value={emailValue}
          onChange={idHandleChange}
        />
      </div>

       <div className={`join-input-inner fade-in ${showPassword ? 'visible' : ''}`}>
        <div className="label-wrap">
          <label htmlFor="password">비밀번호</label>
          <span>비밀번호를 8자 이상 입력해주세요.</span>
        </div>
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력해주세요"
          value={passwordValue}
          onChange={pwdHandleChange}
        />
      </div>

      <div className={`join-input-inner fade-in ${showConfirmPassword ? 'visible' : ''}`}>
        <div className="label-wrap">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <span>비밀번호가 일치하지 않습니다.</span>
        </div>
        <input type="password" id="confirmPassword" placeholder="비밀번호를 한번 더 입력해주세요" />
        <div className="btn-wrap">
          <button type="button">취소하기</button>
          <button type="submit">가입하기</button>
        </div>
      </div> 


    </form>

  )
}

export default Join;