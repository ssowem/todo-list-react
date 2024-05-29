import React from "react";
function FilterButton(props) {
  const buttonClass = props.isPressed ? "btn toggle-btn pressed" : "btn toggle-btn";
  const HandleFilter = () => {
    // props.fetchData();
    // props.setFilter(props.filtername);
    props.setFilter(props.filtername);
    // props.handleMessage();
  }

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={HandleFilter}
    >
      <span>{props.filtername}</span>
    </button>
  )
}

export default FilterButton;