import React, { useEffect, useState } from 'react'
import NowHiring from '../NowHiring/NowHiring'
import { Combobox } from '../ui/Combobox'
import { useSelector } from 'react-redux'

export default function Content() {
  const isLogin = useSelector((state) => state.user.isLogin)

  const [category, setCategory] = useState([])
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    setCategory([
      {
        value: "machine learning",
        label: "Machine Learning"
      },
      {
        value: "data science",
        label: "Data Science"
      },
      {
        value: "web development",
        label: "Web Development"
      },
      {
        value: "mobile development",
        label: "Mobile Development"
      }
    ])
  }, [])

  useEffect(() => {
    console.log(categoryFilter)
  }, [categoryFilter])

  return (
    <>
      <div className="mid w-3/4">
        <div className=" min-h-[calc(100vh-5rem)] h-fit border-l-2 border-navyblue-600 z-0 px-10 py-10">
          {
            isLogin
            &&
            <Combobox 
              title={"Select Category"} 
              placeholder={"Search Category"} 
              empty={"No category found"} 
              items={category} 
              headerClassName={"w-72 mb-5"}
              contentClassName={" pt-1 border-0"}
              setFilter={setCategoryFilter}
            />
          }
          <div className=" h-[400px] w-full bg-slate-400 mb-10 rounded shadow-lg"></div>
          <div className=" h-[400px] w-full bg-slate-400 mb-10"></div>
          <div className=" h-[400px] w-full bg-slate-400 mb-10"></div>
          <div className=" h-[400px] w-full bg-slate-400 mb-10"></div>
        </div>
      </div>
      <div className="right w-1/4">
        <NowHiring />
      </div>
    </>
  )
}
