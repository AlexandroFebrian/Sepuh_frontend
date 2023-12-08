import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";

export default function DashboardAdminViewModel() {
  const [dummy, setDummy] = useState([
    {
      income: 9500000,
      expense: 5500000,
    },
    {
      income: 12500000,
      expense: 3500000,
    },
    {
      income: 7500000,
      expense: 10500000,
    },
    {
      income: 1500000,
      expense: 11500000,
    },
    {
      income: 6500000,
      expense: 8500000,
    },
    {
      income: 4500000,
      expense: 2500000,
    },
  ]);

  return {
    dummy,
  };
}
