import React from 'react'
import CategoriesCard from './components/CategoriesCard'
import "../style/scrollbar.css"

export default function Categories() {
  const categories = [
    {
      img_url: "/carousel/carous_1.jpg",
      text: "Machine Learningasdsadsa"
    },
    {
      img_url: "/carousel/carous_1.jpg",
      text: "Machine Learning"
    },
    {
      img_url: "/carousel/carous_1.jpg",
      text: "Machine Learning"
    },
    {
      img_url: "/carousel/carous_1.jpg",
      text: "Machine Learning"
    },
    {
      img_url: "/carousel/carous_1.jpg",
      text: "Machine Learning"
    },
    {
      img_url: "/carousel/carous_1.jpg",
      text: "Machine Learning"
    },
    {
      img_url: "/carousel/carous_1.jpg",
      text: "Machine Learning"
    },
    {
      img_url: "/carousel/carous_1.jpg",
      text: "Machine Learning"
    },
    {
      img_url: "/carousel/carous_1.jpg",
      text: "Machine Learning"
    },
    {
      img_url: "/carousel/carous_1.jpg",
      text: "Machine Learning"
    },
    
  ]

  return (
    <>
      <div className='mb-16'>
        <h1 className='text-4xl font-bold mb-5'>Categories</h1>
        <div className='py-5 flex overflow-x-auto overflow-y-hidden h-[350px] custom-scrollbar'>
          {
            categories.map((category, idx) => <CategoriesCard photo={category.img_url} key={idx}>{category.text}</CategoriesCard>)
          }
          
        </div>
      </div>
    </>
  )
}
