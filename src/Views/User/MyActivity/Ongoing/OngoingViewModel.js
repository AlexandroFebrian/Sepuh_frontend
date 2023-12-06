import { useSelector } from "react-redux";
import fetch from "../../../../Client/fetch";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export default function OngoingViewModel(){

  const { checkToken, fetchActivity, getPostById } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);
  
  const [activity, setActivity] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    checkToken();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  return {
    isLogin,
    user,
    activity,
    posts
  }
}