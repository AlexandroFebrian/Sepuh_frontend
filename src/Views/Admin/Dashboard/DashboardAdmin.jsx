import DashboardAdminViewModel from "./DashboardAdminViewModel";
import NavigationAdmin from "../../../components/NavigationAdmin/NavigationAdmin";
import { useEffect, useState } from "react";

import Chart from "react-apexcharts";
import { FaUser } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";

export default function DashboardAdmin() {
  const { activity, company, freelancer } = DashboardAdminViewModel();

  const [Income, setIncome] = useState([]);

  useEffect(() => {
    const income = activity.filter((item) => item.status === 2);
    setIncome(income);
  }, [activity]);

  const formatDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("default", { month: "long" });
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const formatAmount = (amount) => {
    const amountString = amount.toString();
    const amountLength = amountString.length;
    let amountFormatted = "";
    for (let i = 0; i < amountLength; i++) {
      if ((amountLength - i) % 3 === 0 && i !== 0) {
        amountFormatted += ".";
      }
      amountFormatted += amountString[i];
    }
    amountFormatted = "Rp. " + amountFormatted + ",00";
    return amountFormatted;
  };

  const getTotalIncome = () => {
    let total = 0;

    Income.map((item) => (total += item.deal_price * 0.1));
    return total;
  };

  return (
    <>
      <div className="container-dashboardAdmin flex">
        <div className="sideBar w-1/6 fixed left-0 ">
          <NavigationAdmin />
        </div>
        <div className="right w-5/6 absolute right-0 px-10">
          <div className="data w-full pt-10 grid grid-cols-4">
            <div className="totalincome bg-ghostwhite-100 w-3/4 h-40 my-5 p-5 rounded-lg shadow-lg flex flex-col justify-center items-center">
              <div className="icon">
                <FaMoneyBillWave size={32} />
              </div>
              <div className="totalincome-title">
                <h1 className="text-2xl font-bold text-gray-700 text-center">
                  Income this month
                </h1>
              </div>
              <div className="totalincome-content">
                <h1 className="text-xl font-bold text-gray-700 text-center">
                  {/* Rp. 100.000.000 */}
                  {formatAmount(getTotalIncome())}
                </h1>
              </div>
            </div>

            <div className="jumlahFreelancer bg-ghostwhite-100 w-3/4 h-40 my-5 p-5  rounded-lg shadow-lg flex flex-col justify-center items-center">
              <div className="icon">
                <FaUser size={32} />
              </div>
              <div className="jumlahFreelancer-title">
                <h1 className="text-2xl font-bold text-gray-700 text-center">
                  Jumlah Freelancer
                </h1>
              </div>
              <div className="jumlahFreelancer-content">
                <h1
                  className="text-xl font-bold text-gray-700 text-center"
                  id="jumlahFreelancer"
                >
                  {freelancer.length} User
                </h1>
              </div>
            </div>

            <div className="jumlahCompany bg-ghostwhite-100 w-3/4 h-40 my-5 p-5 rounded-lg shadow-lg flex flex-col justify-center items-center">
              <div className="icon">
                <FaUser size={32} />
              </div>
              <div className="right">
                <div className="jumlahCompany-title">
                  <h1 className="text-2xl font-bold text-gray-700 text-center">
                    Jumlah Company
                  </h1>
                </div>
                <div className="jumlahCompany-content">
                  <h1
                    className="text-xl font-bold text-gray-700 text-center"
                    id="jumlahCompany"
                  >
                    {company.length} User
                  </h1>
                </div>
              </div>
            </div>

            <div className="jumlahProject bg-ghostwhite-100 w-3/4 h-40 my-5 p-5 rounded-lg shadow-lg flex flex-col justify-center items-center">
              <div className="icon">
                <FaUser size={32} />
              </div>
              <div className="jumlahProject-title">
                <h1 className="text-2xl font-bold text-gray-700 text-center">
                  Finished Project
                </h1>
              </div>
              <div className="jumlahProject-content">
                <h1
                  className="text-xl font-bold text-gray-700 text-center"
                  id="jumlahProject"
                >
                  {activity.length} Project
                </h1>
              </div>
            </div>
          </div>

          <div className="chart flex w-full justify-between my-5 gap-5 rounded-lg">
            <div className="line w-1/2 bg-ghostwhite-100 shadow-lg">
              <Chart
                options={{
                  chart: {
                    id: "basic-bar",
                  },
                  xaxis: {
                    categories: Income.map((item) =>
                      formatDate(item.create_at)
                    ),
                  },
                }}
                series={[
                  {
                    name: "Income",
                    data: Income.map((item) => item.deal_price),
                  },
                ]}
                type="line"
                width="100%"
              />
            </div>

            <div className="bar w-1/2 bg-ghostwhite-100 shadow-lg">
              <Chart
                options={{
                  chart: {
                    id: "basic-bar",
                  },
                  xaxis: {
                    categories: Income.map((item) =>
                      formatDate(item.create_at)
                    ),
                  },
                }}
                series={[
                  {
                    name: "Income",
                    data: Income.map((item) => item.deal_price),
                  },
                ]}
                type="bar"
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
