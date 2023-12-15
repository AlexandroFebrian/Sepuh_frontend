import React, { useEffect, useState } from 'react'
import NowHiring from '../../../components/NowHiring/NowHiring'
import FreelancerAddPost from './Freelancer/FreelancerAddPost';
import CompanyAddPost from './Company/CompanyAddPost';
import { useSelector } from 'react-redux';
import FreelancerDefaultMenu from '../../../components/SidebarMenu/Freelancer/FreelancerDefaultMenu/FreelancerDefaultMenu';
import CompanyDefaultMenu from '../../../components/SidebarMenu/Company/CompanyDefaultMenu/CompanyDefaultMenu';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export default function AddPost() {
  const user = useSelector((state) => state.user.userDetail)
  const isLogin = useSelector((state) => state.user.isLogin)

  const navigate = useNavigate()

  return (
    <>
      <div className=" h-fit relative flex">
        <div className="left w-1/5 ">
          <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem]">
            {
              user && user?.role == "Freelancer"
              &&
              <FreelancerDefaultMenu />
            }
            {
              user && user?.role == "Company"
              &&
              <CompanyDefaultMenu />
            }
          </div>
        </div>
        <div className="mid w-3/5">
          <div className=" min-h-[calc(100vh-5rem)] h-fit border-l-2 border-navyblue-600 z-0 px-10 py-10">
            <div className='flex items-center'>
              <FaArrowLeft 
                className=" w-9 h-9 mr-3 cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <h1 className='font-bold text-3xl'>New Post</h1>
            </div>
            <div className='w-full bg-ghostwhite-100 mt-5 p-7 rounded shadow-lg'>
              {
                user?.role == "Freelancer"
                ?
                <FreelancerAddPost />
                :
                <CompanyAddPost />
              }
            </div>
          </div>
        </div>
        {
          isLogin && user && user.role == "Freelancer"
          &&
          <div className="right w-1/5">
            <NowHiring user={user} />
          </div>
        }
      </div>
      
    </>
  )
}
