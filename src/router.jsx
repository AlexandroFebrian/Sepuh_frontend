import { createBrowserRouter } from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import LandingPage from "./LandingPage/LandingPage";
import HomePage from "./HomePage/HomePage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  // {
  //   path:   "*",
  //   element: <NotFound />,
  // },
]);

export default Router;
