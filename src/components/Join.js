import React, { useState } from 'react'

function Join() {
  const [emailValue, setEmailValue] = useState("");
  const [emailState, setEmailState] = useState(null);

  function idHandleChange(e) {
    const idInputValue = e.target.value;
    setEmailValue(idInputValue);
    setEmailState(idInputValue.length >= 4);
  }

  const [pwdValue, setPwdValue] = useState("");
  const [pwdState, setPwdState] = useState(null);
  function pwdHandleChange(e) {
    const pwInputValue = e.target.value;
    setPwdValue(pwInputValue);
    setPwdState(pwInputValue.length >= 8);
  }

  const [checkPwdState, setCheckPwdState] = useState(null);
  function ckPwdHandleChange(e) {
    const ckPwInputValue = e.target.value;
    setCheckPwdState(pwdValue === ckPwInputValue);
  }

  return (
    <>
      <button type="button" className="back-btn">
        <span className="material-symbols-rounded">
          keyboard_backspace
        </span>
      </button>

      <form className="join-form">
        <h2>회원가입</h2>
        <div className="join-input-inner id">
          <div className="label-wrap">
            <label htmlFor="username">이메일</label>
            {emailState !== null && (
              emailState ? <span className="blue">올바르게 입력되었습니다.</span> :
                <span className="red">이메일을 4자 이상 입력해주세요.</span>
            )}
          </div>
          <input
            type="text"
            id="username"
            placeholder="이메일을 입력해주세요"
            value={emailValue}
            onChange={idHandleChange}
          />
        </div>

        <div className="join-input-inner">
          <div className="label-wrap">
            <label htmlFor="password">비밀번호</label>
            {pwdState !== null && (
              pwdState ? <span className="blue">올바르게 입력되었습니다.</span> :
                <span className="blue">비밀번호를 8자 이상 입력해주세요.</span>
            )}

          </div>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요"
            value={pwdValue}
            onChange={pwdHandleChange}
          />
        </div>

        <div className="join-input-inner">
          <div className="label-wrap">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            {checkPwdState !== null && (
              checkPwdState ? <span className="blue">비밀번호가 일치합니다.</span> :
                <span className="red">비밀번호가 일치하지 않습니다.</span>
            )}

          </div>
          <input
            type="password"
            id="confirmPassword"
            placeholder="비밀번호를 한번 더 입력해주세요"
            onChange={ckPwdHandleChange}
          />
        </div>

        <div className="btn-wrap">
          <button type="submit">가입하기</button>
        </div>

      </form>
    </>
  )
}

export default Join;