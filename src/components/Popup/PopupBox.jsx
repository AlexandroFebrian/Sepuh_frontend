import { Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export default function PopupBox({setPopup, setWait, popupType, popupTitle, popupMessage, popupButtonMessage, popupLink, popupSubMessage, resetForm, handleClick, setClose}) {
  const [closeBox, setCloseBox] = useState(false)
  
  function close(){
    setClose(true)
    setCloseBox(true)

    setTimeout(() => {
      setClose(false)
      
      setPopup(false)
      if(setWait){
        setWait(false)
      }
    }, 500)
    
    if(popupButtonMessage == "Sign In"){
      resetForm()
      handleClick()
    }
    if(handleClick && popupButtonMessage != "Try Again"){
      handleClick()
    }
  }

  return (
    <div className={` w-[30rem] h-fit bg-white rounded-md p-10 animate__animated ${closeBox ? "animate__fadeOut" : "animate__fadeIn"} animate__faster`}>
      <h1 className='text-center text-2xl font-semibold'>{popupTitle}</h1>

      <h2 className='text-center text-xl'>{popupMessage}</h2>

      <h3 className='text-center text-md'>{popupSubMessage}</h3>

      <div className='w-full flex justify-center items-center'>
        {
          popupType
          ?
          "Ini Gambar Centang"
          :
          "Ini Gambar Silang"
        }
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
