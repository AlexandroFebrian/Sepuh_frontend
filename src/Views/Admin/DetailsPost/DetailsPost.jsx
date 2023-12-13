// ambil email dari parameter url

import { useSearchParams } from "react-router-dom";
import DetailsPostViewModel from "./DetailsPostViewModel";
import { useEffect } from "react";
export default function DetailsPost() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { emailSearch, setEmailSearch } = DetailsPostViewModel();

  useEffect(() => {
    setEmailSearch(email);
  }, [emailSearch]);

  return <div>DetailsPost</div>;
}
