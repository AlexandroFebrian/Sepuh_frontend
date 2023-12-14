/* eslint-disable no-unused-vars */
import fetch from "../../../Client/fetch";
import { useEffect, useState } from "react";

export default function UserReportsViewModel() {
  const { getAllUser, getUserPostsByEmail } = fetch();

  const [Users, setUsers] = useState([]);
  const [Status, SetStatus] = useState([]);

  async function fetchData(first) {
    const res = await getAllUser();
    setUsers(res.users);
    if (first) SetStatus(res.users.map((user) => user.status));
  }

  useEffect(() => {
    fetchData(true);
  }, []);

  // useEffect(() => {
  //   fetchData();
  // }, [Status]);

  return {
    Users,
    Status,
  };
}
