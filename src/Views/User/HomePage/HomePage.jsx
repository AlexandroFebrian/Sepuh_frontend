import Content from "../../../components/Content/Content";
import MenuGuest from "../../../components/SidebarMenu/MenuGuest/MenuGuest";
import FreelancerDefaultMenu from "../../../components/SidebarMenu/Freelancer/FreelancerDefaultMenu/FreelancerDefaultMenu";
import NowHiring from "../../../components/NowHiring/NowHiring";
import HomePageViewModel from "./HomePageViewModel";

export default function HomePage() {
  const { isLogin, user } = HomePageViewModel()

  return (
    <>
      <div className=" h-fit relative flex">
        <div className="left w-1/5 ">
          <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem]">
            {
              isLogin && user.role == "Freelancer"
              &&
              <FreelancerDefaultMenu />
            }
            {
              !isLogin
              &&
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