import React from 'react'
import { Link } from 'react-router-dom'

export const ResetPassword = () => {
  return (
    <div className="p-20 bg-[#e9f3f9] flex justify-center items-center ">
    <div className="w-2/5 ">
      <h2 className="text-xl font-semibold py-2 text-center">Forgot Password</h2>
      
      <form action="" >

          <div>
              <label htmlFor="email" className="font-medium">Mail or Username</label>
              <input type="text" name="" id="email" className="w-full h-8 rounded mt-2 outline-none" />
          </div>
          
          <div className="mt-2">
              <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded mt-2 font-medium">Send</button>
          </div>
      </form>
      <div className='flex justify-center mt-4'>
        <Link to="/login" className="text-blue-600 hover:text-blue-800">Back to Login</Link>
      </div>
    </div>
    
  </div>
  )
}
