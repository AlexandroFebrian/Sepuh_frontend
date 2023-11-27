import React, { useEffect } from 'react'
import { useState } from 'react'

export default function Filter({setShowFilter, close, closeFilter}) {
  const [sort, setSort] = useState(0)
  const [order, setOrder] = useState(0)
  const [date, setDate] = useState(0)

  const sorts = ["Uploaded", "Duration", "Salary", "Name", "Rating"]
  const orders = ["Ascending", "Descending"]
  const dates = ["All", "Past 24 hours", "This week", "This month", "Last Month", "Last 3 months", "Last 6 months"]

  useEffect(() => {
    setSort(sessionStorage.getItem("sort") || 0)
    setOrder(sessionStorage.getItem("order") || 0)
    setDate(sessionStorage.getItem("date") || 0)
  }, [])

  function apply(){
    sessionStorage.setItem("sort", sort)
    sessionStorage.setItem("order", order)
    sessionStorage.setItem("date", date)

    close()
  }

  return (
    <>
      <div className={`absolute top-9 w-full h-fit bg-ghostwhite-100 border border-navyblue-800 px-10 py-5 rounded-b animate__animated ${closeFilter ? "animate__fadeOutUp" : "animate__fadeInDown"} animate__faster`}>
        <p className="text-2xl">Filters</p>
        
        <div className='flex'>
          <div className='w-[90%]'>
            <p className='mt-3'>Sort by</p>
            <div className='w-full flex flex-wrap'>
              {
                sorts.map((item, i) => {
                  return (
                    <button 
                      key={i} 
                      className={`bg-ghostwhite-50 hover:bg-ghostwhite-100 mt-3 py-1 px-3 text-sm ${sort == i && "border border-navyblue-800"} rounded-sm me-3`}
                      onClick={() => {setSort(i)}}  
                    >
                      {item}
                    </button>
                  )
                })
              }
            </div>

            <p className='mt-3'>Order by</p>
            <div className='w-full flex flex-wrap'>
              {
                orders.map((item, i) => {
                  return (
                    <button 
                      key={i} 
                      className={`bg-ghostwhite-50 hover:bg-ghostwhite-100 mt-3 py-1 px-3 text-sm ${order == i && "border border-navyblue-800"} rounded-sm me-3`}
                      onClick={() => {setOrder(i)}}  
                    >
                      {item}
                    </button>
                  )
                })
              }
            </div>

            <p className='mt-3'>Date posted</p>
            <div className='w-full flex flex-wrap'>
              {
                dates.map((item, i) => {
                  return (
                    <button 
                      key={i} 
                      className={`bg-ghostwhite-50 hover:bg-ghostwhite-100 mt-3 py-1 px-3 text-sm ${date == i && "border border-navyblue-800"} rounded-sm me-3`}
                      onClick={() => {setDate(i)}}  
                    >
                      {item}
                    </button>
                  )
                })
              }
            </div>

          </div>

          <div className='w-[10%] relative'>
            
          </div>

        </div>

        <div className=' h-12 relative'>
          <button 
            className=' bg-navyblue-700 hover:bg-navyblue-800 text-ghostwhite-50 py-1 px-5 rounded transition-colors duration-300 absolute bottom-0 right-0'
            onClick={() => {apply()}}
          >
            Apply
          </button>

        </div>
      </div>
    </>
  )
}
