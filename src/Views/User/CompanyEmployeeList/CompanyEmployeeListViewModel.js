import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";
import { useEffect, useState } from "react";

export default function CompanyEmployeeViewModel() {
  const { checkToken, getEmployees } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if(user){
      getEmployees(setEmployees)
    }
  }, [user])

  return {
    isLogin,
    user,
    employees
  };
}
