import React, { useState } from "react";

function ListItem(props) {

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
      props.editTask(props.id, newText);
      setNewText("");
      setEditing(false);
    }
  }

  const editingTemplate = (
    <form className="edit-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
        </label>
        <input
          placeholder={props.text}
          id={props.id}
          className="todo-text"
          type="text"
          value={newText}
          onChange={handleChange}
        />
      </div>
      <div className="list-btn">
        <button type="button" onClick={() => { setEditing(false) }}>
          취소
          <span className="visually-hidden">{props.text} 이름 바꾸기</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          저장
          <span className="visually-hidden">{props.text}의 새로운 이름</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <>
      <input
        id={props.id}
        type="checkbox"
        defaultChecked={props.completed}
        onChange={() => {
          props.toggleTaskCompleted(props.id)
        }}
      />
      <label
        className='todo-label'
        htmlFor={props.id}
        style={{ textDecoration: props.completed === true ? "line-through" : "none" }}
      >
        {props.text}
      </label>
      <div className='list-btn'>
        <button
          type="button"
          onClick={() => setEditing(true)}
          style={{ display: props.filter === '완료 된 일' ? 'none' : 'inline' }}
        >수정
          <span className="visually-hidden">{props.text}</span>
        </button>
        <button
          type="button"
          onClick={() => props.deleteTask(props.id)}>삭제
          <span className="visually-hidden">{props.text}</span>
        </button>
      </div>
    </>
  );


  return <li className='list-item'>{isEditing ? editingTemplate : viewTemplate}</li>
}

export default ListItem;