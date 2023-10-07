import { Button, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function Navbar() {
  const [logedIn, setLogedIn] = useState("false")

  return (
    <>
      <nav className='w-full h-[80px] bg-navyblue-800 flex justify-between px-7 py-4'>
        <div>
          <img src="/Logo Putih.png" alt="Logo" className='h-full'/>

        </div>
        <div className='flex items-center w-1/3'>
          <InputGroup background={'ghostwhite.100'} rounded={'md'}>
            <InputLeftElement>
            Logo search
            </InputLeftElement>

            <Input placeholder='Search'>
            </Input>

            <InputRightElement>
            Logo filter
            </InputRightElement>
          </InputGroup>

        </div>
        <div className='flex items-center'>
          {
            logedIn
            ?
              <Button color='ghostwhite.50' borderColor='indigo.300' borderWidth='2px' _hover={{bg: "whiteAlpha.200"}} _active={{bg: "whiteAlpha.300"}} variant='outline' width='135px'>
                Sign In
              </Button>
            :
            <>
              <Button color='ghostwhite.50' _hover={{bg: "transparent"}} width='135px' className=' me-6' variant='ghost'>
                Notifications
              </Button>
              <Button color='ghostwhite.50' bg='indigo.300' _hover={{bg: "indigo.350"}} width='135px'>
                My Profile
              </Button>
            </>
          }

        </div>
      </nav>  
    </>
  )
}
