import React from 'react'
import OngoingViewModel from './OngoingViewModel'
import { Link, useLocation } from 'react-router-dom'

export default function Ongoing() {
  const {
    user,
    isLogin
  } = OngoingViewModel()
  
  const location = useLocation()
  console.log(location.pathname)

  return (
    <div className='w-full'>
      <h1 className='text-2xl font-bold'>My Activity</h1>

      <div className='w-full h-14 mt-4 px-3 bg-ghostwhite-100 rounded flex'>
        <div>
          <Link to={"/activity/ongoing"}>
            <button 
              className={`h-full font-semibold px-4 mr-4 border-b-[4px] ${location.pathname.includes("ongoing") ? "border-navyblue-800" : "border-ghostwhite-100"} hover:border-navyblue-800 transition-colors duration-300`}
            >
              Ongoing Work
            </button>
          </Link>
          <Link to={"/activity/finished"}>
            <button 
              className={`h-full font-semibold px-4 border-b-[4px] ${location.pathname.includes("finished") ? "border-navyblue-800" : "border-ghostwhite-100"} hover:border-navyblue-800 transition-colors duration-300`}
            >
              Finished Work
            </button>
          </Link>

        </div>
      </div>
    </div>
  )
}
