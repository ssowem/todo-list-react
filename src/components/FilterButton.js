import React from "react";

function FilterButton (props) {
  const buttonClass = props.isPressed ? "btn toggle-btn pressed" : "btn toggle-btn";
  return (
    <button
      type="button"
      className={buttonClass}
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.text)}>
      <span className="visually-hidden">보여주다</span>
      <span>{props.text}</span>
      <span className="visually-hidden">할 일들</span>
    </button>
  )
}

export default FilterButton;