import DashboardAdminViewModel from "./DashboardAdminViewModel";
import NavigationAdmin from "../../../components/NavigationAdmin/NavigationAdmin";
import { useEffect, useState } from "react";

import Chart from "react-apexcharts";
import { FaUser } from "react-icons/fa6";

export default function DashboardAdmin() {
  const { dummy } = DashboardAdminViewModel();

  const [Income, setIncome] = useState([]);
  const [Expense, setExpense] = useState([]);

  useEffect(() => {
    const data = dummy.map((item) => {
      return item.income;
    });
    setIncome(data);

    const data2 = dummy.map((item) => {
      return item.expense;
    });
    setExpense(data2);
  }, []);

  return (
    <>
      <div className="container-dashboardAdmin flex">
        {/* <Chart
          options={{
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
              ],
            },
          }}
          series={[
            {
              name: "Income",
              data: Income,
            },
            {
              name: "Expense",
              data: Expense,
            },
          ]}
          type="line"
          width="100%"
          height="100%"
        /> */}

        <div className="sideBar w-1/5">
          <NavigationAdmin />
        </div>
        <div className="right w-full pt-10 shadow-lg grid grid-cols-4">
          <div className="totalincome bg-ghostwhite-100 w-3/4 h-40 my-5 p-5 mx-10 rounded-lg shadow-lg flex flex-col justify-center items-center">
            <div className="totalincome-title">
              <h1 className="text-2xl font-bold text-gray-700 text-center">
                Total Income this month
              </h1>
            </div>
            <div className="totalincome-content">
              <h1 className="text-xl font-bold text-gray-700 text-center">
                Rp. 100.000.000
              </h1>
            </div>
          </div>

          <div className="jumlahFreelancer bg-ghostwhite-100 w-3/4 h-40 my-5 p-5 mx-10 rounded-lg shadow-lg flex flex-col justify-center items-center">
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
                1000 User
              </h1>
            </div>
          </div>

          <div className="jumlahCompany bg-ghostwhite-100 w-3/4 h-40 my-5 p-5 mx-10 rounded-lg shadow-lg flex flex-col justify-center items-center">
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
                  1000
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
