import React, { useState } from "react";

function TodoForm(props) {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    if(text.trim() === ""){
      e.preventDefault();
      alert("할 일을 입력해주세요")
    }
  
    else {
      e.preventDefault();
      props.addTask(text);
      setText("");
    }

  }
  
  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <input
        type="text"
        className='todo-input' 
        placeholder='오늘의 할 일을 입력해주세요 :)'
        value={text}
        onChange={handleChange}
        />
      <button type="submit" className='add-btn'>
        {/* <span></span>
          <span></span> */}
      </button>
    </form>
  )
  
}

export default TodoForm;