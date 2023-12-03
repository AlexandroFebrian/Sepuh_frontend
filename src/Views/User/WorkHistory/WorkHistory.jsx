import WorkHistoryViewModel from "./WorkHistoryViewModel";
import FreelancerProfileMenu from "../../../components/SidebarMenu/Freelancer/FreelancerProfileMenu/FreelancerProfileMenu";
import CompanyProfileMenu from "../../../components/SidebarMenu/Company/CompanyProfileMenu/CompanyProfileMenu";
import { useState } from "react";

import { Avatar } from "@chakra-ui/react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";

export default function WorkHistory() {
  const { isLogin, user } = WorkHistoryViewModel();

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

  const formatDate = (date) => {
    // 03 February 2023
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat("ID", { year: "numeric" }).format(d);
    const mo = new Intl.DateTimeFormat("ID", { month: "long" }).format(d);
    const da = new Intl.DateTimeFormat("ID", { day: "2-digit" }).format(d);
    return `${da} ${mo} ${ye}`;
  };

  return (
    <>
      <div className=" h-fit relative flex">
        <div className="left w-1/5 ">
          <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem]">
            {isLogin && user?.role == "Freelancer" && <FreelancerProfileMenu />}
            {isLogin && user?.role == "Company" && <CompanyProfileMenu />}
          </div>
        </div>
        <div className="mid w-3/5">
          <div className=" min-h-[calc(100vh-5rem)] h-fit border-l-2 border-navyblue-600 z-0 px-10 py-10">
            <div className="w-full rounded py-6 px-10">
              <h1 className="font-semibold text-xl">Work History</h1>

              <div className="sort w-full mt-5 bg-ghostwhite-100 h-full rounded-md p-4">
                <div className="flex gap-2">
                  <button className="w-28 py-1 bg-navyblue-700 text-white rounded-full font-semibold text-xl border-2 border-navyblue-700">
                    Latest
                  </button>
                  <button className="w-28 py-1 bg-ghostwhite-100 text-navyblue-800 rounded-full font-semibold text-xl border-2 border-navyblue-700 hover:bg-navyblue-700 hover:text-white duration-300">
                    Oldest
                  </button>
                </div>
              </div>

              <div className="w-full h-full rounded-md py-2 shadow-md mt-5 bg-ghostwhite-50 ">
                {dataDummy.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="workhistory px-10 py-4 border-b border-navyblue-600"
                    >
                      <div className="flex gap-2 items-center justify-between">
                        <div className="left flex items-center gap-3">
                          <Avatar
                            bg="ghostwhite.400"
                            src={user?.profile_picture}
                            size={"lg"}
                            draggable={false}
                          />
                          <div className="details py-2">
                            <h2 className="font-semibold text-xl text-navyblue-800">
                              {data.company} as {data.position}
                            </h2>
                            <h4 className="text-lg text-navyblue-800 bg-white w-fit px-2 py-1 rounded-full">
                              {formatDate(data.startDate)} -{" "}
                              {formatDate(data.endDate)}
                            </h4>
                          </div>
                        </div>
                        <div className="mid flex flex-col space-y-2 "></div>
                        <div className="right">
                          {data.status == "0" ? (
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

                {/* pagination button */}
                <div className="flex justify-end my-2 mr-5">
                  {/* < page > */}
                  <div className="flex gap-2">
                    <button className="w-10 py-1 bg-navyblue-700 text-white rounded-full font-semibold text-xl border-2 border-navyblue-700 hover:bg-navyblue-800 hover:text-white duration-300 font-mono">
                      &lt;
                      {/* <FaLessThan /> */}
                    </button>
                    <button className="w-10 py-1 text-navyblue-700 rounded-full font-semibold text-xl">
                      {pagination}
                    </button>
                    <button className="w-10 py-1 bg-navyblue-700 text-white rounded-full font-semibold text-xl border-2 border-navyblue-700 hover:bg-navyblue-800 hover:text-white duration-300 font-mono">
                      &gt;
                      {/* <FaGreaterThan /> */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right w-1/5"></div>
      </div>
    </>
  );
}
