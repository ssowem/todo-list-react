import React, { useState } from 'react'
import AlertModal from './AlertModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Join() {

  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [emailState, setEmailState] = useState(null);
  const [idNoticeText, setIdNoticeText] = useState("");
  const [idFontColor, setIdFontColor] = useState("");

  const idHandleChange = (e) => {
    const idInputValue = e.target.value;
    const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    setEmailValue(idInputValue);
    // 이메일 input값이 빈값일때 noticeText, fontColor 빈값으로 초기화함 
    if (!idInputValue) {
      setIdNoticeText("");
      setIdFontColor("");
      return;
    }
    //이메일 형식이 잘못되었을 때
    if (!emailRegExp.test(idInputValue)) {
      console.log("이메일형식 틀렸어요")
      setIdNoticeText("이메일 주소를 확인해주세요");
      setIdFontColor("red");
    //잘못되지 않았을 때 (=이메일 형식이 올바른 값일때)
    } else {
      console.log("올바른 이메일 형식")
      setIdNoticeText("올바른 이메일 주소입니다");
      setIdFontColor("blue");
    }

  }

  const [pwdValue, setPwdValue] = useState("");
  const [pwdState, setPwdState] = useState(null);
  const [pwdFontColor, setPwdFontColor] = useState("");
  const [pwdNoticeText, setPwdNoticeText] = useState("");
  const pwdHandleChange = (e) => {
    const pwdInputValue = e.target.value;
    setPwdValue(pwdInputValue);
    // 비밀번호 input값이 빈값일때 noticeText, fontColor 빈값으로 초기화함
    if(!pwdInputValue) {
      setPwdNoticeText("");
      setPwdFontColor("");
      return;
    }
    // 비밀번호가 8자 이하일때
    if(pwdInputValue.length >= 8) {
      // debugger;
      setPwdNoticeText("올바르게 입력되었습니다.");
      setPwdFontColor("blue")

    // 비밀번호가 8자 이상일때
    } else {
       setPwdNoticeText("비밀번호를 8자 이상으로 입력해주세요.");
      setPwdFontColor("red")
    }
  }

  const [checkPwdState, setCheckPwdState] = useState(null);
  const [ckPwdValue, setCkPwdValue] = useState("");
  const [ckPwdFontColor, setCkPwdFontColor] = useState("");
  const [ckPwdNoticeText, setCkPwdNoticeText] = useState("");
  const ckPwdHandleChange = (e) => {
    const ckPwdInputValue = e.target.value;
    setCkPwdValue(ckPwdInputValue);
    if(!ckPwdInputValue) {
      setCkPwdNoticeText("");
      setCkPwdFontColor("");
      return;
    }

    if(pwdValue === ckPwdInputValue) {
      setCkPwdNoticeText("비밀번호가 일치합니다.");
      setCkPwdFontColor("blue");
    } else {
      setCkPwdNoticeText("비밀번호가 일치하지 않습니다.");
      setCkPwdFontColor("red");
    }
  }

  const [joinClicked, setJoinClicked] = useState(false);


  const joinHandleSubmit = async (e) => {
    e.preventDefault();
    if (emailState && pwdState && checkPwdState) {
      try {
        const response = await axios.post(
          'http://172.30.1.33:8080/to-do-list/api/v1/auth/signup',
          {
            userId: emailValue,
            password: pwdValue
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'accept': '*/*'
            }
          }
        );
        alert("회원가입 성공, 로그인 페이지로 이동합니다.");
        navigate('/login');
      } catch (error) { // 오류처리- 해당되는 메세지로 alert 띄우기 
        alert(error.response.data.message);
      }
    } else {
      alert("입력된 정보를 확인해주세요");
    }
  }

  // 뒤로가기 클릭했을 때
  function handleGoback() {
    window.history.back();
  }

  // 모달창 기능
  const [modalCondition, setModalCondition] = useState(false);

  function handleOpenModal() {
    setModalCondition(true);
  };

  function handleCloseModal() {
    setModalCondition(false);
  };

  function handleConfirm() {
    handleGoback();
  };

  // 
  const btnBgColor = emailState && pwdState && checkPwdState;

  return (
    <>
      <button type="button"
        className="back-btn"
        onClick={handleOpenModal}
      >
        <span className="material-symbols-rounded">
          keyboard_backspace
        </span>
      </button>

      <AlertModal
        isOpen={modalCondition}
        onCancel={handleCloseModal}
        onConfirm={handleConfirm}
      />

      <form className="join-form">
        <h2>회원가입</h2>
        <div className="join-input-inner id">
          <div className="label-wrap">
            <label htmlFor="username">이메일</label>
            <span className={idFontColor}>{idNoticeText}</span>
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
            <span className={pwdFontColor}>{pwdNoticeText}</span>

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
            <span className={ckPwdFontColor}>{ckPwdNoticeText}</span>

          </div>
          <input
            type="password"
            id="confirmPassword"
            placeholder="비밀번호를 한번 더 입력해주세요"
            onChange={ckPwdHandleChange}
          />
        </div>

        <div className="btn-wrap">
          <button
            type="submit"
            onClick={joinHandleSubmit}
            style={{ backgroundColor: btnBgColor ? '#000' : '#888' }}
          >가입하기</button>
        </div>

      </form>

    </>
  )
}

export default Join;