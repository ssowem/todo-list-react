import React, { useEffect, useState } from 'react'
import AlertModal from './AlertModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

function Join() {
  const [idState, setIdState] = useState(null);
  const [idValue, setIdValue] = useState("");
  const [idNoticeText, setIdNoticeText] = useState("");
  const [idFontColor, setIdFontColor] = useState("");

  const [pwdState, setPwdState] = useState(null);
  const [pwdValue, setPwdValue] = useState("");
  const [pwdNoticeText, setPwdNoticeText] = useState("");
  const [pwdFontColor, setPwdFontColor] = useState("");

  const [checkPwdState, setCheckPwdState] = useState(null);
  const [ckPwdValue, setCkPwdValue] = useState("");
  const [ckPwdNoticeText, setCkPwdNoticeText] = useState("");
  const [ckPwdFontColor, setCkPwdFontColor] = useState("");

  const navigate = useNavigate();
  const btnBgColor = idState && pwdState && checkPwdState;
  
  // 모달창 상태관리
  const [modalCondition, setModalCondition] = useState(false);

  const idHandleChange = async (e) => {
    const idInputValue = e.target.value;
    // 아이디 영문자로 시작, 숫자포함 5~14자 이하
    const regExp = /^[0-9a-zA-Z]{5,14}$/g
    setIdValue(idInputValue);
    // 아이디 input값이 빈값일때 (noticeText, fontColor 빈값으로 초기화함)
    if (!idInputValue) {
      setIdNoticeText("");
      setIdFontColor("");
      return;
    }

    //아이디 형식이 잘못되었을 때
    if (!regExp.test(idInputValue)) {
      setIdNoticeText("영문,숫자를 조합하여 5~14자로 입력해주세요");
      setIdFontColor("red");
      setIdState(false);
    //아이디 형식이 올바를 때
    } else {
      console.log()
      const url = `https://api.todo.ssobility.me/to-do-list/api/v1/auth/signup/check-username?username=${idInputValue}`;
      const options = {
        headers: {
          'accept': '*/*'
        }
      }
      try {
        const response = await axios.get(url, options);
        // console.log(response)
        setIdNoticeText("아이디가 올바르게 입력되었습니다.");
        setIdFontColor("green");
        setIdState(true);
      }
      catch (error) {
        if(error.response.status === 409){
          setIdNoticeText("중복 된 아이디입니다.");
          setIdFontColor("red");
          setIdState(false);
          return;
        } 
          // console.log(error);
        // alert(error.response.data.message);
        setIdNoticeText(error.response.data.message);
        setIdFontColor("red");
        setIdState(false);
      }
    }
  }

  // 비번확인 일치한 상태에서 다시 비밀번호가 수정되는 경우를 방지
  // pwdValue가 변경될때 ckPwdHandleChange 함수를 실행해서 업데이트
  useEffect(() => {
    ckPwdHandleChange({ target: { value: ckPwdValue } });
  }, [pwdValue]); // pwdValue가 변경될 때마다 호출

  const pwdHandleChange = (e) => {
    const pwdInputValue = e.target.value;
    setPwdValue(pwdInputValue);
    // 비밀번호 input값이 빈값일때 noticeText, fontColor 빈값으로 초기화함
    if (!pwdInputValue) {
      setPwdNoticeText("");
      setPwdFontColor("");
      return;
    }
    // 비밀번호가 8자 이상일때
    if (pwdInputValue.length >= 8) {
      // debugger;
      setPwdNoticeText("올바르게 입력되었습니다.");
      setPwdFontColor("green")
      setPwdState(true);

      // 비밀번호가 8자 이하일때
    } else {
      setPwdNoticeText("비밀번호를 8자 이상으로 입력해주세요.");
      setPwdFontColor("red")
      setPwdState(false);
    }
  }

  const ckPwdHandleChange = (e) => {
    const ckPwdInputValue = e.target.value;
    setCkPwdValue(ckPwdInputValue);
    if (!ckPwdInputValue) {
      setCkPwdNoticeText("");
      setCkPwdFontColor("");
      return;
    }

    if (pwdValue === ckPwdInputValue) {
      setCkPwdNoticeText("비밀번호가 일치합니다.");
      setCkPwdFontColor("green");
      setCheckPwdState(true);
    } else {
      setCkPwdNoticeText("비밀번호가 일치하지 않습니다.");
      setCkPwdFontColor("red");
      setCheckPwdState(false);
    }
  }

  const joinHandleSubmit = async (e) => {
    e.preventDefault();
    if (idState && pwdState && checkPwdState) {
      try {
        const response = await axios.post(
          'https://api.todo.ssobility.me/to-do-list/api/v1/auth/signup',
          {
            userId: idValue,
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
        navigate('/Login');
      } catch (error) { // 오류처리- 해당되는 메세지로 alert 띄우기 
        alert(error.response.data.message);
      }
    } else {
      alert("입력된 정보를 확인해주세요");
    }
  }

  // BackButton 클릭시 모달창 띄우기
  const handleOpenModal = () => {
    setModalCondition(true);
  };

  // 모달창 확인 (로그인 페이지로 이동)
  const handleConfirm = () => {
    navigate('/Login');
  }

  // 모달창 취소 
  const handleCloseModal = () => {
    setModalCondition(false);
  };

  return (
    <>
      <BackButton
        handleOpenModal={handleOpenModal}
      />

      <AlertModal
        isOpen={modalCondition}
        onCancel={handleCloseModal}
        onConfirm={handleConfirm}
      />

      <form className="join-form">
        <h2>회원가입</h2>
        <div className="join-input-inner id">
          <div className="label-wrap">
            <label htmlFor="username">아이디</label>
            <span className={idFontColor}>{idNoticeText}</span>
          </div>
          <input
            type="text"
            id="username"
            placeholder="아이디를 입력해주세요"
            value={idValue}
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
            autoComplete="off"
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
            autoComplete="off"
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