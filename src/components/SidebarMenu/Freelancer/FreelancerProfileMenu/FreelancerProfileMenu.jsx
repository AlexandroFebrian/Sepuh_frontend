import {
  FaPenToSquare,
  FaHouseChimney,
  FaEnvelope,
  FaListUl,
  FaGear,
  FaFileLines,
  FaClock,
  FaMoneyBills,
  FaCreditCard,
  FaRightFromBracket,
  FaUser
} from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { setIsLogin, setUserDetail } from "../../../../redux/UserSlice";

export default function FreelancerProfileMenu() {
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
            <FaUser className="mr-3" size={"100%"} />
          </div>
          <div className="pl-3 text-2xl">
            Profile
          </div>
        </NavLink>
        <NavLink 
          to={"/user/document"} 
          className={`w-full h-9 ${location.pathname == "/user/document" && "bg-ghostwhite-200"} hover:bg-ghostwhite-100 top-0 transition-colors duration-300 flex items-center justify-start p-9`}
        >
          <div className=" min-w-[2rem] max-w-[2rem]">
            <FaFileLines className="mr-3" size={"90%"} />
          </div>
          <div className="pl-3 text-2xl">
            Document Completion
          </div>
        </NavLink>
        <NavLink 
          to={"/user/history"} 
          className={`w-full h-9 ${location.pathname == "/user/history" && "bg-ghostwhite-200"} hover:bg-ghostwhite-100 top-0 transition-colors duration-300 flex items-center justify-start p-9`}
        >
          <div className=" min-w-[2rem] max-w-[2rem]">
            <FaClock className="mr-3" size={"100%"} />
          </div>
          <div className="pl-3 text-2xl">
            Work History
          </div>
        </NavLink>
        <NavLink 
          to={"/user/income"} 
          className={`w-full h-9 ${location.pathname == "/user/income" && "bg-ghostwhite-200"} hover:bg-ghostwhite-100 top-0 transition-colors duration-300 flex items-center justify-start p-9`}
        >
          <div className=" min-w-[2rem] max-w-[2rem]">
            <FaMoneyBills className="mr-3" size={"100%"} />
          </div>
          <div className="pl-3 text-2xl">
            Income Reports
          </div>
        </NavLink>
        <NavLink 
          to={"/user/bank"} 
          className={`w-full h-9 ${location.pathname == "/user/bank" && "bg-ghostwhite-200"} hover:bg-ghostwhite-100 top-0 transition-colors duration-300 flex items-center justify-start p-9`}
        >
          <div className=" min-w-[2rem] max-w-[2rem]">
            <FaCreditCard className="mr-3" size={"100%"} />
          </div>
          <div className="pl-3 text-2xl">
            Bank Account
          </div>
        </NavLink>
        <NavLink  
          className={`w-full h-9 hover:bg-ghostwhite-100 top-0 transition-colors duration-300 flex items-center justify-start p-9`}
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
