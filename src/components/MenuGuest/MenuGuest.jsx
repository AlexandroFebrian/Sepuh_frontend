import { Select } from '@chakra-ui/react'
import React from 'react'

export default function MenuGuest() {
  return (
    <>
      <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem] px-5 py-10">
        <Select 
          defaultValue={"1"} 
          width={"100%"}
          height={"3.5rem"}
          bg={"navyblue.800"}
          color={"ghostwhite"}
          _hover={{bg: "navyblue.700"}}
          transitionDuration={"300ms"}
          className='cursor-pointer'
        >
          <option value='1' className=' text-black'>Machine Learning</option>
          <option value='2' className=' text-black'>Machine Learning</option>
          <option value='3' className=' text-black'>Machine Learning</option>
          <option value='4' className=' text-black'>Machine Learning</option>
          <option value='5' className=' text-black'>Machine Learning</option>
          <option value='6' className=' text-black'>Machine Learning</option>
          <option value='7' className=' text-black'>Machine Learning</option>
          <option value='8' className=' text-black'>Machine Learning</option>
          <option value='9' className=' text-black'>Machine Learning</option>
        </Select>
      </div>
    </>
  )
}
