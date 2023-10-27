import React, { useState } from 'react'

import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Checkbox,
  InputLeftAddon,
  Select,
  Avatar
} from "@chakra-ui/react";
import SignInViewModel from './SignInViewModel';
import { Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaUser, FaEye, FaEyeSlash } from "react-icons/fa6";

export default function SignUpBox({handleClick}) {
  const {
    signUp,
    handleSignUp,
    submitSignUp,
  } = SignInViewModel()

  const [showPassSignUp, setShowPassSignUp] = useState(false);
  const handlePassSignUp = () => setShowPassSignUp(!showPassSignUp);

  const [showConfirmSignUp, setShowConfirmSignUp] = useState(false);
  const handleConfirmSignUp = () => setShowConfirmSignUp(!showConfirmSignUp);

  return (
    <>
      
      <div className="left w-1/2 h-screen flex justify-center items-center text-navyblue-800">
        <div id="left" className=' w-5/6 h-fit'>
          {/* LEFT BOX */}
          <div className=" w-full h-fit border p-10 shadow-lg rounded-xl bg-white">

            <h1 className=" text-5xl text-center mb-10 font-mooli font-bold">Sign Up</h1>

            {/* SUBMIT SIGNUP */}
            <form onSubmit={handleSignUp(submitSignUp)}>
              {/* SIGN UP EMAIL */}
              <label htmlFor="Email SignUp" className="text-gray-900">
                <span>
                  Email
                </span>
              </label>

              <div className="mb-5">
                <InputGroup className=' shadow-lg'>
                  <InputLeftAddon>
                    <FaEnvelope />
                  </InputLeftAddon>
                  <Input
                    variant="outline"
                    type="text"
                    id="EmailInputSignUp"
                    className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5  outline-none"
                    placeholder="Email"

                    {...signUp("email")}
                  />
                
                </InputGroup>
              </div>

              {/* SIGN UP USERNAME */}
              <label htmlFor="Username SignUp" className="text-gray-900">
                <span>
                  Username
                </span>
              </label>

              <div className="mb-5">
                <InputGroup className=' shadow-lg'>
                  <InputLeftAddon>
                    <FaUser />
                  </InputLeftAddon>
                  <Input
                    variant="outline"
                    type="text"
                    id="UsernameInputSignUp"
                    className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5  outline-none"
                    placeholder="Username"

                    {...signUp("username")}
                  />
                
                </InputGroup>
              </div>


              {/* SIGN UP PASSWORD */}
              <div className=" lg:flex justify-between mb-10">

                <div className=" lg:w-1/2 lg:mr-2 mb-5 lg:mb-0">

                  <label htmlFor="Password SignUp" className="text-gray-900 mt-5">
                    Password
                  </label>
                  
                  <InputGroup className=' shadow-lg'>
                    <InputLeftAddon>
                      <FaLock />
                    </InputLeftAddon>

                    <Input
                      pr="4.5rem"
                      type={showPassSignUp ? "text" : "password"}
                      placeholder="Enter password"
                      className="outline-none"
                      variant="outline"

                      {...signUp("password")}
                    />

                    <InputRightElement width="4.5rem">
                      <button h="1.75rem" size="sm" type="button" onMouseDown={handlePassSignUp} onMouseUp={handlePassSignUp}>
                        {showPassSignUp ? (
                          <FaEye/>
                        ) : (
                          <FaEyeSlash/>
                        )}
                      </button>
                    </InputRightElement>
                  </InputGroup>
                </div>

                <div className=" lg:w-1/2 lg:ml-2">

                  <label htmlFor="Confirm Password" className="text-gray-900 mt-5">
                    Confirm Password
                  </label>
                  
                  <InputGroup className=' shadow-lg'>
                    <InputLeftAddon>
                     <FaLock />
                    </InputLeftAddon>

                    <Input
                      pr="4.5rem"
                      type={showConfirmSignUp ? "text" : "password"}
                      placeholder="Confirm password"
                      className="outline-none"
                      variant="outline"

                      {...signUp("confirm")}
                    />

                    <InputRightElement width="4.5rem">
                      <button h="1.75rem" size="sm" type="button" onMouseDown={handleConfirmSignUp} onMouseUp={handleConfirmSignUp}>
                        {showConfirmSignUp ? (
                          <FaEye/>
                        ) : (
                          <FaEyeSlash/>
                        )}
                      </button>
                    </InputRightElement>
                  </InputGroup>
                </div>
              </div>

              <div className='w-full'>
                <div className="flex w-full justify-center items-center mb-2">
                  <span className='mr-3'>Sign up as: </span>
                  <Select 
                    defaultValue={"1"} 
                    width={"11rem"}
                    bg={"navyblue.500"}
                    color={"ghostwhite"}
                    _hover={{bg: "navyblue.600"}}
                    transitionDuration={"300ms"}
                    className='cursor-pointer'

                    {...signUp("role")}
                  >
                    <option value='1' className=' text-black '>Freelancer</option>
                    <option value='2' className=' text-black '>Company</option>
                  </Select>
                </div>

                <div className="flex w-full justify-center mb-2">
                  <Checkbox {...signUp("terms")}>
                    I agree to the <Link to={"#"} className=' underline hover:text-indigo-300'>Terms and Conditions</Link>.
                    <span className="text-red-500">*</span>
                  </Checkbox>
                </div>
                
                <div className="flex w-full justify-center">
                  <Button
                    colorScheme={"navyblue"}
                    color={"ghostwhite"}
                    className="w-full"
                    transitionDuration={"300ms"}
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </div>

              </div>
            </form>
          </div>
          
          {/* HAVE ACCOUNT */}
          <div className='w-full flex bg-white mt-10 border rounded-xl py-5 justify-center shadow-lg'>
            <p>Already have account? <span className=' underline hover:text-indigo-300 cursor-pointer' onClick={handleClick}>Sign In</span></p>
          </div>
          
        </div>  


      </div>
    </>
  )
}
