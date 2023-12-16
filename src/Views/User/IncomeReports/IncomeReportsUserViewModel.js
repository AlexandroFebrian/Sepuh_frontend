import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";
import { useEffect, useState } from "react";

export default function IncomeReportsUserViewModel() {
  const { checkToken, getAllAgreementsUser } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    checkToken();

    getAllAgreementsUser().then((res) => {
      setAgreements(res);
    });
  }, []);

  return {
    isLogin,
    user,
    agreements,
  };
}
