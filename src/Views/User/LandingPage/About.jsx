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
      title: "Positive Contribution to Unemployment Reduction",
      description:
        "Sepuh is driven by a strong purpose to reduce unemployment rates in Indonesia by providing an online platform that enables job seekers to explore various job opportunities.",
    },
    {
      title: "New Opportunities for Individuals and Companies",
      description:
        "We open new doors for individuals seeking employment and companies in need of potential workforce. With Sepuh, you can explore and discover opportunities that align with your skills and requirements.",
    },
    {
      title: "Positive Transformation in the Job Market",
      description:
        "Sepuh not only provides a job search platform but is also committed to creating a positive transformation in the Indonesian job market. We support innovation and positive change to foster a better working environment.",
    },
  ];

  const how = [
    {
      title: "Efficient Online Job Search",
      description:
        "Through the Sepuh platform, job seekers can easily search and apply for jobs that match their qualifications and interests.",
    },
    {
      title: "Sophisticated Candidate Filtering",
      description:
        "Companies can use advanced filtering features to find candidates most suitable for their needs.",
    },
    {
      title: "Career Development Support",
      description:
        "Sepuh provides support for job seekers to develop their careers through access to valuable information and resources.",
    },
    {
      title: "Social Mission",
      description:
        "Beyond being a job search platform, Sepuh also has a social mission to reduce unemployment rates and improve the quality of the job market in Indonesia.",
    },
  ];

  return (
    <>
      <div className="mt-10">
        <h1 className="text-4xl font-bold mb-5">Why Choose Our Services?</h1>
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
      
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
        
      </hr>
      <div className="mt-10">
        <h1 className="text-4xl font-bold mb-5">How does Sepuh Achieve These Goals?</h1>
        <div className="py-5 flex justify-between">
          {how.map((how, idx) => (
            <div
              className="w-1/4 overflow-hidden"
              key={idx}
              data-aos={
                idx === 0 ? "fade-left" : idx === 1 ? "fade-up" : "fade-right"
              }
            >
              <h1 className="text-xl font-bold">{how.title}</h1>
              <p>{how.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
