/* eslint-disable no-unused-vars */
import { useState } from "react";
import EmployeeReportsViewModel from "./EmployeeReportsViewModel";
import FreelancerProfileMenu from "../../../components/SidebarMenu/Freelancer/FreelancerProfileMenu/FreelancerProfileMenu";
import CompanyProfileMenu from "../../../components/SidebarMenu/Company/CompanyProfileMenu/CompanyProfileMenu";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

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

export default function EmployeeReports() {
  const { isLogin, user } = EmployeeReportsViewModel();
  const [date, setDate] = useState(null);
  const [data, setData] = useState([
    {
      dateStart: "2021/10/10",
      dateEnd: "2021/10/11",
      name: "Felicia Pangestu",
      role: "Machine Learning Engineer",
      price: "Rp. 1.000.000",
    },
    {
      dateStart: "2021/10/10",
      dateEnd: "2021/10/11",
      name: "Lingga Dian Lestari",
      role: "Graphic Designer",
      price: "Rp. 500.000",
    },
  ]);

  return (
    <>
      <div className=" h-fit relative flex">
        <div className="left w-1/5 ">
          <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem]">
            {isLogin && user?.role == "Freelancer" && <FreelancerProfileMenu />}
            {isLogin && user?.role == "Company" && <CompanyProfileMenu />}
          </div>
        </div>
        <div className="mid w-full">
          <div className=" min-h-[calc(100vh-5rem)] h-fit border-l-2 border-navyblue-600 z-0 px-10 py-10">
            <div className="w-full rounded py-6 px-10">
              <h1 className="font-semibold text-xl">Employee Reports</h1>
            </div>

            <div className="calendar mx-10">
              <div className={cn("grid gap-2", date && "grid-cols-2")}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="table w-full my-10">
              <div className="bg-ghostwhite-100 mx-7">
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
                        Date End
                      </TableHead>
                      <TableHead className="text-2xl text-navyblue-800 font-bold">
                        Price
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-lg">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-medium text-lg">
                          {item.name}
                        </TableCell>
                        <TableCell className="font-medium text-lg">
                          {item.role}
                        </TableCell>
                        <TableCell className="font-medium text-lg">
                          {item.dateStart}
                        </TableCell>
                        <TableCell className="font-medium text-lg">
                          {item.dateEnd}
                        </TableCell>
                        <TableCell className="font-medium text-lg">
                          {item.price}
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
                        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
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
                      labels: [
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
                    }}
                    series={[14, 21, 53, 11, 10, 20, 30, 40, 50, 60, 70, 80]}
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
