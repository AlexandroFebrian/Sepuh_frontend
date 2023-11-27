import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { setIsLogin, setUserDetail } from '../redux/UserSlice';
import { setCategory } from '../redux/PostSlice';
import { useDispatch } from 'react-redux';

export default function fetch(){
  const navigate = useNavigate()
  const location = useLocation()

  const dispatch = useDispatch()

  const baseURL = import.meta.env.VITE_BACKEND_URL
  const client = axios.create({
    baseURL,
    headers:{
      "Content-type":"application/json",
    }
  })

  const clientFile = axios.create({
    baseURL,
    headers:{
      "Content-type":"multipart/form-data",
    }
  })

  async function signIn(data, setWait, setPopup){
    try {
      return await client.post('users/login', data).then((res) => {
        setPopup(true)
        return res
      }).catch((err) => {
        setPopup(true)
        return err.response
      })
    } catch (error) {
      setWait(false)
      alert("error")
    }
  }

  async function signUp(data, setWait, setPopup){
    try {
      return await client.post('users/register', data).then((res) => {
        setPopup(true)
        return res
      }).catch((err) => {
        setPopup(true)
        return err.response
      })
    } catch (error) {
      setWait(false)
      alert("error")
    }
  }

  async function checkToken(){
    const token = localStorage.getItem('token')
    
    try {
      return await client.post('cekToken', {token: token}).then((res) => {
        dispatch(setIsLogin(true))
        dispatch(setUserDetail(res.data.data))
      }).catch((err) => {
        if(location.pathname == "/" || location.pathname == "/home"){
        }else{
          navigate("/")
        }
      })
    } catch (error) {
      alert("error")
      navigate("/")
    }
  }

  async function getUserProfile(setProfile){
    const token = localStorage.getItem('token')

    try {
      return await client.get('users/profile', {
        headers:{
          "Authorization": `Bearer ${token}`
        }
      }).then((res) => {
        setProfile(res.data)
        return res.data
      }).catch((err) => {
        alert("error fetching user profile")
      
      })
    } catch (error) {
      alert("error")
      navigate("/")
    }
  }

  async function updateUserProfile(data, setWait, setPopup){
    const token = localStorage.getItem('token')

    try {
      return await clientFile.put('users/profile', data, {
        headers:{
          "Authorization": `Bearer ${token}`
        }
      }).then((res) => {
        setPopup(true)
        return res
      }).catch((err) => {
        setPopup(true)
        return err.response
      })
    } catch (error) {
      alert("error")
      navigate("/")
    }
  }

  async function getCategory(){
    try {
      return await client.get('category').then((res) => {
        dispatch(setCategory(res.data))
      }).catch((err) => {
        alert("error fetching category")
        navigate("/")
      })
    } catch (error) {
      alert("error")
      navigate("/")
    }
  }

  async function postCompanyPost(data, setWait, setPopup){
    const token = localStorage.getItem('token')

    try {
      return await clientFile.post('posts/add', data, {
        headers:{
          "Authorization": `Bearer ${token}`
        }
      }).then((res) => {
        setPopup(true)
        return res
      }).catch((err) => {
        setPopup(true)
        return err.response
      })
    } catch (error) {
      alert("error")
    }
  }

  async function postFreelancerPost(data, setWait, setPopup){
    const token = localStorage.getItem('token')

    try {
      return await clientFile.post('posts/add', data, {
        headers:{
          "Authorization": `Bearer ${token}`
        }
      }).then((res) => {
        setPopup(true)
        return res
      }).catch((err) => {
        setPopup(true)
        return err.response
      })
    } catch (error) {
      alert("error")
      navigate("/")
    }
  }

  async function getCompanyPost(setCompanyPost){

  }

  async function getFreelancerPost(setFreelancerPost){
    
  }

  return {
    signIn,
    signUp,
    checkToken,
    getCategory,
    getUserProfile,
    updateUserProfile,
    postCompanyPost,
    postFreelancerPost,
  }
}