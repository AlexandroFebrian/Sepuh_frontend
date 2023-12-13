import { Button } from '@chakra-ui/react'
import React from 'react'
import { FaStar } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export default function Visitors({post}) {
  return (
    <>
      <h2 className='text-2xl font-bold'>
        Visitors
      </h2> 

      <div className='w-full mt-5 flex justify-center'>
        <div className='w-2/3'>
          {post.sort((a, b) => b.visitor - a.visitor).map((item, idx) => {
            const date = new Date(item.posted_at)

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
              <div key={idx} className='w-full bg-lightblue-50 rounded-lg mb-4 flex items-center min-h-32 max-h-fit'>
                <div
                  style={{ backgroundImage: `url('${item.image[0]}')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
                  className='w-56 h-32 rounded-l-lg bg-navyblue-100'
                />

                <div className='w-full flex justify-between items-center px-5 py-3'>
                  <div>
                    <div className='flex item-baseline'>
                      <h3 className='text-navyblue-500 font-semibold text-xl'>
                        {item.title} 
                      </h3>
                      &nbsp;
                      <div className='flex items-center'>
                        <FaStar className='text-yellow-500 mr-1' /> 
                        {item.avg_rating.toFixed(1)}
                        <span className='text-ghostwhite-600 text-sm font-normal ml-1'> ({item.comments.length})</span>
                        
                      </div>
                    </div>
                    <p className=' text-ghostwhite-600 text-sm'>
                      {date.getDate()} {monthNames[date.getMonth()]} {date.getFullYear()}
                    </p>
                  </div>
                  <div>
                    <Link to={`/post/${item._id}`}>
                      <Button
                        color="ghostwhite.50"
                        bg="indigo.300"
                        _hover={{ bg: "indigo.350" }}
                        _active={{ bg: "indigo.400" }}
                        width="8.5rem"
                        transitionDuration={"300ms"}
                      >
                        View post
                      </Button>
                    </Link>
                    <p>Visitors: {item.visitor}</p>
                  </div>
                </div>
              </div>
              
            )
          })}

        </div>
      </div>
    </>
  )
}