import { useSelector } from 'react-redux'
import fetch from '../../Client/fetch'
import { useEffect, useState } from 'react'
import { get, set } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

export default function ListContentViewModel(){
  const { getList } = fetch()

  const isLogin = useSelector((state) => state.user.isLogin)
  const user = useSelector((state) => state.user.userDetail)

  const [categoryFilter, setCategoryFilter] = useState("")

  const [list, setList] = useState([])

  useEffect(() => {
    setList([])

    if(user){
      getList(setList)

    }

  }, [user])

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  let searchs = params.get('search');
  if(!searchs) searchs = ""

  useEffect(() => {
    if(sessionStorage.getItem("category")) {
      setCategoryFilter(sessionStorage.getItem("category"))
    }

  }, [])

  return {
    isLogin,
    user,
    categoryFilter,
    setCategoryFilter,
    list,
    setList,
    searchs
  }
}