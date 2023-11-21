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

  async function signIn(){

  }

  async function signUp(){

  }

  async function checkToken(){

  }

  return {
    signIn,
    signUp,
    checkToken,
  }
}