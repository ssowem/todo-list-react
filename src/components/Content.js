import React, { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import BackButton from './BackButton';
import AlertModal from './AlertModal';
import { useNavigate } from 'react-router-dom';
import ListItem from './ListItem';
import axios from 'axios';
import FilterButton from './FilterButton';


const FILTER_NAMES = ["ALL", "ACTIVE", "COMPLETED"];

function Content() {
  const navigate = useNavigate();
  const [modalCondition, setModalCondition] = useState(false);

  const [message, setMessage] = useState("")
  const [count, setCount] = useState("");


  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchData();
    handleMessage();
    // console.log(todos.length)
  }, [filter]);

  const handleMessage = () => {
   
    if(todos.length > 0) {
      fetchData();
      if(filter === "ALL") {
        console.log(filter,todos)

        setMessage("모든 할 일");
        setCount(todos.length);
      }
      if(filter === "ACTIVE") {
        setMessage("남은 할 일");
        setCount(todos.length);
      }
      if(filter === "COMPLETED") {
        setMessage("완료 된 일");
        setCount(todos.length);
      }
    } else {
      console.log("0개임")
    }
  }



  const fetchData = async () => {
    // console.log("filter",filter)
    const accessToken = sessionStorage.getItem("accessToken");
    const url = "https://api.todo.ssobility.me/to-do-list/api/v1/todo?pageNumber=0&pageSize=10&status=" + filter
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
      if (error.response.status == 401) {
        alert("시간이 초과되어 로그인 화면으로 이동됩니다.")
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
          {/* {filterList} */}
          {FILTER_NAMES.map(filtername => (
            <FilterButton
              key={filtername}
              filtername={filtername}
              isPressed={filtername === filter}
              setFilter={setFilter}
              // handleMessage={handleMessage}
              fetchData={fetchData}
            />
          ))}
        </div>
        <ul className='list-wrap'>
          {todos.map(todo => (
            <ListItem
              key={todo.todoId}
              todoId={todo.todoId}
              content={todo.content}
              status={todo.status}
              fetchData={fetchData}
            />
          ))}
        </ul>
        <div className='todo-count'>
          {message}{count}개
        </div>
      </div>
    </>
  )
}


export default Content;