import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");
const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  useEffect(() => {
    socket.on("message", (msg) => {
      setAllMessages([...allMessages, msg]);
    });
  });
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const sendMessage = () => {
    console.log(message);
    
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div className="min-h-screen p-20">
      <h1 className="text-3xl text-red-400">Chat App</h1>

      <div className="w-2/6 h-2/6 border bg-blue-300">{allMessages}</div>
      <input
        onChange={handleChange}
        type="text"
        className="border-2 p-1"
        placeholder="Enter your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};
export default ChatApp;
