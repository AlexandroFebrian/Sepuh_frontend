import React, { useState } from 'react'
import SignInViewModel from './SignInViewModel'

import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Checkbox,
  InputLeftAddon,
  CircularProgress
} from "@chakra-ui/react";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa6";
import Popup from '../../components/Popup/Popup';

export default function SignInBox({handleClick}) {
  const {
    signInForm,
    signInError,
    handleSignIn,
    submitSignIn,
    wait,
    setWait,
    popup,
    setPopup,
    popupTitle,
    popupMessage,
    popupButtonMessage
  } = SignInViewModel()

  const [showPassSignIn, setShowPassSignIn] = useState(false);
  const handlePassSignIn = () => setShowPassSignIn(!showPassSignIn);
  return (
    <>
      <div className="right w-1/2 h-screen flex justify-center items-center text-navyblue-800 relative">
        {
          wait
          &&
          <div 
          className={`absolute w-[100%] h-[100%] bg-black/30 z-20 flex items-center justify-center animate__animated animate__fadeIn animate__faster`}>
            {
              popup
              ?
              <Popup setPopup={setPopup} setWait={setWait} popupTitle={popupTitle} popupMessage={popupMessage} popupButtonMessage={popupButtonMessage}/>
              :
              <CircularProgress 
              isIndeterminate 
              color='navyblue.800'
              size={"7rem"}
              />
            }
          </div>
        }
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
                    type="email"
                    id="EmailInputSignIn"
                    className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5  outline-none"
                    placeholder="Email"

                    {...signInForm("email")}
                  />
                
                </InputGroup>
                <p>{signInError?.email?.message}</p>
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

                  {...signInForm("password")}
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
              <p>{signInError?.password?.message}</p>

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
            <p>Don't have account? <span className=' underline text-indigo-300 hover:text-indigo-400 cursor-pointer' onClick={handleClick}>Sign Up</span></p>
          </div>
        </div>
        


      </div> 
    </>
  )
}
