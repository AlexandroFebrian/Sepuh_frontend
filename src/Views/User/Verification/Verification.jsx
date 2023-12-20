import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import fetch from '../../../Client/fetch'

export default function Verification() {
  const { verifyEmail } = fetch()
  
  const search = useSearchParams()
  const query = new URLSearchParams(search[0])
  const token = query.get("token")
  
  const navigate = useNavigate()

  const [err, setErr] = useState("")
  
  async function verifyUser(){
    const response = await verifyEmail(token)
    console.log(response)

    if(response.status == 201){
      navigate("/signin")
      return
    }else{
      setErr("Something went wrong")
    }
  }

  useEffect(() => {
    verifyUser()
  }, [token])

  return (
    <div>
      {err}
    </div>
  )
}
