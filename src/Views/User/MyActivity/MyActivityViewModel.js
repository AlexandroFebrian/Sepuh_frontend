import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function MyActivityViewModel(){
  const { checkToken, fetchActivity } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);
  
  const location = useLocation();
  const navigate = useNavigate();

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
  
  useEffect(() => {
    if(location.pathname == "/activity"){
      navigate("/activity/ongoing", { replace: true })
    }

  }, [location])

  return {
    isLogin,
    user,
    activity
  }
}