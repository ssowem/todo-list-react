import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Join from "./components/Join";
import Content from "./components/Content";
import FilterButton from './components/FilterButton';

const FILTER_MAP = {
  "ALL": () => true,
  "ACTIVE": (todo) => !todo.completed,
  "COMPLETED": (todo) => todo.completed,
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const [filter, setFilter] = useState("ALL");

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

  // function toggletodoCompleted(id) {
  //   const updatedtodos = todos.map((todo) => {
  //     if (id === todo.id) {
  //       return { ...todo, completed: !todo.completed };
  //     }
  //     return todo;
  //   });
  //   setTodos(updatedtodos);
  // }

  // function edittodo(id, newText) {
  //   debugger;
  //   const editedtodoList = todos.map((todo) => {
  //     if (id === todo.id) {
  //       return { ...todo, text: newText };
  //     }
  //     return todo;
  //   });
  //   setTodos(editedtodoList);
  // }

  // function deletetodo(id) {
  //   // todos에서 각 리스트별 고유 id와 삭제할 id를 비교해서
  //   // 일치하지 않는 할일을 제외한 모든 할일들을 새로운 배열로 만든다
  //   const remainingtodos = todos.filter((todo) => id !== todo.id);
  //   setTodos(remainingtodos);
  // }

  // const todosCount = todos.filter(FILTER_MAP[filter]).length;
  // let filterLabel = "";
  // switch (filter) {
  //   case "모두 보기":
  //     filterLabel = '모든 할 일';
  //     break;
  //   case "남은 할 일":
  //     filterLabel = '남은 할 일';
  //     break;
  //   case "완료 된 일":
  //     filterLabel = '완료된 일';
  //     break;
  //   default:
  //     break;
  // }

  // const message = todosCount !== 0 ? `${filterLabel} ${todosCount} 개` : "";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/Login" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Content" element={<Content filterList={filterList} />} />
        <Route path="/Join" element={<Join />} />
      </Routes>
    </Router>
  );
}

export default App;
