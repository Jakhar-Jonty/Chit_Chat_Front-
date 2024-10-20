import React, { useEffect, useState } from "react";
import { BiArrowBack, BiUser } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
const socket = io("http://localhost:4000");

const Chatbox = () => {
  const navigate = useNavigate();
  const [fullChat, setFullChat] = useState([]);
  const [receiver, setReceiver] = useState();
  const [sender, setSender] = useState();
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState("")
  // const [messageDetails, setMessageDetails] = useState("");
  const token = localStorage.getItem("token");
  const { user } = useParams();

  

  useEffect(() => {
  
    //fatching user data and chat messages
    const userChat = () => {
      axios
        .get(`http://localhost:4000/chat/${user}`, {
          headers: { authorization: token },
        })
        .then((response) => {
          console.log(response.data);
          setFullChat(response.data?.allMessages);
          setSender(response.data?.senderUser);
          setReceiver(response.data?.receiverUser);
        })
        .catch((error) => {
          console.log(error.status);
          if (error.status === 401) {
            alert("Please log in first");
            localStorage.setItem("token", "");
            navigate("/login");
          }
        });
    };
    userChat();
  }, [user, token, navigate]);

  useEffect(() => {
    // Join the room for this user (senderId)
 
    
    socket.emit("joinRoom", sender?._id);

    // Listen for incoming "message" events for this specific room
    socket.on("message", (message) => {
      console.log("New message received:", message);
      setFullChat((prevFullChat) => [...prevFullChat, message]);
    },[chatId]);

    // Clean up the socket listener when the component is unmounted
    return () => {
      socket.off("message");
    };
  }, [receiver]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:4000/chat/${user}`,
        { message },
        {
          headers: { authorization: token },
        }
      );

      const messageDetails = response.data;
      setFullChat((prevFullChat) => [...prevFullChat, messageDetails]);
      setChatId(messageDetails.chat._Id)
      socket.emit("message", messageDetails);
      setMessage(""); // Clear the input after sending the message
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        alert("Please log in first");
        localStorage.setItem("token", "");
        navigate("/login");
      }
    }
  };

  return (
    <div className="max-w-screen-sm min-h-svh bg-gray-400 text-white flex flex-col relative">
      <div className="flex z-10 p-2 items-center bg-black rounded-b-md sticky top-0">
        <Link to="/home">
          <BiArrowBack className="h-[3vmax] w-[3vmax]" />
        </Link>
        <div className="h-[5vmax] w-[5vmax] rounded-full p-1 ">
          <img
            src={sender?.picture}
            alt="dp"
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col justify-between ml-4">
          <h2 className="font-semibold">{user}</h2>
          <p className="text-sm">Active 5 minutes ago</p>
        </div>
        <BsThreeDots className="ml-auto size-6" />
      </div>
      <div className="bg-gray-400 flex-1 flex flex-col relative rounded-t-md p-2 gap-4 pb-16">
        {/* chat messages */}
        {fullChat.length > 0 &&
          fullChat.map((message) => (
            <>
              {message.senderId !== sender._id ? (
                <div
                  key={message._id}
                  className="flex gap-4 items-center border-2 bg-lime-400 rounded-xl p-2 w-4/5"
                >
                  <div className="p-1 flex justify-center items-center bg-green-400 rounded-full">
                    {sender.picture ? (
                      <div className="h-[5vmax] w-[5vmax] rounded-full p-1 ">
                        <img
                          src={sender.picture}
                          alt="dp"
                          className="h-full w-full object-cover rounded-full"
                        />
                      </div>
                    ) : (
                      <BiUser className="h-[4vmax] w-[4vmax]" />
                    )}
                  </div>
                  <p className="text-gray-800">{message.message}</p>
                </div>
              ) : (
                <div
                  key={message._id}
                  className=" flex justify-end items-center  border-2 p-2 w-4/5 rounded-xl gap-4 bg-blue-400 place-self-end"
                >
                  <p className="text-gray-800">{message.message}</p>
                  <div className="p-1 flex justify-center items-center bg-green-400 rounded-full">
                    {receiver.picture ? (
                      <div className="h-[5vmax] w-[5vmax] rounded-full p-1 ">
                        <img
                          src={receiver.picture}
                          alt="dp"
                          className="h-full w-full object-cover rounded-full"
                        />
                      </div>
                    ) : (
                      <BiUser className="h-[4vmax] w-[4vmax]" />
                    )}
                  </div>
                </div>
              )}
            </>
          ))}
      </div>

      <div className=" bg-gray-400 sticky bottom-0 gap-2 p-2 ">
        {/* input field */}
        <form onSubmit={sendMessageHandler} action="" className="flex w-full">
          <input
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            name="message"
            id="message"
            type="text"
            value={message}
            className="w-full p-2 border-none outline-none text-gray-800 rounded-full"
          />
          <button
            type="submit"
            className="px-3 py-2 text-white bg-blue-500 font-semibold rounded-full"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
