import axios from "axios";
import React, { useState } from "react";

function ListItem(props) {
  console.log("props", props)

  const [isEditing, setEditing] = useState(false);
  const [newText, setNewText] = useState("");

  function handleChange(e) {
    setNewText(e.target.value);
  }

  function handleSubmit(e) {
    if (newText.trim() === "") {
      e.preventDefault();
      alert("수정할 내용을 입력해주세요")
    } else {
      e.preventDefault();
      // props.edittodo(props.id, newText);
      setNewText("");
      setEditing(false);
    }
  }


  const fetchDeleteTodo = async () => {
    // debugger;
    console.log(props.todoId);
    const accessToken = localStorage.getItem("accessToken");
    const url = 'https://api.todo.ssobility.me/to-do-list/api/v1/todo';
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data: { todoId: props.todoId }
    }
    try {
      const response = await axios.delete(url, options);
      props.fetchData();
    } catch (error) {
      console.log('fetchDeleteTodo 함수 실행 실패', error)
    }
  }

  const editingTemplate = (
    <form className="edit-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.todoId}>
        </label>
        <input
          placeholder="dd"
          id={props.todoId}
          className="todo-text"
          type="text"
          value={newText}
          onChange={handleChange}
        />
      </div>
      <div className="list-btn">
        <button type="button" onClick={() => { setEditing(false) }}>
          취소
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          저장
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <>
      <input
        id={props.todoId}
        type="checkbox"
        defaultChecked={props.completed}
        onChange={() => {
          props.toggleTaskCompleted(props.todoId)
        }}
      />
      <label
        className='todo-label'
        htmlFor={props.todoId}
        style={{ textDecoration: props.status === "COMPLETED" ? "line-through" : "none" }}
      >
        {props.content}
      </label>
      <div className='list-btn'>
        <button
          type="button"
          onClick={() => setEditing(true)}
          style={{ display: props.filter === '완료 된 일' ? 'none' : 'inline' }}
        >수정
          <span className="visually-hidden">{props.content}</span>
        </button>
        <button
          type="button"
          onClick={fetchDeleteTodo}>삭제
          <span className="visually-hidden">{props.content}</span>
        </button>
      </div>
    </>
  );

  return <li className='list-item'>{isEditing ? editingTemplate : viewTemplate}</li>
  // {isEditing ? editingTemplate : viewTemplate}
}

export default ListItem;