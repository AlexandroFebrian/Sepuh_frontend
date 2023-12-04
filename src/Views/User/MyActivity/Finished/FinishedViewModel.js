import { useSelector } from "react-redux";
import fetch from "../../../../Client/fetch";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export default function FinishedViewModel(){

  const { checkToken, fetchActivity } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);
  
  const [activity, setActivity] = useState([])

  useEffect(() => {
    checkToken();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  useEffect(() => {
    if(user){
      fetchActivity(setActivity)
    }
  }, [user])

  return {
    isLogin,
    user,
  }
}