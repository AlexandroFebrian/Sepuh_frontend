import { useState } from 'react'
import { useSpring, useSpringRef, animated } from '@react-spring/web'
import "animate.css"
import { Input, InputGroup, InputRightElement, Button, Checkbox } from '@chakra-ui/react'

export default function SignIn(){
  const api = useSpringRef()
  const jumbo = useSpring({
    ref: api,
    from: { x: 0 },
  })

  let move = false

  const [showPass, setShowPass] = useState(false)
  const handlePass = () => setShowPass(!showPass)
  
  const [showConfirm, setShowConfirm] = useState(false)
  const handleConfirm = () => setShowConfirm(!showConfirm)
  
  const handleClick = () => {
    
    if(move == false){
      move = true
      if(jumbo.x.get() === window.innerWidth/2){
        // Tambah class Animate kiri ngilang
        document.getElementById("left").classList.add('animate__animated', 'animate__fadeOutRight')
        
        // Tambah class Animate kanan muncul
        document.getElementById("right").classList.add('animate__animated', 'animate__fadeInLeft')
      }else{
        // Tambah class Animate kiri nmuncul
        document.getElementById("left").classList.add('animate__animated', 'animate__fadeInRight')
        
        // Tambah class Animate kanan ngilang
        document.getElementById("right").classList.add('animate__animated', 'animate__fadeOutLeft')
      }
  
      api.start({
        to: {
          x: jumbo.x.get() === window.innerWidth/2 ? 0 : window.innerWidth/2,
        },
      })

      move = true
    }
    
    if(move == true){
      setTimeout(() => {
        console.log(jumbo.x.get())
        if(jumbo.x.get() === window.innerWidth/2){
          // Hapus class Animate kiri ngilang
          document.getElementById("left").classList.remove('animate__animated', 'animate__fadeInRight')
          
          // Hapus class Animate kanan muncul
          document.getElementById("right").classList.remove('animate__animated', 'animate__fadeOutLeft')
        }else{
          // Hapus class Animate kiri nmuncul
          document.getElementById("left").classList.remove('animate__animated', 'animate__fadeOutRight')
          
          // Hapus class Animate kanan ngilang
          document.getElementById("right").classList.remove('animate__animated', 'animate__fadeInLeft')
        }
        move = false
      }, 1000)
    }
    

  }

  return (
    <>
      <div className="bg-ghostwhite font-bold h-screen flex">
        <animated.div
          onClick={handleClick}
          style={{
            width: "50%",
            height: "100%",
            zIndex: 2,
            ...jumbo,
          }}
          className=" bg-navyblue-800 fixed"
        >
          
        </animated.div>
        <div className='left w-1/2 h-screen flex justify-center items-center text-navyblue-800'>
          <div id='left' className=' w-5/6 h-[33rem] border p-10'>
            <h1 className=' text-5xl text-center mb-10'>Sign Up</h1>

            <p>Username</p>
            <Input variant='outline' placeholder='Username' />
            <p>Email</p>
            <Input variant='outline' placeholder='Email' />
            
            <p>Password</p>
            <InputGroup>
              <Input
                pr='4.5rem'
                type={showPass ? 'text' : 'password'}
                placeholder='Enter password'
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handlePass}>
                  {showPass ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>

            <div className='flex w-full justify-center'>
              <div className='w-4/6'>
                <Button className='w-full bg-navyblue'>Sign In</Button>

              </div>

            </div>
          </div>
        </div>
        <div className='right w-1/2 h-screen flex justify-center items-center text-navyblue-800'>
          <div id='right' className=' w-5/6 h-[33rem] border p-10'>
            <h1 className=' text-5xl text-center mb-10'>Sign In</h1>

            <p>Username</p>
            <Input variant='outline' placeholder='Username' />
            <p>Email</p>
            <Input variant='outline' placeholder='Email' />
            
            <div className='flex justify-between'>
              <div className=' w-[49%]'>
                <p>Password</p>
                <InputGroup>
                  <Input
                    pr='4.5rem'
                    type={showPass ? 'text' : 'password'}
                    placeholder='Enter password'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handlePass}>
                      {showPass ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </div>

              <div className=' w-[49%]'>
                <p>Confirm Password</p>
                <InputGroup>
                  <Input
                    pr='4.5rem'
                    type={showConfirm ? 'text' : 'password'}
                    placeholder='Enter password'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleConfirm}>
                      {showConfirm ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </div>

            </div>
            <div className='flex w-full justify-center'>
              <div className='w-4/6'>
                <Checkbox >I agree to the Terms and Conditions.*</Checkbox>

              </div>

            </div>
            <div className='flex w-full justify-center'>
              <div className='w-4/6'>
                <Button colorScheme={'navyblue'} color={'ghostwhite'} className='w-full'>Sign In</Button>

              </div>

            </div>
          </div>
        </div>

      </div>
    
    </>
  )
}