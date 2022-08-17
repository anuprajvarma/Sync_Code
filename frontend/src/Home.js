import React, { useState } from 'react'
import Socket from "socket.io-client";
import logo from "./images/logo.webp"
import './Home.css'
import { useNavigate } from 'react-router-dom';


const socket = Socket.connect("http://localhost:5400")

function Home() {
    const [roomId, setRoomId] = useState("");
    const [username, setUserName] = useState("");
    const navigate = useNavigate();

    const randomNumber = () => {
        const value = Math.random().toString(36).slice(2, 7);
        console.log(value)
        setRoomId(value)
    }

    const joinRoomHandle = () => {
        if (roomId !== "" && username !== "") {
            socket.emit("join_room", roomId)
            navigate("/editor")
        }
    }

    const roomIdhandle = (e) => {
        const value = e.target.value;
        setRoomId(value)
    }

    const userNamehandle = (e) => {
        console.log(e.target.value)
        setUserName(e.target.value)
    }

    return (
        <>
            <div className="container">
                <div className="boxes">
                    <div>
                        <p className="app-heading"> <img className="image" src={logo} alt=""></img>Sync Code</p>
                        <p className="paragraph3">Paste Invitation Room ID</p>
                    </div>
                    <div className="room_id">
                        <input type='text' className="input-box" value={roomId} onChange={roomIdhandle} placeholder="Room Id" />
                    </div>
                    <div className="username">
                        <input type='text' className="input-box" value={username} onChange={userNamehandle} placeholder="Username" />
                    </div>
                    <button type='submit' className="Join_botton" onClick={joinRoomHandle}>Join</button>
                    <p className="paragraph1">If you don't have invite then create <span onClick={randomNumber} className="new_room">new room</span></p>
                </div>
            </div>
            <div className="footer">
                <p className="paragraph2">Build With Love <span className="github_link">Anupraj</span></p>
            </div>
        </>
    )
}

export default Home
