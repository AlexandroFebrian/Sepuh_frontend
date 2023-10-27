import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Carousel from './components/Carousel'
import {photos_url} from "./CarouselPhotos.json"
import Categories from './Categories'
import About from './About'
import Footer from '../components/Footer/Footer'

export default function LandingPage() {

  return (
    <>
      <div className='bg-ghostwhite-50 h-screen'>
        <Navbar />
        <Carousel photos={photos_url} />
        <div className='px-16 my-16 text-navyblue-800'>
          <Categories />
          <hr className=' border-black' />
          <About />
        </div>
        <Footer />
      </div>
    </>
  )
}
