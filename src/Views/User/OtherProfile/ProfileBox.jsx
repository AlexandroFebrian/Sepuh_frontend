import React, { useEffect, useState } from 'react'
import { Avatar, Button } from "@chakra-ui/react";
import { FaStar, FaRegUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import FreelancerContentBox from '../../../components/ContentBox/FreelancerContentBox/FreelancerContentBox';
import CompanyContentBox from '../../../components/ContentBox/CompanyContentBox/CompanyContentBox';
import fetch from '../../../Client/fetch';
import Popup from '../../../components/Popup/Popup';

export default function ProfileBox({user, profile, posts}) {
  const [content, setContent] = useState("Description");
  const { createMessage, hireOrApply } = fetch();

  const member = new Date(profile?.create_at)
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const displayFormattedText = () => {
    // Replace newline characters with HTML line break tags
    const formattedText = profile.bio.replace(/\n/g, '<br>');
    return { __html: formattedText };
  };

  const chatHandler = async (email) => {
    createMessage(email);
  }

  const [wait, setWait] = useState(false)
  const [popup, setPopup] = useState(false)
  const [popupTitle, setPopupTitle] = useState("")
  const [popupType, setPopupType] = useState(undefined)
  const [popupButtonMessage, setPopupButtonMessage] = useState("")
  const [popupButtonMessage2, setPopupButtonMessage2] = useState("")

  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (wait) {
      
      setPosition(window.scrollY);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [wait]);

  async function hireOrApplyHandler(){
    if(user){
      setWait(true)
      setPopup(true)
  
      if(user?.role == "Company"){
        setPopupTitle("Are you sure do you want to hire?")
      }else if(user?.role == "Freelancer"){
        setPopupTitle("Are you sure do you want to apply?")
  
      }
      setPopupButtonMessage("Close")
      setPopupButtonMessage2("Yes")
      setPopupType("?")

    }
  }

  async function yesHandler(){
    const response = await hireOrApply(profile?.email, setWait, setPopup)

    if(response == undefined){
      setPopupTitle("Network Error!")
      setPopupButtonMessage("Try Again")
      setPopupType(false)
      setPopupButtonMessage2(undefined)
      return
    }

    if(response.status.toString()[0] != 2){
      // console.log(response)
      setPopupTitle(response.data.message)
      setPopupButtonMessage("Close")
      setPopupType(false)
      setPopupButtonMessage2(undefined)
      return
    }

    if(user?.role == "Company"){
      setPopupTitle("Hire Success!")
    }else if(user?.role == "Freelancer"){
      setPopupTitle("Apply Success!")
    }
    setPopupButtonMessage("Close")
    setPopupType(true)
    setPopupButtonMessage2(undefined)
  }

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
        handleClick2={yesHandler}
        className="fixed w-screen h-screen"
        style={{ top: `${position}px`, left: "0%" }}
      />

      <div className="w-full max-h-full bg-lightblue-100 rounded mt-5 relative">
        <div className="absolute top-0 w-full h-36 rounded-t bg-stone-300" style={{ backgroundImage: `url('${profile.header_picture}')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>
        </div>

        <div className="pt-10 pb-5">
          <div className="w-full px-8">
            <Avatar size="2xl" src={profile.profile_picture} className='mr-4' border={"1px"} color={"blackAlpha.800"}/>
          </div>
          
          <div className="w-full px-8 mt-5">
            <div className='w-full flex justify-between items-center'>
              <h1 className="font-bold text-2xl">{profile.name} &#x2022; {profile.role}</h1>
              <div className='flex items-center'>
                <Link className='mr-2'>
                  <Button
                    variant={"outline"}
                    borderColor={"navyblue.800"}
                    color={"navyblue.800"}
                    onClick={() => {chatHandler(profile.email)}}
                  >
                    Message
                  </Button>
                </Link>

                {
                  profile?.role == "Freelancer" && user?.role == "Company"
                  &&
                  <Button
                    color={"white"}
                    bg={"navyblue.800"}
                    _hover={{ bg: "navyblue.700" }}
                    _active={{ bg: "navyblue.600" }}
                    onClick={() => {hireOrApplyHandler()}}
                  >
                    Hire
                  </Button>
                }
                {
                  profile?.role == "Company" && user?.role == "Freelancer" &&
                  <Button
                    color={"white"}
                    bg={"navyblue.800"}
                    _hover={{ bg: "navyblue.700" }}
                    _active={{ bg: "navyblue.600" }}
                    onClick={() => {hireOrApplyHandler()}}
                  >
                    Apply
                  </Button>
                }
              </div>
            </div>
            <p className="text-md">{profile.headline}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {profile?.country} &#x2022; <FaStar className="ml-2 text-yellow-500" /> {profile?.rating}
              </div>
              <div className='flex items-center'>
                <FaRegUser /> &nbsp; Member since {monthNames[member?.getMonth()]} {member?.getFullYear()}
              </div>

            </div>
          </div>

        </div>
        
        <hr className=" border-navyblue-800" />

        <div className="w-full flex items-center h-12">
          <button 
            className={`w-[50%] h-full flex items-center justify-center font-semibold text-lg border-b-[3px] ${content == "Description" && "border-navyblue-800"} ${content != "Description" && "border-lightblue-100 hover:border-ghostwhite-200"} hover:bg-ghostwhite-200 transition-colors duration-300`}
            onClick={() => {setContent("Description")}}
          >
            Description
          </button>

          <button 
            className={`w-[50%] h-full flex items-center justify-center font-semibold text-lg border-b-[3px] ${content == "Posts" && "border-navyblue-800"} ${content != "Posts" && "border-lightblue-100 hover:border-ghostwhite-200"} hover:bg-ghostwhite-200 transition-colors duration-300`}
            onClick={() => {setContent("Posts")}}
          >
            Posts
          </button>
        </div>

        <div className="px-7 py-7 max-h-[calc(100vh-35rem)] min-h-fit overflow-y-auto">
          {
            content == "Description"
            &&
            <div className='w-full h-fit bg-ghostwhite-50 rounded px-4 py-4' dangerouslySetInnerHTML={displayFormattedText()} />
          }
          {
            content == "Posts"
            &&
            (
              profile.role == "Freelancer"
              ?
              posts.map((post, idx) => {
                return <FreelancerContentBox item={post} key={idx} />
              })
              :
              posts.map((post, idx) => {
                return <CompanyContentBox item={post} key={idx} />
              })
            )
          }
        </div>
      </div>
    </>
  )
}
