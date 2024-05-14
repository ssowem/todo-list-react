import axios from "axios";
import React, { useState } from "react";

function TodoForm({ fetchAddTodo }) {
  const [text, setText] = useState("");


  function handleChange(e) {
    setText(e.target.value);
  }

  const handleSubmit = (e) => {
    if (text.trim() === "") {
      alert("할 일을 입력해주세요")
    }
    else {
      e.preventDefault();
      fetchAddTodo(text);
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

      </button>
    </form>
  )

}

export default TodoForm;