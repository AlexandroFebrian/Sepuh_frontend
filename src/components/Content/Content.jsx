import React, { useEffect, useState } from 'react'
import NowHiring from '../NowHiring/NowHiring'
import { Combobox } from '../ui/Combobox'
import ContentViewModel from './ContentViewModel'
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export default function Content() {
  const navigate = useNavigate()

  const { isLogin, category, setCategoryFilter } = ContentViewModel()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  return (
    <>
      <div className='w-full'>
        {
          isLogin
          &&
          <Combobox 
            title={"Select Category"} 
            placeholder={"Search Category"} 
            empty={"No category found"} 
            items={category} 
            headerClassName={"w-72"}
            contentClassName={" pt-1 border-0"}
            setFilter={setCategoryFilter}
          />
        }
      </div>
      <div className='w-full flex justify-between relative'>
        <div className='w-[calc(100%-5rem)] mr-10'>
          <div className=" h-[400px] w-full bg-slate-400 mt-5 rounded shadow-lg"></div>
          <div className=" h-[400px] w-full bg-slate-400 mt-5"></div>
          <div className=" h-[400px] w-full bg-slate-400 mt-5"></div>
          <div className=" h-[400px] w-full bg-slate-400 mt-5"></div>
        </div>

        <div className='relative'>
          <button className='w-20 h-20 p-[0.4rem] bg-navyblue-800 hover:bg-navyblue-700 transition-colors duration-300 rounded-full flex justify-center items-center sticky top-[90%]' onClick={() => (navigate("/addpost"))}>
            <div className='w-full h-full rounded-full border-[0.15rem] border-ghostwhite-50 flex justify-center items-center'>
              <FaPlus className=' text-ghostwhite-50 w-10 h-10'/>
            </div>
          </button>
        </div>
      </div>
      
      
    </>
  )
}
