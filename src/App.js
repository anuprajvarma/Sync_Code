import React from "react";
import logo from "./images/logo.webp"
import './App.css'

function App() {

  return (
    <>
      <div className="container">
        <div className="boxes">
          <div>
            <p className="app-heading"> <img className="image" src={logo} alt=""></img>Sync Code</p>
            <p className="paragraph3">Paste Invitation Room ID</p>
          </div>
          <div className="room_id">
            <input type='text' className="input-box" placeholder="Room Id" />
          </div>
          <div className="username">
            <input type='text' className="input-box" placeholder="Username" />
          </div>
          <button type='submit' className="Join_botton">Join</button>
          <p className="paragraph1">If you don't have invite then create <span className="new_room">new room</span></p>
        </div>
      </div>
      <div className="footer">
        <p className="paragraph2">Build With Love <span className="github_link">Anupraj</span></p>
      </div>
    </>
  );
}

export default App;
