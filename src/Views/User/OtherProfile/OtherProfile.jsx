import FreelancerDefaultMenu from "../../../components/SidebarMenu/Freelancer/FreelancerDefaultMenu/FreelancerDefaultMenu";
import NowHiring from "../../../components/NowHiring/NowHiring";
import CompanyDefaultMenu from "../../../components/SidebarMenu/Company/CompanyDefaultMenu/CompanyDefaultMenu";
import OtherProfileViewModel from "./OtherProfileViewModel";

import { useEffect, useState } from "react";
import ProfileBox from "./ProfileBox";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function OtherProfile() {
  const { isLogin, user, profile, posts } = OtherProfileViewModel()
  const navigate = useNavigate()

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
            
          </div>
        </div>
        <div className="mid w-3/5 h-full">
          <div className=" min-h-[calc(100vh-5rem)] max-h-[calc(100vh-5rem)] border-l-2 border-navyblue-600 z-0 px-10 py-10">
            <div className="flex items-center">
              <FaArrowLeft 
                className=" w-9 h-9 mr-3 cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <h1 className="font-bold text-3xl">View Profile {profile?.name}</h1>
            </div>
            {
              profile
              &&
              <ProfileBox user={user} profile={profile} posts={posts} />
            }
          </div>
        </div>
        <div className="right w-1/5">
          {
            isLogin && user && user.role == "Freelancer"
            &&
            <NowHiring user={user} />
          }
        </div>
      </div>
    </>
  );
}
