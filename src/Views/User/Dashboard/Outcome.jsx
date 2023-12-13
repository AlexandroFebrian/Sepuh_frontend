import { Button } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';

export default function Outcome({activity}) {
  return (
    <>
      <h2 className='text-2xl font-bold'>
        Outcome
      </h2> 

      <div className='w-full mt-5 flex justify-center'>
        <div className='w-2/3'>
          {activity.sort((a, b) => new Date(b.create_at) - new Date(a.create_at)).map((item, idx) => {
            const date = new Date(item.create_at)

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

            const payed = new Intl.NumberFormat('id-ID', {
              minimumFractionDigits: 2,
            }).format(item.deal_price)

            return (
              <div key={idx} className='w-full bg-lightblue-50 rounded-lg mb-4 flex items-center min-h-32 max-h-fit'>
                <div
                  style={{ backgroundImage: `url('${item.post.image[0]}')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
                  className='w-56 h-32 rounded-l-lg bg-navyblue-100'
                />
                <div className='w-full flex justify-between items-center px-5 py-3'>
                  <div>
                    <h3 className='text-navyblue-500 font-semibold text-xl'>
                      {item.post.title}
                    </h3>
                    <Link to={`profile?email=${item.freelancer.email}`}>
                      <h4 className='text-md hover:underline'>
                        {item.freelancer.name}
                      </h4>
                    </Link>
                    
                    <p className=' text-ghostwhite-600 text-sm'>
                      {date.getDate()} {monthNames[date.getMonth()]} {date.getFullYear()}
                    </p>
                  </div>

                  <div className=' w-44'>
                    <Link to={`/activity/${item._id}`} className='flex justify-end'>
                      <Button
                        color="ghostwhite.50"
                        bg="indigo.300"
                        _hover={{ bg: "indigo.350" }}
                        _active={{ bg: "indigo.400" }}
                        width="8.5rem"
                        transitionDuration={"300ms"}
                      >
                        View details
                      </Button>
                    </Link>
                    <div className='flex justify-between font-semibold'>
                      <p>Payed: </p>
                      <p>Rp. {payed}</p>
                    </div>

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
