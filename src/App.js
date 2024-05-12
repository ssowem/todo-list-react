import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; import { nanoid } from "nanoid";
import Login from './components/Login';
import Join from "./components/Join";
import Content from "./components/Content";
import FilterButton from './components/FilterButton';
import ListItem from './components/ListItem';
import axios from 'axios';

const FILTER_MAP = {
  "ALL": () => true,
  "ACTIVE": (task) => !task.completed,
  "COMPLETED": (task) => task.completed,
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const url = "https://api.todo.ssobility.me/to-do-list/api/v1/todo?pageNumber=0&pageSize=10&status=ACTIVE"
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    try {
      const response = await axios.get(url, options);
      console.log('성공', response)
      const tasksId = response.data.data.todoList.map(task => ({
        ...task,
        id: task.todoId
      }));
      setTasks(tasksId);
    } catch (error) {
      console.log('실패', error)
    }
  }

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

  const addTask = async (text) => {
    const accessToken = localStorage.getItem("accessToken");
    const url = "https://api.todo.ssobility.me/to-do-list/api/v1/todo?pageNumber=0&pageSize=10&status=ACTIVE"
    const body = { content: text, status: "ACTIVE", todoId: "todoId"}
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    try {
      const response = await axios.post(url, body, options);
      console.log('성공', response)
    } catch (error) {
      console.log('실패', error)
     }
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
        <Route path="/Content" element={<Content tasks={tasks} addTask={addTask} filterList={filterList}/>} />
        <Route path="/Join" element={<Join />} />
      </Routes>
    </Router>
  );
}

export default App;
