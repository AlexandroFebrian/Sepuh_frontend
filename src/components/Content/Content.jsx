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

  const { isLogin, categoryFilter, setCategoryFilter, freelancerPost, companyPost, searchs, searchBy, setSearchBy } = ContentViewModel()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  function comboBoxSelect(value){
    sessionStorage.setItem("category", value)
    setCategoryFilter(value)
  }

  const searchByFilter = [
    {
      value: "freelancer",
      label : "Freelancer"
    },
    {
      value: "company",
      label : "Company"
    },
  ]

  return (
    <>
      <div className='w-full h-16 flex items-center'>
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
            item={categoryFilter}
            onSelect={(value) => {comboBoxSelect(value)}}
          />
        }
        {
          isLogin === false
          &&
          <>
            <p className='mr-3 text-lg font-semibold'>Search by: </p>
            <div className='mr-3'>
              <Combobox 
                title={"Search by"} 
                placeholder={"Search by"} 
                empty={"No category found"} 
                items={searchByFilter} 
                headerClassName={"w-72 shadow-lg"}
                contentClassName={" pt-1 border-0"}
                item={searchBy}
                onSelect={(value) => {setSearchBy(value)}}
              />

            </div>
            <Combobox 
              title={"Select Category"} 
              placeholder={"Search Category"} 
              empty={"No category found"} 
              items={category} 
              headerClassName={"w-72 shadow-lg"}
              contentClassName={" pt-1 border-0"}
              item={categoryFilter}
              onSelect={(value) => {comboBoxSelect(value)}}
            />
          </>
        }
      </div>
      
      <div className='w-full pt-3 flex justify-between min-h-[calc(100vh-15rem)] h-fit'>
        <div className={`${isLogin ? "w-[calc(100%-5rem)] mr-10" : "w-full"}`}>
          {
            freelancerPost.length == 0 && companyPost.length == 0
          }
          {
            freelancerPost.map((item, idx) => {
              if(
                item.title.toLowerCase().includes(searchs.toLowerCase())
                &&
                item.hashtag.find(tag => tag.toLowerCase().includes(categoryFilter.toLowerCase()))
              )
              return <FreelancerContentBox item={item} key={idx} />
            })
          }
          {
            companyPost.map((item, idx) => {
              if(
                item.title.toLowerCase().includes(searchs.toLowerCase())
                &&
                item.hashtag.find(tag => tag.toLowerCase().includes(categoryFilter.toLowerCase()))
              )
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
