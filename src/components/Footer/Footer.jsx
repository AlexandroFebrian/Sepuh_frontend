import { useNavigate } from "react-router-dom"
import { 
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaXTwitter
} from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";

export default function Footer() {
  const categories = [
    {
      text: "Machine Learning",
      value: "machine learning",
    },
    {
      text: "AI Development",
      value: "ai development",
    },
    {
      text: "Blockchain & Cryptocurrency",
      value: "blockchain & cryptocurrency",
    },
    {
      text: "Graphic Design",
      value: "graphic design",
    },
    {
      text: "Art & Illustration",
      value: "art & illustration",
    },
    {
      text: "Midjourney Artists",
      value: "midjourney artists",
    },
    {
      text: "UX Design",
      value: "ux design",
    }
    
  ]

  const about = [
    {
      text: "Partnerships",
      value: "partnerships",
    },
    {
      text: "Privacy Policy",
      value: "privacy policy",
    },
    {
      text: "Terms of Service",
      value: "terms of service",
    },
    {
      text: "Help & Support",
      value: "help & support",
    },
    {
      text: "Contact Us",
      value: "contact us",
    }
  ]

  const navigate = useNavigate()

  function categoryClick(value) {
    sessionStorage.setItem("category", value)
    navigate("/home")
  }

  return (
    <>
      <footer>
        <div className=" bg-navyblue-800 h-fit flex justify-between py-10 px-36">
          <div className=" grid grid-cols-2 gap-64 text-lg">
            <div>
              <h3 className="text-ghostwhite-50 font-bold">
                Categories
              </h3>
              {
                categories.map((category, idx) => {
                  return(
                    <div className="text-ghostwhite-100 mt-1 cursor-pointer hover:text-ghostwhite-50 hover:underline" key={idx} onClick={() => {categoryClick(category.value)}}>
                      {category.text}
                    </div>
                  )
                })
              }
            </div>
            <div>
              <h3 className="text-ghostwhite-50 font-bold">
                About
              </h3>
              {
                about.map((category, idx) => {
                  return(
                    <div className="text-ghostwhite-100 mt-1 cursor-pointer hover:text-ghostwhite-50 hover:underline" key={idx}>
                      {category.text}
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div>
            <img
              src="/logo/Logo Putih.png"
              alt="Logo"
              className="h-12"
              draggable="false"
            />
            <div className="flex text-ghostwhite-50 mt-3">
              <FaFacebook className=" h-8 w-8"/>
              <FaLinkedin className=" h-8 w-8 ml-6"/>
              <IoMailOutline className=" h-8 w-8 ml-6"/>
              <FaInstagram className=" h-8 w-8 ml-6"/>
              <FaXTwitter className=" h-8 w-8 ml-6"/>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center py-5 font-semibold text-lg">
          &#169; 2023 Sepuh Indonesia
        </div>
      </footer>
    </>
  );
}
