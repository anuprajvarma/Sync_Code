import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client'
import Client from './components/Client_avatar'
import logo from "./images/logo.webp"
import './Editor.css'

const socket = io("http://localhost:5400")


function Editor() {
    const [clients, setclients] = useState([])
    const navigate = useNavigate();
    const effectRan = useRef(false)
    const location = useLocation();
    const data = useParams();
    const roomId = data.id
    const username = location.state.username

    useEffect(() => {
        socket.emit('join_room', { roomId, username })
    }, []);

    useEffect(() => {

        socket.on("joined_user", ({ clients, username, socketId }) => {
            setclients(clients);

            if (username !== location.state.username) {
                toast.success(`${username} joined the room.`)
            }
        })
        return () => {
            socket.off("joined_user", (data) => {
                console.log(`${data.roomId}`)
            })
        }
    }, [socket])


    async function copyRoomId() {
        console.log(clients)
        try {
            await window.navigator.clipboard.writeText(roomId);
            toast.success('Room id has been copied to clipboard!')
        } catch (err) {
            toast.error(err);
        }
    }
    function leaveRoom() {
        navigate('/');
        toast.success('You leaved the Room');
    }

    return (
        <div >
            <div className='menu'>
                <div className="editor_heading">
                    <p> <img className="logo_editor" src={logo} alt=""></img>Sync Code</p>
                </div>
                <div>
                    <p className='user_heading'>Connected</p>
                </div>
                <div className='clientList'>
                    {
                        clients.map((item) => (<Client key={item.socketId} username={item.username} />))
                    }
                </div>
                <div className='buttons'>
                    <div>
                        <button className='copy_room_id_botton' onClick={copyRoomId}>Copy Room Id</button>
                    </div>
                    <div>
                        <button className='leave_botton' onClick={leaveRoom}>Leave</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Editor
