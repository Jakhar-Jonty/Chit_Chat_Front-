import React from 'react'
import { Link } from 'react-router-dom'


const Welcome = () => {
  return (
    <div className='max-w-screen-sm min-h-screen bg-black text-white flex flex-col justify-center items-center py-10 px-10'>
         <h1 className='font-extrabold text-5xl flex items-center justify-center italic gap-4 '>C <span className="font-normal text-lg italic ">ChitChat</span></h1>
         <h3 className='font-semibold text-4xl'>Connent friends <br /> easily & Quickly</h3>

         <div className='mt-8'>
             <Link to='/login'>
                 <button className='w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded'>Login</button>
             </Link>
             <Link to='/signup'>
                 <button className='w-full mt-4 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded'>Sign Up</button>
             </Link>
         </div>
    </div>
  )
}

export default Welcome