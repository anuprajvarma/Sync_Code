import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Client from './Client_avatar'
import { io } from 'socket.io-client'
import logo from "./images/logo.webp"
import './Editor.css'

const socket = io("http://localhost:5400")


function Editor() {
    const [clients, setclients] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const data = useParams();
    const roomId = data.id
    const username = location.state.username

    useEffect(() => {
        const init = () => {
            socket.on("connect_error", (err) => {
                handleerror(err);
            })
            socket.on("connect_failed", (err) => {
                handleerror(err);
            })
            function handleerror(err) {
                toast.error('Socket connection failed, try again!')
                navigate('/');
            }
            socket.emit('join_room', { roomId, username })

            socket.on("joined_user", ({ clients, username, socketId }) => {
                console.log(username + "  " + location.state.username);
                if (username !== location.state.username) {
                    setclients(clients);
                    toast.success(`${username} joined the room.`)
                }
            });
        };
        init();
    }, []);
    async function copyRoomId() {
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
