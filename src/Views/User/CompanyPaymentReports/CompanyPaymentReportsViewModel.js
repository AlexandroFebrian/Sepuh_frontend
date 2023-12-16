/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";
export default function CompanyPaymentReportsViewModel() {
  const { checkToken, getAllAgreementsUser } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    getAllAgreementsUser().then((res) => {
      console.log(res);
      setAgreements(res);
    });
  }, []);

  return {
    isLogin,
    user,
    agreements,
  };
}
