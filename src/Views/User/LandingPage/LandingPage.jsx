import React from 'react'
import Carousel from './components/Carousel'
import {photos_url} from "./CarouselPhotos.json"
import Categories from './Categories'
import About from './About'

export default function LandingPage() {

  return (
    <>
      <Carousel photos={photos_url} className="h-[35rem] w-full" />
      <div className='px-16 my-16 text-navyblue-800 custom-scrollbar'>
        <Categories />
        <hr className=' border-black' />
        <About />
      </div>
    </>
  )
}
