import { useSelector } from 'react-redux'
import fetch from '../../Client/fetch'
import { useEffect, useState } from 'react'

export default function ContentViewModel(){
  const { getCompanyPost } = fetch()

  const isLogin = useSelector((state) => state.user.isLogin)
  const [categoryFilter, setCategoryFilter] = useState("")
  const [companyPost, setCompanyPost] = useState([])

  return {
    isLogin,
    setCategoryFilter,
  }
}