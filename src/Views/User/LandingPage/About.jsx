import { useEffect } from "react";
import AboutCard from "./components/AboutCard";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);
  const about = [
    {
      title: "Title",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Title",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Title",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <>
      <div className="mt-10">
        <h1 className="text-4xl font-bold mb-5">What{"'"}s great about it?</h1>
        <div className="py-5 flex justify-between">
          {about.map((about, idx) => (
            <div
              className="w-1/3 overflow-hidden"
              key={idx}
              data-aos={
                idx === 0 ? "fade-left" : idx === 1 ? "fade-up" : "fade-right"
              }
            >
              <h1 className="text-xl font-bold">{about.title}</h1>
              <p>{about.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
