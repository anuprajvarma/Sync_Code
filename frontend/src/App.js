import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import './Home.css'
import Editor from "./Editor";

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
