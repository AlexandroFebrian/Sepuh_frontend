import React, { useEffect, useState } from 'react'
import FreelancerDefaultMenu from '../../../components/SidebarMenu/Freelancer/FreelancerDefaultMenu/FreelancerDefaultMenu'
import CompanyDefaultMenu from '../../../components/SidebarMenu/Company/CompanyDefaultMenu/CompanyDefaultMenu'
import NowHiring from '../../../components/NowHiring/NowHiring'
import MyPostViewModel from './MyPostViewModel'
import PostBox from './PostBox'
import OpenImage from '../../../components/OpenImage/OpenImage'

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
      <div className=" h-fit flex">
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
            <div className='mt-5'>

            </div>
            {
              posts.map((post, idx) => {
                return <PostBox key={idx} post={post} setOpen={setOpen} setImages={setImages} setImageIdx={setImageIdx} />
              })
            }
          </div>
        </div>
        <div className="right w-1/5">
          <NowHiring />
        </div>
      </div> 
    </>
  )
}
