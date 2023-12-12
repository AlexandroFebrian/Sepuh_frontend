import React, { useEffect, useState } from 'react'
import FreelancerDefaultMenu from '../../../components/SidebarMenu/Freelancer/FreelancerDefaultMenu/FreelancerDefaultMenu'
import CompanyDefaultMenu from '../../../components/SidebarMenu/Company/CompanyDefaultMenu/CompanyDefaultMenu'
import NowHiring from '../../../components/NowHiring/NowHiring'
import MyPostViewModel from './MyPostViewModel'
import PostBox from './PostBox'
import OpenImage from '../../../components/OpenImage/OpenImage'
import { FaPlus } from 'react-icons/fa6'

export default function MyPost() {
  const { isLogin, user, posts } = MyPostViewModel()
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState([])
  const [position, setPosition] = useState(0);
  const [imageIdx, setImageIdx] = useState(-1)

  useEffect(() => {
    if (open) {
      
      setPosition(window.scrollY);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return (
    <>
      {
        open
        &&
        <OpenImage photos={images} className={`fixed left-0 z-[60]`} setOpen={setOpen} imageIdx={imageIdx} setImageIdx={setImageIdx} style={{ top: `${position}px`}} />
      }
      <div className=" h-fit relative flex">
        <div className="left w-1/5 ">
          <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem]">
            {
              isLogin && user && user.role == "Freelancer"
              &&
              <FreelancerDefaultMenu />
            }
            {
              isLogin && user && user.role == "Company"
              &&
              <CompanyDefaultMenu />
            }
            
          </div>
        </div>

        <div className="mid w-3/5 h-full">
          <div className=" min-h-[calc(100vh-5rem)] h-fit border-l-2 border-navyblue-600 z-0 px-10 py-10">
            <h1 className='text-3xl font-bold'>My Posts</h1>
            
            <div className='w-full pt-3 flex justify-between relative min-h-[calc(100vh-15rem)] h-fit mt-3'>
              <div className='w-[calc(100%-5rem)] mr-5'>
                {
                  posts.map((post, idx) => {
                    return <PostBox key={idx} post={post} setOpen={setOpen} setImages={setImages} setImageIdx={setImageIdx} user={user} />
                  })
                }
              </div>
              
              {
                isLogin
                &&
                <div className=' w-16 2xl:w-20 relative'>
            <button className=' w-16 h-16 2xl:w-20 2xl:h-20 p-[0.4rem] bg-navyblue-800 hover:bg-navyblue-700 transition-colors duration-300 rounded-full flex justify-center items-center sticky top-[88%]' onClick={() => (navigate("/addpost"))}>
              <div className='w-full h-full rounded-full border-[0.15rem] border-ghostwhite-50 flex justify-center items-center'>
                <FaPlus className=' text-ghostwhite-50 2xl:w-10 2xl:h-10 w-8 h-8'/>
              </div>
            </button>
          </div>
              }
            </div>
          </div>
        </div>
        
        <div className="right w-1/5">
          {
            isLogin && user && user.role == "Freelancer"
            &&
            <NowHiring />
          }
        </div>
      </div> 
    </>
  )
}
