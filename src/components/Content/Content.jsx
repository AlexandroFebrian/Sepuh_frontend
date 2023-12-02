import React, { useEffect, useState } from 'react'
import NowHiring from '../NowHiring/NowHiring'
import { Combobox } from '../ui/Combobox'
import ContentViewModel from './ContentViewModel'
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CompanyContentBox from '../ContentBox/CompanyContentBox/CompanyContentBox';
import FreelancerContentBox from '../ContentBox/FreelancerContentBox/FreelancerContentBox';

export default function Content() {
  const navigate = useNavigate()
  const category = useSelector((state) => state.post.category)

  const { isLogin, setCategoryFilter, freelancerPost, companyPost } = ContentViewModel()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  return (
    <>
      <div className='w-full h-16'>
        {
          isLogin
          &&
          <Combobox 
            title={"Select Category"} 
            placeholder={"Search Category"} 
            empty={"No category found"} 
            items={category} 
            headerClassName={"w-72 shadow-lg"}
            contentClassName={" pt-1 border-0"}
            onSelect={(value) => setCategoryFilter(value)}
          />
        }
      </div>
      
      <div className='w-full pt-3 flex justify-between min-h-[calc(100vh-15rem)] h-fit'>
        <div className='w-[calc(100%-5rem)] mr-10'>
          {
            freelancerPost.length == 0 && companyPost.length == 0
          }
          {
            freelancerPost.map((item, idx) => {
              // console.log(item)
              return <FreelancerContentBox item={item} key={idx} />
            })
          }
          {
            companyPost.map((item, idx) => {
              // console.log(item)
              return <CompanyContentBox item={item} key={idx} />
            })
          }
        </div>
        
        {
          isLogin
          &&
          <div className=' w-20 relative'>
            <button className='w-20 h-20 p-[0.4rem] bg-navyblue-800 hover:bg-navyblue-700 transition-colors duration-300 rounded-full flex justify-center items-center sticky top-[90%]' onClick={() => (navigate("/addpost"))}>
              <div className='w-full h-full rounded-full border-[0.15rem] border-ghostwhite-50 flex justify-center items-center'>
                <FaPlus className=' text-ghostwhite-50 w-10 h-10'/>
              </div>
            </button>
          </div>
        }
      </div>
      
      
    </>
  )
}
