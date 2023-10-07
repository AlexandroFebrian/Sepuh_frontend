import { createBrowserRouter } from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import LandingPage from "./LandingPage/LandingPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  // {
  //   path: "*",
  //   element: <NotFound />,
  // },
]);

export default Router;