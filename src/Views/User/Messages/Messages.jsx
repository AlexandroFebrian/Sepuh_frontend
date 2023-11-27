import Content from "../../../components/Content/Content";
import MenuGuest from "../../../components/SidebarMenu/MenuGuest/MenuGuest";
import FreelancerDefaultMenu from "../../../components/SidebarMenu/Freelancer/FreelancerDefaultMenu/FreelancerDefaultMenu";
import NowHiring from "../../../components/NowHiring/NowHiring";
import CompanyDefaultMenu from "../../../components/SidebarMenu/Company/CompanyDefaultMenu/CompanyDefaultMenu";
import MessagesViewModel from "./MessagesViewModel";
import { Avatar, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Textarea } from "@mui/joy";

export default function Messages() {
  const { isLogin, user } = MessagesViewModel()

  return (
    <>
      <div className=" h-fit relative flex">
        <div className="left w-1/5 ">
          <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem]">
            {
              isLogin && user && user.role == "Freelancer"
              &&
              <FreelancerDefaultMenu />
            }
            {
              isLogin && user && user.role == "Company"
              &&
              <CompanyDefaultMenu />
            }
            {
              !isLogin
              &&
              <MenuGuest />
            }
            
          </div>
        </div>
        <div className="mid w-4/5">
          <div className=" h-full border-l-2 border-navyblue-600 z-0 flex">
            <div className="w-3/12 h-full border-r-2 border-navyblue-800">
              <div className="w-full px-6 py-5">
                <h1 className='font-bold text-3xl'>Messages</h1>
                <InputGroup 
                  background={"white"} 
                  rounded={"md"} 
                  className=" mt-3"
                  borderColor={"navyblue.800"}
                >
                  <InputLeftElement>
                    <FaMagnifyingGlass />
                  </InputLeftElement>

                  <Input placeholder="Search"></Input>
                </InputGroup>
              </div>

              <div className="w-full mt-3">

              </div>
            </div>
            <div className="w-9/12 h-full relative">
              <div className="w-full h-24 px-5 py-4 border-b-2 border-navyblue-800">
                <Avatar bg="ghostwhite.400" size={"lg"} src={""}/>
              </div>
              <div className="w-full h-[calc(100%-6rem-7rem)] px-5 py-4 overflow-y-auto bg-slate-600">
                
              </div>
              <div className="w-full max-h-32 min-h-fit px-5 py-3 border-t-2 border-navyblue-800 absolute bottom-0 flex items-center">
                <div className="w-1/12">

                </div>
                <div className="w-10/12">
                  <Textarea minRows={1} maxRows={4}   />

                </div>
                <div className="w-1/12">

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
