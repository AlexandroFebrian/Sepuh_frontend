import React from 'react'
import CategoriesCard from './components/CategoriesCard'

export default function Categories() {
  const categories = [
    {
      img_url: "/carousel/carous_1.jpg",
      text: "Machine Learning",
      value: "machine learning"
    },
    {
      img_url: "/carousel/carous_1.jpg",
      text: "AI Development",
      value: "ai development"
    },
    {
      img_url: "/carousel/carous_1.jpg",
      text: "Blockchain & Cryptocurrency",
      value: "blockchain & cryptocurrency"
    },
    {
      img_url: "/carousel/carous_1.jpg",
      text: "Logo Design",
      value: "logo design"
    },
    {
      img_url: "/carousel/carous_1.jpg",
      text: "Art & Illustration",
      value: "art & illustration"
    },
    {
      img_url: "/carousel/carous_1.jpg",
      text: "Midjourney Artists",
      value: "midjourney artists"
    }
    
  ]

  return (
    <>
      <div className='mb-16'>
        <h1 className='text-4xl font-bold mb-5'>Top Categories</h1>
        <div className='py-5 flex overflow-x-auto overflow-y-hidden h-[350px] custom-scrollbar'>
          {
            categories.map((category, idx) => <CategoriesCard category={category} key={idx}></CategoriesCard>)
          }
          
        </div>
      </div>
    </>
  )
}
