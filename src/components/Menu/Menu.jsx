import {
  FaPenToSquare,
  FaHouseChimney,
  FaEnvelope,
  FaListUl,
} from "react-icons/fa6";

export default function Menu() {
  return (
    <>
      <div className="h-[calc(100vh-5rem)] w-1/4 sticky top-[5rem]">
        <div className="flex  flex-col gap-10 p-10">
          <button className="w-full h-10 hover:bg-ghostwhite-100 top-0 transition-colors duration-300 text-4xl flex items-center justify-start">
            <FaHouseChimney className="mr-2" size={25} />
            Home
          </button>
          <button className="w-full h-10 hover:bg-ghostwhite-100 top-0 transition-colors duration-300 text-4xl flex items-center justify-start">
            <FaEnvelope className="mr-2" size={25} />
            Messages
          </button>
          <button className="w-full h-10 hover:bg-ghostwhite-100 top-0 transition-colors duration-300 text-4xl flex items-center justify-start">
            <FaListUl className="mr-2" size={25} />
            List
          </button>
          <button className="w-full h-10 hover:bg-ghostwhite-100 top-0 transition-colors duration-300 text-4xl flex items-center justify-start">
            <FaPenToSquare className="mr-2" size={25} />
            Post
          </button>
        </div>
        <div className="absolute bottom-0 w-full pb-10">
          <button className="w-full h-10 hover:bg-ghostwhite-100 top-0 transition-colors duration-300 text-4xl">
            Setting
          </button>
        </div>
      </div>
    </>
  );
}
