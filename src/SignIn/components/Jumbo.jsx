import { useSpring, useSpringRef, animated } from "@react-spring/web";
import "animate.css";

export default function Jumbo(){
  const api = useSpringRef();
  const jumbo = useSpring({
    ref: api,
    from: { x: 0 },
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

  // BIAR JUMBONYA NGIKUTIN LAYAR
  window.onresize = () => {
    if(jumbo.x.get() !== 0){
      jumbo.x.set(window.innerWidth / 2)
    }
  }

  return (
    <>
      <animated.div
        onClick={handleClick}
        style={{
          width: "50%",
          height: "100%",
          zIndex: 2,
          ...jumbo,
        }}
        className=" bg-navyblue-800 fixed hidden md:block"
      >

      </animated.div>
    </>
  )
}