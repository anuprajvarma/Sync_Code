import React from "react";
import './App.css'

function App() {

  return (
    <>
      <div className="container">
        <div className="boxes">
          <div>
            <input type='text' className="room_id" placeholder="Room Id" />
          </div>
          <div>
            <input type='text' className="username" placeholder="Username" />
          </div>
          <button type='submit' className="Join_botton">Join</button>
          <p>If you don't have invite then create <span className="new_room">new room</span></p>
        </div>
      </div>
    </>
  );
}

export default App;
