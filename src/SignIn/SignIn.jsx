import { useState } from 'react'
import { useSpring, useSpringRef, animated } from '@react-spring/web'
import "animate.css"

export default function SignIn(){
  const api = useSpringRef()
  const jumbo = useSpring({
    ref: api,
    from: { x: 0 },
  })
  
  const handleClick = () => {
    if(jumbo.x.get() === window.innerWidth/2){
      //Animate kiri ngilang
      document.getElementById("left").classList.add('animate__animated', 'animate__fadeOutRight')
      
      //Animate kanan muncul
      document.getElementById("left").classList.add('animate__animated', 'animate__fadeInLeft')
    }else{
      //Animate kiri nmuncul
      document.getElementById("left").classList.add('animate__animated', 'animate__fadeInRight')
      
      //Animate kanan ngilang
      document.getElementById("left").classList.add('animate__animated', 'animate__fadeOutLeft')
    }
    api.start({
      to: {
        x: jumbo.x.get() === window.innerWidth/2 ? 0 : window.innerWidth/2,
      },
    })
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
          className=" bg-navyblue fixed"
        >
          
        </animated.div>
        <div className='left w-1/2 h-screen'>
          <div id='left'>
            asdsa
          </div>
        </div>
        <div className='right w-1/2 h-screen'>
          xcvzx
        </div>
      </div>
    
    </>
  )
}