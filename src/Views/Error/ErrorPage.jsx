import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.log(error)

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      {
        error.status == 403
        &&
        <div>
          <h1 className='font-bold text-8xl text-center mb-5'>403</h1>
          <h2 className='text-center text-4xl font-bold'>You are not allowed to see this page</h2>
        </div>
      }
      {
        error.status == 404
        &&
        <div>
          <h1 className='font-bold text-8xl text-center mb-5'>404</h1>
          <h2 className='text-center text-4xl font-bold'>Page not found</h2>
        </div>
      }
    </div>
  )
}
