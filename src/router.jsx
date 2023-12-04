import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./Views/Layout/MainLayout";
// USER
import LandingPage from "./Views/User/LandingPage/LandingPage";
import SignIn from "./Views/User/SignIn/SignIn";
import HomePage from "./Views/User/HomePage/HomePage";
import AddPost from "./Views/User/AddPost/AddPost";
import Messages from "./Views/User/Messages/Messages";
import MyPost from "./Views/User/MyPost/MyPost";
import DetailsPost from "./Views/User/DetailsPost/DetailsPost";
import List from "./Views/User/List/List";
import MyActivity from "./Views/User/MyActivity/MyActivity";
import Ongoing from "./Views/User/MyActivity/Ongoing/Ongoing";
import Profile from "./Views/User/Profile/Profile";
import OtherProfile from "./Views/User/OtherProfile/OtherProfile";
import DocumentCompletion from "./Views/User/DocumentCompletion/DocumentCompletion";
import WorkHistory from "./Views/User/WorkHistory/WorkHistory";
import BankAccount from "./Views/User/BankAccount/BankAccount";

// ADMIN
import AdminLogin from "./Views/Admin/AdminLogin/AdminLogin";
import MasterUser from "./Views/Admin/MasterUser/MasterUser";
import MasterPost from "./Views/Admin/MasterPost/MasterPost";
import UserReports from "./Views/Admin/UserReports/UserReports";
import PostingReports from "./Views/Admin/PostingReports/PostingReports";
import IncomeReports from "./Views/Admin/IncomeReports/IncomeReports";
import PaymentReports from "./Views/Admin/PaymentReports/PaymentReports";
import Finished from "./Views/User/MyActivity/Finished/Finished";

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
        path: "home",
        element: <HomePage />,
      },
      {
        path: "addpost",
        element: <AddPost />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "lists",
        element: <List />,
      },
      {
        path: "myposts",
        element: <MyPost />,
      },
      {
        path: "dashboard",
        element: <Messages />,
      },
      {
        path: "employee",
        element: <Messages />,
      },
      {
        path: "post/:postId",
        element: <DetailsPost />,
      },
      {
        path: "activity",
        element: <MyActivity />,
        children: [
          {
            path: "ongoing",
            element: <Ongoing />
          },
          {
            path: "finished",
            element: <Finished />
          },
          {
            path: ":id",
            element: "a"
          },
        ]
      },
      {
        path: "user",
        children: [
          {
            index: true,
            element: <OtherProfile />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "document",
            element: <DocumentCompletion />,
          },
          {
            path: "history",
            element: <WorkHistory />,
          },
          {
            path: "income",
            element: <Profile />,
          },
          {
            path: "bank",
            element: <BankAccount />,
          },
        ]
      },
      {
        path: "admin",
        children: [
          {
            path: "masteruser",
            element: <MasterUser />,
          },
          {
            path: "masterpost",
            element: <MasterPost />,
          },
          {
            path: "userreports",
            element: <UserReports />,
          },
          {
            path: "postingreports",
            element: <PostingReports />,
          },
          {
            path: "incomereports",
            element: <IncomeReports />,
          },
          {
            path: "paymentreports",
            element: <PaymentReports />,
          },
        ]
      },
      {
        path: "/admin",
        element: <AdminLogin />,
      },
    ],
  },

  // {
  //   path:   "*",
  //   element: <NotFound />,
  // },
]);

export default Router;
