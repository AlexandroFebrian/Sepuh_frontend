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

  async function signIn(data){
    try {
      client.post('users/login', data).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    } catch (error) {
      alert("error")
    }
  }

  async function signUp(data){
    try {
      client.post('users/register', data).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    } catch (error) {
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