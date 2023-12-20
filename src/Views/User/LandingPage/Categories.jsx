import React from 'react'
import CategoriesCard from './components/CategoriesCard'

export default function Categories({photos}) {
  const categories = [
    {
      text: "Machine Learning",
      value: "machine learning",
      img_url: photos[0]
    },
    {
      text: "AI Development",
      value: "ai development",
      img_url: photos[1]
    },
    {
      text: "Blockchain & Cryptocurrency",
      value: "blockchain & cryptocurrency",
      img_url: photos[2]
    },
    {
      text: "Logo Design",
      value: "logo design",
      img_url: photos[3]
    },
    {
      text: "Art & Illustration",
      value: "art & illustration",
      img_url: photos[4]
    },
    {
      text: "Midjourney Artists",
      value: "midjourney artists",
      img_url: photos[5]
    },
    {
      text: "UX Design",
      value: "ux design",
      img_url: photos[6]
    }
    
  ]

  return (
    <>
      <div className='mb-16'>
        <h1 className='text-4xl font-bold mb-5'>Top Categories</h1>
        <div className='py-5 flex overflow-x-auto overflow-y-hidden h-[350px] custom-scrollbar'>
          {
            categories.map((category, idx) => <CategoriesCard category={category} key={idx} photos={photos}></CategoriesCard>)
          }
        </div>
      </div>
    </>
  )
}
