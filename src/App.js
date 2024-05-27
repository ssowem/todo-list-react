import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Join from "./components/Join";
import Content from "./components/Content";
import NonMemberContent from './components/NonMemberContent';

// const FILTER_MAP = {
//   "ALL": () => true,
//   "ACTIVE": (todo) => !todo.completed,
//   "COMPLETED": (todo) => todo.completed,
// }

// const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  // const [filter, setFilter] = useState("ALL");

  // const filterList = FILTER_NAMES.map((text) => {
  //   return (
  //     <FilterButton
  //       key={text}
  //       text={text}
  //       isPressed={text === filter}
  //       setFilter={setFilter}
  //     />
  //   );
  // });

  // function toggletodoCompleted(id) {
  //   const updatedtodos = todos.map((todo) => {
  //     if (id === todo.id) {
  //       return { ...todo, completed: !todo.completed };
  //     }
  //     return todo;
  //   });
  //   setTodos(updatedtodos);
  // }

 

  // const message = todosCount !== 0 ? `${filterLabel} ${todosCount} 개` : "";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/Login" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Content" element={<Content />} />
        <Route path="/NonMemberContent" element={<NonMemberContent />}/>
        <Route path="/Join" element={<Join />} />
      </Routes>
    </Router>
  );
}

export default App;
