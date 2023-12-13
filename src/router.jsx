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
import Finished from "./Views/User/MyActivity/Finished/Finished";
import Profile from "./Views/User/Profile/Profile";
import OtherProfile from "./Views/User/OtherProfile/OtherProfile";
import DocumentCompletion from "./Views/User/DocumentCompletion/DocumentCompletion";
import WorkHistory from "./Views/User/WorkHistory/WorkHistory";
import BankAccount from "./Views/User/BankAccount/BankAccount";
import IncomeReportsUser from "./Views/User/IncomeReports/IncomeReports";
import EmployeeReports from "./Views/User/CompanyEmployeeReports/EmployeeReports";
import CompanyEmployeeList from "./Views/User/CompanyEmployeeList/CompanyEmployeeList";
import Settings from "./Views/User/Settings/Settings";

// ADMIN
import AdminLogin from "./Views/Admin/AdminLogin/AdminLogin";
import DashboardAdmin from "./Views/Admin/Dashboard/DashboardAdmin";
import MasterUser from "./Views/Admin/MasterUser/MasterUser";
import MasterPost from "./Views/Admin/MasterPost/MasterPost";
import UserReports from "./Views/Admin/UserReports/UserReports";
import PostingReports from "./Views/Admin/PostingReports/PostingReports";
import IncomeReportsAdmin from "./Views/Admin/IncomeReports/IncomeReports";
import PaymentReports from "./Views/Admin/PaymentReports/PaymentReports";
import DetailActivity from "./Views/User/MyActivity/DetailActivity/DetailActivity";
import Rejected from "./Views/User/MyActivity/Rejected/Rejected";
import Dashboard from "./Views/User/Dashboard/Dashboard";
import Notification from "./Views/User/Notification/Notification";
import DetailsPostAdmin from "./Views/Admin/DetailsPost/DetailsPost";

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
        path: "browse",
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
        element: <Dashboard />,
      },
      {
        path: "employee",
        element: <Messages />,
      },
      {
        path: "notifications",
        element: <Notification />,
      },
      {
        path: "post/:postId",
        element: <DetailsPost />,
      },
      {
        path: "employeelists",
        element: <CompanyEmployeeList />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "activity",
        element: <MyActivity />,
        children: [
          {
            path: "ongoing",
            element: <Ongoing />,
          },
          {
            path: "finished",
            element: <Finished />,
          },
          {
            path: "rejected",
            element: <Rejected />,
          },
          {
            path: ":actId",
            element: <DetailActivity />,
          },
        ],
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
            element: <IncomeReportsUser />,
          },
          {
            path: "bank",
            element: <BankAccount />,
          },
          {
            path: "employeereports",
            element: <EmployeeReports />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "admin",
    children: [
      {
        path: "dashboard",
        element: <DashboardAdmin />,
      },
      {
        path: "masteruser",
        element: <MasterUser />,
      },
      {
        path: "masterpost",
        element: <MasterPost />,
      },
      {
        path: "masterpost/details/",
        element: <DetailsPostAdmin />,
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
        element: <IncomeReportsAdmin />,
      },
      {
        path: "paymentreports",
        element: <PaymentReports />,
      },
    ],
  },

  // {
  //   path:   "*",
  //   element: <NotFound />,
  // },
]);

export default Router;
