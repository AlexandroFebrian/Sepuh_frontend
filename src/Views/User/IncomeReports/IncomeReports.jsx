import { useState } from "react";

import { FaRegCalendarDays } from "react-icons/fa6";
import { addDays, format } from "date-fns";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Chart from "react-apexcharts";

export default function IncomeReports() {
  const [selectedDays, setSelectedDays] = useState({
    from: undefined,
    to: undefined,
  });

  const [data, setData] = useState([
    {
      Januari: 1000000,
    },
    {
      Februari: 2000000,
    },
    {
      Maret: 3000000,
    },
    {
      April: 4000000,
    },
    {
      Mei: 5000000,
    },
    {
      Juni: 6000000,
    },
    {
      Juli: 7000000,
    },
    {
      Agustus: 8000000,
    },
    {
      September: 9000000,
    },
    {
      Oktober: 10000000,
    },
    {
      November: 11000000,
    },
    {
      Desember: 12000000,
    },
  ]);

  return (
    <>
      <div className=" h-fit relative flex">
        <div className="left w-1/5 ">
          <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem]">
            {/* {isLogin && user?.role == "Freelancer" && <FreelancerProfileMenu />} */}
            {/* {isLogin && user?.role == "Company" && <CompanyProfileMenu />} */}
          </div>
        </div>
        <div className="mid w-3/5">
          <div className=" min-h-[calc(100vh-5rem)] h-fit border-l-2 border-navyblue-600 z-0 px-10 py-10">
            <div className="w-full rounded py-6 px-10">
              <h1 className="font-semibold text-xl">Income Reports</h1>

              <div className="buttonTableOrChart mt-2">
                <button className="bg-navyblue-700 text-white px-6 py-2 rounded-full">
                  Table
                </button>
                <button className="bg-navyblue-700 text-white px-6 py-2 rounded-full ml-3">
                  Chart
                </button>
              </div>

              <div
                className="dateFromTo mt-5"
                onClick={() => {
                  alert("Masih error hehe");
                }}
              >
                <div className={cn("grid gap-2", "grid-cols-2")}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !selectedDays && "text-muted-foreground"
                        )}
                      >
                        <FaRegCalendarDays className="mr-2 h-4 w-4" />
                        {selectedDays?.from ? (
                          selectedDays.to ? (
                            <>
                              {format(selectedDays.from, "MMM d, yyyy")} -{" "}
                              {format(selectedDays.to, "MMM d, yyyy")}
                            </>
                          ) : (
                            format(selectedDays.from, "MMM d, yyyy")
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
                        defaultMonth={selectedDays?.from}
                        selected={selectedDays}
                        onSelect={selectedDays}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="chart mt-5">
                <Chart
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
                      data: [
                        9500000, 5500000, 12500000, 3500000, 7500000, 10500000,
                        1500000, 11500000, 6500000, 8500000, 4500000, 2500000,
                      ],
                    },
                    {
                      name: "Outcome",
                      data: [
                        1500000, 2500000, 3500000, 4500000, 5500000, 6500000,
                        7500000, 8500000, 9500000, 10500000, 11500000, 12500000,
                      ],
                    },
                  ]}
                  type="line"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="right w-1/5"></div>
      </div>
    </>
  );
}
