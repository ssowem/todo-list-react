import React from "react";

function FilterButton(props) {
  //  console.log("필터버튼의 props",props)
  
  const buttonClass = props.isPressed ? "btn toggle-btn pressed" : "btn toggle-btn";
  return (
    <button
      type="button"
      className={buttonClass}
      onClick={() => props.setFilter(props.text)}>
      <span>{props.text}</span>
    </button>
  )
}

export default FilterButton;