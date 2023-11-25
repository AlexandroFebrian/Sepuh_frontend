import { NavLink } from "react-router-dom";

export default function NavigationAdmin() {
  return (
    <>
      <div className="container-navigationAdmin h-fit relative flex mt-24">
        <div className="boxNavigationAdmin mid w-full flex gap-24 mx-16 px-5 py-5 bg-ghostwhite-100 rounded-md shadow-md">
          <NavLink
            to="/admin/masteruser"
            className={(state) =>
              state
                ? "text-3xl font-sarabun hover:underline hover:underline-offset-8"
                : "text-3xl font-sarabun hover:underline hover:underline-offset-8 font-semibold"
            }
          >
            Master User
          </NavLink>

          <NavLink
            to="/admin/masterpost"
            className="text-3xl font-sarabun hover:underline hover:underline-offset-8"
          >
            Master Post
          </NavLink>

          <NavLink
            to="/admin/userreports"
            className="text-3xl font-sarabun hover:underline hover:underline-offset-8"
          >
            User Reports
          </NavLink>

          <NavLink
            to="/admin/postreports"
            className="text-3xl font-sarabun hover:underline hover:underline-offset-8"
          >
            Post Reports
          </NavLink>

          <NavLink
            to="/admin/incomereports"
            className="text-3xl font-sarabun hover:underline hover:underline-offset-8"
          >
            Income Reports
          </NavLink>

          <NavLink
            to="/admin/paymentreports"
            className="text-3xl font-sarabun hover:underline hover:underline-offset-8"
          >
            Payment Reports
          </NavLink>
        </div>
      </div>
    </>
  );
}
