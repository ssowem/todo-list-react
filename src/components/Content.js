import React, { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import BackButton from './BackButton';
import AlertModal from './AlertModal';
import { useNavigate } from 'react-router-dom';
import ListItem from './ListItem';
import axios from 'axios';
import FilterButton from './FilterButton';


const FILTER_NAMES = ["ALL","ACTIVE","COMPLETED"];

function Content({ message }) {
  // 모달창 상태관리
  const navigate = useNavigate();
  const [modalCondition, setModalCondition] = useState(false);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    // console.log("filter",filter)
    const accessToken = sessionStorage.getItem("accessToken");
    const url = "https://api.todo.ssobility.me/to-do-list/api/v1/todo?pageNumber=0&pageSize=10&status="+filter
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    try {
      const response = await axios.get(url, options);
      // console.log('fetchData 성공', response)
      setTodos(response.data.data.todoList);
    } catch (error) {
      console.log('fetchData 함수실행 실패 에러', error)
      if (error.response.status === 401) {
        alert("토큰이 유효하지 않습니다. 다시 로그인 해주세요.")
        sessionStorage.removeItem("accessToken");
        navigate('/login')
      }
    }
  }

  const fetchAddTodo = async (content) => {
    const accessToken = sessionStorage.getItem("accessToken");
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
    sessionStorage.removeItem("accessToken");
    navigate('/login');

  }

  // 모달창 취소 
  const handleCloseModal = () => {
    setModalCondition(false);
  };


  const filterList = FILTER_NAMES.map((text) => {
    return (
      <FilterButton
        key={text}
        text={text}
        isPressed={text === filter}
        setFilter={setFilter}
      />
    );
  });
  // console.log('filter',filter)

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
            // <ListItem key={todo.todoId} text={todo.content} deleteTodo={deleteTodo} completed={todo.status === "ACTIVE"} />
            <ListItem key={todo.todoId} todoId={todo.todoId} content={todo.content} status={todo.status} fetchData={fetchData} />
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