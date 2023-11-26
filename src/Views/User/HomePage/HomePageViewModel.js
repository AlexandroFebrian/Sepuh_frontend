import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";
import { useEffect } from "react";


export default function HomePageViewModel(){
  const { checkToken } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  useEffect(() => {
    checkToken();
  }, [])

  return {
    isLogin,
    user
  }
}