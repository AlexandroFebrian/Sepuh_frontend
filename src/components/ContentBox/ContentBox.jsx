import { Avatar, Button } from '@chakra-ui/react'
import React from 'react'
import { FaRegClock } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

export default function ContentBox({item}) {
  const displayFormattedText = () => {
    // Replace newline characters with HTML line break tags
    const formattedText = item.description.replace(/\n/g, '<br>');
    return { __html: formattedText };
  };

  const min_price = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
  }).format(item.min_price);

  const max_price = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
  }).format(item.max_price);

  return (
    <div className='w-full h-[21rem] mb-5 rounded shadow-lg bg-lightblue-50 flex p-5 relative'>
      <div className='pr-5'>
        <Avatar src={item.posted_by.profile_picture} size={"lg"} />
      </div>
      <div className='w-full relative truncate'>
        <div className='w-full mt-1 relative'>
          <h2 className='w-full font-semibold text-lg text-navyblue-500 '>{item.title}</h2>
          <div className='h-fit flex justify-between items-center w-full'>
            <div className='text-sm flex items-center h-full'>
              {item.posted_by.name} &#x2022; <FaRegClock className='mx-1 mt-[0.18rem]'/> {item.duration} {item.duration_type}
            </div>
            <div className='text-md h-full'>
              ⭐ {item.avg_rating}
            </div>
          </div>

        </div>
        <hr className=' my-4 border-navyblue-800' />
        <div className='w-full h-36 text-sm relative overflow-y-auto whitespace-normal'>
          <div dangerouslySetInnerHTML={displayFormattedText()} />
        </div>
        
        <hr className=' my-4 border-navyblue-800' />

        <div className='absolute bottom-0 w-full flex justify-between items-center'>
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
            >
              <FaPlus className='mr-1' /> Add to List
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
