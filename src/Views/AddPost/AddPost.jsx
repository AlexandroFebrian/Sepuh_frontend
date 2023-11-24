import React from 'react'
import MenuLogin from "../../components/SidebarMenu/MenuLogin/MenuLogin";
import NowHiring from '../../components/NowHiring/NowHiring'
import { Avatar } from '@chakra-ui/react';
import Freelancer from './Freelancer';

export default function AddPost() {
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
              <div className='w-full flex items-center'>
                <Avatar bg="ghostwhite.400" size={"lg"}/>
                <div className=' ml-5'>
                  <h1 className='font-semibold text-xl'>Ini nama</h1>
                  <h2>Ini Headline</h2>
                </div>


              </div>

              <div className='mt-5'>
                <Freelancer />

              </div>
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
