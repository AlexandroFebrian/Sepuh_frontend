/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import fetch from "../../../Client/fetch";

export default function IncomeReportsViewModelAdmin() {
  const { getAllAgreements, checkTokenAdmin } = fetch();

  const [activity, setActivity] = useState([]);

  useEffect(() => {
    checkTokenAdmin();
    window.scrollTo({ top: 0, behavior: "smooth" });

    getAllAgreements().then((data) => {
      setActivity(data);
    });
  }, []);

  return {
    activity,
  };
}
