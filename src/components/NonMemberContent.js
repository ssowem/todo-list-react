import React, { useState } from 'react'
import TodoForm from './TodoForm'
import BackButton from './BackButton';
import AlertModal from './AlertModal';
import ListItem from './ListItem';
import { useNavigate } from 'react-router-dom';
import FilterButton from './FilterButton';

function NonMemberContent({ filterList }) {
  const navigate = useNavigate();
  const [modalCondition, setModalCondition] = useState(false);
  const [todos, setTodos] = useState([]);

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
        <TodoForm />
        <div className='filter-btn'>
          <FilterButton />
        </div>
        <ul className='list-wrap'>
          <ListItem />
        </ul>
        <div className='todo-count'>
          {/* {message} */}
        </div>
      </div>
    </>
  )
}

export default NonMemberContent;