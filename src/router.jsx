import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./Views/Layout/MainLayout";
// USER
import LandingPage from "./Views/User/LandingPage/LandingPage";
import SignIn from "./Views/User/SignIn/SignIn";
import HomePage from "./Views/User/HomePage/HomePage";
import AddPost from "./Views/User/AddPost/AddPost";
import Messages from "./Views/User/Messages/Messages";
import MyPost from "./Views/User/MyPost/MyPost";
import Profile from "./Views/User/Profile/Profile";
import OtherProfile from "./Views/User/OtherProfile/OtherProfile";

// ADMIN
import AdminLogin from "./Views/Admin/AdminLogin/AdminLogin";
import MasterUser from "./Views/Admin/MasterUser/MasterUser";
import MasterPost from "./Views/Admin/MasterPost/MasterPost";
import UserReports from "./Views/Admin/UserReports/UserReports";
import PostingReports from "./Views/Admin/PostingReports/PostingReports";
import IncomeReports from "./Views/Admin/IncomeReports/IncomeReports";
import PaymentReports from "./Views/Admin/PaymentReports/PaymentReports";
import DetailsPost from "./Views/User/DetailsPost/DetailsPost";

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
        path: "/messages",
        element: <Messages />
      },
      {
        path: "/lists",
        element: <Messages />
      },
      {
        path: "/myposts",
        element: <MyPost />
      },
      {
        path: "/dashboard",
        element: <Messages />
      },
      {
        path: "/employee",
        element: <Messages />
      },
      {
        path: "/post/:postId",
        element: <DetailsPost />
      },
      {
        path: "/user/profile",
        element: <Profile />,
      },
      {
        path: "/user/document",
        element: <Profile />,
      },
      {
        path: "/user/history",
        element: <Profile />,
      },
      {
        path: "/user/income",
        element: <Profile />,
      },
      {
        path: "/user/bank",
        element: <Profile />,
      },
      {
        path: "/user",
        element: <OtherProfile />
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
