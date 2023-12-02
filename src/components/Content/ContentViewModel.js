import { useSelector } from 'react-redux'
import fetch from '../../Client/fetch'
import { useEffect, useState } from 'react'
import { set } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

export default function ContentViewModel(){
  const { getCompanyPost, fetchCompanyPost, fetchFreelancerPost } = fetch()

  const isLogin = useSelector((state) => state.user.isLogin)
  const user = useSelector((state) => state.user.userDetail)

  const [categoryFilter, setCategoryFilter] = useState("")

  const [companyPost, setCompanyPost] = useState([])
  const [freelancerPost, setFreelancerPost] = useState([])

  useEffect(() => {
    setCompanyPost([])
    setFreelancerPost([])

    if(user){
      if(user.role == "Freelancer"){
        fetchCompanyPost(setCompanyPost)
      }else if(user.role == "Company"){
        fetchFreelancerPost(setFreelancerPost)
      }else{
        
      }

    }

  }, [user])

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  let searchs = params.get('search');
  if(!searchs) searchs = ""

  return {
    isLogin,
    user,
    categoryFilter,
    setCategoryFilter,
    companyPost,
    freelancerPost,
    searchs
  }
}