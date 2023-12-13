/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import fetch from "../../../Client/fetch";

export default function IncomeReportsViewModelAdmin() {
  const { checkToken, fetchActivity } = fetch();

  const [activity, setActivity] = useState([]);

  useEffect(() => {
    fetchActivity(setActivity);

    return () => {
      setActivity([]);
    };
  }, []);

  return {
    activity,
  };
}
