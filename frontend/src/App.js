import React from "react";
import Socket from "socket.io-client";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import './App.css'
import Editor from "./Editor";

const socket = Socket.connect("http://localhost:5400")

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/editor" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
