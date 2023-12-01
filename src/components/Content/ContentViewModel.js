import { useSelector } from 'react-redux'
import fetch from '../../Client/fetch'
import { useEffect, useState } from 'react'
import { set } from 'react-hook-form'

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

  return {
    isLogin,
    user,
    setCategoryFilter,
    companyPost,
    freelancerPost,
  }
}