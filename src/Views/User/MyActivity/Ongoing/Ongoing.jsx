import React from 'react'
import OngoingViewModel from './OngoingViewModel'
import { Link, useLocation, useOutletContext } from 'react-router-dom'
import ActivityCard from '../Component/ActivityCard'

export default function Ongoing() {
  const [activity] = useOutletContext();
  
  const {
    user,
    isLogin,
  } = OngoingViewModel()
  
  const location = useLocation()

  return (
    <div className='w-full'>
      <h1 className='text-2xl font-bold'>My Activity</h1>

      <div className='w-full h-14 mt-4 px-3 bg-ghostwhite-100 rounded flex justify-between'>
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
        <div>
          <Link to={"/activity/rejected"}>
            <button 
              className={`h-full font-semibold px-4 mr-4 text-red-600 border-b-[4px] ${location.pathname.includes("rejected") ? "border-navyblue-800" : "border-ghostwhite-100"} hover:border-navyblue-800 transition-colors duration-300`}
            >
              Rejected Work
            </button>
          </Link>
        </div>
      </div>

      <div className='w-full grid grid-cols-2 xl:grid-cols-3 gap-5 mt-4 px-5'>
        {
          activity.length > 0
          &&
          activity.map((item, index) => {
            if(item.status >= 0 && item.status <= 1)
            return (
              <ActivityCard key={index} activity={item} user={user} />
            )
          })
        }
      </div>
    </div>
  )
}
