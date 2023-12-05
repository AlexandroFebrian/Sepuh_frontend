import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import fetch from "../../../../Client/fetch";


export default function DetailActivityViewModel(){
  const { checkToken, getActivityById } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);
  
  const { actId } = useParams();
  // console.log(actId)

  const [activity, setActivity] = useState()

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
  }, [activity])

  return {
    isLogin,
    user,
    activity
  }
}