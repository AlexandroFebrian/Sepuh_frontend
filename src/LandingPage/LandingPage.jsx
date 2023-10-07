import React from 'react'
import Navbar from '../components/Navbar'
import Carousel from './components/Carousel'
import {photos_url} from "./CarouselPhotos.json"

export default function LandingPage() {
  return (
    <>
      <div className='bg-ghostwhite-50 h-screen'>
        <Navbar />
        <Carousel photos={photos_url} />
      </div>
    </>
  )
}
