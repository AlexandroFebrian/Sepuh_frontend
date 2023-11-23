import React, { useEffect, useState } from 'react'
import {CircularProgress} from '@chakra-ui/react'
import PopupBox from './PopupBox'

export default function Popup({wait, popup, setPopup, setWait, popupType, popupTitle, popupMessage, popupSubMessage, popupButtonMessage, popupLink, resetForm, handleClick}) {
  const [close, setClose] = useState(false)

  return (
    <>
      {
        wait
        &&
        <>
          <div className={`absolute w-[100%] h-[100%] bg-black/30 z-20 animate__animated ${close ? "animate__fadeOut" : "animate__fadeIn"} animate__faster`} />
          <div className='absolute w-[100%] h-[100%] z-30 flex items-center justify-center'>
            {
              popup
              ?
              <PopupBox setPopup={setPopup} setWait={setWait} popupType={popupType} popupTitle={popupTitle} popupMessage={popupMessage} popupSubMessage={popupSubMessage} popupButtonMessage={popupButtonMessage} resetForm={resetForm} popupLink={popupLink} handleClick={handleClick} setClose={setClose}/>
              :
              <CircularProgress 
              isIndeterminate 
              color='navyblue.800'
              size={"7rem"}
              />
            }
          </div>
        </>
      } 
    </>
  )
}
