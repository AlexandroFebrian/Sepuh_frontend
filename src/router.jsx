import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./Views/LandingPage/LandingPage";
import SignIn from "./Views/SignIn/SignIn";
import HomePage from "./Views/HomePage/HomePage";
import MainLayout from "./Views/MainLayout/MainLayout";

const Router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      }
    ]
  },
  // {
  //   path:   "*",
  //   element: <NotFound />,
  // },
]);

export default Router;
