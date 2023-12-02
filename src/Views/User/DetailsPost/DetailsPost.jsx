import React, { useEffect, useState } from 'react'
import DetailsPostViewModel from './DetailsPostViewModel'
import FreelancerDefaultMenu from '../../../components/SidebarMenu/Freelancer/FreelancerDefaultMenu/FreelancerDefaultMenu'
import CompanyDefaultMenu from '../../../components/SidebarMenu/Company/CompanyDefaultMenu/CompanyDefaultMenu'
import NowHiring from '../../../components/NowHiring/NowHiring'
import { Avatar, Button, Tag } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaStar, FaRegClock, FaRegFileLines } from "react-icons/fa6";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useSelector } from 'react-redux'
import Popup from '../../../components/Popup/Popup'
import OpenImage from '../../../components/OpenImage/OpenImage'

export default function DetailsPost() {
  const categories = useSelector((state) => state.post.category)

  const { 
    isLogin, 
    user,
    post, 
    wait,
    popup,
    popupTitle,
    popupButtonMessage,
    popupType,
    setPopup,
    setWait,
    applyHandler,
  } = DetailsPostViewModel()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])
  
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)

  useEffect(() => {
    if(!post) return
    setMinPrice(new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
    }).format(post.min_price));
  
    setMaxPrice(new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
    }).format(post.max_price));

  }, [post])

  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (wait) {
      
      setPosition(window.scrollY);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [wait]);

  const [open, setOpen] = useState(false)
  const [images, setImages] = useState([])
  const [imageIdx, setImageIdx] = useState(-1)

  function openImage(idx){
    setImages(post.image)
    setImageIdx(idx)
    setOpen(true)
  }

  useEffect(() => {
    if (open) {
      
      setPosition(window.scrollY);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  async function continueHandler() {
    window.snap.pay('TRANSACTION_TOKEN_HERE');
  }


  return (
    <>
      {
        open
        &&
        <OpenImage photos={post?.image} className={`fixed left-0 z-[60] w-screen h-screen`} setOpen={setOpen} imageIdx={imageIdx} setImageIdx={setImageIdx} style={{ top: `${position}px`}} />
      }

      <div className=" h-fit relative flex">

        <Popup 
          wait={wait} 
          popup={popup} 
          setPopup={setPopup} 
          setWait={setWait} 
          popupType={popupType} 
          popupTitle={popupTitle} 
          popupButtonMessage={popupButtonMessage}
          className="fixed w-screen h-screen"
          style={{ top: `${position}px` }}
        />


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
            <h1 className='text-3xl font-bold'>Details</h1>

            {/* FREELANCER */}
            {
              user && user.role == "Freelancer" && post && categories
              &&
              <div className='w-[calc(100%-10rem)] px-7 py-7 h-fit mt-3 bg-lightblue-50 rounded shadow-xl'>
                <div className='w-full flex items-center'>
                  <Avatar size={"lg"} src={post?.posted_by.profile_picture} />
                  <div className='ml-5 h-full'>
                    <h1 className='font-semibold text-2xl text-navyblue-500'>{post?.title}</h1>
                    <div className='text-sm flex items-center'>
                      <Link to={`/user?email=${post?.posted_by.email}`} className='underline hover:text-navyblue-500'>{post?.posted_by.name}</Link> &nbsp; &#x2022; &nbsp; <FaStar className=' text-yellow-500 mr-1' /> {post?.avg_rating} <span className='ml-1 text-ghostwhite-500'>({post?.comments.length})</span>
                    </div>
                  </div>
                </div>

                <div className='max-w-full flex mt-4 overflow-x-auto'>
                  {
                    post?.image.map((img, idx) => {
                      return (
                        <div key={idx} style={{ backgroundImage: `url('${img}')`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}} className='w-52 h-44 mr-1 rounded flex-none'>
                          <div 
                            key={idx}
                            className='w-full h-full hover:bg-black/40 cursor-pointer rounded hover:after:content-["See_photo"] flex items-center justify-center text-ghostwhite-50 transition-all'
                            onClick={() => {openImage(idx)}}
                          >
                            
                          </div>
                        </div>
                      )
                    })
                  }
                </div>

                <div className='mt-4'>
                  <h1 className='text-2xl font-bold'>
                    {post?.title}
                  </h1>

                  <div className='font-semibold text-lg'>
                    Rp {minPrice} - {maxPrice}
                  </div>

                  <div className='flex items-center'>
                    <FaRegClock className='mr-1 text-yellow-600' /> Duration: {post?.duration} {post?.duration_type}
                  </div>

                  <hr className='my-3 border border-navyblue-800' />

                  <div className='whitespace-pre-line'>
                    {post?.description}
                  </div>

                  <hr className='my-3 border border-navyblue-800' />

                  <div className='mt-3 flex items-baseline'>
                    {
                      post?.hashtag.map((tag, idx) => {
                        return (
                          <Button
                            key={idx}
                            variant={"outline"}
                            borderColor={"navyblue.800"}
                            borderWidth={2}
                            rounded={"full"}
                            margin={0}
                            height={"2rem"}
                            onClick={() => {addHashtag()}}
                          >{categories.find(category => category.value == tag).label}</Button>
                        )
                      })
                    }
                  </div>
                </div>
                <div className='w-full flex justify-evenly mt-8'>
                  <Button 
                    shadow={"lg"}
                    color="ghostwhite.50"
                    bg="indigo.300"
                    _hover={{ bg: "indigo.350" }}
                    _active={{ bg: "indigo.400" }}
                    width="30%"
                    height="2.25rem"
                    className=" me-2"
                    variant="solid"
                    transitionDuration={"300ms"}
                    fontSize={"sm"}
                    paddingY={"0.5rem"}
                  >
                    <IoChatboxEllipsesOutline size="1.5rem" className='mr-2' /> Chat the Company
                  </Button>
                  <Button 
                    shadow={"lg"}
                    color="navyblue.800"
                    bg="yellow.300"
                    _hover={{ bg: "yellow.400" }}
                    _active={{ bg: "yellow.500" }}
                    width="30%"
                    height="2.25rem"
                    variant="solid"
                    transitionDuration={"300ms"}
                    fontSize={"sm"}
                    paddingY={"0.5rem"}
                    onClick={() => {applyHandler()}}
                  >
                     <FaRegFileLines size="1.3rem" className='mr-2' /> Apply Now
                  </Button>
                </div>
              </div>
            }

            {/* COMPANY */}
            {
              user && user.role == "Company" && post && categories
              &&
              <div className='w-[calc(100%-10rem)] px-7 py-7 h-fit mt-3 bg-navyblue-800 text-ghostwhite-50 rounded shadow-xl'>
                <div className='w-full flex items-center'>
                  <Avatar size={"lg"} src={post?.posted_by.profile_picture} />
                  <div className='ml-5 h-full'>
                    <h1 className='font-semibold text-2xl text-indigo-200'>{post?.title}</h1>
                    <div className='text-sm flex items-center'>
                      <Link to={`/user?email=${post?.posted_by.email}`} className='underline hover:text-indigo-200'>{post?.posted_by.name}</Link> &nbsp; &#x2022; &nbsp; <FaStar className=' text-yellow-500 mr-1' /> {post?.avg_rating} <span className='ml-1 text-ghostwhite-300'>({post?.comments.length})</span>
                    </div>
                  </div>
                </div>

                <div className='max-w-full flex mt-4 overflow-x-auto'>
                  {
                    post?.image.map((img, idx) => {
                      return (
                        <div key={idx} style={{ backgroundImage: `url('${img}')`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}} className='w-52 h-44 mr-1 rounded flex-none'>
                          <div
                            key={idx} 
                            className='w-full h-full hover:bg-black/40 cursor-pointer rounded hover:after:content-["See_photo"] flex items-center justify-center text-ghostwhite-50 transition-all'
                            onClick={() => {openImage(idx)}}
                          >
                            
                          </div>
                        </div>
                      )
                    })
                  }
                </div>

                <div className='mt-4'>
                  <h1 className='text-2xl font-bold'>
                    {post?.title}
                  </h1>

                  <div className='font-semibold text-lg'>
                    Rp {minPrice} - {maxPrice}
                  </div>

                  <hr className='my-3 border border-ghostwhite-50' />

                  <div className='whitespace-pre-line'>
                    {post?.description}
                  </div>

                  <hr className='my-3 border border-ghostwhite-50' />

                  <div className='mt-3 flex items-baseline'>
                    {
                      post?.hashtag.map((tag, idx) => {
                        return (
                          <Button
                            key={idx}
                            variant={"outline"}
                            borderColor={"ghostwhite.50"}
                            borderWidth={2}
                            color={"ghostwhite.50"}
                            _hover={{ bg: "ghostwhite.50", color: "navyblue.800" }}
                            rounded={"full"}
                            margin={0}
                            height={"2rem"}
                            onClick={() => {addHashtag()}}
                          >{categories.find(category => category.value == tag).label}</Button>
                        )
                      })
                    }
                  </div>
                </div>
                <div className='w-full flex justify-evenly mt-8'>
                  <Button 
                    shadow={"lg"}
                    color="ghostwhite.50"
                    bg="indigo.300"
                    _hover={{ bg: "indigo.350" }}
                    _active={{ bg: "indigo.400" }}
                    width="30%"
                    height="2.25rem"
                    className=" me-2"
                    variant="solid"
                    transitionDuration={"300ms"}
                    fontSize={"sm"}
                    paddingY={"0.5rem"}
                  >
                    <IoChatboxEllipsesOutline size="1.5rem" className='mr-2' /> Chat the Freelancer
                  </Button>
                  <Button 
                    shadow={"lg"}
                    color="navyblue.800"
                    bg="yellow.300"
                    _hover={{ bg: "yellow.400" }}
                    _active={{ bg: "yellow.500" }}
                    width="30%"
                    height="2.25rem"
                    variant="solid"
                    transitionDuration={"300ms"}
                    fontSize={"sm"}
                    paddingY={"0.5rem"}
                    onClick={() => {continueHandler()}}
                  >
                     <FaRegFileLines size="1.3rem" className='mr-2' /> Continue
                  </Button>
                </div>
              </div>
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
