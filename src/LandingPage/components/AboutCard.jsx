import React from 'react'

export default function AboutCard({title, children}) {
  return (
    <div className='w-[30%]'>
      <h1 className='text-xl font-bold'>{title}</h1>
      <p>{children}</p>
    </div>
  )
}
