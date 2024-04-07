import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const DATA = [
  { id: "todo-0", text: "Eat", completed: true },
  { id: "todo-1", text: "Sleep", completed: false },
  { id: "todo-2", text: "Repeat", completed: false },
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App tasks={DATA}/>
);

