/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import { FaRegCalendarDays } from "react-icons/fa6";
import { addDays, format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { FaCalendarAlt } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Chart from "react-apexcharts";
import IncomeReportsUserViewModel from "./IncomeReportsUserViewModel";
import FreelancerProfileMenu from "../../../components/SidebarMenu/Freelancer/FreelancerProfileMenu/FreelancerProfileMenu";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";

export default function IncomeReports() {
  const [selectedDays, setSelectedDays] = useState({
    from: undefined,
    to: undefined,
  });
  //     Januari: 1000000,
  //   },
  //   {
  //     Februari: 2000000,
  //   },
  //   {
  //     Maret: 3000000,
  //   },
  //   {
  //     April: 4000000,
  //   },
  //   {
  //     Mei: 5000000,
  //   },
  //   {
  //     Juni: 6000000,
  //   },
  //   {
  //     Juli: 7000000,
  //   },
  //   {
  //     Agustus: 8000000,
  //   },
  //   {
  //     September: 9000000,
  //   },
  //   {
  //     Oktober: 10000000,
  //   },
  //   {
  //     November: 11000000,
  //   },
  //   {
  //     Desember: 12000000,
  //   },
  // ]);

  const [dataActive, setDataActive] = useState("Table");

  const [pagination, setPagination] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [newAgreements, setNewAgreements] = useState([]);
  const [agreementsTable, setAgreementsTable] = useState([]);
  const [limit, setLimit] = useState(10);

  const { isLogin, user, agreements } = IncomeReportsUserViewModel();

  const formatdate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
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

  const formatAgreements = (agreements) => {
    const newAgreements = agreements.reduce((acc, curr) => {
      const found = acc.find(
        (item) => formatdate(item.start_date) == formatdate(curr.start_date)
      );
      console.log("found", found);
      if (found) {
        found.deal_price += curr.deal_price;
      } else {
        acc.push(curr);
      }
      console.log("acc", acc);

      return acc;
    }, []);

    return newAgreements;
  };

  useEffect(() => {
    setNewAgreements(formatAgreements(agreements));

    setTotalData(agreements.length);
    setTotalPage(Math.ceil(agreements.length / limit));

    const newAgreementsTable = agreements.slice(
      (pagination - 1) * limit,
      (pagination - 1) * limit + limit
    );
    setAgreementsTable(newAgreementsTable);
  }, [agreements]);

  useEffect(() => {
    if (selectedDays.from && selectedDays.to) {
      const newAgreements = agreements.filter((item) => {
        return (
          new Date(item.start_date) >= selectedDays.from &&
          new Date(item.start_date) <= selectedDays.to
        );
      });

      setAgreementsTable(newAgreements);
    } else if (selectedDays.from) {
      const newAgreements = agreements.filter((item) => {
        return new Date(item.start_date) >= selectedDays.from;
      });

      setAgreementsTable(newAgreements);
    } else {
      setNewAgreements(agreements);
    }
  }, [selectedDays]);

  useEffect(() => {
    const newAgreementsTable = agreements.slice(
      (pagination - 1) * limit,
      (pagination - 1) * limit + limit
    );
    setAgreementsTable(newAgreementsTable);
  }, [pagination]);

  return (
    <>
      <div className=" h-fit relative flex">
        <div className="left w-1/4 ">
          <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem]">
            {isLogin && user?.role == "Freelancer" && <FreelancerProfileMenu />}
          </div>
        </div>
        <div className="mid w-full">
          <div className=" min-h-[calc(100vh-5rem)] h-fit border-l-2 border-navyblue-600 z-0 px-10 py-10">
            <div className="w-full rounded py-6 px-10">
              <h1 className="font-semibold text-xl">Income Reports</h1>
              <div className="buttonTableOrChart mt-2 flex gap-3">
                <button
                  className={`w-28 py-1 text-navyblue-800 rounded-full font-semibold text-xl border-2 border-navyblue-700 ${
                    dataActive == "Table"
                      ? "bg-navyblue-700 text-white"
                      : "bg-ghostwhite-100"
                  }`}
                  onClick={() => {
                    setDataActive("Table");
                  }}
                >
                  Table
                </button>
                <button
                  className={`w-28 py-1 text-navyblue-800 rounded-full font-semibold text-xl border-2 border-navyblue-700 ${
                    dataActive == "Chart"
                      ? "bg-navyblue-700 text-white"
                      : "bg-ghostwhite-100"
                  }`}
                  onClick={() => {
                    setDataActive("Chart");
                  }}
                >
                  Chart
                </button>
              </div>

              <div className="dateFromTo mt-5">
                <div
                  className={cn(
                    "grid gap-2",
                    !selectedDays.from && "text-muted-foreground"
                  )}
                >
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !selectedDays.from && "text-muted-foreground"
                        )}
                      >
                        <FaCalendarAlt className="mr-2 h-4 w-4" />

                        {selectedDays.from
                          ? selectedDays.to
                            ? `${formatdate(selectedDays.from)} - ${formatdate(
                                selectedDays.to
                              )}`
                            : formatdate(selectedDays.from)
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        selectedDays={selectedDays}
                        onDayClick={(day) => {
                          if (selectedDays.from && selectedDays.to) {
                            setSelectedDays({ from: day, to: undefined });
                          } else if (selectedDays.from) {
                            if (day < selectedDays.from) {
                              setSelectedDays({ from: day, to: undefined });
                            } else {
                              setSelectedDays({
                                from: selectedDays.from,
                                to: day,
                              });
                            }
                          } else {
                            setSelectedDays({ from: day, to: undefined });
                          }
                        }}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {dataActive == "Chart" && (
                <>
                  <div className="chart grid grid-cols-2 gap-5 mt-5">
                    <div className="line mt-5">
                      <Chart
                        options={{
                          chart: {
                            id: "basic-bar",
                          },
                          xaxis: {
                            categories: newAgreements.map((item) =>
                              formatdate(item.start_date)
                            ),
                          },
                        }}
                        series={[
                          {
                            name: "Income",
                            data: newAgreements.map((item) => item.deal_price),
                          },
                        ]}
                        type="line"
                        width="100%"
                      />
                    </div>

                    <div className="donut mt-5">
                      <Chart
                        options={{
                          labels: newAgreements.map((item) =>
                            formatdate(item.start_date)
                          ),
                        }}
                        series={newAgreements.map((item) => item.deal_price)}
                        type="donut"
                        width="100%"
                      />
                    </div>

                    <div className="bar mt-5">
                      <Chart
                        options={{
                          chart: {
                            id: "basic-bar",
                          },
                          xaxis: {
                            categories: newAgreements.map((item) =>
                              formatdate(item.start_date)
                            ),
                          },
                        }}
                        series={[
                          {
                            name: "Income",
                            data: newAgreements.map((item) => item.deal_price),
                          },
                        ]}
                        type="bar"
                        width="100%"
                      />
                    </div>
                  </div>
                </>
              )}
              {dataActive == "Table" && (
                <div className="bg-ghostwhite-100 mt-5 rounded-md">
                  <Table className="w-full bg-ghostwhite-100 rounded-md">
                    <TableHeader className="border-b-2 border-navyblue-600 ">
                      <TableRow>
                        <TableHead className="w-[100px] text-2xl text-navyblue-800 font-bold text-center ">
                          No
                        </TableHead>
                        <TableHead className="text-2xl text-navyblue-800 font-bold text-center w-1/4">
                          Invoice ID
                        </TableHead>
                        <TableHead className="text-2xl text-navyblue-800 font-bold text-center w-1/4">
                          Date
                        </TableHead>
                        <TableHead className="text-2xl text-navyblue-800 font-bold text-center w-1/4">
                          Income
                        </TableHead>
                        <TableHead className="text-2xl text-navyblue-800 font-bold text-center w-1/4">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agreementsTable.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-lg text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-medium text-lg text-center">
                            {item.invoice}
                          </TableCell>
                          <TableCell className="font-medium text-lg text-center">
                            {formatdate(item.start_date)} -{" "}
                            {item.end_date
                              ? formatdate(item.end_date)
                              : "Ongoing"}
                          </TableCell>
                          <TableCell className="font-medium text-lg text-center">
                            {/* {item.deal_price - item.deal_price * 0.1} */}
                            {formatAmount(item.deal_price)}
                          </TableCell>
                          <TableCell className="font-medium text-lg text-center">
                            {/* -1 = rejected
                            0 = Waiting for company payment
                            1 = on going
                            2 = done
                            3 = done and paid */}

                            {item.status == -1 && (
                              <div className="text-red-600">Rejected</div>
                            )}
                            {item.status == 0 && (
                              <div className="text-yellow-600">
                                Waiting for company payment
                              </div>
                            )}
                            {item.status == 1 && (
                              <div className="text-yellow-600">On going</div>
                            )}
                            {item.status == 2 && (
                              <div className="text-green-600">Done</div>
                            )}
                            {item.status == 3 && (
                              <div className="text-green-600">Done</div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>

                    {agreementsTable.length == 0 && (
                      <div className=" bg-red-500 w-24 text-center text-xl font-semibold py-5">
                        No record found
                      </div>
                    )}
                  </Table>

                  <div className="pagination flex justify-center items-center gap-5 mt-5 pb-5">
                    <button
                      className="bg-navyblue-500 text-white text-2xl px-5 py-2 rounded-md"
                      onClick={() => {
                        if (pagination > 1) {
                          setPagination(pagination - 1);
                        }
                      }}
                    >
                      Prev
                    </button>
                    <span className="text-2xl text-navyblue-800 font-bold ">
                      {pagination}
                    </span>
                    <button
                      className="bg-navyblue-500 text-white text-2xl px-5 py-2 rounded-md"
                      onClick={() => {
                        if (pagination < totalPage) {
                          setPagination(pagination + 1);
                        }
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="right "></div>
      </div>
    </>
  );
}
