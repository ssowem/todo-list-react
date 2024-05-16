import axios from "axios";
import React, { useState } from "react";

function ListItem(props) {
  console.log("props시작", props)

  const [isEditing, setEditing] = useState(false);
  // 수정 input칸에서 변경 전 content를 초기값을 입력되게함 
  const [newContent, setNewContent] = useState(props.content);

  console.log('checkStatus',props.status)

  function handleChange(e) { 
    setNewContent(e.target.value);
  }

  function handleSubmit(e) {
    if (newContent.trim() === "") {
      e.preventDefault();
      alert("수정할 내용을 입력해주세요")
    } else {
      e.preventDefault();
      // props.edittodo(props.id, newContent);
      modifyTodo();
      // setNewContent("");
      // setEditing(false);
    }
  }

  const deleteTodo = async () => {
    // debugger;
    // console.log(props.todoId);
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
      console.log('deleteTodo 함수 실행 실패', error)
    }
  }

  const modifyTodo = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const url = 'https://api.todo.ssobility.me/to-do-list/api/v1/todo';
    const body = { todoId: props.todoId, content: newContent };
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    try{
      await axios.put(url, body, options);
      // console.log("modifyTodo try문 안임")
      props.fetchData();
      
    } catch(error) {
      console.log(error)
    }
    // console.log("여기까지왔구나")
    // data가 서버에 전달이 안되었을때를 대비해서 try/catch문 실행후 setEditing false로 변경
    setEditing(false);
    // console.log(isEditing)
  } 

  // useEffect(() => {
  //   props.fetchData();
  //   console.log("useEffect들어옴")
  // }, [checkStatus]);

  const changeStatusTodo = async (changedStatus) => {
    const accessToken = localStorage.getItem("accessToken");
    const url = `https://api.todo.ssobility.me/to-do-list/api/v1/todo/${props.todoId}`;
    //console.log('현재 상태값',checkStatus)
    const body = { status: changedStatus }
    //console.log('status데이터 try 들어가기 전',changedStatus)
    //console.log('변경 될 상태값',changedStatus)
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    try{
      await axios.patch(url, body, options);
      console.log("changeStatusTodo try성공")
      props.fetchData();
      //setCheckStatus(changedStatus);
    }catch(error) {
      console.log("changeStatusTodo try실패", error)
    }
    
  }

  const handleChangeStatus = () => {
    console.log("체크클릭됨")
    
    if(props.status == "ACTIVE") {
      //setCheckStatus("COMPLETED");
      changeStatusTodo("COMPLETED")
      // debugger;
      console.log("COMPLETED됐나방",props.status)
    } 
    else{
      //setCheckStatus("ACTIVE");
      changeStatusTodo("ACTIVE")
      console.log("ACTIVE됐나방",props.status)
    }
    //changeStatusTodo();
  }


  const editingTemplate = (
    <form className="edit-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.todoId}>
        </label>
        <input
          id={props.todoId}
          className="todo-text"
          type="text"
          value={newContent}
          onChange={handleChange}
        />
      </div>
      <div className="list-btn">
        <button type="button" onClick={() => { setEditing(false) }}>
          취소
        </button>
        <button type="submit" onClick={handleSubmit} className="btn btn__primary todo-edit">
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
        // defaultChecked={checkStatus}
        checked={props.status === "COMPLETED" ? true : false}
        onChange={handleChangeStatus}
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
          onClick={deleteTodo}>삭제
          <span className="visually-hidden">{props.content}</span>
        </button>
      </div>
    </>
  );

  return <li className='list-item'>{isEditing ? editingTemplate : viewTemplate}</li>
}

export default ListItem;