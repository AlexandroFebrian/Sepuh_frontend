import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export default function DashboardViewModel(){
  const { checkToken, myPost, fetchActivity, getUserNotifications } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  const [page, setPage] = useState(-1)

  const [activity, setActivity] = useState([])
  const [ongoing, setOngoing] = useState(0)
  const [outcome, setOutcome] = useState(0)
  const [formattedOutcome, setFormattedOutcome] = useState(0)

  const [post, setPost] = useState([]);
  const [visitor, setVisitor] = useState(0);

  const [notifications, setNotifications] = useState([]);
  const [applicants, setApplicants] = useState(0);

  useEffect(() => {
    checkToken();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  useEffect(() => {
    if(user){
      fetchActivity(setActivity)
      myPost(user.email, setPost)
      getUserNotifications(setNotifications)
    }
  }, [user])

  useEffect(() => {
    setOngoing(0)
    setOutcome(0)
    if(activity.length > 0){
      activity.map((item) => {
        if(item.status >= 0 && item.status <= 1 ){
          setOngoing(prev => prev + 1)
        }
        if(item.status >= 2){
          setOutcome(prev => prev + item.deal_price)
        }
      })
    }
  }, [activity])

  useEffect(() => {
    setFormattedOutcome(new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
    }).format(outcome))
  }, [outcome])

  useEffect(() => {
    setVisitor(0)
    if(post.length > 0){
      post.map((item) => {
        setVisitor(prev => prev + item.visitor)
      })
    }
  }, [post])

  useEffect(() => {
    if(notifications.length > 0){
      notifications.map((item) => {
        if(item.category == "Applied" && item.status == 0){
          setApplicants(prev => prev + 1)
        }
      })
    }
  }, [notifications])

  return {
    isLogin,
    user,
    page,
    setPage,
    activity,
    ongoing,
    formattedOutcome,
    post,
    visitor,
    applicants
  }
}
