import React, { useState } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function Carousel({photos, imageIdx, className}) {

  const [current, setCurrent] = useState(imageIdx);

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
      <div className={`overflow-x-hidden relative ${className}`}>
        <div
          className={`h-full flex transition ease-in-out duration-1000` }
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {
            photos.map((photo, idx) => {
              return (
                // <div key={"carous_" + idx} style={{ backgroundImage:  `url("${photo}")`, backgroundPositionY: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}} className='w-full h-full flex-none'>
                  
                // </div>
                
                <div key={idx} className='w-full h-full flex-none flex items-center justify-center relative'>
                  <img src={photo} key={idx} className='w-fit h-fit max-w-full max-h-full flex-none'/>

                </div>
              )
            })
          }
        </div>

        <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-2xl">
          <button className=' h-[50px] w-[50px] rounded-[50px] bg-navyblue-800 hover:bg-navyblue-500 transition-colors duration-300 p-0 flex items-center justify-center' onClick={previousSlide}>
            <FaAngleLeft />
          </button>
          <button className=' h-[50px] w-[50px] rounded-[50px] bg-navyblue-800 hover:bg-navyblue-500 transition-colors duration-300 p-0 flex items-center justify-center' onClick={nextSlide}>
            <FaAngleRight />
          </button>
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
