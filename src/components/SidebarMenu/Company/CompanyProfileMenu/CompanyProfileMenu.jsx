import {
  FaPenToSquare,
  FaHouseChimney,
  FaEnvelope,
  FaListUl,
  FaGear,
  FaUsersLine,
  FaFileInvoiceDollar,
  FaRightFromBracket,
  FaBuilding
} from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { setIsLogin, setUserDetail } from "../../../../redux/UserSlice";
import { useDispatch } from "react-redux";


export default function CompanyProfileMenu() {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function logout(){
    dispatch(setIsLogin(false))
    dispatch(setUserDetail(null))
    localStorage.removeItem("token")
    navigate("/")
  }
  
  return (
    <>
      <div className="flex flex-col">
        <NavLink 
          to={"/home"} 
          className={`w-full h-9 ${location.pathname == "/home" && "bg-ghostwhite-200"} hover:bg-ghostwhite-100 top-0 transition-colors duration-300 flex items-center justify-start p-9`}
        >
          <div className=" min-w-[2rem] max-w-[2rem]">
            <FaHouseChimney className="mr-3" size={"100%"} />
          </div>
          <div className="pl-3 text-2xl">
            Home
          </div>
        </NavLink>
        <NavLink 
          to={"/user/profile"} 
          className={`w-full h-9 ${location.pathname == "/user/profile" && "bg-ghostwhite-200"} hover:bg-ghostwhite-100 top-0 transition-colors duration-300 flex items-center justify-start p-9`}
        >
          <div className=" min-w-[2rem] max-w-[2rem]">
            <FaBuilding className="mr-3" size={"90%"} />
          </div>
          <div className="pl-3 text-2xl">
            Profile
          </div>
        </NavLink>
        <NavLink 
          to={"/user/employeereports"} 
          className={`w-full h-9 ${location.pathname == "/user/employeereports" && "bg-ghostwhite-200"} hover:bg-ghostwhite-100 top-0 transition-colors duration-300 flex items-center justify-start p-9`}
        >
          <div className=" min-w-[2rem] max-w-[2rem]">
            <FaUsersLine className="mr-3" size={"100%"} />
          </div>
          <div className="pl-3 text-2xl">
            Employee Reports
          </div>
        </NavLink>
        <NavLink 
          to={"/user/paymentreports"} 
          className={`w-full h-9 ${location.pathname == "/user/paymentreports" && "bg-ghostwhite-200"} hover:bg-ghostwhite-100 top-0 transition-colors duration-300 flex items-center justify-start p-9`}
        >
          <div className=" min-w-[2rem] max-w-[2rem]">
            <FaFileInvoiceDollar className="mr-3" size={"90%"} />
          </div>
          <div className="pl-3 text-2xl">
            Payment Reports
          </div>
        </NavLink>
        <NavLink
          className={`w-full h-9  hover:bg-ghostwhite-100 top-0 transition-colors duration-300 flex items-center justify-start p-9`}
          onClick={logout}
        >
          <div className=" min-w-[2rem] max-w-[2rem]">
            <FaRightFromBracket className="mr-3" size={"100%"} />
          </div>
          <div className="pl-3 text-2xl">
            Logout
          </div>
        </NavLink>
      </div>

      <div className="absolute bottom-0 w-full">
        <NavLink 
          to={"/settings"} 
          className={`w-full h-9 ${location.pathname == "/settings" && "bg-ghostwhite-100"} hover:bg-ghostwhite-100 top-0 transition-colors duration-300 flex items-center justify-start p-9`}
        >
          <div className=" min-w-[2rem] max-w-[2rem]">
            <FaGear className="mr-3" size={"100%"} />
          </div>
          <div className="pl-3 text-2xl">
            Settings
          </div>
        </NavLink>
      </div>
    </>
  );
}
