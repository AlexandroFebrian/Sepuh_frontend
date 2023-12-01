import { useEffect, useState } from "react";
import fetch from "../../../Client/fetch";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";


export default function OtherProfileViewModel(){
  const { checkToken, getUserProfileByEmail, getUserPostByEmail } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const email = params.get('email');

  const [profile, setProfile] = useState(null);
  const [post, setPost] = useState(null);
  

  useEffect(() => {
    checkToken();
    getUserProfileByEmail(email, setProfile)
    getUserPostByEmail(email, setPost)
  }, [])

  return {
    isLogin,
    user,
    profile,
    post,
  }

}