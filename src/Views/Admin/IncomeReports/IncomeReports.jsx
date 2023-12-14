/* eslint-disable no-unused-vars */
import NavigationAdmin from "../../../components/NavigationAdmin/NavigationAdmin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import IncomeReportsViewModelAdmin from "./IncomeReportsViewModelAdmin";
import Chart from "react-apexcharts";

export default function IncomeReports() {
  const { activity } = IncomeReportsViewModelAdmin();
  const [ListActivity, setListActivity] = useState([]);
  const [activeMode, setActiveMode] = useState("table");

  useEffect(() => {
    const listActivity = activity.filter((item) => item.status === 2);
    setListActivity(listActivity);
  }, [activity]);

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

  const formatDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("default", { month: "long" });
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const adminFee = (amount) => {
    const adminFee = (amount * 10) / 100;
    return formatAmount(adminFee);
  };

  return (
    <>
      <div className="container-incomeReports flex min-h-screen max-h-fit">
        <div className="sidebar w-1/5">
          <NavigationAdmin />
        </div>

        <div className="right w-full pt-10 shadow-lg">
          <div className=" mb-10 px-10 pb-10">
            <div className="m-7">
              <div className="title">
                <h2 className="text-3xl font-semibold">Income Reports</h2>
              </div>
              <div className="filter flex gap-10 w-full bg-ghostwhite-100 px-5 py-3 my-2 rounded-md">
                <button
                  // className="bg-navyblue-800 text-white text-lg py-2 px-10 rounded-full"
                  className={`${
                    activeMode === "table"
                      ? "bg-navyblue-800 text-white text-lg py-2 px-10 rounded-full"
                      : "text-navyblue-800 text-lg py-2 px-10 rounded-full border-2 border-navyblue-800 hover:bg-navyblue-800 hover:text-white"
                  }`}
                  onClick={() => setActiveMode("table")}
                >
                  Table
                </button>
                <button
                  // className="text-navyblue-800 text-lg py-2 px-10 rounded-full border-2 border-navyblue-800 hover:bg-navyblue-800 hover:text-white"
                  className={`${
                    activeMode === "chart"
                      ? "bg-navyblue-800 text-white text-lg py-2 px-10 rounded-full"
                      : "text-navyblue-800 text-lg py-2 px-10 rounded-full border-2 border-navyblue-800 hover:bg-navyblue-800 hover:text-white"
                  }`}
                  onClick={() => setActiveMode("chart")}
                >
                  Chart
                </button>
              </div>
              {activeMode === "table" && (
                <div className="table w-full bg-ghostwhite-100 rounded-md my-5">
                  <Table>
                    <TableHeader className="border-b-2 border-navyblue-600">
                      <TableRow>
                        <TableHead className="text-2xl text-navyblue-800 font-bold">
                          Invoice ID
                        </TableHead>
                        <TableHead className="text-2xl text-navyblue-800 font-bold">
                          Date
                        </TableHead>
                        <TableHead className="text-2xl text-navyblue-800 font-bold">
                          Company
                        </TableHead>
                        <TableHead className="text-2xl text-navyblue-800 font-bold">
                          Freelancer
                        </TableHead>
                        <TableHead className="text-2xl text-navyblue-800 font-bold">
                          Total Amount
                        </TableHead>
                        <TableHead className="text-2xl text-navyblue-800 font-bold">
                          Admin fee
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ListActivity.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell className="font-medium text-lg text-navyblue-800">
                              {item.invoice}
                            </TableCell>
                            <TableCell className="font-medium text-lg text-navyblue-800">
                              {/* {item.start_date} */}
                              {formatDate(item.start_date)}
                            </TableCell>
                            <TableCell className="font-medium text-lg text-navyblue-800">
                              {item.company.name}
                            </TableCell>
                            <TableCell className="font-medium text-lg text-navyblue-800">
                              {item.freelancer.name}
                            </TableCell>
                            <TableCell className="font-medium text-lg text-navyblue-800">
                              {formatAmount(item.deal_price)}
                            </TableCell>
                            <TableCell className="font-medium text-lg text-navyblue-800">
                              {adminFee(item.deal_price)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
              {activeMode === "chart" && (
                <div className="chart w-full bg-ghostwhite-100 rounded-md my-5 grid grid-cols-2 gap-5">
                  <div className="line bg-ghostwhite-100 mx-5">
                    <Chart
                      options={{
                        chart: {
                          id: "basic-bar",
                        },
                        xaxis: {
                          categories: ListActivity.map((item) =>
                            formatDate(item.start_date)
                          ),
                        },
                      }}
                      series={[
                        {
                          name: "Income",
                          data: ListActivity.map((item) => item.deal_price),
                        },
                      ]}
                      type="line"
                      width="100%"
                      height="400px"
                    />
                  </div>

                  <div className="bar bg-ghostwhite-100 mx-5">
                    <Chart
                      options={{
                        chart: {
                          id: "basic-bar",
                        },
                        xaxis: {
                          categories: ListActivity.map((item) =>
                            formatDate(item.start_date)
                          ),
                        },
                      }}
                      series={[
                        {
                          name: "Income",
                          data: ListActivity.map((item) => item.deal_price),
                        },
                      ]}
                      type="bar"
                      width="100%"
                      height="400px"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
