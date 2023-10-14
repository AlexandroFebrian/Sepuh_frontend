import React from 'react'
import AboutCard from './components/AboutCard'

export default function About() {
  const about = [
    {
      title: "Title",
      description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      title: "Title",
      description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      title: "Title",
      description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ]

  return (
    <>
      <div className='mt-10'>
        <h1 className='text-4xl font-bold mb-5'>What's great about it?</h1>
        <div className='py-5 flex justify-between'>
          {
            about.map((about, idx) => <AboutCard title={about.title} key={idx}>{about.description}</AboutCard>)
          }
        </div>
      </div>
    </>
  )
}
