import {
  FaPenToSquare,
  FaHouseChimney,
  FaEnvelope,
  FaListUl,
  FaGear,
} from "react-icons/fa6";

export default function Menu() {
  return (
    <>
      <div className="flex flex-col">
        <button className="w-full h-10 hover:bg-ghostwhite-100 top-0 transition-colors duration-300 text-3xl flex items-center justify-start p-10">
          <FaHouseChimney className="mr-3" size={25} />
          Home
        </button>
        <button className="w-full h-10 hover:bg-ghostwhite-100 top-0 transition-colors duration-300 text-3xl flex items-center justify-start p-10">
          <FaEnvelope className="mr-3" size={25} />
          Messages
        </button>
        <button className="w-full h-10 hover:bg-ghostwhite-100 top-0 transition-colors duration-300 text-3xl flex items-center justify-start p-10">
          <FaListUl className="mr-3" size={25} />
          List
        </button>
        <button className="w-full h-10 hover:bg-ghostwhite-100 top-0 transition-colors duration-300 text-3xl flex items-center justify-start p-10">
          <FaPenToSquare className="mr-3" size={25} />
          Post
        </button>
      </div>
      <div className="absolute bottom-0 w-full">
        <button className="w-full h-10 hover:bg-ghostwhite-100 top-0 transition-colors duration-300 text-3xl flex items-center justify-start p-10">
          <FaGear className="mr-3" size={25} /> 
          Setting
        </button>
      </div>
    </>
  );
}
