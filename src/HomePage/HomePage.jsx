import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Menu from "../components/Menu/Menu";

export default function HomePage() {
  return (
    <>
      <div className=" h-screen">
        <Navbar />
        <div className=" h-fit mt-20 relative flex">
          <Menu />
          <div className=" min-h-[calc(100vh-5rem)] h-fit w-[75%] border-l-2 border-navyblue-800 z-0 px-10 py-10">
            <div className=" h-[400px] w-full bg-slate-400 mb-10"></div>
            <div className=" h-[400px] w-full bg-slate-400 mb-10"></div>
            <div className=" h-[400px] w-full bg-slate-400 mb-10"></div>
            <div className=" h-[400px] w-full bg-slate-400 mb-10"></div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
