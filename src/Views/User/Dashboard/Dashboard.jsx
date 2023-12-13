import React from 'react'
import DashboardViewModel from './DashboardViewModel'
import FreelancerDefaultMenu from '../../../components/SidebarMenu/Freelancer/FreelancerDefaultMenu/FreelancerDefaultMenu'
import CompanyDefaultMenu from '../../../components/SidebarMenu/Company/CompanyDefaultMenu/CompanyDefaultMenu'
import { 
  FaEye,
  FaAngleRight,
  FaFileCircleExclamation,
  FaMoneyBillWave,
  FaUserPlus
} from "react-icons/fa6";
import Projects from './Projects';
import Visitors from './Visitors';
import Outcome from './Outcome';
import Applicants from './Applicants';

export default function Dashboard() {
  const { 
    isLogin, 
    user,
    page,
    setPage,
    activity,
    ongoing,
    formattedOutcome,
    post,
    visitor
  } = DashboardViewModel()

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
            <h1 className='font-bold text-3xl'>Dashboard</h1>

            <div className='w-full grid grid-cols-2 gap-7 mt-4'>
              <div className='w-full h-24 bg-lime-200 rounded-lg border-b-8 border-yellow-500 flex items-center justify-between px-5 hover:bg-lime-300 transition-all duration-300 cursor-pointer' onClick={() => {setPage(1)}}>
                <div className='flex items-center'>
                  <div className='rounded-full w-12 h-12 bg-yellow-500 flex items-center justify-center'>
                    <FaFileCircleExclamation className='text-white text-3xl' />
                  </div>
                  <div className='ml-4'>
                    <h2 className='font-semibold text-xl'>Ongoing Works</h2>
                    <p className='font-semibold'>Total projects: {ongoing}</p>
                  </div>
                </div>

                <div className='flex items-center'>
                  <FaAngleRight className='text-2xl ml-3 text-yellow-500' />
                </div>
              </div>

              <div className='w-full h-24 bg-purple-100 rounded-lg border-b-8 border-yellow-500 flex items-center justify-between px-5 hover:bg-purple-200 transition-all duration-300 cursor-pointer' onClick={() => {setPage(2)}}>
                <div className='flex items-center'>
                  <div className='rounded-full w-12 h-12 bg-yellow-500 flex items-center justify-center'>
                    <FaEye className='text-white text-3xl' />
                  </div>
                  <div className='ml-4'>
                    <h2 className=' font-semibold text-xl'>Page Visitors</h2>
                    <p className='font-semibold'>Total visitors: {visitor}</p>

                  </div>
                </div>

                <div className='flex items-center'>
                  <FaAngleRight className='text-2xl ml-3 text-yellow-500' />
                </div>
              </div>

              <div className='w-full h-24 bg-green-200 rounded-lg border-b-8 border-yellow-500 flex items-center justify-between px-5 hover:bg-green-300 transition-all duration-300 cursor-pointer' onClick={() => {setPage(3)}}>
                <div className='flex items-center'>
                  <div className='rounded-full w-12 h-12 bg-yellow-500 flex items-center justify-center'>
                    <FaMoneyBillWave className='text-white text-3xl' />
                  </div>
                  <div className='ml-4'>
                    <h2 className=' font-semibold text-xl'>Outcome</h2>
                    <p className='font-semibold'>Total outcome: Rp. {formattedOutcome}</p>

                  </div>
                </div>

                <div className='flex items-center'>
                  <FaAngleRight className='text-2xl ml-3 text-yellow-500' />
                </div>
              </div>
              
              <div className='w-full h-24 bg-darkblue-100 rounded-lg border-b-8 border-yellow-500 flex items-center justify-between px-5 hover:bg-darkblue-200 transition-all duration-300 cursor-pointer' onClick={() => {setPage(4)}}>
                <div className='flex items-center'>
                  <div className='rounded-full w-12 h-12 bg-yellow-500 flex items-center justify-center'>
                    <FaUserPlus className='text-white text-3xl' />
                  </div>
                  <div className='ml-4'>
                    <h2 className=' font-semibold text-xl'>Applicants</h2>
                    <p className='font-semibold'>Total Applicants: {visitor}</p>

                  </div>
                </div>

                <div className='flex items-center'>
                  <FaAngleRight className='text-2xl ml-3 text-yellow-500' />
                </div>
              </div>
            </div>

            <div className='mt-4'>
              {
                page == 1
                &&
                <Projects activity={activity.filter(item => (item.status >= 0 && item.status <= 1))} />
              }
              {
                page == 2
                &&
                <Visitors post={post} />
              }
              {
                page == 3
                &&
                <Outcome activity={activity.filter(item => item.status >= 2)} />
              }
              {
                page == 4
                &&
                <Applicants />
              }
            </div>

            </div>
        </div>
      </div>
    </>
  )
}