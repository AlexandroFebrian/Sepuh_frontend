import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";
import { useEffect, useState } from "react";

export default function MessagesViewModel(){
  const { checkToken } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);
  

  const [selectedChat, setSelectedChat] = useState(null)

  useEffect(() => {
    checkToken();
  }, [])

  return {
    isLogin,
    user
  }
}