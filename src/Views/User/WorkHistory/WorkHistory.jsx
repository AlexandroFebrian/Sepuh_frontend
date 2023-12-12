/* eslint-disable no-unused-vars */
import WorkHistoryViewModel from "./WorkHistoryViewModel";
import FreelancerProfileMenu from "../../../components/SidebarMenu/Freelancer/FreelancerProfileMenu/FreelancerProfileMenu";
import CompanyProfileMenu from "../../../components/SidebarMenu/Company/CompanyProfileMenu/CompanyProfileMenu";
import { useEffect, useState } from "react";

import { Avatar } from "@chakra-ui/react";

export default function WorkHistory() {
  const { isLogin, user, activity } = WorkHistoryViewModel();
  console.log("Activity", activity);

  const [pagination, setPagination] = useState(1);
  const [dataDummy, setDataDummy] = useState([
    {
      company: "PT. Indofood Sukses Makmur Tbk",
      position: "Software Engineer",
      startDate: "2023-02-03",
      endDate: "2023-08-08",
      status: "0", // 0 = ongoing, 1 = finished
    },
    {
      company: "PT. Indofood Sukses Makmur Tbk",
      position: "Software Engineer",
      startDate: "2023-02-03",
      endDate: "2023-08-08",
      status: "0",
    },
    {
      company: "PT. Indofood Sukses Makmur Tbk",
      position: "Software Engineer",
      startDate: "2023-02-03",
      endDate: "2023-08-08",
      status: "1",
    },
    {
      company: "PT. Indofood Sukses Makmur Tbk",
      position: "Software Engineer",
      startDate: "2023-02-03",
      endDate: "2023-08-08",
      status: "1",
    },
    {
      company: "PT. Indofood Sukses Makmur Tbk",
      position: "Software Engineer",
      startDate: "2023-02-03",
      endDate: "2023-08-08",
      status: "1",
    },
    {
      company: "PT. Indofood Sukses Makmur Tbk",
      position: "Software Engineer",
      startDate: "2023-02-03",
      endDate: "2023-08-08",
      status: "1",
    },
  ]);
  const [workhistory, setWorkHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("latest"); // latest, oldest

  const formatDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("default", { month: "long" });
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    if (activity) {
      setWorkHistory(activity);
    }
  }, [activity]);

  useEffect(() => {
    if (sort == "latest") {
      const sorted = [...workhistory].sort((a, b) => {
        return new Date(b.start_date) - new Date(a.start_date);
      });
      setWorkHistory(sorted);
    } else if (sort == "oldest") {
      const sorted = [...workhistory].sort((a, b) => {
        return new Date(a.start_date) - new Date(b.start_date);
      });
      setWorkHistory(sorted);
    }
  }, [sort]);

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
              <h1 className="font-semibold text-xl">Work History</h1>

              <div className="sort w-full mt-5 bg-ghostwhite-100 h-full rounded-md p-4">
                <div className="flex gap-2">
                  <button
                    className={`w-28 py-1 text-navyblue-800 rounded-full font-semibold text-xl border-2 border-navyblue-700 ${
                      sort == "latest"
                        ? "bg-navyblue-700 text-white"
                        : "bg-ghostwhite-100"
                    }`}
                    onClick={() => setSort("latest")}
                  >
                    Latest
                  </button>
                  <button
                    className={`w-28 py-1 text-navyblue-800 rounded-full font-semibold text-xl border-2 border-navyblue-700 ${
                      sort == "oldest"
                        ? "bg-navyblue-700 text-white"
                        : "bg-ghostwhite-100"
                    }`}
                    onClick={() => setSort("oldest")}
                  >
                    Oldest
                  </button>
                </div>
              </div>

              <div className="w-full h-full rounded-md py-2 shadow-md mt-5 bg-ghostwhite-50 ">
                {workhistory.slice(0, limit).map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="workhistory px-10 py-4 border-b border-navyblue-600"
                    >
                      <div className="flex gap-2 items-center justify-between">
                        <div className="left flex items-center gap-3">
                          <Avatar
                            bg="ghostwhite.400"
                            src={data?.company?.profile_picture}
                            size={"lg"}
                            draggable={false}
                          />
                          <div className="details py-2">
                            <h2 className="font-semibold text-xl text-navyblue-800">
                              {data?.company?.name}
                            </h2>
                            <h3 className="font-semibold text-md text-navyblue-800">
                              {data?.post?.title}
                            </h3>
                            <h4 className="text-lg text-navyblue-800 w-fit py-1 rounded-full">
                              {formatDate(data?.start_date)} -{" "}
                              {formatDate(data?.end_date)}
                            </h4>
                          </div>
                        </div>
                        <div className="mid flex flex-col space-y-2 "></div>
                        <div className="right">
                          {data?.status == "0" ? (
                            <button className="w-28 py-1 bg-ghostwhite-50 text-yellow-500 rounded-full font-semibold text-xl border-2 border-yellow-500">
                              Ongoing
                            </button>
                          ) : (
                            <button className="w-28 py-1 bg-ghostwhite-50 text-green-600 rounded-full font-semibold text-xl border-2 border-green-600">
                              Finished
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-end my-2 mr-5">
                  <div className="flex gap-2">
                    <button
                      className="w-10 py-1 bg-navyblue-700 text-white rounded-full font-semibold text-xl border-2 border-navyblue-700 hover:bg-navyblue-800 hover:text-white duration-300 font-mono"
                      onClick={() => {
                        if (pagination > 1) {
                          setPagination(pagination - 1);
                          setLimit(limit - 10);
                        }
                      }}
                    >
                      &lt;
                    </button>
                    <button className="w-10 py-1 text-navyblue-700 rounded-full font-semibold text-xl">
                      {pagination}
                    </button>
                    <button
                      className="w-10 py-1 bg-navyblue-700 text-white rounded-full font-semibold text-xl border-2 border-navyblue-700 hover:bg-navyblue-800 hover:text-white duration-300 font-mono"
                      onClick={() => {
                        if (pagination < Math.ceil(workhistory.length / 10)) {
                          setPagination(pagination + 1);
                          setLimit(limit + 10);
                        }
                      }}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
}
