import React, { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import BackButton from './BackButton';
import AlertModal from './AlertModal';
import { useNavigate } from 'react-router-dom';
import ListItem from './ListItem';
import axios from 'axios';
import { nanoid } from 'nanoid';



function Content({ filterList, message }) {
  // 모달창 상태관리
  const navigate = useNavigate();
  const [modalCondition, setModalCondition] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const url = "https://api.todo.ssobility.me/to-do-list/api/v1/todo?pageNumber=0&pageSize=10&status=ACTIVE"
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    try {
      const response = await axios.get(url, options);
      console.log('fetchData 성공', response)
      setTodos(response.data.data.todoList);

    } catch (error) {
      console.log('fetchData 함수실행 실패', error)
    }
  }
  // console.log("fetchData끝 todos", todos)
  
  {/* {todos.map(todo => (
            <ListItem key={todo} text={todo.content} fetchDeleteTodo={fetchDeleteTodo} completed={todo.status === "ACTIVE"} />
          ))} */}

  const fetchAddTodo = async (content) => {
    const accessToken = localStorage.getItem("accessToken");
    const url = "https://api.todo.ssobility.me/to-do-list/api/v1/todo?pageNumber=0&pageSize=10&status=ACTIVE"
    const body = { content: content, status: "ACTIVE" }
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    try {
      const response = await axios.post(url, body, options);
      //const newtodo = {...response.data.data.todoList, completed : false};
      // setTodos(prevtodos => [...prevtodos, newtodo]);
      fetchData();

    } catch (error) {
      console.log('실패', error)
    }
  }

  
  // BackButton 클릭시 모달창 띄우기
  const handleOpenModal = () => {
    setModalCondition(true);
  };
  // 모달창 확인 (로그인 페이지로 이동)
  const handleConfirm = () => {
    navigate('/login');
  }

  // 모달창 취소 
  const handleCloseModal = () => {
    setModalCondition(false);
  };
  return (
    <>
      <BackButton
        handleOpenModal={handleOpenModal}
      />

      <AlertModal
        isOpen={modalCondition}
        onCancel={handleCloseModal}
        onConfirm={handleConfirm}
      />

      <div className="wrapper">
        <h2>💡오늘의 할 일</h2>
        <TodoForm fetchAddTodo={fetchAddTodo} />
        <div className='filter-btn'>
          {filterList}
        </div>
        <ul className='list-wrap'>
          {todos.map(todo => (
            // <ListItem key={todo.todoId} text={todo.content} fetchDeleteTodo={fetchDeleteTodo} completed={todo.status === "ACTIVE"} />
            <ListItem key={todo.todoId} todoId={todo.todoId} content={todo.content} status={todo.status} fetchData={fetchData}/>
          ))}
        </ul>
        <div className='todo-count'>
          {message}
        </div>
      </div>
    </>
  )
}


export default Content;