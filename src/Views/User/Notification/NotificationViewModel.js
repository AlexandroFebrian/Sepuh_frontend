import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fetch from "../../../Client/fetch";


export default function NotificationViewModel(){
  const { checkToken } = fetch();
  const navigate = useNavigate()
  const location = useLocation();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  useEffect(() => {
    checkToken();
  }, [])

  return {
    isLogin,
    user,
  }
}