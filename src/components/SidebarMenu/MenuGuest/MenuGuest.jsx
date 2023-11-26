import { Select } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Combobox } from '../../ui/Combobox'
import { useSelector } from 'react-redux'

export default function MenuGuest() {
  const category = useSelector((state) => state.post.category)
  const [categoryFilter, setCategoryFilter] = useState("")

  return (
    <>
      <div className="px-5 py-10 relative z-0">
        {/* <Select 
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
        </Select> */}
        <Combobox 
          title={"Select Category"} 
          placeholder={"Search Category"} 
          empty={"No category found"} 
          items={category} 
          headerClassName={"min-w-full"}
          contentClassName={"mx-5 pt-1 border-0"}
          onSelect={(value) => setCategoryFilter(value)}
        />
      </div>
    </>
  )
}
