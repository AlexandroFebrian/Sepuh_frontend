import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import fetch from "../../../../Client/fetch";


export default function DetailActivityViewModel(){
  const { checkToken, getActivityById, setDealPrice, acceptAgreement, saveFileAgreement, agreementPayment, setPaymentStatus, rejectAgreement, doneProject, submitReview } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);
  
  const { actId } = useParams();
  // console.log(actId)

  const [wait, setWait] = useState(false)
  const [popup, setPopup] = useState(false)
  const [popupTitle, setPopupTitle] = useState("")
  const [popupMessage, setPopupMessage] = useState(null)
  const [popupButtonMessage, setPopupButtonMessage] = useState("")
  const [popupType, setPopupType] = useState(false)


  const [activity, setActivity] = useState()
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [priceBefore, setPriceBefore] = useState(0)
  const [price, setPrice] = useState(0)

  const [file, setFile] = useState([])

  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)
  const [ratingHover, setRatingHover] = useState(0)

  useEffect(() => {
    checkToken();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
  }, [])

  useEffect(() => {
    if(user && actId){
      getActivityById(actId, setActivity)
    }
  }, [user, actId])

  useEffect(() => {
    console.log(activity)

    if(!activity) return

    setMinPrice(new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
    }).format(activity?.post.min_price));
  
    setMaxPrice(new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
    }).format(activity?.post.max_price));

    setPriceBefore(new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
    }).format(activity?.deal_price));
  }, [activity])

  async function rejectHandler(){
    setWait(true)

    const response = await rejectAgreement(activity?._id, setActivity, setWait, setPopup)

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

    setPopupTitle("Reject Success")
    setPopupButtonMessage("Close")
    setPopupType(true)
  }

  const [err, setErr] = useState("")

  async function changeBidHandler(){
    if(price < activity?.post.min_price){
      setErr(`Price can't be less than Rp. ${minPrice}`)
      return
    }
    if(price > activity?.post.max_price){
      setErr(`Price can't be more than Rp. ${maxPrice}`)
      return
    }

    setWait(true)

    const response = await setDealPrice(activity?._id, price, setActivity, setWait, setPopup)

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

    setPopupTitle("Change Bid Success")
    setPopupButtonMessage("Close")
    setPopupType(true)
  }

  async function acceptBidHandler(){
    setWait(true)
    
    const response = await acceptAgreement(activity?._id, setActivity, setWait, setPopup)

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

    setPopupTitle("Accept Agreement Success")
    setPopupButtonMessage("Close")
    setPopupType(true)
  }

  async function saveFileHandler(){
    setWait(true)
    
    const response = await saveFileAgreement(activity?._id, file[0], setActivity, setWait, setPopup)
    
    setFile([])
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

    setPopupTitle("Save File Success")
    setPopupButtonMessage("Close")
    setPopupType(true)
  }

  async function doneHandler(){
    setWait(true)
    
    const response = await doneProject(activity?._id, setActivity, setWait, setPopup)

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

    setPopupTitle("Done Project Success")
    setPopupButtonMessage("Close")
    setPopupType(true)
    setErr("")
  }

  async function payHandler(){
    const response = await agreementPayment(activity, openSnap, setActivity)
  }

  async function openSnap(token, invoice){
    await window.snap.pay(token, {
      onSuccess: async function(result){
        // /* You may add your own implementation here */
        // alert("payment success!"); console.log(result);
        await setPaymentStatus(invoice, actId, setActivity)
        setWait(true)
        setPopup(true)
        setPopupTitle("Payment Success")
        setPopupButtonMessage("Close")
        setPopupType(true)
      },
      onPending: function(result){
        // /* You may add your own implementation here */
        // alert("wating your payment!"); console.log(result);
        setWait(true)
        setPopup(true)
        setPopupTitle("Payment on Pending")
        setPopupButtonMessage("Close")
        setPopupType(true)
      },
      onError: function(result){
        // /* You may add your own implementation here */
        // alert("payment failed!"); console.log(result);
        setWait(true)
        setPopup(true)
        setPopupTitle("Payment error")
        setPopupButtonMessage("Close")
        setPopupType(false)
      },
      onClose: function(){
        // /* You may add your own implementation here */
        // alert('you closed the popup without finishing the payment');
        setWait(true)
        setPopup(true)
        setPopupTitle("Payment canceled")
        setPopupButtonMessage("Close")
        setPopupType(false)
      }
    })
  }

  async function reviewHandler(){
    if(rating <= 0){
      setErr("Rating can't be 0")
      return
    }

    if(review == ""){
      setErr("Review can't be empty")
      return
    }

    setWait(true)
    
    const response = await submitReview(review, rating, activity?._id, setActivity, setWait, setPopup)

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

    setPopupTitle("Submit Review Success")
    setPopupMessage("Thank you for your feedback!")
    setPopupButtonMessage("Close")
    setPopupType(true)
    setErr("")
  }

  useEffect(() => {
    console.log(popup)
  }, [popup])

  return {
    isLogin,
    user,
    activity,
    setActivity,
    minPrice,
    maxPrice,
    priceBefore,
    err,
    setPrice,
    rejectHandler,
    changeBidHandler,
    acceptBidHandler,
    payHandler,
    file,
    setFile,
    saveFileHandler,
    wait,
    popup,
    popupTitle,
    popupMessage,
    popupButtonMessage,
    popupType,
    setPopup,
    setWait,
    setPopupType,
    doneHandler,
    review,
    setReview,
    rating,
    setRating,
    ratingHover,
    setRatingHover,
    reviewHandler
  }
}