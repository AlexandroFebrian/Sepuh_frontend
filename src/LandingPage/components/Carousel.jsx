import { Button, Img } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function Carousel({photos}) {

  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    if (current === 0) setCurrent(photos.length - 1);
    else setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current === photos.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <>
      <div className="overflow-x-hidden relative h-1/2">
        <div
          className={`h-full flex transition ease-in-out duration-1000` }
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {
            photos.map((photo, idx) => {
              return (
                <div key={"carous_" + idx} style={{ backgroundImage:  `url("${photo}")`, backgroundPositionY: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}} className='w-full h-full flex-none'>
                  
                </div>
                // <img src={photo} key={idx} className='w-full h-full flex-none'/>
              )
            })
          }
        </div>

        <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-2xl">
          <button className=' h-[50px] w-[50px] rounded-[50px] bg-navyblue-800 hover:bg-navyblue-500 transition-colors' onClick={previousSlide}><div className=' -mt-1 -ms-1'>{"<"}</div></button>
          <button className=' h-[50px] w-[50px] rounded-[50px] bg-navyblue-800 hover:bg-navyblue-500 transition-colors' onClick={nextSlide}><div className=' -mt-1'>{">"}</div></button>
        </div>

        <div className="absolute bottom-0 py-2 flex justify-center gap-3 w-full">
          {
            photos.map((p, idx) => {
              return (
                <div
                  onClick={() => {
                    setCurrent(idx);
                  }}
                  key={"page_" + idx}
                  className={` rounded-sm w-10 h-1 cursor-pointer ${
                    idx == current ? "bg-white" : "bg-gray-500"
                  }`}
                ></div>
              );
            })
          }

        </div>
      </div>
    
    </>
  )
}
