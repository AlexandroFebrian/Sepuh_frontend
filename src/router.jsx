import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./Views/Layout/MainLayout";
// USER
import LandingPage from "./Views/User/LandingPage/LandingPage";
import SignIn from "./Views/User/SignIn/SignIn";
import HomePage from "./Views/User/HomePage/HomePage";
import AddPost from "./Views/User/AddPost/AddPost";

// ADMIN
import AdminLogin from "./Views/Admin/AdminLogin/AdminLogin";
import MasterUser from "./Views/Admin/MasterUser/MasterUser";
import MasterPost from "./Views/Admin/MasterPost/MasterPost";
import UserReports from "./Views/Admin/UserReports/UserReports";
import PostingReports from "./Views/Admin/PostingReports/PostingReports";
import IncomeReports from "./Views/Admin/IncomeReports/IncomeReports";
import PaymentReports from "./Views/Admin/PaymentReports/PaymentReports";
import Profile from "./Views/User/Profile/Profile";

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
        element: <AddPost />,
      },
      {
        path: "user/profile",
        element: <Profile />,
      },
      {
        path: "/admin/masteruser",
        element: <MasterUser />,
      },
      {
        path: "/admin/masterpost",
        element: <MasterPost />,
      },
      {
        path: "/admin/userreports",
        element: <UserReports />,
      },
      {
        path: "/admin/postingreports",
        element: <PostingReports />,
      },
      {
        path: "/admin/incomereports",
        element: <IncomeReports />,
      },
      {
        path: "/admin/paymentreports",
        element: <PaymentReports />,
      },
    ],
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
