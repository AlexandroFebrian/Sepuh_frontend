import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export default function DashboardViewModel(){
  const { checkToken } = fetch();

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