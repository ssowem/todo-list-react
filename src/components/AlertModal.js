import React, { useEffect, useState } from "react";
function AlertModal({ isOpen, onConfirm, onCancel }) {
  // 현재 트랜지션 효과를 보여주고 있는 중이라는 상태 값
  const [animate, setAnimate] = useState(false);
  // 실제 컴포넌트가 사라지는 시점을 지연시키기 위한 값
  const [visible, setVisible] = useState(isOpen);
  useEffect(() => {
    setVisible(isOpen)

    // open 값이 true -> false 가 되는 것을 감지 (즉, 모달창을 닫을 때)
    if (visible && !isOpen) {
      setAnimate(true)
      setTimeout(() => setAnimate(false), 200)
    }
    return () => {
      setVisible(false)
    }
  }, [visible, isOpen])
  if (!isOpen && !animate && !visible) return null;

  return (
    <div className={isOpen ? "modal-bg open" : "modal-bg"}>
      <div className="modal-wrap">
        <div className="modal-content">
          <div className="modal-text">
            <p className="notice">로그인 페이지로 이동됩니다.</p>
          </div>
          <div className="modal-btn">
            <button onClick={onCancel}>취소</button>
            <button onClick={onConfirm}>확인</button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default AlertModal;