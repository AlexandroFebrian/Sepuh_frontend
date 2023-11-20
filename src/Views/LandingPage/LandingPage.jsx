import React from 'react'
import Carousel from './components/Carousel'
import {photos_url} from "./CarouselPhotos.json"
import Categories from './Categories'
import About from './About'

export default function LandingPage() {

  return (
    <>
      <Carousel photos={photos_url} />
      <div className='px-16 my-16 text-navyblue-800'>
        <Categories />
        <hr className=' border-black' />
        <About />
      </div>
    </>
  )
}
