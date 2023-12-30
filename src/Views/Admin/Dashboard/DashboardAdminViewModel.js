import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";

export default function DashboardAdminViewModel() {
  const { getAllAgreements, getAllUser, checkTokenAdmin } = fetch();

  const [activity, setActivity] = useState([]);
  const [freelancer, setFreelancer] = useState([]);
  const [company, setCompany] = useState([]);

  useEffect(() => {
    checkTokenAdmin();
    window.scrollTo({ top: 0, behavior: "smooth" });

    getAllUser().then((data) => {
      const user = data.users;

      user.map((item) => {
        if (item.role === "Freelancer") {
          setFreelancer((freelancer) => [...freelancer, item]);
        } else {
          setCompany((company) => [...company, item]);
        }
      });
    });

    getAllAgreements().then((data) => {
      setActivity(data);
    });

    return () => {
      setActivity([]);
      setFreelancer([]);
      setCompany([]);
    };
  }, []);

  return {
    activity,
    freelancer,
    company,
  };
}
