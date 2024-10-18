import React, { useEffect, useRef, useState } from "react";
import { BiSearch, BiUser } from "react-icons/bi";
import logo from "../Images/LogoChitChat.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Homepage = () => {
    const token = localStorage.getItem("token");
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceValue, setDebounceValue] = useState("")
  const [allUser, setAllUser] = useState([])
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);


  const searchInputRef = useRef(null);
  const navigate = useNavigate();


  useEffect(()=>{
    
    // Debounce the search query
    const debounceFn = setTimeout(() => {
        if (searchQuery.length >= 3) {
            setDebounceValue(searchQuery);
            setAllUser([])
        }
        if (debounceValue){
            axios.post("http://localhost:4000/searchuser",{ searchQuery: debounceValue },{headers:{
                "Authorization":token
            }} ).then((response)=>setAllUser(response.data)).catch((error)=>console.log(error)
            )
        }
    }, 500);
    return () => clearTimeout(debounceFn);
    }, [searchQuery,debounceValue,token]);



    // Check if JWT is valid
  useEffect(() => {
    
    if (!token) {
      alert("Please login first");
      navigate("/login");
    }

    // verify the token
    axios
      .get("http://localhost:4000/chats", {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        // token is valid
      })
      .catch((err) => {
        // token is invalid
        alert("Your session has expired. Please login again.");
        navigate("/login");
      });
  }, [navigate,token]);

  useEffect(() => {
    // Function to handle clicks outside the search input
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setSearchBarVisible(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="max-w-screen-sm min-h-screen flex flex-col p-2 bg-black text-white">
      {/* top bar */}
      <div className="flex justify-between items-center p-3 relative">
        <div>
          <BiSearch
            className="h-[3vmax] w-[3vmax] cursor-pointer"
            ref={searchInputRef}
            onClick={() =>setSearchBarVisible(true)}
          />
          <input
            type="text"
            name="search"
            placeholder="Enter username"
            ref={searchInputRef}
            onChange={(e)=>setSearchQuery(e.target.value)}
            className={searchBarVisible ? "border rounded-md top-0 h-10 left-0 px-2 absolute w-full text-black" : "hidden"}
          />
        </div>
        <div className="h-[4vmax] flex justify-center items-center">
          <img src={logo} alt="logo" className="h-full object-contain" />
        </div>
        <div className="bg-white rounded-full text-black p-1">
          <BiUser className="h-[3vmax] w-[3vmax]" />
        </div>
      </div>

      {/* chat list */}
      <div className="bg-gray-400 p-2 rounded-lg flex flex-col items-center gap-2 flex-1">
        {
           allUser.length > 0 && allUser.map((user) => (
              <div
                key={user}
                onClick={() => navigate(`/chat/${user}`)}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-300"
              >
                <p>{user}</p>
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default Homepage;








// <div className="w-full flex items-center p-2 text-sm bg-white rounded-lg text-black">
//           <div className="p-2 rounded-full flex justify-center items-center bg-green-400">
//             <BiUser className="h-[5vmax] w-[5vmax]" />
//           </div>
//           <div className="ml-2">
//             <h3 className="font-semibold">User Name</h3>
//             <p>Last message: kya haal chal</p>
//           </div>
//           <div className="ml-auto text-right">
//             <p>2:30 PM</p>
//             <div className="bg-red-500 rounded-full p-1 justify-center items-center flex text-white font-semibold">
//               2
//             </div>
//           </div>
//         </div>

//         <div className="w-full flex items-center p-2 text-sm bg-white rounded-lg text-black">
//           <div className="p-2 rounded-full flex justify-center items-center bg-green-400">
//             <BiUser className="h-[5vmax] w-[5vmax]" />
//           </div>
//           <div className="ml-2">
//             <h3 className="font-semibold">User Name</h3>
//             <p>Last message: kya haal chal</p>
//           </div>
//           <div className="ml-auto text-right">
//             <p>2:30 PM</p>
//             <div className="bg-red-500 rounded-full p-1 justify-center items-center flex text-white font-semibold">
//               2
//             </div>
//           </div>
//         </div>