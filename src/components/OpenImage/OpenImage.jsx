import React, { useState } from 'react'
import Carousel from '../Carousel/Carousel'
import { FaX } from "react-icons/fa6";

export default function OpenImage({className, photos, setOpen, imageIdx, setImageIdx, style}) {
  const [close, setClose] = useState(false)

  function handleClose() {
    setClose(true)
    setTimeout(() => {
      setImageIdx(-1)
      setClose(false)
      setOpen(false)
    }, 500);
  }
  
  return (
    <>
      <div className={`absolute w-[100%] h-[100%] bg-black/30 z-20 animate__animated ${close ? "animate__fadeOut" : "animate__fadeIn"} animate__faster ${className}`}  style={style}>
      </div>
      
      <div className={`absolute w-[100%] h-[100%] z-30 flex items-center justify-center p-20 animate__animated ${close ? "animate__fadeOut" : "animate__fadeIn"} animate__faster ${className}`} style={style}>
        <div className='w-full h-full relative'>
          <Carousel photos={photos} className="h-full w-full" imageIdx={imageIdx} />
        </div>
        <button className='absolute top-20 right-10 cursor-pointer w-10 h-10 bg-white/30 hover:bg-white/50 p-1 rounded transition-colors duration-300 ' onClick={() => {handleClose()}}>
          <FaX className='text-black' size={"100%"}/>
        </button>
      </div>
    </>
  )
}
