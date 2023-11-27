import { useSelector } from 'react-redux'
import fetch from '../../Client/fetch'
import { useEffect, useState } from 'react'

export default function ContentViewModel(){
  const { getCompanyPost, fetchCompanyPost, fetchFreelancerPost } = fetch()

  const isLogin = useSelector((state) => state.user.isLogin)
  const user = useSelector((state) => state.user.userDetail)

  const [categoryFilter, setCategoryFilter] = useState("")

  const [companyPost, setCompanyPost] = useState([])
  const [freelancerPost, setFreelancerPost] = useState([])

  useEffect(() => {
    if(user){
      if(user.role == "Freelancer"){
        fetchCompanyPost(setCompanyPost)
      }else{
        fetchFreelancerPost(setFreelancerPost)
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