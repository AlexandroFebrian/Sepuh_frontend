import { useState } from "react";
import { useSpring, useSpringRef, animated } from "@react-spring/web";
import "animate.css";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Checkbox,
} from "@chakra-ui/react";

const Eye = ({ isOpen }) => {
  return (
    // <>
    // eyes open
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     width="24"
    //     height="24"
    //     viewBox="0 0 24 24"
    //   >
    //     <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
    //   </svg>
    // </>

    // eyes closed
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     width="24"
    //     height="24"
    //     viewBox="0 0 24 24"
    //   >
    //     <path d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z" />
    //   </svg>

    // buat pakai ternary operator
    <button onClick={handleClick}>
      {isOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c
          -3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z"
          />
        </svg>
      )}
    </button>
  );
};

export default function SignIn() {
  const api = useSpringRef();
  const jumbo = useSpring({
    ref: api,
    from: { x: 0 },
  });

  let move = false;

  const [showPass, setShowPass] = useState(false);
  const handlePass = () => setShowPass(!showPass);

  const [showConfirm, setShowConfirm] = useState(false);
  const handleConfirm = () => setShowConfirm(!showConfirm);

  const handleClick = () => {
    if (move == false) {
      move = true;
      if (jumbo.x.get() === window.innerWidth / 2) {
        // Tambah class Animate kiri ngilang
        document
          .getElementById("left")
          .classList.add("animate__animated", "animate__fadeOutRight");

        // Tambah class Animate kanan muncul
        document
          .getElementById("right")
          .classList.add("animate__animated", "animate__fadeInLeft");
      } else {
        // Tambah class Animate kiri nmuncul
        document
          .getElementById("left")
          .classList.add("animate__animated", "animate__fadeInRight");

        // Tambah class Animate kanan ngilang
        document
          .getElementById("right")
          .classList.add("animate__animated", "animate__fadeOutLeft");
      }

      api.start({
        to: {
          x:
            jumbo.x.get() === window.innerWidth / 2 ? 0 : window.innerWidth / 2,
        },
      });

      move = true;
    }

    if (move == true) {
      setTimeout(() => {
        console.log(jumbo.x.get());
        if (jumbo.x.get() === window.innerWidth / 2) {
          // Hapus class Animate kiri ngilang
          document
            .getElementById("left")
            .classList.remove("animate__animated", "animate__fadeInRight");

          // Hapus class Animate kanan muncul
          document
            .getElementById("right")
            .classList.remove("animate__animated", "animate__fadeOutLeft");
        } else {
          // Hapus class Animate kiri nmuncul
          document
            .getElementById("left")
            .classList.remove("animate__animated", "animate__fadeOutRight");

          // Hapus class Animate kanan ngilang
          document
            .getElementById("right")
            .classList.remove("animate__animated", "animate__fadeInLeft");
        }
        move = false;
      }, 1000);
    }
  };

  return (
    <>
      <div className="bg-ghostwhite font-bold h-screen flex">
        <animated.div
          onClick={handleClick}
          style={{
            width: "50%",
            height: "100%",
            zIndex: 2,
            ...jumbo,
          }}
          className=" bg-navyblue-800 fixed"
        ></animated.div>
        <div className="left w-1/2 h-screen flex justify-center items-center text-navyblue-800">
          <div id="left" className=" w-5/6 h-[33rem] border p-10">
            <h1 className=" text-5xl text-center mb-10">Sign Up</h1>

            {/* <form> */}

            {/* <form onSubmit={(e) => e.preventDefault()}> */}
            {/* INPUT USERNAME */}
            <label for="Username" className="text-gray-900">
              <span>
                Username <span className="text-red-500">*</span>
              </span>
            </label>
            <div className="flex  mb-5">
              <span className="inline-flex items-center px-3 text-gray-900 bg-gray-200  rounded-l-md">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </span>
              <input
                variant="outline"
                type="text"
                id="UsernameInputSignIn"
                className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 shadow-2xl outline-none"
                placeholder="Username"
              />
            </div>
            {/* INPUT EMAIL */}
            <label for="Email" className="text-gray-900">
              <span>
                Email <span className="text-red-500">*</span>
              </span>
            </label>
            <div className="flex mb-5">
              <span className="inline-flex items-center px-3 text-gray-900 bg-gray-200  rounded-l-md">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </span>
              <input
                variant="outline"
                type="text"
                id="EmailInput"
                className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 shadow-2xl outline-none"
                placeholder="Email"
              />
            </div>
            {/* INPUT PASSWORD */}
            <label for="Password" className="text-gray-900 mt-5">
              Password
            </label>
            <InputGroup>
              <Input
                pr="4.5rem"
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                className="outline-none shadow-2xl"
                variant="outline"
              />
              <InputRightElement width="4.5rem">
                {/* <Button h="1.75rem" size="sm" onClick={handlePass}>
                    {showPass ? "Hide" : "Show"}
                  </Button> */}

                <button h="1.75rem" size="sm" onClick={handlePass}>
                  {showPass ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z" />
                    </svg>
                  )}
                </button>
              </InputRightElement>
            </InputGroup>
            <div className="flex w-full justify-center mt-5">
              <div className="w-4/6">
                <Button
                  colorScheme={"navyblue"}
                  color={"ghostwhite"}
                  className="w-full"
                >
                  Sign Up
                </Button>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
        <div className="right w-1/2 h-screen flex justify-center items-center text-navyblue-800">
          <div id="right" className=" w-5/6 h-[33rem] border p-10">
            <h1 className=" text-5xl text-center mb-10">Sign In</h1>

            {/* <p>Username</p>
            <Input variant="outline" placeholder="Username" />
            <p>Email</p>
            <Input variant="outline" placeholder="Email" /> */}

            <label for="Username" className="text-gray-900">
              <span>
                Username <span className="text-red-500">*</span>
              </span>
            </label>
            <div className="flex  mb-5">
              <span className="inline-flex items-center px-3 text-gray-900 bg-gray-200  rounded-l-md">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </span>
              <input
                variant="outline"
                type="text"
                id="UsernameInputSignIn"
                className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 shadow-2xl outline-none"
                placeholder="Username"
              />
            </div>

            <div className="flex justify-between mb-5">
              <div className=" w-1/2 mr-2">
                <p>Password</p>
                {/* <InputGroup>
                  <Input
                    pr="4.5rem"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handlePass}>
                      {showPass ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup> */}

                <InputGroup>
                  <Input
                    pr="4.5rem"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter password"
                    className="outline-none"
                    variant="outline"
                  />
                  <InputRightElement width="4.5rem">
                    {/* <Button h="1.75rem" size="sm" onClick={handlePass}>
                    {showPass ? "Hide" : "Show"}
                  </Button> */}

                    <button h="1.75rem" size="sm" onClick={handlePass}>
                      {showPass ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z" />
                        </svg>
                      )}
                    </button>
                  </InputRightElement>
                </InputGroup>
              </div>

              <div className=" w-1/2 ml-2">
                <p>Confirm Password</p>
                <InputGroup>
                  <Input
                    pr="4.5rem"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter password"
                    className="outline-none"
                    variant="outline"
                  />
                  <InputRightElement width="4.5rem">
                    {/* <Button h="1.75rem" size="sm" onClick={handlePass}>
                    {showPass ? "Hide" : "Show"}
                  </Button> */}

                    <button h="1.75rem" size="sm" onClick={handlePass}>
                      {showPass ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z" />
                        </svg>
                      )}
                    </button>
                  </InputRightElement>
                </InputGroup>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <div className="w-4/6">
                <Checkbox>
                  I agree to the <span>Terms and Conditions.</span>
                  <span className="text-red-500">*</span>
                </Checkbox>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <div className="w-4/6">
                <Button
                  colorScheme={"navyblue"}
                  color={"ghostwhite"}
                  className="w-full"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
