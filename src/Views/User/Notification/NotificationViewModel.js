import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fetch from "../../../Client/fetch";


export default function NotificationViewModel(){
  const { checkToken, getUserNotifications, hireAccept, hireReject, createMessage } = fetch();
  const navigate = useNavigate()
  const location = useLocation();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  const [wait, setWait] = useState(false)
  const [popup, setPopup] = useState(false)
  const [popupTitle, setPopupTitle] = useState("")
  const [popupType, setPopupType] = useState(undefined)
  const [popupButtonMessage, setPopupButtonMessage] = useState("")
  const [popupButtonMessage2, setPopupButtonMessage2] = useState("")

  const [notifications, setNotifications] = useState([]);
  const [status, setStatus] = useState(0);
  const [notifId, setNotifId] = useState(-1);

  useEffect(() => {
    checkToken();
  }, [])

  useEffect(() => {
    if(user){
      getUserNotifications(setNotifications)
    }
  }, [user])

  async function acceptHandler(id){
    setStatus(1)
    setNotifId(id)

    setWait(true)
    setPopup(true)

    setPopupTitle("Are you sure do you want to accept?")
    setPopupButtonMessage("Close")
    setPopupButtonMessage2("Accept")
    setPopupType("?")
  }

  async function rejectHandler(id){
    setStatus(-1)
    setNotifId(id)

    setWait(true)
    setPopup(true)

    setPopupTitle("Are you sure do you want to reject?")
    setPopupButtonMessage("Close")
    setPopupButtonMessage2("Reject")
    setPopupType("?")
  }

  async function accept(){
    const response = await hireAccept(notifId, setPopup, setNotifications)

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
      setPopupButtonMessage("Close")
      setPopupType(false)
      setPopupButtonMessage2(undefined)
      return
    }

    setPopupTitle("Accepted!")
    setPopupButtonMessage("Close")
    setPopupType(true)
    setPopupButtonMessage2(undefined)
  }

  async function reject(){
    const response = await hireReject(notifId, setPopup, setNotifications)

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
      setPopupButtonMessage("Close")
      setPopupType(false)
      setPopupButtonMessage2(undefined)
      return
    }

    setPopupTitle("Rejected!")
    setPopupButtonMessage("Close")
    setPopupType(true)
    setPopupButtonMessage2(undefined)
  }

  async function chatHandler(email) {
    createMessage(email);
  }

  return {
    isLogin,
    user,
    notifications,
    acceptHandler,
    rejectHandler,
    accept,
    reject,
    wait,
    popup,
    popupTitle,
    popupType,
    popupButtonMessage,
    popupButtonMessage2,
    setPopup,
    setWait,
    setPopupType,
    status,
    chatHandler
  }
}
