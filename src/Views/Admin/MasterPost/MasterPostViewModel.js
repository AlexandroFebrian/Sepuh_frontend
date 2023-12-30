/* eslint-disable no-unused-vars */
import fetch from "../../../Client/fetch";
import { useEffect, useState } from "react";

export default function MasterPostViewModel() {
  const { getAllUser, getUserPostsByEmail, checkTokenAdmin } = fetch();

  const [Users, setUsers] = useState([]);
  const [Status, SetStatus] = useState([]);

  async function fetchData(first) {
    const res = await getAllUser();
    setUsers(res.users);
    if (first) SetStatus(res.users.map((user) => user.status));
  }

  async function fetchPosts(email) {
    const res = await getUserPostsByEmail(email);
    console.log(res);
  }

  useEffect(() => {
    checkTokenAdmin();
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchData(true);
  }, []);

  // useEffect(() => {
  //   fetchData();
  // }, [Status]);

  return {
    Users,
    fetchPosts,
  };
}
