import React from 'react'

function Join() {
  return (
    <form className="join-form">
      <h2>회원가입</h2>
      <div className="join-input-inner id">
        <div className="label-wrap">
          <label htmlFor="username">이메일</label>
          <span>이메일을 다시 확인해주세요.</span>
        </div>
        <input type="text" id="username" placeholder="이메일을 입력해주세요" />
      </div>

      <div className="join-input-inner">
        <div className="label-wrap">
          <label htmlFor="password">비밀번호</label>
          <span>비밀번호를 8자 이상 입력해주세요.</span>
        </div>
        <input type="password" id="password" placeholder="비밀번호를 입력해주세요" />
      </div>

      <div className="join-input-inner">
        <div className="label-wrap">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <span>비밀번호가 일치하지 않습니다.</span>
        </div>
        <input type="password" id="confirmPassword" placeholder="비밀번호를 한번 더 입력해주세요" />
      </div>

      <div className="btn-wrap">
        <button type="button">취소하기</button>
        <button type="submit">가입하기</button>
      </div>
    </form>


  )
}

export default Join;