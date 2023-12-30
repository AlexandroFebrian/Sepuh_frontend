import { useEffect, useState } from "react";
import fetch from "../../../Client/fetch";
export default function DetailsPostViewModel() {
  const { getUserPostsByEmail, checkTokenAdmin } = fetch();
  const [emailSearch, setEmailSearch] = useState("");

  const [Posts, setPosts] = useState([]);
  async function fetchData() {
    const res = await getUserPostsByEmail(emailSearch, setPosts);
  }

  useEffect(() => {
    checkTokenAdmin();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    checkTokenAdmin();
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchData();
  }, [emailSearch]);

  return {
    emailSearch,
    setEmailSearch,
  };
}
