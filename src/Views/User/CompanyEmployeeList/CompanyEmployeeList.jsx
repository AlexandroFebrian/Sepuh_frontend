import FreelancerDefaultMenu from "../../../components/SidebarMenu/Freelancer/FreelancerDefaultMenu/FreelancerDefaultMenu";
import CompanyDefaultMenu from "../../../components/SidebarMenu/Company/CompanyDefaultMenu/CompanyDefaultMenu";
import CompanyEmployeeViewModel from "./CompanyEmployeeListViewModel";
import { FaStar } from "react-icons/fa6";
import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function CompanyEmployeeList() {
  const { isLogin, user, employees } = CompanyEmployeeViewModel();
  return (
    <>
      <div className=" h-fit relative flex">
        <div className="left w-1/5 ">
          <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem]">
            {isLogin && user?.role == "Freelancer" && <FreelancerDefaultMenu />}
            {isLogin && user?.role == "Company" && <CompanyDefaultMenu />}
          </div>
        </div>
        <div className="mid w-4/5">
          <div className=" min-h-[calc(100vh-5rem)] h-fit border-l-2 border-navyblue-600 z-0 px-10 py-10">
            <h1 className=" text-3xl font-bold">
              Employee Lists
            </h1>

            <div className="mt-5 grid grid-cols-3 2xl:grid-cols-4 gap-6">
              {
                employees?.map((item, idx) => {

                  return (
                    <Link to={`/user?email=${item.email}`}>
                      <div key={idx} className=" bg-navyblue-800 w-full h-72 rounded hover:scale-105 transition-all duration-300">
                        <div 
                          style={{
                            backgroundImage: `url('${item.header_picture}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                          className="w-full h-40 rounded-t bg-navyblue-600"
                        />

                        <div className="px-3 py-3 w-full ">
                          <div className="flex items-center">
                            <Avatar src={item.profile_picture} size={"lg"} />
                            <div className="ml-3 text-ghostwhite-50 truncate w-full">
                              <h2 className=" text-lg font-semibold whitespace-normal">
                                {item.name}
                              </h2>
                              <p className="truncate">
                                {item.headline}
                              </p>
                            </div>

                          </div>
                          <div className=" text-ghostwhite-50 mt-1 flex items-center">
                            <FaStar className="text-yellow-500 mr-1" /> {item.rating}
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}