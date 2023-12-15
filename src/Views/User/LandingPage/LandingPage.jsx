import React from 'react'
import Carousel from './components/Carousel'
import {photos_url_carousel} from "./CarouselPhotos.json"
import {photos_url_categories} from "./CategoriesPhotos.json"
import Categories from './Categories'
import About from './About'

export default function LandingPage() {

  return (
    <>
      <Carousel photos={photos_url_carousel} className="h-[35rem] w-full" />
      <div className='px-16 my-16 text-navyblue-800 custom-scrollbar'>
        <Categories photos={photos_url_categories}/>
        <hr className=' border-black' />
        <About />
      </div>
    </>
  )
}
