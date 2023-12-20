import DashboardAdminViewModel from "./DashboardAdminViewModel";
import NavigationAdmin from "../../../components/NavigationAdmin/NavigationAdmin";
import { useEffect, useState } from "react";

import Chart from "react-apexcharts";
import { FaUser } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoCodeSlashSharp } from "react-icons/io5";
import { compose } from "@reduxjs/toolkit";

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

  const [IncomeTodayToLastWeek, setIncomeTodayToLastWeek] = useState([]);

  useEffect(() => {
    const income = Income;
    const incomeFormatted = [];
    income.map((item) => {
      const date = new Date(item.create_at);
      const month = date.toLocaleString("default", { month: "long" });
      const day = date.getDate();
      const year = date.getFullYear();
      const dateFormatted = `${day} ${month} ${year}`;

      const index = incomeFormatted.findIndex(
        (item) => item.date === dateFormatted
      );

      if (index === -1) {
        incomeFormatted.push({
          date: dateFormatted,
          deal_price: item.deal_price,
        });
      } else {
        incomeFormatted[index].deal_price += item.deal_price;
      }
    });

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastWeekFormatted = formatDate(lastWeek);

    const incomeFormattedLastWeek = incomeFormatted.filter(
      (item) => item.date >= lastWeekFormatted
    );

    const today = new Date();
    const todayFormatted = formatDate(today);
    const indexToday = incomeFormattedLastWeek.findIndex(
      (item) => item.date === todayFormatted
    );
    if (indexToday === -1) {
      incomeFormattedLastWeek.push({
        date: todayFormatted,
        deal_price: 0,
      });
    }

    setIncomeTodayToLastWeek(incomeFormattedLastWeek);
  }, [Income]);

  const getTodayIncome = () => {
    let total = 0;

    Income.filter((item) => {
      const date = new Date(item.create_at);
      const month = date.toLocaleString("default", { month: "long" });
      const day = date.getDate();
      const year = date.getFullYear();
      const dateFormatted = `${day} ${month} ${year}`;

      const today = new Date();
      const todayFormatted = formatDate(today);

      if (dateFormatted === todayFormatted) {
        total += item.deal_price;
      }
    });
    return total;
  };

  return (
    <>
      <div className="container-dashboardAdmin flex">
        <div className="sideBar w-1/6 fixed left-0 ">
          <NavigationAdmin />
        </div>
        <div className="right w-5/6 absolute right-0 px-10">
          <div className="data w-full pt-10 grid grid-cols-5">
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
                <IoCodeSlashSharp size={32} />
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

            <div className="todayIncome bg-ghostwhite-100 w-3/4 h-40 my-5 p-5 rounded-lg shadow-lg flex flex-col justify-center items-center">
              <div className="icon">
                <FaMoneyBillWave size={32} />
              </div>
              <div className="todayIncome-title">
                <h1 className="text-2xl font-bold text-gray-700 text-center">
                  Income Today
                </h1>
              </div>
              <div className="todayIncome-content">
                <h1 className="text-xl font-bold text-gray-700 text-center">
                  {formatAmount(getTodayIncome())}
                </h1>
              </div>
            </div>
          </div>

          <div className="titleChart mt-5">
            <h1 className="text-2xl font-bold text-gray-700 text-center">
              Income This Week
            </h1>
          </div>
          <div className="chart flex w-full justify-between my-5 gap-5 rounded-lg">
            <div className="line w-1/2 bg-ghostwhite-100 shadow-lg">
              <Chart
                options={{
                  chart: {
                    id: "basic-line",
                  },
                  xaxis: {
                    categories: IncomeTodayToLastWeek.map((item) =>
                      formatDate(item.date)
                    ),
                  },
                }}
                series={[
                  {
                    name: "Income",
                    // data: IncomeTodayToLastWeek.map(
                    //   (item) => item.deal_price * 0.1
                    // ),

                    data: IncomeTodayToLastWeek.map((item) =>
                      item.deal_price === 0 ? 0 : item.deal_price * 0.1
                    ),
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
                    categories: IncomeTodayToLastWeek.map((item) =>
                      formatDate(item.date)
                    ),
                  },
                }}
                series={[
                  {
                    name: "Income",
                    data: IncomeTodayToLastWeek.map((item) => item.deal_price),
                  },
                ]}
                type="bar"
                width="100%"
              />
            </div>

            <div className="pie w-1/2 bg-ghostwhite-100 shadow-lg">
              <Chart
                options={{
                  chart: {
                    id: "basic-pie",
                  },
                  labels: IncomeTodayToLastWeek.map((item) => item.date),
                }}
                series={IncomeTodayToLastWeek.map((item) => item.deal_price)}
                type="donut"
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
