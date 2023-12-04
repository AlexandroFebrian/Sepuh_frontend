/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";

export default function BankAccountViewModel() {
  const { checkToken, getUserProfile, getAllBankName } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  const [profile, setProfile] = useState(null);

  const [bankName, setBankName] = useState([]);

  const getBankName = async () => {
    const result = await getAllBankName(setBankName);
    console.log(result);
    return result;
  };

  useEffect(() => {
    checkToken();
    window.scrollTo({ top: 0, behavior: "smooth" });
    getUserProfile(setProfile);

    getAllBankName(setBankName);

    return () => {
      setProfile(null);
    };
  }, []);

  return {
    isLogin,
    user,
    profile,
    bankName,
  };
}
