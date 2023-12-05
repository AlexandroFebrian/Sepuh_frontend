import React from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export default function ActivityCard({activity, user}) {
  // console.log(activity, post)

  const date = new Date(activity.create_at)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Link to={`/activity/${activity._id}`}>
      <div className=' bg-navyblue-50 rounded min-h-[16rem] cursor-pointer hover:scale-105 transition-all duration-300'>
        <div 
          className={` bg-navyblue-100 h-44 rounded-t bg-[]`}
          style={{
            backgroundImage: `url('${activity.post.image[0]}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
        <div className=' py-2 px-4'>
          <h1 className=' text-xl font-semibold text-navyblue-500 truncate'>
            {activity.post.title}
          </h1>
          <h2 className='truncate'>
            {
              user.role == "Freelancer"
              &&
              activity.company.name
            }
            {
              user.role == "Company"
              &&
              activity.freelancer.name
            }
          </h2>

          <div className='flex items-center justify-between mt-2 text-xs'>
            <p className=' text-ghostwhite-600'>
              {date.getDate()} {monthNames[date.getMonth()]} {date.getFullYear()}
            </p>
            {
              activity.status == 0
              &&
              <p className=' text-orange-500 font-semibold'>
                Waiting for acceptance
              </p>
            }
            {
              activity.status == 1
              &&
              <p className=' text-yellow-500 font-semibold'>
                Ongoing
              </p>
            }
            {
              activity.status == 2
              &&
              <p className=' text-green-500 font-semibold'>
                Finished
              </p>
            }
            {
              activity.status == -1
              &&
              <p className=' text-red-500 font-semibold'>
                Rejected
              </p>
            }
          </div>
          
          <div className='flex justify-end mt-2'>
            <FaAngleRight />

          </div>

        </div>
      </div>
    </Link>
  )
}
