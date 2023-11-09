import 'animate.css';
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import {FaSliders} from 'react-icons/fa6';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass, FaFilter } from "react-icons/fa6";
import { set } from "react-hook-form";
import Filter from './Filter';

export default function Navbar() {
  const [logedIn, setLogedIn] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      {
        showFilter
        &&
        <div 
          className="fixed w-[100vw] h-[100vh] bg-black/50 z-20 animate__animated animate__fadeIn duration-0"
          onClick={() => {setShowFilter(!showFilter)}}
        >
        </div>
      }

      <nav className="w-full h-20 bg-navyblue-800 flex justify-between px-7 py-4 fixed top-0 z-20">
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
        <div className="flex items-center w-1/3 relative">
          <InputGroup background={"ghostwhite.100"} rounded={"md"} className=" border-b-0 border-navyblue-800">
            <InputLeftElement>
              <FaMagnifyingGlass />
            </InputLeftElement>

            <Input placeholder="Search"></Input>

            <InputRightElement>
              <FaSliders 
                className=" cursor-pointer"
                onClick={() => {setShowFilter(!showFilter)}}
              />
            </InputRightElement>
          </InputGroup>
          {
            showFilter
            &&
            <Filter setShowFilter={setShowFilter} />
          }
        </div>
        <div className="flex items-center">
          {logedIn ? (
            <>
              <Button
                color="ghostwhite.50"
                _hover={{ bg: "transparent" }}
                width="135px"
                className=" me-6"
                variant="ghost"
                transitionDuration={"300ms"}
              >
                Notifications
              </Button>
              <Button
                color="ghostwhite.50"
                bg="indigo.300"
                _hover={{ bg: "indigo.350" }}
                _active={{ bg: "indigo.400" }}
                width="135px"
                transitionDuration={"300ms"}
              >
                My Profile
              </Button>
            </>
          ) : (
            <>
              <Link to={"/signin?signup=true"} className='me-6'>
                <Button
                  color="ghostwhite.50"
                  bg="indigo.300"
                  _hover={{ bg: "indigo.350" }}
                  _active={{ bg: "indigo.400" }}
                  width="135px"
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
                  width="135px"
                  transitionDuration={"300ms"}
                >
                  Sign In
                </Button>
              </Link>
              
            </>
          )}
        </div>
      </nav>
    </>
  );
}
