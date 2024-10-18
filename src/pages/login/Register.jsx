import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();

  const [userdata, setUserdata] = useState({
    username: "",
    email: "",
    password: "",
  });
  // Function to handle form input change
  const handleChange = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userdata);
    // Send user data to your backend API for registration
    axios
      .post("http://localhost:4000/register", userdata)
      .then(() => {
        alert("Registration successful");
        // Redirect to login page
        navigate("/login");
      })
      .catch((err) => {
        // error message
        alert(err?.response?.data?.message || "An unknown error occurred");
        console.log(err);
      });
  };
  return (
    <div className="p-10 bg-black text-white  flex flex-col justify-center items-center min-h-screen ">
      <h2 className="text-3xl font-semibold py-2 text-center mb-4">Register</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div>
          <label htmlFor="username" className="font-medium">
            Username
          </label>
          <input
            required
            value={userdata.username}
            onChange={handleChange}
            type="text"
            name="username"
            id="username"
            className="w-full h-8 rounded mt-2 px-2 text-black outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            required
            onChange={handleChange}
            value={userdata.email}
            type="email"
            name="email"
            id="email"
            className="w-full h-8 rounded mt-2 px-2 text-black outline-none"
          />
        </div>

        <div>
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            required
            value={userdata.password}
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            className="w-full h-8 rounded mt-2 px-2 text-black outline-none"
          />
        </div>

        <div className="mt-2">
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded mt-2 font-medium"
          >
            Sign Up
          </button>
        </div>
      </form>

      <span className="text-white mt-4">
        Already have an account?
        <Link to="/login" className="text-blue-600 mt-4 ml-1">
          Login here.
        </Link>
      </span>
    </div>
  );
};

export default Register;
