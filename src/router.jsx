import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./Views/LandingPage/LandingPage";
import SignIn from "./Views/SignIn/SignIn";
import HomePage from "./Views/HomePage/HomePage";
import MainLayout from "./Views/Layout/MainLayout";
import AddPost from "./Views/AddPost/AddPost";

// ADMIN
import AdminLogin from "./Admin/AdminLogin";

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
      },
      {
        path: "/addpost",
        element: <AddPost />
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },

  // {
  //   path:   "*",
  //   element: <NotFound />,
  // },
]);

export default Router;
