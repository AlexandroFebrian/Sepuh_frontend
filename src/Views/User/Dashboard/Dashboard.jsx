import React from 'react'
import DashboardViewModel from './DashboardViewModel'
import FreelancerDefaultMenu from '../../../components/SidebarMenu/Freelancer/FreelancerDefaultMenu/FreelancerDefaultMenu'
import CompanyDefaultMenu from '../../../components/SidebarMenu/Company/CompanyDefaultMenu/CompanyDefaultMenu'

export default function Dashboard() {
  const { isLogin, user } = DashboardViewModel()

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
        <div className="mid w-3/5 h-full">
          <div className={`min-h-[calc(100vh-5rem)] h-fit ${isLogin && "border-l-2 border-navyblue-600"} z-0 px-10 py-10`}>
            <h1 className='font-bold text-3xl'>Dashboard</h1>
          </div>
        </div>
        {
          isLogin && user && user.role == "Freelancer"
          &&
          <div className="right w-1/5">
            <NowHiring />
          </div>
        }
      </div>
    </>
  )
}
