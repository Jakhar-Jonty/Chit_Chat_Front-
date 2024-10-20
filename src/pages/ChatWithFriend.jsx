import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import io from "socket.io-client";

const socket = io("http://localhost:4000");

export const ChatWithFriend = () => {
    const location = useLocation() 
    const {user} = location.state

    const [message,setMessage] = useState('')
    const [allMessages,setAllMessages] = useState([]);

    useEffect(() => {
      socket.on('receive_message', (data) => {
        setAllMessages( [...allMessages, data]);
      });})

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit("message", message, () => setMessage(''));
    }
    
    socket.on("newMessage", (msg) => {
        setMessage([...allMessages, msg]);
    });
    
  return (
    <div>
        <h2 className='text-3xl'>{user}</h2>
        <div>
           { allMessages.map((msg,index)=>{
              return <p key={index}>{msg}</p>
            })}
        </div>
      <input 
      onChange={(e)=>setMessage(e.target.value)}
      type="text" placeholder="Type your message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  )

}