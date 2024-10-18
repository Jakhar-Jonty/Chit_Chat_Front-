import axios from "axios";
import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const [logindata,setLogindata] = useState({email:"",password:""})
    const navigate = useNavigate()
        const handleChange = (e) => {
            setLogindata({...logindata,[e.target.name]:e.target.value})
        }
        
        const handleSubmit = (e) => {
            e.preventDefault()
            // call your API here to authenticate user
            axios.post('http://localhost:4000/login',logindata).then((res)=>{
                console.log(res)
                const {token} = res.data
                localStorage.setItem("token",token)
                alert(res?.data?.message || "welcome to Chit Chat")
                // redirect to dashboard page
                navigate("/home")
            }).catch((err)=>{
                console.log(err);
                alert(err.message || "Something went wrong")

            })
        }
  return (
    <div className="max-w-screen-sm min-h-screen bg-black text-white flex flex-col justify-center items-center ">
      
        <h2 className="text-3xl font-semibold py-2 text-center mb-4">Log In</h2>
        
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className="font-medium">Mail or Username</label>
                <input 
                required
                // value={logindata.email}
                onChange={handleChange}
                type="email" name="email" id="email" className="w-full h-8 rounded mt-2 text-black outline-none" />
            </div>

            <div className="mt-4">
                <label htmlFor="password" className="font-medium">Password</label>
                <input 
                required
                // value={logindata.password}
                onChange={handleChange}
                type="password" name="password" id="password" className="w-full h-8 text-black rounded mt-2 outline-none" />
            </div>
            
            <div className="mt-4">
            <button type="submit" className='w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded'>Login</button>
            </div>
        </form>
        <p className="text-center mt-4">Forgot Password? <Link to="/resetpassword" className="text-blue-600">Reset Password</Link></p>
        <p className="text-center mt-4">Don't have an account? <Link to="/register" className="text-blue-600">Register</Link></p>

      
      
    </div>
  );
};
