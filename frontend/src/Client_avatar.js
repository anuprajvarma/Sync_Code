import React from 'react'
import Avatar from 'react-avatar'
import './avatar.css'

const Client_avatar = ({ key, username }) => {
    return (
        <div className='clientAvatar'>
            <Avatar name={username} size={50} round="50px" />
            <span className='userName'> {username} </span>
        </div>
    )
}

export default Client_avatar
