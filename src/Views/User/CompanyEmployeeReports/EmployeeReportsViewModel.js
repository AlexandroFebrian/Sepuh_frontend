import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";
import { useEffect, useState } from "react";

export default function EmployeeReportsViewModel() {
  const { checkToken, getEmployees } = fetch();

  const [employees, setEmployees] = useState([]);
  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  useEffect(() => {
    checkToken();

    getEmployees(setEmployees);
    console.log(employees);
  }, []);

  return {
    isLogin,
    user,
    employees,
  };
}
