import React, { useState } from 'react'
import TodoForm from './TodoForm'
import BackButton from './BackButton';
import AlertModal from './AlertModal';
import { useNavigate } from 'react-router-dom';
import ListItem from './ListItem';



function Content({ tasks, addTask, filterList, message, handleOpenModal}) {

  // 모달창 상태관리
  const navigate = useNavigate();
  const [modalCondition, setModalCondition] = useState(false);
  const [todoList, setTodoList] = useState([]);

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
          {tasks.map(task => (
            <ListItem key={task.id} text={task.content} completed={task.status === "ACTIVE"}/>
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