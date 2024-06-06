import React, { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import BackButton from './BackButton';
import AlertModal from './AlertModal';
import { useNavigate } from 'react-router-dom';
import ListItem from './ListItem';
// import axios from 'axios';
import FilterButton from './FilterButton';
import AxiosInstance from './AxiosInstance';


const FILTER_NAMES = ["ALL", "ACTIVE", "COMPLETED"];

function Content() {
  const navigate = useNavigate();
  const [modalCondition, setModalCondition] = useState(false);

  const [message, setMessage] = useState("")
  const [count, setCount] = useState(Number + "개");


  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    handleMessage();
  }, [todos])

  useEffect(() => {
    fetchData();

    // console.log(todos.length)
  }, [filter]);

  const fetchData = async () => {
    // console.log("filter",filter)
    const url = `/todo?pageNumber=0&pageSize=10&status=${filter}`
    try {
      console.log("패치데이터 try문안임")
      // const response = await axios.get(url, options);
      // console.log('fetchData 성공', response)
      const response = await AxiosInstance.get(url);
      setTodos(response.data.data.todoList);

    } catch (error) {
      console.log('fetchData 함수실행 실패 에러', error)
      sessionStorage.removeItem("accessToken");
      navigate('/login')
    }
  }

  const handleMessage = () => {
    // debugger;
    if (todos.length > 0) {

      if (filter === "ALL") {
        console.log(filter, todos)
        setMessage("모든 할 일");
        setCount(`${todos.length} 개`);
        return;
      }
      if (filter === "ACTIVE") {
        setMessage("남은 할 일");
        setCount(`${todos.length} 개`);
        return;
      }
      if (filter === "COMPLETED") {
        setMessage("완료 된 일");
        setCount(`${todos.length} 개`);
        return;
      }
    } else {
      setMessage("");
      setCount("");
    }
  }

  const fetchAddTodo = async (content) => {
    // const accessToken = sessionStorage.getItem("accessToken");
    const url = `/todo`;
    const body = { content: content, status: "ACTIVE" }
    // const options = {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`
    //   }
    // }
    try {
      await AxiosInstance.post(url, body);
      //const newtodo = {...response.data.data.todoList, completed : false};
      // setTodos(prevtodos => [...prevtodos, newtodo]);
      fetchData();
      setFilter("ALL")
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
    console.log('세션스토리지',sessionStorage)
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
          {message} {count}
        </div>
      </div>
    </>
  )
}


export default Content;