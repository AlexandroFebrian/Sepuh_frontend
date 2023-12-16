import CompanyProfileMenu from "../../../components/SidebarMenu/Company/CompanyProfileMenu/CompanyProfileMenu";
import CompanyPaymentReportsViewModel from "./CompanyPaymentReportsViewModel";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FaCalendarAlt } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function CompanyPaymentReports() {
  const { isLogin, user, agreements } = CompanyPaymentReportsViewModel();
  const [dataActive, setDataActive] = useState("Table");
  const [selectedDays, setSelectedDays] = useState({
    from: undefined,
    to: undefined,
  });
  const [pagination, setPagination] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState(10);
  const [newAgreements, setNewAgreements] = useState([]);
  const [agreementsTable, setAgreementsTable] = useState([]);

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

  const formatdate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
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
        <div className="left w-1/5 ">
          <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem]">
            {isLogin && user?.role == "Company" && <CompanyProfileMenu />}
          </div>
        </div>
        <div className="mid w-4/5">
          <div className=" min-h-[calc(100vh-5rem)] h-fit border-l-2 border-navyblue-600 z-0 px-10 py-10">
            <h1 className=" text-3xl font-bold mx-10 my-5">Payment Reports</h1>

            <div className="mt-5 mx-10">
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

              {dataActive == "Table" && (
                <div className="table mt-5 w-full">
                  <Table className="w-full bg-ghostwhite-100 rounded-md">
                    <TableHeader className=" border-b-2 border-navyblue-600">
                      <TableRow>
                        <TableHead className="w-[100px] text-2xl text-navyblue-800 font-bold">
                          No
                        </TableHead>
                        <TableHead className="text-2xl text-navyblue-800 w-1/5 font-bold">
                          Invoice ID
                        </TableHead>
                        <TableHead className="text-2xl text-navyblue-800 w-1/5 font-bold">
                          Payment Date
                        </TableHead>
                        <TableHead className="text-2xl text-navyblue-800 w-1/5 font-bold">
                          Employee Name
                        </TableHead>
                        <TableHead className="text-2xl text-navyblue-800 font-bold">
                          Amount
                        </TableHead>
                        <TableHead className="text-2xl text-navyblue-800 font-bold">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {agreementsTable.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-lg text-navyblue-800">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-medium text-lg text-navyblue-800">
                            {item?.invoice}
                          </TableCell>
                          <TableCell className="font-medium text-lg text-navyblue-800">
                            {formatDate(item?.create_at)}
                          </TableCell>
                          <TableCell className="font-medium text-lg text-navyblue-800">
                            {item?.freelancer?.name}
                          </TableCell>
                          <TableCell className="font-medium text-lg text-navyblue-800">
                            {formatAmount(item?.deal_price)}
                          </TableCell>
                          <TableCell className="font-medium text-lg text-navyblue-800">
                            {item.status == -1 && (
                              <div className="text-red-600 font-bold">
                                Rejected
                              </div>
                            )}
                            {item.status == 0 && (
                              <div className="text-yellow-600 font-bold">
                                Waiting for company payment
                              </div>
                            )}
                            {item.status == 1 && (
                              <div className="text-yellow-600 font-bold">
                                On going
                              </div>
                            )}
                            {item.status == 2 && (
                              <div className="text-green-600 font-bold">
                                Done
                              </div>
                            )}
                            {item.status == 3 && (
                              <div className="text-green-600 font-bold">
                                Done
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="flex justify-center items-center gap-5 w-full my-5">
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

              {dataActive == "Chart" && (
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
              )}

              {/* <div className="Summary">
                <div className="text-2xl font-bold">Summary</div>
                <div className="w-full mt-5">
                  <div className="bg-ghostwhite-100 shadow-lg rounded-md p-5 h-40">
                    <div className="income flex gap-5">
                      <div className="text-2xl font-bold">Total Income:</div>
                      <div className="text-2xl font-bold">
                        {formatAmount(
                          agreements
                            ?.filter(
                              (agreement) =>
                                agreement.status == 2 || agreement.status == 3
                            )
                            ?.reduce(
                              (total, agreement) =>
                                total + agreement.deal_price,
                              0
                            )
                        )}
                      </div>
                    </div>

                    <div className="project flex gap-5">
                      <div className="text-2xl font-bold">
                        Total Project Finished:
                      </div>
                      <div className="text-2xl font-bold">
                        {
                          agreements?.filter(
                            (agreement) =>
                              agreement.status == 2 || agreement.status == 3
                          )?.length
                        }{" "}
                        Project
                      </div>
                    </div>

                    <div className="flex justify-end items-center mt-5">
                      <button className="bg-navyblue-600 text-white text-2xl px-5 py-2 rounded-md hover:bg-navyblue-700 hover:duration-200 transition-ease-in-out">
                        Withdraw
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
