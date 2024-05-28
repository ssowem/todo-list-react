import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Join from "./components/Join";
import Content from "./components/Content";
import NonMemberContent from './components/NonMemberContent';
import InputFocusHandler from './components/InputFocusHandler';

function App() {
 
  InputFocusHandler();

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
