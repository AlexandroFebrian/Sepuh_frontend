import { NavLink } from "react-router-dom";

export default function NavigationAdmin() {
  return (
    <>
      {/* <div className="container-navigationAdmin h-fit relative flex mt-24">
        <div className="boxNavigationAdmin mid w-full flex gap-24 mx-16 px-5 py-5 bg-ghostwhite-100 rounded-md shadow-md">
          <NavLink
            to="/admin/masteruser"
            className={(state) =>
              state
                ? "text-xl font-sarabun hover:underline hover:underline-offset-8"
                : "text-xl font-sarabun hover:underline hover:underline-offset-8 font-semibold"
            }
          >
            Master User
          </NavLink>

          <NavLink
            to="/admin/masterpost"
            className="text-xl font-sarabun hover:underline hover:underline-offset-8"
          >
            Master Post
          </NavLink>

          <NavLink
            to="/admin/userreports"
            className="text-xl font-sarabun hover:underline hover:underline-offset-8"
          >
            User Reports
          </NavLink>

          <NavLink
            to="/admin/postingreports"
            className="text-xl font-sarabun hover:underline hover:underline-offset-8"
          >
            Post Reports
          </NavLink>

          <NavLink
            to="/admin/incomereports"
            className="text-xl font-sarabun hover:underline hover:underline-offset-8"
          >
            Income Reports
          </NavLink>

          <NavLink
            to="/admin/paymentreports"
            className="text-xl font-sarabun hover:underline hover:underline-offset-8"
          >
            Payment Reports
          </NavLink>
        </div>
      </div> */}

      <div className="sideBar w-full bg-navyblue-700 h-screen static left-0">
        <nav>
          <div className="logo">
            <img
              src="/logo/Logo Putih.png"
              alt="Logo Sepuh"
              className="mx-auto w-1/2 py-10"
            />
          </div>
          <div className="boxNavigationAdmin mid flex flex-col gap-10 px-5 py-5 rounded-md text-white font-semibold text-center">
            <NavLink
              to="/admin/dashboard"
              className={(state) =>
                state.isActive
                  ? "text-xl font-sarabun underline underline-offset-8 font-semibold"
                  : "text-xl font-sarabun hover:underline hover:underline-offset-8 font-semibold "
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/masteruser"
              className={(state) =>
                state.isActive
                  ? "text-xl font-sarabun underline underline-offset-8 font-semibold"
                  : "text-xl font-sarabun hover:underline hover:underline-offset-8 font-semibold "
              }
            >
              Master User
            </NavLink>
            <NavLink
              to="/admin/masterpost"
              className={(state) =>
                state.isActive
                  ? "text-xl font-sarabun underline underline-offset-8 font-semibold"
                  : "text-xl font-sarabun hover:underline hover:underline-offset-8 font-semibold "
              }
            >
              Master Post
            </NavLink>
            <NavLink
              to="/admin/userreports"
              className={(state) =>
                state.isActive
                  ? "text-xl font-sarabun underline underline-offset-8 font-semibold"
                  : "text-xl font-sarabun hover:underline hover:underline-offset-8 font-semibold "
              }
            >
              User Reports
            </NavLink>
            <NavLink
              to="/admin/postingreports"
              className={(state) =>
                state.isActive
                  ? "text-xl font-sarabun underline underline-offset-8 font-semibold"
                  : "text-xl font-sarabun hover:underline hover:underline-offset-8 font-semibold "
              }
            >
              Post Reports
            </NavLink>
            <NavLink
              to="/admin/incomereports"
              className={(state) =>
                state.isActive
                  ? "text-xl font-sarabun underline underline-offset-8 font-semibold"
                  : "text-xl font-sarabun hover:underline hover:underline-offset-8 font-semibold "
              }
            >
              Income Reports
            </NavLink>
            <NavLink
              to="/admin/paymentreports"
              className={(state) =>
                state.isActive
                  ? "text-xl font-sarabun underline underline-offset-8 font-semibold"
                  : "text-xl font-sarabun hover:underline hover:underline-offset-8 font-semibold "
              }
            >
              Payment Reports
            </NavLink>
          </div>
        </nav>

        <div className="logout text-center fixed bottom-10 z-20  w-1/6 ">
          <button
            className="text-white font-sarabun font-semibold py-3 w-full text-3xl hover:underline hover:underline-offset-8"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
