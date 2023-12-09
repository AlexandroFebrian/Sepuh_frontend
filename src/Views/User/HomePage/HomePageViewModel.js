import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function HomePageViewModel(){
  const { checkToken } = fetch();
  const navigate = useNavigate()
  const location = useLocation();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  useEffect(() => {
    checkToken();
  }, [])

  useEffect(() => {
    if(user && isLogin && user.role == "Company" && location.pathname == "/home"){
      navigate("/dashboard")
    }
  }, [user, isLogin])

  return {
    isLogin,
    user,
  }
}