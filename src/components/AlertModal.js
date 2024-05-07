import React from "react";

function AlertModal({isOpen, onCancel, onConfirm}) {
  if (!isOpen) return null;
    return (
    <div className="modal-bg">
      <div className="modal-wrap">
        <div className="modal-content">
          <div className="modal-text">
          <p className="notice">회원가입을 취소하시겠습니까?</p>
          <p>입력된 정보가 초기화됩니다.</p>
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