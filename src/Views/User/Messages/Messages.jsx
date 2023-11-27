import Content from "../../../components/Content/Content";
import MenuGuest from "../../../components/SidebarMenu/MenuGuest/MenuGuest";
import FreelancerDefaultMenu from "../../../components/SidebarMenu/Freelancer/FreelancerDefaultMenu/FreelancerDefaultMenu";
import NowHiring from "../../../components/NowHiring/NowHiring";
import CompanyDefaultMenu from "../../../components/SidebarMenu/Company/CompanyDefaultMenu/CompanyDefaultMenu";
import MessagesViewModel from "./MessagesViewModel";
import { Avatar, Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Textarea } from "@mui/joy";
import { FaRegPaperPlane } from "react-icons/fa6";

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
                asd
              </div>
            </div>
            
            <div className="w-9/12 h-full relative">
              <div className="w-full h-24 px-5 py-4 border-b-2 border-navyblue-800 bg-ghostwhite-50 relative z-10">
                <Avatar bg="ghostwhite.400" size={"lg"} src={""}/>
              </div>
              <div className=" absolute bottom-3 w-full">
                <div className="w-full h-[calc(100vh-11rem)] px-5 pb-10 pt-44 overflow-y-auto bg-slate-600 z-0">
                  INI TEMPAT MESSAGE
                </div>
                <div className="w-full max-h-40 min-h-fit px-5 py-3 border-t-2 border-navyblue-800 flex items-end">
                  <div className="w-1/12">

                  </div>
                  <div className="w-10/12">
                    <Textarea 
                      variant="plain"
                      minRows={1} 
                      maxRows={4}
                      placeholder="Type a message…"
                      size="lg"
                    />

                  </div>
                  <div className="w-1/12 flex justify-center">
                    <Button 
                      bg="ghostwhite.50"
                      height="3.1rem"
                    >
                      <FaRegPaperPlane />
                    </Button>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
