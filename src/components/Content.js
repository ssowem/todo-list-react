import React, { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import axios from 'axios';
import BackButton from './BackButton';
import AlertModal from './AlertModal';
import { useNavigate } from 'react-router-dom';

function Content({ addTask, filterList, taskList, message, handleOpenModal, isOpen, onCancel, onConfirm }) {
  const [content, setContent] = useState(null);
  // 모달창 상태관리
  const navigate = useNavigate();
  const [modalCondition, setModalCondition] = useState(false);

    // BackButton 클릭시 모달창 띄우기
    function handleOpenModal() {
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

    
  useEffect(() => {
    fetchData();
  }, [])

  const accessToken = localStorage.getItem("accessToken");

  const fetchData = async () => {
    const url = "https://api.todo.ssobility.me/to-do-list/api/v1/todo?pageNumber=0&pageSize=10&status=ACTIVE"
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }
    try {
      const response = await axios.get(url, options)
      console.log("성공", response)
      setContent(response.data.content)
    } catch (error) {
      console.log("실패", error);
    }
  }
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
        <TodoForm addTask={addTask} />
        <div className='filter-btn'>
          {filterList}
        </div>
        <ul className='list-wrap'>
          {taskList}
        </ul>
        <div className='todo-count'>
          {message}
        </div>
      </div>
    </>
  )
}


export default Content;