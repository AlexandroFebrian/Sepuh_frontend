import FreelancerDefaultMenu from "../../../components/SidebarMenu/Freelancer/FreelancerDefaultMenu/FreelancerDefaultMenu";
import CompanyDefaultMenu from "../../../components/SidebarMenu/Company/CompanyDefaultMenu/CompanyDefaultMenu";
import CompanyEmployeeViewModel from "./CompanyEmployeeListViewModel";
export default function CompanyEmployeeList() {
  const { isLogin, user } = CompanyEmployeeViewModel();
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
            <div className="employeeList">
              <div className="grid grid-cols-4 gap-4">
                <div className="employeeCard"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
