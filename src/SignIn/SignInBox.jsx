import React, { useState } from 'react'
import SignInViewModel from './SignInViewModel'

import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Checkbox,
  InputLeftAddon
} from "@chakra-ui/react";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa6";

export default function SignInBox({handleClick}) {
  const {
    signIn,
    handleSignIn,
    submitSignIn,
  } = SignInViewModel()

  const [showPassSignIn, setShowPassSignIn] = useState(false);
  const handlePassSignIn = () => setShowPassSignIn(!showPassSignIn);

  return (
    <>
      <div className="right w-1/2 h-screen flex justify-center items-center text-navyblue-800">
        <div id="right" className=' w-4/6 h-fit'>

          {/* RIGHT BOX */}
          <div className=" h-fit border p-10 shadow-lg rounded-xl bg-white">
            <h1 className=" text-5xl text-center mb-10 font-mooli font-bold">Sign In</h1>

            {/* SUBMIT SIGNIN */}
            <form onSubmit={handleSignIn(submitSignIn)}>

              {/* SIGN IN email */}
              <label htmlFor="Email SignIn" className="text-gray-900">
                <span>
                  Email
                </span>
              </label>

              <div className="mb-5">
                <InputGroup className=" shadow-lg">
                  <InputLeftAddon>
                    <FaEnvelope />
                  </InputLeftAddon>
                  <Input
                    variant="outline"
                    type="text"
                    id="EmailInputSignIn"
                    className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5  outline-none"
                    placeholder="Email"

                    {...signIn("email")}
                  />
                
                </InputGroup>
              </div>

              {/* SIGN IN PASSWORD */}
              <label htmlFor="Password SignIn" className="text-gray-900 mt-5">
                Password
              </label>

              <InputGroup className=' shadow-lg'>
                <InputLeftAddon>
                  <FaLock />
                </InputLeftAddon>
                <Input
                  pr="4.5rem"
                  type={showPassSignIn ? "text" : "password"}
                  placeholder="Enter password"
                  className="outline-none"
                  variant="outline"

                  {...signIn("password")}
                />
                <InputRightElement width="4.5rem">

                  <button h="1.75rem" size="sm" type="button" onMouseDown={handlePassSignIn} onMouseUp={handlePassSignIn}>
                    {showPassSignIn ? (
                      <FaEye />
                    ) : (
                      <FaEyeSlash />
                    )}
                  </button>
                </InputRightElement>
              </InputGroup>

              <div className="flex w-full justify-center">
                <div className="w-full mt-10">
                  <Button
                    colorScheme={"navyblue"}
                    color={"ghostwhite"}
                    className="w-full"
                    transitionDuration={"300ms"}
                    type="submit"
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            </form>
          </div>
          
          {/* DONT HAVE ACCOUNT */}
          <div className='w-full flex bg-white mt-10 border rounded-xl shadow-lg py-5 justify-center'>
            <p>Don't have account? <span className=' underline hover:text-indigo-300 cursor-pointer' onClick={handleClick}>Sign Up</span></p>
          </div>
        </div>
        


      </div> 
    </>
  )
}
