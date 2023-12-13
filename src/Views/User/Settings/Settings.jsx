import SettingsViewModel from "./SettingsViewModel";
import FreelancerProfileMenu from "../../../components/SidebarMenu/Freelancer/FreelancerProfileMenu/FreelancerProfileMenu";
import CompanyProfileMenu from "../../../components/SidebarMenu/Company/CompanyProfileMenu/CompanyProfileMenu";
import { useRef } from "react";
export default function Settings() {
  const { isLogin, user, changePasswordHandler } = SettingsViewModel();

  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPasswordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Password baru dan konfirmasi password tidak sama");
      return;
    }

    const data = {
      old_password: oldPasswordRef.current.value,
      new_password: newPasswordRef.current.value,
    };

    changePasswordHandler(data);
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
        <div className="mid w-3/5">
          <div className=" min-h-[calc(100vh-5rem)] h-fit border-l-2 border-navyblue-600 z-0 px-10 py-10">
            <div className="w-full py-6 px-10 bg-ghostwhite-100 rounded-md">
              <h1 className="font-semibold text-xl">Change Password</h1>
              <div className="w-full mt-5 flex flex-col gap-1">
                <label
                  htmlFor="oldPassword"
                  className="font-semibold text-lg text-navyblue-800"
                >
                  Old Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  id="oldPassword"
                  className="border-2 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-navyblue-600"
                  ref={oldPasswordRef}
                />
              </div>
              <div className="w-full mt-5 flex flex-col gap-1">
                <label
                  htmlFor="newPassword"
                  className="font-semibold text-lg text-navyblue-800"
                >
                  New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="border-2 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-navyblue-600"
                  ref={newPasswordRef}
                />
              </div>
              <div className="w-full mt-5 flex flex-col gap-1">
                <label
                  htmlFor="confirmPassword"
                  className="font-semibold text-lg text-navyblue-800"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="border-2 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-navyblue-600"
                  ref={confirmPasswordRef}
                />
              </div>
              <div className="w-full mt-5 flex flex-col gap-1">
                <button
                  className="bg-navyblue-600 text-white py-2 px-3 rounded-md"
                  onClick={submitHandler}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
