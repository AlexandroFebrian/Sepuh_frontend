import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function CategoriesCard({category}) {
  const navigate = useNavigate()

  function handleClick() {
    sessionStorage.setItem("category", category.value)
    navigate("/home")
  }

  return (
    <>
      <div className='h-[350] w-[250px] rounded-lg transition duration-300 bg-navyblue-800 hover:scale-110 text-ghostwhite-50 flex-none mx-3 cursor-pointer' onClick={() => {handleClick()}}>
        <div className=' w-full h-[75%] rounded-t-lg' style={{ backgroundImage: `url('${category.img_url}')`, backgroundSize: "cover"}}>
        </div>
        <div className='w-full h-[25%] flex items-center justify-center px-2'>
          <h1 className='  font-bold text-2xl text-center'>{category.text}</h1>
        </div>
      </div>
    </>
  )
}
