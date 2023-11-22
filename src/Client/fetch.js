import axios from 'axios';

export default function fetch(){
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
      return client.post('users/login', data).then((res) => {
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
      return client.post('users/register', data).then((res) => {
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

  }

  return {
    signIn,
    signUp,
    checkToken,
  }
}