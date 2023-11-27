import React from 'react'
import {
  FaPenToSquare,
  FaHouseChimney,
  FaEnvelope,
  FaListUl,
  FaGear,
  FaUserGroup,
} from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function CompanyDefaultMenu() {
  const location = useLocation();

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
          to={"/dashboard"} 
          className={`w-full h-9 ${location.pathname == "/dashboard" && "bg-ghostwhite-200"} hover:bg-ghostwhite-100 top-0 transition-colors duration-300 flex items-center justify-start p-9`}
        >
          <div className=" min-w-[2rem] max-w-[2rem]">
            <MdSpaceDashboard className="mr-3" size={"100%"} />
          </div>
          <div className="pl-3 text-2xl">
            Dashboard
          </div>
        </NavLink>
        <NavLink 
          to={"/messages"} 
          className={`w-full h-9 ${location.pathname == "/messages" && "bg-ghostwhite-200"} hover:bg-ghostwhite-100 top-0 transition-colors duration-300 flex items-center justify-start p-9`}
        >
          <div className=" min-w-[2rem] max-w-[2rem]">
            <FaEnvelope className="mr-3" size={"100%"} />
          </div>
          <div className="pl-3 text-2xl">
            Messages
          </div>
        </NavLink>
        <NavLink 
          to={"/employeelists"} 
          className={`w-full h-9 ${location.pathname == "/employeelists" && "bg-ghostwhite-200"} hover:bg-ghostwhite-100 top-0 transition-colors duration-300 flex items-center justify-start p-9`}
        >
          <div className=" min-w-[2rem] max-w-[2rem]">
            <FaUserGroup className="mr-3" size={"100%"} />
          </div>
          <div className="pl-3 text-2xl">
            Employee Lists
          </div>
        </NavLink>
        <NavLink 
          to={"/myposts"} 
          className={`w-full h-9 ${location.pathname == "/myposts" && "bg-ghostwhite-200"} hover:bg-ghostwhite-100 top-0 transition-colors duration-300 flex items-center justify-start p-9`}
        >
          <div className=" min-w-[2rem] max-w-[2rem]">
            <FaPenToSquare className="mr-3" size={"100%"} />
          </div>
          <div className="pl-3 text-2xl">
            My Posts
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
  )
}
