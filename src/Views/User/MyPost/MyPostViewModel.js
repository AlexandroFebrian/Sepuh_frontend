import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";
import { useEffect, useState } from "react";


export default function MyPostViewModel(){
  const { checkToken, myPost } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);
  
  const [posts, setPosts] = useState([])

  useEffect(() => {
    checkToken();
  }, [])

  useEffect(() => {
    if(user){
      myPost(user.email, setPosts)
    }
  }, [user])

  return {
    isLogin,
    user,
    posts
  }
}