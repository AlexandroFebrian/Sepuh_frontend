import DashboardAdminViewModel from "./DashboardAdminViewModel";
import { useEffect, useState } from "react";

import Chart from "react-apexcharts";

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
      <div className="container-dashboardAdmin bg-ghostwhite-50 w-full h-full flex">
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

        <div className="sideBar w-1/5 bg-navyblue-700 h-screen static left-0"></div>
        <div className="contentright w-3/4">
          <div className="totalincome bg-ghostwhite-100 w-1/5 h-40 my-5 p-5 mx-10 rounded-lg shadow-lg flex flex-col justify-center items-center">
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

          <div className="jumlahUser bg-ghostwhite-100 w-1/5 h-40 my-5 p-5 mx-10 rounded-lg shadow-lg flex flex-col justify-center items-center">
            <div className="jumlahUser-title">
              <h1 className="text-2xl font-bold text-gray-700 text-center">
                Jumlah Freelancer
              </h1>
            </div>
            <div className="jumlahUser-content">
              <h1
                className="text-xl font-bold text-gray-700 text-center"
                id="jumlahUser"
              >
                1000 User
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
