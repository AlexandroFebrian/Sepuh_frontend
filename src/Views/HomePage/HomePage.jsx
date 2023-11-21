import { useSelector } from "react-redux";
import Content from "../../components/Content/Content";
import MenuGuest from "../../components/SidebarMenu/MenuGuest/MenuGuest";
import MenuLogin from "../../components/SidebarMenu/MenuLogin/MenuLogin";

export default function HomePage() {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <>
      <div className=" h-fit relative flex">
        <div className="left w-1/5 ">
          {
            isLogin
            ?
            <MenuLogin />
            :
            <MenuGuest />
          }
        </div>
        <Content />
      </div>
    </>
  );
}
