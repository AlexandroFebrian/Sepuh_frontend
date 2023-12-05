import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function DetailsPostViewModel(){
  const navigate = useNavigate()
  const { checkToken, getPostById, createAgreements } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  const [post, setPost] = useState(null);
  const { postId } = useParams();

  const [wait, setWait] = useState(false)
  const [popup, setPopup] = useState(false)
  const [popupTitle, setPopupTitle] = useState("")
  const [popupType, setPopupType] = useState(undefined)
  const [popupButtonMessage, setPopupButtonMessage] = useState("")
  const [popupButtonMessage2, setPopupButtonMessage2] = useState("")

  useEffect(() => {
    checkToken();
    getPostById(postId, setPost);
  }, [])

  useEffect(() => {
    if(post && post.posted_by.email == user.email){
      console.log("post")
    }
  }, [post])

  async function agreementsHandler(){
    setWait(true)
    setPopup(true)

    setPopupTitle("Are you sure do you want to apply?")
    setPopupButtonMessage("Close")
    setPopupButtonMessage2("Apply")
    setPopupType("?")
  }

  async function applyHandler(){
    const email = post.posted_by.email
    const response = await createAgreements(email, postId, setWait, setPopup)

    if(response == undefined){
      setPopupTitle("Network Error!")
      setPopupButtonMessage("Try Again")
      setPopupType(false)
      setPopupButtonMessage2(undefined)
      return
    }

    if(response.status.toString()[0] != 2){
      // console.log(response)
      setPopupTitle(response.data.message)
      setPopupButtonMessage("Try Again")
      setPopupType(false)
      setPopupButtonMessage2(undefined)
      return
    }

    const id = response.data.id

    navigate(`/activity/${id}`)
  }

  return {
    isLogin,
    user,
    post,
    wait,
    popup,
    popupTitle,
    popupType,
    popupButtonMessage,
    popupButtonMessage2,
    setPopup,
    setWait,
    setPopupType,
    agreementsHandler,
    applyHandler
  }
}