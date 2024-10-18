import React from 'react'
import logo from '../Images/LogoChitChat.png'

const AppLogo = () => {
  return (
    <div className='bg-black w-full flex flex-col items-center justify-center min-h-screen '>
        <img src={logo} alt="Chat App logo" />
        <h1 className='text-white text-3xl font-bold italic '>Chit-Chat</h1>
    </div>
  )
}

export default AppLogo