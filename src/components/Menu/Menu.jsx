import React from 'react'

export default function Menu() {
  return (
    <>
      <div className='h-[calc(100vh-5rem)] w-[25%] sticky top-[5rem]'>
        <div>
          <button className='w-full h-10 hover:bg-ghostwhite-100 top-0 transition-colors duration-300'>Home</button>
          <button className='w-full h-10 hover:bg-ghostwhite-100 top-0 transition-colors duration-300'>Messages</button>
          <button className='w-full h-10 hover:bg-ghostwhite-100 top-0 transition-colors duration-300'>List</button>
          <button className='w-full h-10 hover:bg-ghostwhite-100 top-0 transition-colors duration-300'>Post</button>

        </div>
        <div className=' absolute bottom-0 w-full'>
          <button className='w-full h-10 hover:bg-ghostwhite-100 top-0 transition-colors duration-300'>Setting</button>

        </div>
      </div> 
    </>
  )
}
