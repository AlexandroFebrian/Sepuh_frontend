/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";

export default function WorkHistoryViewModel() {
  const { checkToken, getUserProfile, fetchActivity } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  const [profile, setProfile] = useState(null);
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    checkToken();
    window.scrollTo({ top: 0, behavior: "smooth" });
    getUserProfile(setProfile);
    fetchActivity(setActivity);

    return () => {
      setProfile(null);
    };
  }, []);

  return {
    isLogin,
    user,
    profile,
    activity,
  };
}
