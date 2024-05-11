import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; import { nanoid } from "nanoid";
import Login from './components/Login';
import Join from "./components/Join";
import Content from "./components/Content";
import FilterButton from './components/FilterButton';
import ListItem from './components/ListItem';

const FILTER_MAP = {
  "모두 보기": () => true,
  "남은 할 일": (task) => !task.completed,
  "완료 된 일": (task) => task.completed,
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filter, setFilter] = useState("모두 보기");
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


  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);

  }

  const taskList = tasks
    .filter(FILTER_MAP[filter]) // 선택된 필터링조건을 만족하는(true) 할일들만 새롭게 반환 
    .map((task) => ( //필터링된 할일 목록을 taskList 변수에 저장한다
      <ListItem
        id={task.id}
        text={task.text}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
        filter={filter}
      />
    ));

  function addTask(text) {
    // text(문자열)을 객체배열로 setTask로 전달하기위해
    // newTask 객체를 만들어 배열에 추가한다. 
    const newTask = { id: `todo-${nanoid()}`, text, completed: false };
    // 전개구문으로 기존배열을 복사후 끝에 객체를 추가하고 setTasks()에 전달
    setTasks([...tasks, newTask]);
  }

  function editTask(id, newText) {
    debugger;
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, text: newText };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function deleteTask(id) {
    // tasks에서 각 리스트별 고유 id와 삭제할 id를 비교해서
    // 일치하지 않는 할일을 제외한 모든 할일들을 새로운 배열로 만든다
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const tasksCount = tasks.filter(FILTER_MAP[filter]).length;
  let filterLabel = "";
  switch (filter) {
    case "모두 보기":
      filterLabel = '모든 할 일';
      break;
    case "남은 할 일":
      filterLabel = '남은 할 일';
      break;
    case "완료 된 일":
      filterLabel = '완료된 일';
      break;
    default:
      break;
  }

  const message = tasksCount !== 0 ? `${filterLabel} ${tasksCount} 개` : "";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/Login" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Content" element={<Content addTask={addTask} message={message} taskList={taskList} filterList={filterList} />} />
        <Route path="/Join" element={<Join />} />
      </Routes>
    </Router>
  );
}

export default App;
