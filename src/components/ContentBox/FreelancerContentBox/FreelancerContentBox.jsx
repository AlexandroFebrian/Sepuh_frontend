import { Avatar, Button, Tag } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaRegClock, FaStar } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Popup from '../../Popup/Popup';
import fetch from '../../../Client/fetch';

export default function FreelancerContentBox({item}) {
  const { addToList } = fetch()

  const categories = useSelector((state) => state.post.category)

  const min_price = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 2,
  }).format(item.min_price);

  const max_price = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 2,
  }).format(item.max_price);

  const email = encodeURIComponent(item.posted_by.email)

  const [wait, setWait] = useState(false)
  const [popup, setPopup] = useState(false)
  const [popupTitle, setPopupTitle] = useState("")
  const [popupButtonMessage, setPopupButtonMessage] = useState("")
  const [popupType, setPopupType] = useState(false)

  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (wait) {
      
      setPosition(window.scrollY);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [wait]);

  async function addToListHandler() {
    setWait(true)

    const response = await addToList(item._id, setWait, setPopup)

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

    setPopupTitle("Add to List Success")
    setPopupButtonMessage("Close")
    setPopupType(true)
  }

  return (
    <>
      <Popup 
        wait={wait} 
        popup={popup} 
        setPopup={setPopup} 
        setWait={setWait} 
        popupType={popupType} 
        popupTitle={popupTitle} 
        popupButtonMessage={popupButtonMessage}
        className={`fixed w-screen h-screen left-0`}
        style={{ top: `${position}px` }}
      />
      <div className='w-full h-fit mb-5 rounded shadow-lg bg-navyblue-800 flex p-5 relative z-0 text-ghostwhite-50 hover:bg-navyblue-700 transition-colors duration-300'>

        <div className='pr-5'>
          <Avatar src={item.posted_by.profile_picture} size={"lg"} />
        </div>
        
        <div className='w-full relative'>
          <div className='w-full mt-1 relative'>
            <Link to={`/post/${item._id}`} className=' hover:underline'>
              <h2 className='w-full font-semibold text-lg text-indigo-200 '>{item.title}</h2>
            </Link>
            <div className='h-fit flex justify-between items-center w-full'>
              <div className='text-sm flex items-center h-full font-semibold'>
                <Link to={`/user?email=${email}`} className=' hover:underline' >
                  {item.posted_by.name}
                </Link> <FaStar className=' text-yellow-500 mx-1' />  {item.avg_rating == 0 ? item.avg_rating : item.avg_rating.toFixed(1)}
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

          <hr className=' my-4 border-ghostwhite-50' />

          <div className='w-full h-36 text-md overflow-y-hidden line-clamp-6'>
            {item.description}
          </div>
          
          <hr className=' my-4 border-ghostwhite-50' />

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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
