import FreelancerDefaultMenu from "../../../components/SidebarMenu/Freelancer/FreelancerDefaultMenu/FreelancerDefaultMenu";
import NowHiring from "../../../components/NowHiring/NowHiring";
import CompanyDefaultMenu from "../../../components/SidebarMenu/Company/CompanyDefaultMenu/CompanyDefaultMenu";
import NotificationViewModel from "./NotificationViewModel";
import { Avatar, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaCheck, FaX } from "react-icons/fa6";
import Popup from "../../../components/Popup/Popup";
import { useEffect, useState } from "react";

export default function Notification() {
  const { 
    isLogin, 
    user, 
    notifications,
    acceptHandler,
    rejectHandler,
    accept,
    reject,
    wait,
    popup,
    popupTitle,
    popupType,
    popupButtonMessage,
    popupButtonMessage2,
    setPopup,
    setWait,
    setPopupType,
    status,
    chatHandler
  } = NotificationViewModel()

  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (wait) {
      
      setPosition(window.scrollY);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [wait]);

  return (
    <>
      <Popup 
        wait={wait} 
        popup={popup} 
        setPopup={setPopup} 
        setWait={setWait} 
        popupTitle={popupTitle} 
        popupType={popupType}
        setPopupType={setPopupType}
        popupButtonMessage={popupButtonMessage}
        popupButtonMessage2={popupButtonMessage2}
        handleClick2={(status == 1 && accept) || (status == -1 && reject)}
        className="fixed w-screen h-screen"
        style={{ top: `${position}px`, left: "0%" }}
      />

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
            {/* {
              !isLogin
              &&
              <MenuGuest />
            } */}
            
          </div>
        </div>
        <div className="mid w-3/5 h-full">
          <div className={`min-h-[calc(100vh-5rem)] h-fit ${isLogin && "border-l-2 border-navyblue-600"} z-0 px-10 py-10`}>
            <h1 className="text-3xl font-bold">
              Notifications
            </h1>
            {
              isLogin && notifications.length > 0
              &&
              <div className=" px-5 py-4 mt-4 bg-ghostwhite-100 rounded">
                {
                  notifications.map((item, index) => {
                    const newTime = new Date(item.time)
                    const options = {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    };
                    
                    const formattedDate = newTime.toLocaleString(undefined, options);
                    
                    const time = formattedDate.replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/, "$3/$2/$1 $4:$5:$6");

                    return (
                      <div key={index} className=" border-b border-navyblue-800 py-4 px-4 flex items-center relative">
                        <Avatar src={item.from.profile_picture} size={"lg"} />
                        <div className="w-full flex justify-between ml-4">
                          <div>
                            {
                              item.category == "Hired"
                              &&
                              <p className="text-lg">
                                <span className="font-bold">{item.from.name}</span> wants to hire you
                              </p>
                            }
                            {
                              item.category == "Hired Accept"
                              &&
                              <p className="text-lg">
                                <span className="font-bold">{item.from.name}</span> accepted your job
                              </p>
                            }
                            {
                              item.category == "Hired Reject"
                              &&
                              <p className="text-lg">
                                <span className="font-bold">{item.from.name}</span> rejected your job
                              </p>
                            }
                            {
                              item.category == "Applied"
                              &&
                              <p className="text-lg">
                                <span className="font-bold">{item.from.name}</span> wants to apply to your job
                              </p>
                            }
                            {
                              item.category == "Applied Accept"
                              &&
                              <p className="text-lg">
                                <span className="font-bold">{item.from.name}</span> accepted your apply
                              </p>
                            }
                            {
                              item.category == "Applied Reject"
                              &&
                              <p className="text-lg">
                                <span className="font-bold">{item.from.name}</span> rejected your apply
                              </p>
                            }
                            {
                              item.category == "Chat"
                              &&
                              <p className="text-lg">
                                <span className="font-bold">{item.from.name}</span> started a conversation with you
                              </p>
                            }
                            {
                              item.category == "Agreement"
                              &&
                              <p className="text-lg">
                                <span className="font-bold">{item.from.name}</span> wants to make an agreement with you
                              </p>
                            }
                            <div className="flex items-center">
                              <Link to={`/user?email=${item.from.email}`}>
                                <Button
                                  variant={"outline"}
                                  borderColor={"navyblue.800"}
                                  borderWidth={1}
                                  rounded={"full"}
                                  margin={0}
                                  height={"1.75rem"}
                                >
                                  View Profile
                                </Button>
                              </Link>
                              {
                                item.category == "Chat"
                                &&
                                <Button
                                  variant={"outline"}
                                  borderColor={"navyblue.800"}
                                  borderWidth={1}
                                  rounded={"full"}
                                  margin={0}
                                  marginLeft={"0.5rem"}
                                  height={"1.75rem"}
                                  onClick={() => {chatHandler(item.from.email)}}
                                >
                                  View Chat
                                </Button>
                              }
                              {
                                item.category == "Agreement"
                                &&
                                <Link to={`/activity/${item.link}`}>
                                  <Button
                                    variant={"outline"}
                                    borderColor={"navyblue.800"}
                                    borderWidth={1}
                                    rounded={"full"}
                                    margin={0}
                                    marginLeft={"0.5rem"}
                                    height={"1.75rem"}
                                  >
                                    View Agreement
                                  </Button>
                                </Link>
                              }
                            </div>
                          </div>

                          <div className="flex items-center relative">
                            {
                              (item.category == "Hired" || item.category == "Applied") && item.status == 0
                              &&
                              <>
                                <Button
                                  variant={"outline"}
                                  color={"green.600"}
                                  borderColor={"green.500"}
                                  borderWidth={2}
                                  rounded={"full"}
                                  margin={0}
                                  height={"2rem"}
                                  onClick={() => {acceptHandler(item._id)}}
                                >
                                  <FaCheck className="mr-2"/> Accept
                                </Button>
                                <Button
                                  variant={"outline"}
                                  color={"red.600"}
                                  borderColor={"red.500"}
                                  borderWidth={2}
                                  rounded={"full"}
                                  marginLeft={"0.5rem"}
                                  height={"2rem"}
                                  onClick={() => {rejectHandler(item._id)}}
                                >
                                  <FaX className="mr-2"/> Reject
                                </Button>
                              </>
                            }
                            {
                              (item.category == "Hired" || item.category == "Applied") && item.status == 1
                              &&
                              <div className=' w-36 h-8 border border-green-600 text-green-600 transition-colors duration-300 rounded-full flex justify-center items-center'>
                                Accepted
                              </div>
                            }
                            {
                              (item.category == "Hired" || item.category == "Applied") && item.status == -1
                              &&
                              <div className=' w-36 h-8 border border-red-600 text-red-600 transition-colors duration-300 rounded-full flex justify-center items-center'>
                                Rejected
                              </div>
                            }
                          </div>
                        </div>
                        <div className="absolute top-1 right-4 text-ghostwhite-500">
                          {time}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            }
          </div>
        </div>
        {
          isLogin && user && user.role == "Freelancer"
          &&
          <div className="right w-1/5">
            <NowHiring user={user} />
          </div>
        }
      </div>
    </>
  );
}