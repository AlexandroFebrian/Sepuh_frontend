import Menu from "../../components/Menu/Menu";
import NowHiring from "./NowHiring";

export default function HomePage() {
  return (
    <>
      <div className=" h-fit mt-20 relative flex">
        <div className="left w-1/5 ">
          <Menu />
        </div>
        <div className="mid w-3/4">
          <div className=" min-h-[calc(100vh-5rem)] h-fit border-l-2 border-navyblue-600 z-0 px-10 py-10">
            <div className=" h-[400px] w-full bg-slate-400 mb-10"></div>
            <div className=" h-[400px] w-full bg-slate-400 mb-10"></div>
            <div className=" h-[400px] w-full bg-slate-400 mb-10"></div>
            <div className=" h-[400px] w-full bg-slate-400 mb-10"></div>
          </div>
        </div>
        <div className="right w-1/4">
          <NowHiring />
        </div>
      </div>
    </>
  );
}
