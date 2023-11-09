import Jumbo from "./components/jumbo";
import SignUpBox from "./SignUpBox";
import SignInBox from "./SignInBox";

import { useNavigate, useSearchParams } from "react-router-dom";

import { useSpring, useSpringRef, animated } from "@react-spring/web";
import "animate.css";
import {FaArrowLeft} from "react-icons/fa6";
import { useRef } from "react";

export default function SignIn() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const signup = useRef()
  signup.current = searchParams.get("signup") == "true" ? window.innerWidth / 2 : 0;

  const api = useSpringRef();
  const jumbo = useSpring({
    ref: api,
    from: { 
      x: signup.current 
    },
  });

  let move = false;

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
      // BIAR GK TERLALU DISPAM WALAUPUN GK SEMPURNA
      setTimeout(() => {
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
      {/* SCREEN DIV */}
      <div className="container-signInSignUp h-screen md:flex bg-ghostwhite-50">
        <Jumbo jumbo={jumbo} handleClick={handleClick} api={api}>
          <div className="w-full h-full p-7">
            <div className="flex items-center">
              <FaArrowLeft 
                className=" text-white w-10 h-10 mr-5 cursor-pointer hover:text-ghostwhite-100 transition-colors duration-300"
                onClick={() => navigate(-1)}
              />
              <img
                src="/logo/Logo Putih.png"
                alt="Logo"
                className="h-[4rem]"
                draggable="false"
              />
            </div>
            <div className="w-full h-full flex justify-center items-center text-6xl text-ghostwhite-50">
              <p className="-mt-32 text-center">
                Your gateway to Freelance Success
              </p>
            </div>
          </div>
        </Jumbo>

        {/* LEFT SCREEN DIV SIGN UP */}
        <SignUpBox handleClick={handleClick} />

        {/* RIGHT SCREEN DIV SIGN IN */}
        <SignInBox handleClick={handleClick} />
      </div>
    </>
  );
}
