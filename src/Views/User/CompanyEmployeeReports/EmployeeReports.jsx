/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import EmployeeReportsViewModel from "./EmployeeReportsViewModel";
import FreelancerProfileMenu from "../../../components/SidebarMenu/Freelancer/FreelancerProfileMenu/FreelancerProfileMenu";
import CompanyProfileMenu from "../../../components/SidebarMenu/Company/CompanyProfileMenu/CompanyProfileMenu";
import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Chart from "react-apexcharts";
import { object } from "joi";

export default function EmployeeReports() {
  // const { isLogin, user, employees } = EmployeeReportsViewModel();
  const { isLogin, user } = EmployeeReportsViewModel();
  const [data, setData] = useState([
    {
      name: `Name_${Math.floor(Math.random() * 1000)}`, // Generate random name
      role: Math.floor(Math.random() * 2) + 1 == 1 ? "Freelancer" : "Company",
      date_start: new Date("2021-10-10"), // Generate random date in 2023
      deal_price: Math.floor(Math.random() * 1000000) + 1, // Generate random deal price between 1 and 100 million
    },
    {
      name: `Name_${Math.floor(Math.random() * 1000)}`,
      role: Math.floor(Math.random() * 2) + 1 == 1 ? "Freelancer" : "Company",
      date_start: new Date("2023-12-14"),
      deal_price: Math.floor(Math.random() * 1000000) + 1,
    },
    {
      name: `Name_${Math.floor(Math.random() * 1000)}`,
      role: Math.floor(Math.random() * 2) + 1 == 1 ? "Freelancer" : "Company",
      date_start: new Date("2023-12-17"),
      deal_price: Math.floor(Math.random() * 1000000) + 1,
    },
    {
      name: `Name_${Math.floor(Math.random() * 1000)}`,
      role: Math.floor(Math.random() * 2) + 1 == 1 ? "Freelancer" : "Company",
      date_start: new Date("2023-12-18"),
      deal_price: Math.floor(Math.random() * 1000000) + 1,
    },
    {
      name: `Name_${Math.floor(Math.random() * 1000)}`,
      role: Math.floor(Math.random() * 2) + 1 == 1 ? "Freelancer" : "Company",
      date_start: new Date("2023-12-13"),
      deal_price: Math.floor(Math.random() * 1000000) + 1,
    },
    {
      name: `Name_${Math.floor(Math.random() * 1000)}`,
      role: Math.floor(Math.random() * 2) + 1 == 1 ? "Freelancer" : "Company",
      date_start: new Date("2023-12-12"),
      deal_price: Math.floor(Math.random() * 1000000) + 1,
    },
  ]);

  const [selectedDays, setSelectedDays] = useState({
    from: undefined,
    to: undefined,
  });

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

  // useEffect(() => {
  //   if (employees) {
  //     setData(employees);
  //   }
  // }, [employees]);

  useEffect(() => {
    if (selectedDays.from && selectedDays.to) {
      const filteredData = data.filter((item) => {
        const date = new Date(item.date_start);
        return (
          date >= selectedDays.from &&
          date <= selectedDays.to.setDate(selectedDays.to.getDate() + 1)
        );
      });
      setData(filteredData);
    } else if (selectedDays.from) {
      const filteredData = data.filter((item) => {
        const date = new Date(item.date_start);
        return date >= selectedDays.from;
      });
      setData(filteredData);
    } else {
      setData(data);
    }
  }, [selectedDays]);

  const formatdate = (date) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("default", { month: "long" });
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <>
      <div className=" h-fit relative flex">
        <div className="left w-1/4 ">
          <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem]">
            {isLogin && user?.role == "Freelancer" && <FreelancerProfileMenu />}
            {isLogin && user?.role == "Company" && <CompanyProfileMenu />}
          </div>
        </div>
        <div className="mid w-full">
          <div className=" min-h-[calc(100vh-5rem)] h-fit border-l-2 border-navyblue-600 z-0 px-10 py-10">
            <div className="w-full rounded py-6 px-10">
              <h1 className="text-3xl font-bold">Employee Reports</h1>
            </div>

            <div className="dateFromTo mx-10">
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

            <div className="table w-full my-10">
              <div className="bg-ghostwhite-100 mx-7 rounded-md">
                <Table className="w-full bg-ghostwhite-100 rounded-md">
                  <TableHeader className="border-b-2 border-navyblue-600">
                    <TableRow>
                      <TableHead className="w-[100px] text-2xl text-navyblue-800 font-bold">
                        No
                      </TableHead>
                      <TableHead className="text-2xl text-navyblue-800 w-1/5 font-bold">
                        Name
                      </TableHead>
                      <TableHead className="text-2xl text-navyblue-800 w-1/5 font-bold">
                        Role
                      </TableHead>
                      <TableHead className="text-2xl text-navyblue-800 font-bold">
                        Date Start
                      </TableHead>
                      <TableHead className="text-2xl text-navyblue-800 font-bold">
                        Salary
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-semibold font-sarabun text-lg">
                          {Object.values(item.name)}
                        </TableCell>
                        <TableCell className="font-semibold font-sarabun text-lg">
                          {Object.values(item.role)}
                        </TableCell>
                        <TableCell className="font-semibold font-sarabun text-lg">
                          {format(item.date_start, "dd MMMM yyyy")}
                        </TableCell>
                        <TableCell className="font-semibold font-sarabun text-lg">
                          {formatAmount(item.deal_price)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="chart flex flex-row justify-between h-full px-10">
              <div className="lineChart w-1/2 border-2  h-full">
                <div className="w-full rounded py-6 ">
                  <Chart
                    options={{
                      xaxis: {},
                    }}
                    series={[
                      {
                        name: "Income",
                        // data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                        data: data.map((item) => item.deal_price),
                      },
                    ]}
                    type="line"
                    width="100%"
                  />
                </div>
              </div>

              <div className="pieChart w-1/3 border-2 h-full">
                <div className="w-full rounded py-6 px-10">
                  <Chart
                    options={{
                      labels: data.map((item) => item.name),
                    }}
                    series={data.map((item) => item.deal_price)}
                    type="donut"
                    width="100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
