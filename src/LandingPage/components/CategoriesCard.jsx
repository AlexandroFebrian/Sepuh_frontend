import React from 'react'
import { Link } from 'react-router-dom'

export default function CategoriesCard({photo, children}) {
  return (
    <>
      <Link className='h-[350] w-[250px] rounded-lg transition duration-300 bg-navyblue-800 hover:scale-110 text-ghostwhite-50 flex-none mx-3 cursor-pointer' to={"/signin"}>
        <div className=' w-full h-[75%] rounded-t-lg' style={{ backgroundImage: `url('${photo}')`, backgroundSize: "cover"}}>
        </div>
        <div className='w-full h-[25%] flex items-center justify-center px-2'>
          <h1 className='  font-bold text-2xl text-center'>{children}</h1>
        </div>
      </Link>
    </>
  )
}
