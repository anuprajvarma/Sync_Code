import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import './Home.css'
import Editor from "./Editor";
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <div>
        <Toaster position='top-center' toastOptions={{
          success: {
            theme: {
              primary: '#4aed88',
            }
          }
        }} ></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/editor/:id" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
