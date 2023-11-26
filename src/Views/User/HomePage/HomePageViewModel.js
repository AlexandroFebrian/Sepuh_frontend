import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";
import { useEffect } from "react";


export default function HomePageViewModel(){
  const { checkToken } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    checkToken();
  }, [])

  return {
    isLogin,
  }
}