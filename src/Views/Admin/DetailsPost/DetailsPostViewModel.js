import { useEffect, useState } from "react";
import fetch from "../../../Client/fetch";
export default function DetailsPostViewModel() {
  const { getUserPostsByEmail } = fetch();
  const [emailSearch, setEmailSearch] = useState("");

  const [Posts, setPosts] = useState([]);
  async function fetchData() {
    const res = await getUserPostsByEmail(emailSearch, setPosts);
  }

  useEffect(() => {
    fetchData();
  }, [emailSearch]);

  return {
    emailSearch,
    setEmailSearch,
  };
}
