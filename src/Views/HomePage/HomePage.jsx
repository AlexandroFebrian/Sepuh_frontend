import { useSelector } from "react-redux";
import Content from "../../components/Content/Content";
import MenuGuest from "../../components/SidebarMenu/MenuGuest/MenuGuest";
import MenuLogin from "../../components/SidebarMenu/MenuLogin/MenuLogin";
import { Combobox } from "../../components/ui/Combobox";
import NowHiring from "../../components/NowHiring/NowHiring";

export default function HomePage() {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <>
      <div className=" h-fit relative flex">
        <div className="left w-1/5 ">
          <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem]">
            {
              isLogin
              ?
              <MenuLogin />
              :
              <MenuGuest />
            }
            
          </div>
        </div>
        <div className="mid w-3/4">
          <div className=" min-h-[calc(100vh-5rem)] h-fit border-l-2 border-navyblue-600 z-0 px-10 py-10">
            <Content />
          </div>
        </div>
        <div className="right w-1/4">
          <NowHiring />
        </div>
      </div>
    </>
  );
}
