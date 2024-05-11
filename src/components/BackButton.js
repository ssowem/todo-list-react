import React from "react";

function BackButton({ handleOpenModal }) {

  return (
    <button type="button" className="back-btn"
      onClick={handleOpenModal}>
      <span className="material-symbols-rounded">
        keyboard_backspace
      </span>
    </button >
  )
}

export default BackButton;