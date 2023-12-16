import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";

export default function DashboardAdminViewModel() {
  const { getAllAgreements, getAllUser } = fetch();

  const [activity, setActivity] = useState([]);
  const [freelancer, setFreelancer] = useState([]);
  const [company, setCompany] = useState([]);

  useEffect(() => {
    getAllUser().then((data) => {
      const user = data.users;

      user.map((item) => {
        if (item.role === "Freelancer") {
          console.log(
            "item dengan nama" +
              item.name +
              "adalah freelancer dan akan di push ke array freelancer"
          );
          setFreelancer((freelancer) => [...freelancer, item]);
          console.log(freelancer);
        } else {
          console.log(
            "item dengan nama" +
              item.name +
              "adalah company dan akan di push ke array company"
          );
          setCompany((company) => [...company, item]);
          console.log(company);
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
