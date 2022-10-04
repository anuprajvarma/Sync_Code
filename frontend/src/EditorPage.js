import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { initSocket } from './socket'
import Client from './components/Client_avatar'
import logo from "./images/logo.webp"
import Editor from './components/Editor';
import './EditorPage.css'


function EditorPage() {
    const socketRef = useRef(null)
    const navigate = useNavigate();
    const codeRef = useRef(null);
    const location = useLocation();
    const data = useParams();
    const roomId = data.id
    const username = location.state.username
    const [clients, setclients] = useState([]);

    useEffect(() => {

        const init = async () =>{
            socketRef.current = await initSocket();

            socketRef.current.emit('join_room', { roomId, username })

            socketRef.current.on("joined_user", ({ clients, username, socketId }) => {
            if (username !== location.state.username) {
                toast.success(`${username} joined the room.`)
            }
            setclients(clients);

            socketRef.current.emit('sync_code',{
                code: codeRef.current,
                socketId,
            })
        })

        socketRef.current.on('disconnected', ({ socketId, username }) => {
            toast.success(`${username} left the room`);
            setclients((prev) => {
                return prev.filter(
                    (clients) => clients.socketId !== socketId
                )
            })
        })
        }
        init();
        return () => {
            socketRef.current.disconnect();
            socketRef.current.off("disconnected")
            socketRef.current.off("joined_user")
        }
    }, [])


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
        <div className='mainWrap'>
            <div className='aside'>
                <div className='asideInner'>
                    <div className="logo">
                        <img className="logoImage" src={logo} alt="" />
                    </div>
                    <h3>Connected</h3>
                    <div className='clientList'>
                        {
                            clients.map((item) => (<Client key={item.socketId} username={item.username} />))
                        }
                    </div>
                </div>
                <div className='buttons'>
                    <button className='btn copyBtn' onClick={copyRoomId}>Copy Room Id</button>
                    <button className='btn leaveBtn' onClick={leaveRoom}>Leave</button>
                </div>
            </div>

            <div className='editorWrap'>
                <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code)=>{codeRef.current=code}}/>
            </div>
        </div>
    )
}

export default EditorPage
