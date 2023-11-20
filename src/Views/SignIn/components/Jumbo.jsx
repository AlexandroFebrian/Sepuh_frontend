import { useSpring, useSpringRef, animated } from "@react-spring/web";
import "animate.css";

export default function Jumbo({children, jumbo}){

  // BIAR JUMBONYA NGIKUTIN UKURAN LAYAR
  window.onresize = () => {
    if(jumbo.x.get() !== 0){
      jumbo.x.set(window.innerWidth / 2)
    }
  }

  return (
    <>
      <animated.div
        style={{
          width: "50%",
          height: "100%",
          zIndex: 2,
          ...jumbo,
        }}
        className=" bg-navyblue-800 fixed hidden md:block"
      >
        {children}
      </animated.div>
    </>
  )
}