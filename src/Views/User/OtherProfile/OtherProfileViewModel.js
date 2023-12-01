import { useEffect, useState } from "react";
import fetch from "../../../Client/fetch";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";


export default function OtherProfileViewModel(){
  const { checkToken, getUserProfileByEmail, getUserPostsByEmail } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const email = params.get('email');

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState(null);
  

  useEffect(() => {
    checkToken();
    getUserProfileByEmail(email, setProfile)
    getUserPostsByEmail(email, setPosts)
  }, [])

  return {
    isLogin,
    user,
    profile,
    posts,
  }

}