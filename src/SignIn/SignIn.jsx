import { useState } from 'react'
import { useSpring, useSpringRef, animated } from '@react-spring/web'

export default function SignIn(){
  const api = useSpringRef()
  const springs = useSpring({
    ref: api,
    from: { x: 0 },
  })
  
  const handleClick = () => {
    console.log(screen.width)
    api.start({
      to: {
        x: springs.x.get() === screen.width/2 ? 0 : screen.width/2,
      },
    })
  }

  return (
    <>
      <div className="bg-slate-600 font-bold h-screen">
        <animated.div
          onClick={handleClick}
          style={{
            width: "50%",
            height: "100%",
            background: '#ff6d6d',
            ...springs,
          }}
        />
      </div>
    
    </>
  )
}