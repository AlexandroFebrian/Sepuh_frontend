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

  // useEffect(() => {
  //   if(user){
  //     fetchActivity(setActivity)
  //   }
  // }, [user])

  // function setPostsLogic(newpost){
  //   setPosts(prev => [...prev, newpost])
  // }

  // useEffect(() => {
  //   if(activity.length > 0){
  //     // console.log(activity.length)
  //     const temp = []
  //     activity.map(async (item) => {
  //       // temp.push(await getPostById(item.post))
  //       const post = await getPostById(item.post)
  //       temp.push(post)
  //       if(temp.length == activity.length){
  //         setPosts(temp)
  //       }
  //     })
  //   }

  //   return () => {
  //     if(posts.length > 0){
  //       setPosts([])

  //     }
  //   }
  // }, [activity])

  // useEffect(() => {
  //   console.log(posts)
  // }, [posts])

  return {
    isLogin,
    user,
    activity,
    posts
  }
}