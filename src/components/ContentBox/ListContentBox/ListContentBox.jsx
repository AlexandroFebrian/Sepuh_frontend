import { Avatar, Button, Tag } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaRegClock, FaStar } from "react-icons/fa6";
import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Popup from '../../Popup/Popup';
import fetch from '../../../Client/fetch';

export default function ListContentBox({item, setList, setWait, setPopup, setPopupTitle, setPopupButtonMessage, setPopupType}) {
  const { removeFromList } = fetch()

  const categories = useSelector((state) => state.post.category)

  const min_price = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 2,
  }).format(item.min_price);

  const max_price = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 2,
  }).format(item.max_price);

  const email = encodeURIComponent(item.posted_by.email)

  async function removeFromListHandler() {
    setWait(true)

    const response = await removeFromList(item._id, setWait, setPopup, setList)

    if(response == undefined){
      setPopupTitle("Network Error!")
      setPopupButtonMessage("Try Again")
      setPopupType(false)
      return
    }

    if(response.status.toString()[0] != 2){
      // console.log(response)
      setPopupTitle(response.data.message)
      setPopupButtonMessage("Try Again")
      setPopupType(false)
      return
    }

    setPopupTitle("Remove From List Success")
    setPopupButtonMessage("Close")
    setPopupType(true)
    
    setList(prev => prev.filter(list => list._id != item._id))
  }

  return (
    <>
      <div className='w-full h-fit mb-5 rounded shadow-lg bg-indigo-50 flex p-5 relative z-0 border border-navyblue-800 hover:bg-indigo-100/50 transition-colors duration-300'>

        <div className='pr-5'>
          <Avatar src={item.posted_by.profile_picture} size={"lg"} bgColor={"ghostwhite.400"}/>
        </div>
        
        <div className='w-full relative'>
          <div className='w-full mt-1 relative'>
            <Link to={`/post/${item._id}`} className=' hover:underline'>
              <h2 className='w-full font-semibold text-lg text-navyblue-500 '>{item.title}</h2>
            </Link>
            <div className='h-fit flex justify-between items-center w-full'>
              <div className='text-sm flex items-center h-full font-semibold'>
                <Link to={`/user?email=${email}`} className=' hover:underline' >
                  {item.posted_by.name}
                </Link> 
                &nbsp; &#x2022; &nbsp; <FaRegClock className='mt-[0.18rem] mr-1'/>  {item.duration} {item.duration_type}
              </div>
              <div className='text-md h-full flex items-center'>
                <FaStar className=' text-yellow-500 mx-1' /> {item.avg_rating == 0 ? item.avg_rating : item.avg_rating.toFixed(1)}
                
              </div>
            </div>

          </div>

          <div className='flex items-center mt-1'>
            {
              item.hashtag.map((tag, idx) => {
                return (
                  // <div key={idx} className='bg-navyblue-800 text-white rounded-full px-2 py-1 text-xs mr-2'>
                  //   {tag}
                  // </div>
                  <Tag key={idx} colorScheme='navyblue' className='mr-1' >{categories.find(category => category.value == tag).label}</Tag>
                )
              })
            }
          </div>

          <hr className=' my-4 border-navyblue-800' />

          <div className='w-full h-36 text-md overflow-y-hidden line-clamp-6'>
            {item.description}
          </div>
          
          <hr className=' my-4 border-navyblue-800' />

          <div className=' w-full flex justify-between items-center relative z-50'>
            <div className='font-semibold'>
              Rp {min_price} - {max_price}
            </div>
            <div>
              <Link to={`/post/${item._id}`} className=' hover:underline'>
                <Button 
                  color="ghostwhite.50"
                  bg="indigo.300"
                  _hover={{ bg: "indigo.350" }}
                  _active={{ bg: "indigo.400" }}
                  width="auto"
                  height="2rem"
                  className=" me-2"
                  variant="solid"
                  transitionDuration={"300ms"}
                  fontSize={"sm"}
                >
                  See Details
                </Button>

              </Link>
              <Button 
                color="navyblue.800"
                bg="yellow.300"
                _hover={{ bg: "yellow.400" }}
                _active={{ bg: "yellow.500" }}
                width="auto"
                height="2rem"
                variant="solid"
                transitionDuration={"300ms"}
                fontSize={"sm"}
                onClick={() => {removeFromListHandler()}}
              >
                <FaRegTrashCan className='mr-1' /> Remove from list
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
