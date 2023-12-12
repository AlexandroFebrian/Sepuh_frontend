import FreelancerDefaultMenu from "../../../components/SidebarMenu/Freelancer/FreelancerDefaultMenu/FreelancerDefaultMenu";
import NowHiring from "../../../components/NowHiring/NowHiring";
import CompanyDefaultMenu from "../../../components/SidebarMenu/Company/CompanyDefaultMenu/CompanyDefaultMenu";
import OtherProfileViewModel from "./OtherProfileViewModel";

import { useEffect, useState } from "react";
import ProfileBox from "./ProfileBox";

export default function OtherProfile() {
  const { isLogin, user, profile, posts } = OtherProfileViewModel()

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
            <h1 className="font-bold text-3xl">View Profile {profile?.name}</h1>
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
            <NowHiring />
          }
        </div>
      </div>
    </>
  );
}
