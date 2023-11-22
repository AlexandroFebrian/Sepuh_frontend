import { Button } from '@chakra-ui/react'
import React from 'react'

export default function Popup({setPopup, setWait, popupType, popupTitle, popupMessage, popupButtonMessage, popupLink, resetSignUp,handleClick}) {
  function close(){
    setPopup(false)
    if(setWait){
      setWait(false)
    }
    if(popupButtonMessage == "Sign In"){
      resetSignUp()
      handleClick()
    }
  }

  return (
    <div className=' w-[30rem] h-fit bg-white rounded-md p-10 animate__animated animate__fadeIn animate__faster'>
      <h1 className='text-center text-2xl font-semibold'>{popupTitle}</h1>

      {
        popupMessage
        &&
        <h2 className='text-center text-xl'>{popupMessage}</h2>
      }

      {
        popupLink
        &&
        // <div className='w-full flex justify-center'>
          
        //   <p className='text-center'>
        //   <a href={popupLink} target='_blank' className=' underline text-indigo-300 hover:text-indigo-400 cursor-pointer'>Click here to verify</a> or open your email address
        //   </p>

        // </div>
        <div className='w-full flex justify-center'>
          
          <p className='text-center'>
            Open your email address to verify your account
          </p>

        </div>
      }

      <div className='w-full flex justify-center items-center'>
        INI GIF
      </div>

      <div className='w-full flex justify-center'>
        <Button
          color="navyblue.800"
          borderColor="navyblue.800"
          borderWidth="2px"
          _hover={{ bg: "ghostwhite.50" }}
          _active={{ bg: "ghostwhite.100" }}
          variant="outline"
          width="10rem"
          height={"2rem"}
          transitionDuration={"300ms"}
          marginTop={"0.5rem"}
          rounded={"md"}
          onClick={() => {close()}}
        >
          {popupButtonMessage}
        </Button>

      </div>
    </div>
  )
}
