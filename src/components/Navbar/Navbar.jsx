import {
  Avatar,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {FaSliders} from 'react-icons/fa6';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMagnifyingGlass, FaFilter } from "react-icons/fa6";
import { set } from "react-hook-form";
import Filter from './Filter';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIsLogin, setUserDetail } from '../../redux/UserSlice';


export default function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLogin = useSelector((state) => state.user.isLogin)
  const user = useSelector((state) => state.user.userDetail)

  const [showFilter, setShowFilter] = useState(false);
  const [closeFilter, setCloseFilter] = useState(false);

  const [showProfile, setShowProfile] = useState(false);
  const [closeProfile, setCloseProfile] = useState(false);

  function close(){
    setCloseFilter(true); 
    setTimeout(() => {
      setShowFilter(false); 
      setCloseFilter(false)
    }, 1000)
  }

  function open(){
    if(!showFilter){
      setShowFilter(true)
    }else{
      close()
    }
  }

  function logout(){
    dispatch(setIsLogin(false))
    dispatch(setUserDetail({}))
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <>
      {
        showFilter
        &&
        <div 
          className={`fixed w-[100vw] h-[100vh] bg-black/50 z-20 animate__animated ${closeFilter ? "animate__fadeOut" : "animate__fadeIn"} animate__faster`}
          onClick={() => {close()}}
        >
        </div>
      }

      <nav className="w-full h-20 bg-navyblue-800 flex justify-between px-7 py-4 fixed top-0 z-[60]">
        <div>
          <Link to={"/"}>
            <img
              src="/logo/Logo Putih.png"
              alt="Logo"
              className="h-full"
              draggable="false"
            />
          </Link>
        </div>
        
        <div className="flex items-center justify-between w-10/12 relative ps-6">
          <div className="flex items-center w-7/12 relative me-6">
            <InputGroup background={"ghostwhite.100"} rounded={"md"} className=" border-b-0 border-navyblue-800">
              <InputLeftElement>
                <FaMagnifyingGlass />
              </InputLeftElement>

              <Input placeholder="Search"></Input>

              <InputRightElement>
                <FaSliders 
                  className=" cursor-pointer"
                  onClick={() => {open()}}
                />
              </InputRightElement>
            </InputGroup>
            {
              showFilter
              &&
              <Filter setShowFilter={setShowFilter} closeFilter={closeFilter} close={close} />
            }
          </div>
          <div className='w-5/12 flex items-center justify-end'>
            {isLogin ? (
              <>
                <Button
                  color="ghostwhite.50"
                  _hover={{ bg: "whiteAlpha.200" }}
                  _active={{ bg: "whiteAlpha.300" }}
                  width="8.5rem"
                  className=" me-6"
                  variant="ghost"
                  transitionDuration={"300ms"}
                >
                  My Activity
                </Button>

                <Button
                  color="ghostwhite.50"
                  _hover={{ bg: "whiteAlpha.200" }}
                  _active={{ bg: "whiteAlpha.300" }}
                  width="8.5rem"
                  className=" me-6"
                  variant="ghost"
                  transitionDuration={"300ms"}
                >
                  Notifications
                </Button>
                
                <Popover>
                  <PopoverTrigger className=" text-ghostwhite-50 font-semibold bg-indigo-300 w-[8.5rem] h-[2.5rem] rounded-md hover:bg-indigo-350 active:bg-indigo-400 transition-colors duration-300">
                    My Profile
                  </PopoverTrigger>
                  <PopoverContent className="mt-6 mr-7 bg-navyblue-800 rounded-lg border-0">
                    <div className='w-full h-fit bg-ghostwhite-50 rounded-md p-2'>
                      <div className='w-full flex justify-center'>
                        <Avatar bg="ghostwhite.400" />
                      </div>
                      <h1 className='text-center font-semibold mt-1'>{user.name}</h1>
                    </div>
                    <Link to={""}>
                      <Button
                        color="ghostwhite.50"
                        borderColor="indigo.300"
                        borderWidth="2px"
                        _hover={{ bg: "whiteAlpha.200" }}
                        _active={{ bg: "whiteAlpha.300" }}
                        variant="outline"
                        width="100%"
                        height={"2rem"}
                        transitionDuration={"300ms"}
                        marginTop={"0.5rem"}
                        rounded={"3xl"}
                      >
                        View Profile
                      </Button>
                    </Link>
                    <Button
                      color="ghostwhite.50"
                      bg="red.500"
                      _hover={{ bg: "red.600" }}
                      _active={{ bg: "red.700" }}
                      width="100%"
                      height={"2rem"}
                      transitionDuration={"300ms"}
                      marginTop={"0.5rem"}
                      rounded={"3xl"}
                      onClick={() => {logout()}}
                    >
                      Logout
                    </Button>
                  </PopoverContent>
                </Popover>

              </>
            ) : (
              <>
                <Link to={"/signin?signup=true"} className='me-6'>
                  <Button
                    color="ghostwhite.50"
                    bg="indigo.300"
                    _hover={{ bg: "indigo.350" }}
                    _active={{ bg: "indigo.400" }}
                    width="8.5rem"
                    transitionDuration={"300ms"}
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link to={"/signin"}>
                  <Button
                    color="ghostwhite.50"
                    borderColor="indigo.300"
                    borderWidth="2px"
                    _hover={{ bg: "whiteAlpha.200" }}
                    _active={{ bg: "whiteAlpha.300" }}
                    variant="outline"
                    width="8.5rem"
                    transitionDuration={"300ms"}
                  >
                    Sign In
                  </Button>
                </Link>
                
              </>
            )}

          </div>
        </div>
      </nav>
    </>
  );
}
