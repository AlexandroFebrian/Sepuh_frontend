import React, { useEffect, useState } from "react";
import { CircularProgress } from "@chakra-ui/react";
import PopupBox from "./PopupBox";

export default function Popup({
  wait,
  popup,
  setPopup,
  setWait,
  popupType,
  setPopupType,
  popupTitle,
  popupMessage,
  popupSubMessage,
  popupButtonMessage,
  popupButtonMessage2,
  popupLink,
  resetForm,
  handleClick,
  handleClick2,
  className,
  style,
}) {
  const [close, setClose] = useState(false);

  return (
    <>
      {wait && (
        <>
          <div
            className={`absolute top-0 bg-black/50 z-20 animate__animated  ${
              close ? "animate__fadeOut" : "animate__fadeIn"
            } animate__faster ${className}`}
            style={style}
          />
          <div
            className={`w-screen min-h-full max-h-fit fixed top-0 left-0  z-30 flex items-center justify-center `}
          >
            {popup ? (
              <PopupBox
                setPopup={setPopup}
                setWait={setWait}
                popupType={popupType}
                setPopupType={setPopupType}
                popupTitle={popupTitle}
                popupMessage={popupMessage}
                popupSubMessage={popupSubMessage}
                popupButtonMessage={popupButtonMessage}
                popupButtonMessage2={popupButtonMessage2}
                resetForm={resetForm}
                popupLink={popupLink}
                handleClick={handleClick}
                handleClick2={handleClick2}
                setClose={setClose}
              />
            ) : (
              <CircularProgress
                isIndeterminate
                color="navyblue.800"
                size={"7rem"}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
