import { useSelector } from "react-redux";
import Content from "../../components/Content/Content";
import MenuGuest from "../../components/SidebarMenu/MenuGuest/MenuGuest";
import MenuLogin from "../../components/SidebarMenu/MenuLogin/MenuLogin";
import { Combobox } from "../../components/ui/Combobox";

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
        <Content />
      </div>
    </>
  );
}
