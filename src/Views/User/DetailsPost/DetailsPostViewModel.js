import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function DetailsPostViewModel(){
  const { checkToken, getPostById, applyJob } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  const [post, setPost] = useState(null);
  const { postId } = useParams();

  const [wait, setWait] = useState(false)
  const [popup, setPopup] = useState(false)
  const [popupTitle, setPopupTitle] = useState("")
  const [popupButtonMessage, setPopupButtonMessage] = useState("")
  const [popupType, setPopupType] = useState(false)

  useEffect(() => {
    checkToken();
    getPostById(postId, setPost);
  }, [])

  async function applyHandler(){
    setWait(true)

    const response = await applyJob(setWait, setPopup)

    if(response == undefined){
      setPopupTitle("Network Error!")
      setPopupButtonMessage("Try Again")
      setPopupType(false)
      return
    }

    if(response.status.toString()[0] != 2){
      // console.log(response)
      setPopupTitle(response.data.message)
      setPopupButtonMessage("Try Again")
      setPopupType(false)
      return
    }

    setPopupTitle("Apply Success")
    setPopupButtonMessage("Close")
    setPopupType(true)
  }

  return {
    isLogin,
    user,
    post,
    wait,
    popup,
    popupTitle,
    popupButtonMessage,
    popupType,
    setPopup,
    setWait,
    applyHandler
  }
}