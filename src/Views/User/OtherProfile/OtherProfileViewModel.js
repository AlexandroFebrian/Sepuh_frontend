import { useEffect } from "react";
import fetch from "../../../Client/fetch";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";


export default function OtherProfileViewModel(){
  const { checkToken, getUserProfileByEmail } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const email = params.get('email');
  console.log(email)
  

  useEffect(() => {
    checkToken();
  }, [])

  return {
    isLogin,
    user,
  }

}