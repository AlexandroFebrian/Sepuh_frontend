import React, { useEffect, useState } from 'react'
import DetailActivityViewModel from './DetailActivityViewModel'
import { Avatar, Button, Input } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import InputFileButton from '../../../../components/InputFileButton/InputFileButton'
import { FaCloudArrowUp } from "react-icons/fa6";
import Popup from '../../../../components/Popup/Popup'
import WorkBox from './WorkBox'

export default function DetailActivity() {
  const {
    user,
    isLogin,
    activity,
    setActivity,
    minPrice,
    maxPrice,
    priceBefore,
    setPrice,
    rejectHandler,
    changeBidHandler,
    acceptBidHandler,
    payHandler,
    file,
    setFile,
    saveFileHandler,
    wait,
    popup,
    popupTitle,
    popupButtonMessage,
    popupType,
    setPopup,
    setWait,
    setPopupType,
    doneHandler
  } = DetailActivityViewModel()

  const date = new Date(activity?.create_at)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
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
        popupType={popupType}
        setPopupType={setPopupType}
        popupTitle={popupTitle}
        popupButtonMessage={popupButtonMessage}
        className="fixed w-screen h-screen left-0"
        style={{ top: `${position}px` }}
      />

      <div className='w-full'>
        <div className='w-full px-1'>
          {
            activity?.status == -1
            &&
            <h1 className='text-2xl font-bold'>Rejected</h1>
          }
          {
            activity?.status == 0
            &&
            <h1 className='text-2xl font-bold'>Waiting for Bid</h1>
          }
          {
            activity?.status == 1
            &&
            <div className='w-full flex justify-between items-center'>
              <h1 className='text-2xl font-bold'>On Progress</h1>
              {
                ((user.role == "Freelancer" && activity?.freelancer_status == 1) || (user.role == "Company" && activity?.company_status == 1))
                &&
                <Button
                  color="ghostwhite.50"
                  bg="green.500"
                  _hover={{ bg: "green.600", shadow: "lg" }}
                  _active={{ bg: "green.700" }}
                  width="8.5rem"
                  transitionDuration={"300ms"}
                  shadow={"md"}
                  marginRight={"1rem"}
                  onClick={() => {doneHandler()}}
                >
                  Done Project
                </Button>
              }
              {
                (user.role == "Freelancer" && activity?.freelancer_status == 2 && activity?.company_status == 1)
                &&
                <p className='text-yellow-500 font-semibold'>
                  Waiting for the company to Done the project!
                </p>
              }
              {
                (user.role == "Company" && activity?.company_status == 2 && activity?.freelancer_status == 1)
                &&
                <p className='text-yellow-500 font-semibold'>
                  Waiting for the freelancer to Done the project!
                </p>
              }
            </div>
          }
          {
            activity?.status == 2
            &&
            <h1 className='text-2xl font-bold'>Finished</h1>
          }

        </div>
        
        <div className='w-full bg-ghostwhite-100 rounded my-4 px-5 py-5'>
          <div className='flex'>
            {
              user.role == "Freelancer"
              &&
              <Avatar src={activity?.company.profile_picture} size={"xl"} />
            }
            {
              user.role == "Company"
              &&
              <Avatar src={activity?.freelancer.profile_picture} size={"xl"} />
            }
            <div className='ml-3 w-full flex flex-col justify-between'>
              <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-semibold text-navyblue-500'>
                  {activity?.post.title}
                </h2>

                <Link to={`/post/${activity?.post._id}`}>
                  <Button
                    color="ghostwhite.50"
                    bg="indigo.300"
                    _hover={{ bg: "indigo.350" }}
                    _active={{ bg: "indigo.400" }}
                    width="8.5rem"
                    transitionDuration={"300ms"}
                  >
                    View Post
                  </Button>
                </Link>
              </div>
              {
                user.role == "Freelancer"
                &&
                <Link to={`/user?email=${activity?.company.email}`}>
                  <h3 className='font-semibold underline hover:text-navyblue-500'>
                    {activity?.company.name}
                  </h3>
                </Link>
              }
              {
                user.role == "Company"
                &&
                <Link to={`/user?email=${activity?.freelancer.email}`}>
                  <h3 className='font-semibold underline hover:text-navyblue-500'>
                    {activity?.freelancer.name}
                  </h3>
                </Link>
              }
              
              <p className=' text-ghostwhite-500 text-xs'>
                Started at {date.getDate()} {monthNames[date.getMonth()]} {date.getFullYear()}
              </p>
            </div>
          </div>
          
          {
            activity?.status > 0
            &&
            <h3 className='mt-3 text-lg font-semibold'>
              Final price: Rp {priceBefore}
            </h3>
          }
        </div>

        <div className='w-full mt-5'>
          {
            activity?.status == -1
            &&
            <div className='w-full h-96 flex items-center justify-center'>
              <h1 className='text-3xl font-bold text-red-500'>
                This work is rejected!
              </h1>
            </div>
          }
          {
            activity?.status == 0
            &&
            <>
              <h1 className='text-2xl font-bold'>
                Bid
              </h1>

              <div className='w-full bg-ghostwhite-100 px-5 py-6 my-4 rounded'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-lg font-semibold'>
                    Rp. {minPrice} - {maxPrice}
                  </h2>

                  {
                    (activity?.freelancer_status == 0 || activity?.company_status == 0)
                    &&
                    <Button
                      color="ghostwhite.50"
                      bg="red.500"
                      _hover={{ bg: "red.600" }}
                      _active={{ bg: "red.700" }}
                      width="8.5rem"
                      transitionDuration={"300ms"}
                      onClick={() => {rejectHandler()}}
                    >
                      Reject
                    </Button>
                  }

                </div>

                <hr className='my-2 border border-navyblue-800' />

                {
                  (activity?.freelancer_status == 0 || activity?.company_status == 0)
                  ?
                  <>
                    <p className='font-semibold'>
                      Bid Price Now: <span className='font-bold'>Rp. {priceBefore}</span>
                    </p>

                    <div className='w-full flex items-center mt-2'>
                      <p className='mr-2 font-semibold'>
                        Bid Price: <span className='font-bold'>Rp. </span>
                      </p> 

                      <Input 
                        type='number'
                        width={"10rem"}
                        height={"2rem"}
                        paddingX={"0.6rem"}
                        bgColor={"white"}
                        border={"1px"}
                        borderColor={"navyblue.800"}
                        onChange={(e) => setPrice(e.target.value)}
                      />

                      <p className='ml-2 text-red-500'>
                        
                      </p>
                    </div>
                  </>
                  :
                    <p className='font-bold text-lg'>
                      Deal Price: Rp. {priceBefore}
                    </p>

                }


                <div className='w-full flex items-center mt-3'>
                  {
                    ((user.role == "Freelancer" && activity?.freelancer_status == 0) || (user.role == "Company" && activity?.company_status == 0))
                    &&
                    <Button
                      color="ghostwhite.50"
                      bg="green.500"
                      _hover={{ bg: "green.600", shadow: "lg" }}
                      _active={{ bg: "green.700" }}
                      width="8.5rem"
                      transitionDuration={"300ms"}
                      shadow={"md"}
                      marginRight={"1rem"}
                      onClick={() => {acceptBidHandler()}}
                    >
                      Accept Bid
                    </Button>
                  }
                  {
                    (activity?.freelancer_status == 0 || activity?.company_status == 0)
                    ?
                    <Button
                      bg="yellow.300"
                      _hover={{ bg: "yellow.400", shadow: "lg" }}
                      _active={{ bg: "yellow.500" }}
                      width="8.5rem"
                      transitionDuration={"300ms"}
                      shadow={"md"}
                      onClick={() => {changeBidHandler()}}
                    >
                      Change Bid
                    </Button>
                    :
                    <>
                      {
                        user.role == "Freelancer"
                        &&
                        <p className='font-semibold text-green-600'>
                          Waiting for company to confirm the payment!
                        </p>
                      }
                      {
                        user.role == "Company"
                        &&
                        <Button
                          bg="yellow.300"
                          _hover={{ bg: "yellow.400", shadow: "lg" }}
                          _active={{ bg: "yellow.500" }}
                          transitionDuration={"300ms"}
                          shadow={"md"}
                          onClick={() => {payHandler()}}
                        >
                          Continue to Payment
                        </Button>
                      }
                    </>
                  }

                </div>
              </div>
            </>
          }
          {
            activity?.status == 1 && user.role == "Freelancer"
            &&
            <>
              <div className='flex justify-between h-16'>
                <h1 className='text-2xl font-bold'>
                  Works
                </h1>

                <div className='flex flex-col justify-between h-full'>
                  <div className='w-full flex'>
                    <InputFileButton 
                      className="w-fit border border-indigo-400 rounded px-7 text-indigo-400 hover:bg-white/60 active:bg-white mr-3"
                      accept={".zip, .rar"}
                      setFile={setFile}
                    >
                      <FaCloudArrowUp className='mr-2' /> Upload
                    </InputFileButton>
                    <Button
                      bg="yellow.300"
                      _hover={{ bg: "yellow.400", shadow: "lg" }}
                      _active={{ bg: "yellow.500" }}
                      transitionDuration={"300ms"}
                      shadow={"md"}
                      paddingX={"2rem"}
                      onClick={() => {saveFileHandler()}}
                    >
                      Save File
                    </Button>
                  </div>
                  <div className='w-full flex justify-end italic'>
                    {file[0]?.name}
                  </div>
                </div>
              </div>

              <div className='w-full'>
                {
                  activity?.file.reverse().map((item, i) => {
                    return <WorkBox key={i} file={item} user={user} activity={activity} setActivity={setActivity} />
                  })
                }
              </div>


            </>
          }
          {
            activity?.status == 1 && user.role == "Company"
            &&
            <>
              <h1 className='text-2xl font-bold'>
                Works
              </h1>

              <div className='w-full'>
                {
                  activity?.file.reverse().map((item, i) => {
                    return <WorkBox key={i} file={item} user={user} activity={activity} setActivity={setActivity} />
                  })
                }
              </div>
            </>
          }
          {
            activity?.status == 2
            &&
            <div className='w-full h-96 flex items-center justify-center'>
              <h1 className='text-3xl font-bold text-green-600'>
                This work has been finished!
              </h1>
            </div>
          }
        </div>
      </div>
    </>
  )
}
