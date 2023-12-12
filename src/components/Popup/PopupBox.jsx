/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Tick from "../ErrorSign/Tick/Tick";
import Cross from "../ErrorSign/Cross/Cross";
import QuestionMark from "../ErrorSign/QuestionMark/QuestionMark";

export default function PopupBox({
  setPopup,
  setWait,
  popupType,
  setPopupType,
  popupTitle,
  popupMessage,
  popupButtonMessage,
  popupButtonMessage2,
  popupLink,
  popupSubMessage,
  resetForm,
  handleClick,
  handleClick2,
  setClose,
}) {
  const [closeBox, setCloseBox] = useState(false);

  async function close() {
    setClose(true);
    setCloseBox(true);

    setTimeout(() => {
      setClose(false);

      setPopup(false);
      if (setWait) {
        setWait(false);
      }

      setPopupType(undefined);
    }, 500);

    if (popupButtonMessage == "Sign In") {
      resetForm();
      handleClick();
    }
    if (handleClick && popupButtonMessage != "Try Again") {
      handleClick();
    }
  }

  async function close2() {
    // setClose(true)
    setCloseBox(true);
    setPopup(false);

    // setTimeout(() => {
    //   setClose(false)

    //   setPopup(false)
    //   if(setWait){
    //     setWait(false)
    //   }
    // }, 500)

    await handleClick2();

    // setTimeout(async () => {
    //   await handleClick2()

    // }, 500)
  }

  return (
    <div
      className={` w-[30rem] h-fit bg-white rounded-md p-10 animate__animated ${
        closeBox ? "animate__fadeOut" : "animate__fadeIn"
      } animate__faster`}
    >
      <h1 className="text-center text-2xl font-semibold">{popupTitle}</h1>

      <h2 className="text-center text-xl">{popupMessage}</h2>

      <h3 className="text-center text-md">{popupSubMessage}</h3>

      <div className="w-full flex justify-center items-center mt-2">
        {popupType === true && <Tick />}
        {popupType === false && <Cross />}
        {popupType === "?" && <QuestionMark />}
      </div>

      <div className="w-full flex justify-center">
        {popupButtonMessage2 && (
          <Button
            color="navyblue.800"
            borderColor="navyblue.800"
            borderWidth="2px"
            _hover={{ bg: "ghostwhite.50" }}
            _active={{ bg: "ghostwhite.100" }}
            variant="outline"
            width="9rem"
            height={"2.5rem"}
            transitionDuration={"300ms"}
            marginTop={"1rem"}
            marginRight={"0.5rem"}
            rounded={"md"}
            onClick={() => {
              close2();
            }}
          >
            {popupButtonMessage2}
          </Button>
        )}
        <Button
          color="navyblue.800"
          borderColor="navyblue.800"
          borderWidth="2px"
          _hover={{ bg: "ghostwhite.50" }}
          _active={{ bg: "ghostwhite.100" }}
          variant="outline"
          width="9rem"
          height={"2.5rem"}
          transitionDuration={"300ms"}
          marginTop={"1rem"}
          rounded={"md"}
          onClick={() => {
            close();
          }}
        >
          {popupButtonMessage}
        </Button>
      </div>
    </div>
  );
}
