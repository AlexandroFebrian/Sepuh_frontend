import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass, FaFilter } from "react-icons/fa6";

export default function Navbar() {
  const [logedIn, setLogedIn] = useState("false");

  return (
    <>
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
        <div className="flex items-center w-1/3">
          <InputGroup background={"ghostwhite.100"} rounded={"md"}>
            <InputLeftElement>
              <FaMagnifyingGlass />
            </InputLeftElement>

            <Input placeholder="Search"></Input>

            <InputRightElement>
              <FaFilter />
            </InputRightElement>
          </InputGroup>
        </div>
        <div className="flex items-center">
          {logedIn ? (
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
          ) : (
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
                width="135px"
                transitionDuration={"300ms"}
              >
                My Profile
              </Button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
