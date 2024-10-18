import React, { useEffect } from "react";
import { BiArrowBack, BiUser } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const Chatbox = () => {
const token = localStorage.getItem("token")
  const { user } = useParams();
  console.log(user);

  useEffect(()=>{
    //fatching user data and chat messages
    const userChat  = ()=>{
        axios.get(`http://localhost:4000/chat/${user}`,{headers:{'authorization':token}}).then((response)=>{
            console.log(response.data)
        }).catch((error)=>{
            console.log(error);
        })
    }
    userChat();
  },[user,token])

  const allMessages = [
    "hey",
    "helo",
    "how are you doing",
    "i'm doing fine what about you, how are you doing",
    "hey",
    "helo",
    "how are you doing",
    "i'm doing fine what about you, how are you doing",
    "hey",
    "helo",
    "how are you doing",
    "i'm doing fine what about you, how are you doing",
  ];
  return (
    <div className="max-w-screen-sm min-h-svh bg-gray-400 text-white flex flex-col relative">
      <div className="flex z-10 p-2 items-center bg-black rounded-b-md sticky top-0">
        <Link to="/home">
          <BiArrowBack className="h-[3vmax] w-[3vmax]" />
        </Link>
        <div className="bg-white text-black p-1 flex justify-center items-center rounded-full ml-4">
          <BiUser className="h-[4vmax] w-[4vmax]" />
        </div>
        <div className="flex flex-col justify-between ml-4">
          <h2 className="font-semibold">{user}</h2>
          <p className="text-sm">Active 5 minutes ago</p>
        </div>
        <BsThreeDots className="ml-auto size-6" />
      </div>
      <div className="bg-gray-400 flex-1 flex flex-col relative rounded-t-md p-2 gap-4 pb-16">
        {/* chat messages */}
        {allMessages.map((message, index) => (
          <>
            {index % 2 === 0 ? (
              <div
                key={index}
                className="flex gap-4 items-center border-2 bg-lime-400 rounded-xl p-2 w-4/5"
              >
                <div className="p-1 flex justify-center items-center bg-green-400 rounded-full">
                  <BiUser className="h-[4vmax] w-[4vmax]" />
                </div>
                <p className="text-gray-800">{message}</p>
              </div>
            ) : (
              <div
                key={index}
                className=" flex justify-end items-center  border-2 p-2 w-4/5 rounded-xl gap-4 bg-blue-400 place-self-end"
              >
                <p className="text-gray-800">{message}</p>
                <div className="p-1 flex justify-center items-center bg-green-400 rounded-full">
                  <BiUser className="h-[4vmax] w-[4vmax]" />
                </div>
              </div>
            )}
          </>
        ))}
      </div>

      <div className="flex w-full bg-gray-400 sticky bottom-0 gap-2 p-2 ">
        {/* input field */}
        <input
          type="text"
          className="w-full p-2 border-none outline-none text-gray-800 rounded-full"
        />
        <button className="px-3 py-2 text-white bg-blue-500 font-semibold rounded-full">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
