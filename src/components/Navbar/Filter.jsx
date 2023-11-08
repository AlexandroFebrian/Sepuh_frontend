import React from 'react'
import { useState } from 'react'

export default function Filter({setShowFilter}) {
  const [sort, setSort] = useState(0)
  const [order, setOrder] = useState(0)
  const [date, setDate] = useState(0)

  const sorts = ["Relevance", "Duration", "Salary", "Name", "Rating"]
  const orders = ["Ascending", "Descending"]
  const dates = ["All", "Past 24 hours", "This week", "This month", "Last Month", "Last 3 months", "Last 6 months"]



  return (
    <>
      <div className="absolute top-10 w-full h-fit bg-ghostwhite-100 border border-navyblue-800 px-10 py-2 rounded-b animate__animated animate__fadeInDown duration-0">
        <p className="text-2xl">Filters</p>
        
        <div className='flex'>
          <div className='w-[80%]'>
            <p className='mt-3'>Sort by</p>
            <div className='w-full flex flex-wrap'>
              {
                sorts.map((item, i) => {
                  return (
                    <>
                      <button 
                        key={i} 
                        className={`bg-ghostwhite-50 hover:bg-ghostwhite-100 mt-1 py-1 px-3 text-sm ${sort == i && "border border-navyblue-800"} rounded-sm me-2`}
                        onClick={() => {setSort(i)}}  
                      >
                        {item}
                      </button>
                    </>
                  )
                })
              }
            </div>

            <p className='mt-3'>Order by</p>
            <div className='w-full flex flex-wrap'>
              {
                orders.map((item, i) => {
                  return (
                    <>
                      <button 
                        key={i} 
                        className={`bg-ghostwhite-50 hover:bg-ghostwhite-100 mt-1 py-1 px-3 text-sm ${order == i && "border border-navyblue-800"} rounded-sm me-2`}
                        onClick={() => {setOrder(i)}}  
                      >
                        {item}
                      </button>
                    </>
                  )
                })
              }
            </div>

            <p className='mt-3'>Date posted</p>
            <div className='w-full flex flex-wrap'>
              {
                dates.map((item, i) => {
                  return (
                    <>
                      <button 
                        key={i} 
                        className={`bg-ghostwhite-50 hover:bg-ghostwhite-100 mt-1 py-1 px-3 text-sm ${date == i && "border border-navyblue-800"} rounded-sm me-2`}
                        onClick={() => {setDate(i)}}  
                      >
                        {item}
                      </button>
                    </>
                  )
                })
              }
            </div>

          </div>

          <div className='w-[20%] relative'>
            
          </div>

        </div>

        <div className=' h-12 relative'>
          <button 
            className=' bg-navyblue-700 hover:bg-navyblue-800 text-ghostwhite-50 py-1 px-5 rounded transition-colors duration-300 absolute bottom-0 right-0'
            onClick={() => {setShowFilter(false)}}
          >
            Apply
          </button>

        </div>
      </div>
    </>
  )
}
