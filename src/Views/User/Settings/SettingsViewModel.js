import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";
import { useEffect, useState } from "react";
export default function SettingsViewModel() {
  const { checkToken, changePassword } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  useEffect(() => {
    checkToken();
  }, []);

  const changePasswordHandler = async (data) => {
    const res = await changePassword(data);

    if (res.status === 200) {
      alert("Password has been changed");
    } else {
      alert("Password change failed");
    }
  };

  return {
    isLogin,
    user,
    changePasswordHandler,
  };
}
