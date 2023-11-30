import { Avatar, Button } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FaRegClock, FaChartSimple, FaRegEye } from 'react-icons/fa6';
import OpenImage from '../../../components/OpenImage/OpenImage';

export default function PostBox({post, setOpen, setImages, setImageIdx}) {


  const displayFormattedText = () => {
    // Replace newline characters with HTML line break tags
    const formattedText = post.description.replace(/\n/g, '<br>');
    return { __html: formattedText };
  };

  const min_price = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
  }).format(post.min_price);

  const max_price = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
  }).format(post.max_price);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const posted_at = new Date(post.posted_at)

  function openImage(idx){
    setImages(post.image)
    setImageIdx(idx)
    setOpen(true)
  }

  return (
    <>
      

      <div className='w-full h-fit mb-5 rounded shadow-lg bg-lightblue-50 p-5  border border-navyblue-800 truncate'>
        <div className='flex truncate'>
          <Avatar src={post.posted_by.profile_picture} size={"lg"} />
          <div className='w-full ml-3 relative'>
            <h2 className='w-full font-semibold text-lg '>{post.title}</h2>
            <p className=' text-sm'>{post.posted_by.name} &#x2022; {post.posted_by.headline} </p>
            <div className='flex justify-between items-center text-xs'>
              <p>{posted_at.getDate()} {monthNames[posted_at.getMonth()]} {posted_at.getFullYear()}</p>
              <div className='flex items-center'>
                ⭐{post.avg_rating} &#x2022; <FaRegEye className='mx-1' /> {post.visitor}
              </div>
            </div>

          </div>

        </div>

        <div className='w-full relative truncate'>
          <hr className=' my-4 border-navyblue-800' />
          <div className='w-full h-36 text-sm relative overflow-y-auto whitespace-normal'>
            <div dangerouslySetInnerHTML={displayFormattedText()} />
          </div>
        </div>

        <div className='w-fit flex mt-4'>
          {
            post.image.map((img, idx) => {
              return (
                <div key={idx} style={{ backgroundImage: `url('${img}')`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}} className='w-52 h-44 mr-1 rounded'>
                  <div 
                    className='w-full h-full hover:bg-black/40 cursor-pointer rounded hover:after:content-["See_photo"] flex items-center justify-center text-ghostwhite-50 transition-all'
                    onClick={() => {openImage(idx)}}
                  >
                    
                  </div>
                </div>
              )
            })
          }
        </div>
        
        <div className=' mt-4 w-full flex justify-between items-center'>
          <div className='font-semibold'>
            Rp {min_price} - Rp {max_price}
          </div>
          <div>
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
          </div>
        </div>
      </div>
    </>
  )
}