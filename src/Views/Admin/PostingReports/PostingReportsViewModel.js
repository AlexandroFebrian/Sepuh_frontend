/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import fetch from "../../../Client/fetch";

export default function PostingReportsViewModelAdmin() {
  const { getAllUser, getUserPostsByEmail } = fetch();

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
    fetchData(true);
  }, []);

  // useEffect(() => {
  //   fetchData();
  // }, [Status]);

  return {
    Users,
    Status,
    fetchPosts,
  };
}
