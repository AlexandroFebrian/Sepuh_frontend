import React, { useEffect, useState } from 'react'
import MenuLogin from "../../../components/SidebarMenu/Freelancer/FreelancerDefaultMenu/FreelancerDefaultMenu";
import NowHiring from '../../../components/NowHiring/NowHiring'
import FreelancerAddPost from './Freelancer/FreelancerAddPost';
import CompanyAddPost from './Company/CompanyAddPost';
import { useSelector } from 'react-redux';

export default function AddPost() {
  const user = useSelector((state) => state.user.userDetail)

  return (
    <>
      <div className=" h-fit relative flex">
        <div className="left w-1/5 ">
          <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem]">
            <MenuLogin />
          </div>
        </div>
        <div className="mid w-3/4">
          <div className=" min-h-[calc(100vh-5rem)] h-fit border-l-2 border-navyblue-600 z-0 px-10 py-10">
            <h1 className='font-bold text-3xl'>New Post</h1>
            <div className='w-full bg-ghostwhite-100 mt-5 p-7 rounded shadow-lg'>
              {
                user.role == "Freelancer"
                ?
                <FreelancerAddPost />
                :
                <CompanyAddPost />
              }
            </div>
          </div>
        </div>
        <div className="right w-1/4">
          <NowHiring />
        </div>
      </div>
      
    </>
  )
}
