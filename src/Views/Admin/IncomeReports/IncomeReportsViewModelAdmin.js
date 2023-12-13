/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import fetch from "../../../Client/fetch";

export default function IncomeReportsViewModelAdmin() {
  const { checkToken, getAllAgreements } = fetch();

  const [activity, setActivity] = useState([]);

  useEffect(() => {
    getAllAgreements().then((data) => {
      setActivity(data);
    });
  }, []);

  return {
    activity,
  };
}
