import React from 'react'
import logo from "./images/logo.webp"
import './Editor.css'

function Editor() {
    return (
        <div >
            <div className='menu'>
                <div className="editor_heading">
                    <p> <img className="logo_editor" src={logo} alt=""></img>Sync Code</p>
                </div>
                <div>
                    <p className='user_heading'>Connected</p>
                </div>
                <div className='buttons'>
                    <div>
                        <button className='copy_room_id_botton'>Copy Room Id</button>
                    </div>
                    <div>
                        <button className='leave_botton'>Leave</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Editor
