import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <>
      <div className='bg-ghostwhite-50 h-screen'>
        <Navbar />

        <Outlet />

        <Footer />
      </div>
    </>
  )
}
