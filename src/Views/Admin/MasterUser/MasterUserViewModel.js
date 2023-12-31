/* eslint-disable no-unused-vars */
import fetch from "../../../Client/fetch";
import { useEffect, useState } from "react";

export default function MasterUserViewModel() {
  const { checkToken, getAllUser, BanUser, UnbanUser, checkTokenAdmin } =
    fetch();

  const [Users, setUsers] = useState([]);
  const [Status, SetStatus] = useState([]);

  async function fetchData(first) {
    const res = await getAllUser();
    console.log(res.users);
    setUsers(res.users);

    if (first) SetStatus(res.users.map((user) => user.status));
  }

  useEffect(() => {
    checkTokenAdmin();
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchData(true);
  }, []);

  // useEffect(() => {
  //   fetchData();
  // }, [Status]);

  async function BanUserVM(email) {
    const res = await BanUser(email);
    fetchData();
  }

  async function UnbanUserVM(email) {
    const res = await UnbanUser(email);
    fetchData();
  }

  return {
    Users,
    BanUserVM,
    UnbanUserVM,
    Status,
    SetStatus,
  };
}
