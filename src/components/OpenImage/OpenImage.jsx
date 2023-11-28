import React, { useState } from 'react'
import Carousel from '../Carousel/Carousel'

export default function OpenImage({className, photos, style}) {
  const [close, setClose] = useState(false)
  
  return (
    <>
      <div className={`absolute w-[100%] h-[100%] bg-black/30 z-20 animate__animated ${close ? "animate__fadeOut" : "animate__fadeIn"} animate__faster ${className}`}  style={style}/>
      
      <div className={`absolute w-[100%] h-[100%] z-30 flex items-center justify-center ${className} p-10`} style={style}>
        <Carousel photos={photos} className="h-full w-full" />
      </div>
    </>
  )
}
