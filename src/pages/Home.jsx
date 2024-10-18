import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);  // To track loading state
  const [error, setError] = useState(null);  // To track error state

  // Debounce logic to delay search input
  useEffect(() => {
    const debounceFn = setTimeout(() => {
      if (inputValue.length >= 3) setDebounceValue(inputValue);
    }, 1000);

    return () => clearTimeout(debounceFn);
  }, [inputValue]);

  // API call to search users
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (debounceValue) {
      const searchHandle = async () => {
        setLoading(true);   // Set loading to true before making API call
        setError(null);     // Clear any previous errors

        try {
          const res = await axios.post(
            "http://localhost:4000/searchuser",
            { searchQuery: debounceValue },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );

          setSearchResult(res.data);  // Set the search result with the received data
        } catch (err) {
          // Handle errors by setting error state
          if (err.response) {
            // The request was made, and the server responded with a status code outside the 2xx range
            setError(` ${err.response.data.message}`);
          } else if (err.request) {
            // The request was made but no response was received
            setError("Network error: No response from server");
          } else {
            // Something happened in setting up the request
            setError("Error: Unable to search users");
          }
          setSearchResult([]);  // Clear the search result if there's an error
        } finally {
          setLoading(false);   // Set loading to false once the request is complete
        }
      };

      searchHandle();
    }
  }, [debounceValue,navigate]);

  // Input change handler
  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };


  // chat handler 

  const chatWithUser = (user) => {
    // Navigate to the chat page and pass the selected user as state
    navigate("/chatwithfriend", { state: { user } });
  };


  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl font-semibold">Chit Chat</h1>
      <form
        action=""
        className="flex flex-col gap-2 justify-center items-center"
        onSubmit={(e) => e.preventDefault()}  // Prevent form submission on button click
      >
        <label htmlFor="search">Search New Friends:</label>
        <div className="flex justify-center items-center gap-2">
          <input
            onChange={changeHandler}
            type="text"
            id="search"
            name="search"
            className="border-orange-500 border-2 rounded outline-none px-2"
          />
          <button
            type="submit"
            className="p-1 px-4 rounded hover:bg-blue-900 bg-blue-600 text-white font-semibold "
          >
            Search
          </button>
        </div>
      </form>

      {/* Show loading spinner or message */}
      {loading && <p>Loading...</p>}

      {/* Show error message if an error occurs */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Show search results if available */}
      {!loading && !error && searchResult.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold">Search Results:</h2>
          <ul>
            {searchResult.map((user) => (
              <li
              className="px-3 py-1 border text-center hover:bg-blue-600 hover:text-white"
              onClick={()=>chatWithUser(user)}
              key={user}>{user}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Show message if no users are found */}
      {!loading && !error && searchResult.length === 0 && (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Home;
