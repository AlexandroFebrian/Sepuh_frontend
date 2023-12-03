import React from 'react'
import DashboardViewModel from './DashboardViewModel'

export default function Dashboard() {
  const { isLogin, user } = DashboardViewModel

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
            {/* {
              !isLogin
              &&
              <MenuGuest />
            } */}
            
          </div>
        </div>
        <div className="mid w-4/5 h-full">
          <div className={`min-h-[calc(100vh-5rem)] h-fit ${isLogin && "border-l-2 border-navyblue-600"} z-0 px-10 py-10`}>
            
          </div>
        </div>
      </div> 
    </>
  )
}
