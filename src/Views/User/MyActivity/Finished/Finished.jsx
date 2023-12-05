import React from 'react'
import { Link, useLocation, useOutletContext } from 'react-router-dom'
import FinishedViewModel from './FinishedViewModel'

export default function Finished() {
  const [activity] = useOutletContext();

  const {
    user,
    isLogin
  } = FinishedViewModel()
  
  const location = useLocation()

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

      <div className='w-full grid grid-cols-2 xl:grid-cols-3 gap-5 mt-4 px-5'>
        {
          activity.length > 0
          &&
          activity.map((item, index) => {
            if(item.status == 3)
            return (
              <ActivityCard key={index} activity={item} user={user} />
            )
          })
        }
      </div>
    </div>
  )
}
