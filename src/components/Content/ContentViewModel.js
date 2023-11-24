import { useSelector } from 'react-redux'
import fetch from '../../Client/fetch'
import { useEffect, useState } from 'react'

export default function ContentViewModel(){
  const { getCategory, getCompanyPost } = fetch()

  const isLogin = useSelector((state) => state.user.isLogin)

  const [category, setCategory] = useState([])
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [companyPost, setCompanyPost] = useState([])

  useEffect(() => {
    if(isLogin){
      getCategory(setCategory)
    }
  }, [isLogin])

  return {
    isLogin,
    category,
    setCategoryFilter,
  }
}