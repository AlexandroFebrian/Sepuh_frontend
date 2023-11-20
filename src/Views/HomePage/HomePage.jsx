import Content from "../../components/Content/Content";
import MenuGuest from "../../components/MenuGuest/MenuGuest";
import MenuLogin from "../../components/MenuLogin/MenuLogin";

export default function HomePage() {
  return (
    <>
      <div className=" h-fit mt-20 relative flex">
        <div className="left w-1/5 ">
          <MenuLogin />
          {/* <MenuGuest /> */}
        </div>
        <Content />
      </div>
    </>
  );
}
