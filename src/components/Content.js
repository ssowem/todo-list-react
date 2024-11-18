import React, { useState } from 'react'
import TodoForm from './TodoForm'
import BackButton from './BackButton';
import AlertModal from './AlertModal';
import { useNavigate } from 'react-router-dom';
import ListItem from './ListItem';
import FilterButton from './FilterButton';
import AxiosInstance from './AxiosInstance';
import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const FILTER_NAMES = ["ALL", "ACTIVE", "COMPLETED"];

function Content() {
  const navigate = useNavigate();
  const queryClinet = useQueryClient();

  const [modalCondition, setModalCondition] = useState(false);

  const [message, setMessage] = useState("")
  const [count, setCount] = useState(Number(0) + "개");

  // const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("ALL");

  // const [isloading, setLoading] = useState(null);

  const fetchData = async () => {
    const url = `/todo?pageNumber=0&pageSize=10&status=${filter}`;
    const response = await AxiosInstance.get(url);
    return response.data.data.todoList;
  };

  const { data: todos = [], isLoading, error } = useQuery({
    queryKey: ['fetchData', filter],
    queryFn: fetchData,
    onError: (error) => {
      console.log('fetchData 함수 실행 실패 에러', error);
      sessionStorage.removeItem("accessToken");
      navigate('/login');
    }
  });

  const addTodo = async (content) => {
    const url = '/todo';
    const body = { content: content, status: "ACTIVE" }
    return await AxiosInstance.post(url, body);
  };

  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClinet.invalidateQueries(['fetchData']);
      setFilter("ALL");
    },
    onError: (error) => {
      console.log('할일추가 실패', error);
    }
  })

  const handleAddTodo = (content) => {
    mutation.mutate(content);
  }

  // const fetchAddTodo = async (content) => {
  //   // const accessToken = sessionStorage.getItem("accessToken");
  //   const url = `/todo`;
  //   const body = { content: content, status: "ACTIVE" }
  //   // const options = {
  //   //   headers: {
  //   //     Authorization: `Bearer ${accessToken}`
  //   //   }
  //   // }
  //   try {
  //     await AxiosInstance.post(url, body);
  //     //const newtodo = {...response.data.data.todoList, completed : false};
  //     // setTodos(prevtodos => [...prevtodos, newtodo]);
  //     fetchData();
  //     setFilter("ALL")
  //   } catch (error) {
  //     console.log('실패', error)
  //   }
  // }

  // const fetchData = async () => {
  //   const url = `/todo?pageNumber=0&pageSize=10&status=${filter}`
  //   // api 호출 전 로딩화면 띄움
  //   setLoading(true);

  //   try {
  //     const response = await AxiosInstance.get(url);
  //     setTodos(response.data.data.todoList);

   
  //   } catch (error) {
  //     console.log('fetchData 함수실행 실패 에러', error)
  //     sessionStorage.removeItem("accessToken");
  //     navigate('/login')
  //   }
  //      // api 호출 완료후 로딩화면 숨김
  //      setLoading(false);
  // }

  // 할일 갯수
  const handleMessage = () => {
    // debugger;
    if (todos.length > 0) {

      if (filter === "ALL") {
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


  if (isLoading) return <div>로딩 중</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  return (
    <>
      {/* <div>
        {isloading ? <Loading /> : null}
      </div> */}

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

        {/* <TodoForm /> */}
        <TodoForm fetchAddTodo={handleAddTodo} />
        <div className='filter-btn'>
          {/* {filterList} */}
          {FILTER_NAMES.map(filtername => (
            <FilterButton
              key={filtername}
              filtername={filtername}
              isPressed={filtername === filter}
              setFilter={setFilter}
              handleMessage={handleMessage}
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