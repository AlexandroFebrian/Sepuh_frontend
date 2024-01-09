import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./Views/Layout/MainLayout";
import Verification from "./Views/User/Verification/Verification";

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
import CompanyPaymentReports from "./Views/User/CompanyPaymentReports/CompanyPaymentReports";
import DetailActivity from "./Views/User/MyActivity/DetailActivity/DetailActivity";
import Rejected from "./Views/User/MyActivity/Rejected/Rejected";
import Dashboard from "./Views/User/Dashboard/Dashboard";
import Notification from "./Views/User/Notification/Notification";

// ADMIN
import AdminLogin from "./Views/Admin/AdminLogin/AdminLogin";
import DashboardAdmin from "./Views/Admin/Dashboard/DashboardAdmin";
import MasterUser from "./Views/Admin/MasterUser/MasterUser";
import MasterPost from "./Views/Admin/MasterPost/MasterPost";
import UserReports from "./Views/Admin/UserReports/UserReports";
import PostingReports from "./Views/Admin/PostingReports/PostingReports";
import IncomeReportsAdmin from "./Views/Admin/IncomeReports/IncomeReports";
import PaymentReports from "./Views/Admin/PaymentReports/PaymentReports";
import DetailsPostAdmin from "./Views/Admin/DetailsPost/DetailsPost";

import ErrorPage from "./Views/Error/ErrorPage";

import { cekToken, cekTokenAdmin } from "./Auth/Authentication";

const Router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
        loader: cekToken,
      },
      {
        path: "addpost",
        element: <AddPost />,
        loader: cekToken,
      },
      {
        path: "messages",
        element: <Messages />,
        loader: cekToken,
      },
      {
        path: "lists",
        element: <List />,
        loader: cekToken,
      },
      {
        path: "myposts",
        element: <MyPost />,
        loader: cekToken,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: cekToken,
      },
      {
        path: "employee",
        element: <Messages />,
        loader: cekToken,
      },
      {
        path: "notifications",
        element: <Notification />,
        loader: cekToken,
      },
      {
        path: "post/:postId",
        element: <DetailsPost />,
      },
      {
        path: "employeelists",
        element: <CompanyEmployeeList />,
        loader: cekToken,
      },
      {
        path: "settings",
        element: <Settings />,
        loader: cekToken,
      },
      {
        path: "activity",
        element: <MyActivity />,
        children: [
          {
            path: "ongoing",
            element: <Ongoing />,
            loader: cekToken,
          },
          {
            path: "finished",
            element: <Finished />,
            loader: cekToken,
          },
          {
            path: "rejected",
            element: <Rejected />,
            loader: cekToken,
          },
          {
            path: ":actId",
            element: <DetailActivity />,
            loader: cekToken,
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
            loader: cekToken,
          },
          {
            path: "document",
            element: <DocumentCompletion />,
            loader: cekToken,
          },
          {
            path: "history",
            element: <WorkHistory />,
            loader: cekToken,
          },
          {
            path: "income",
            element: <IncomeReportsUser />,
            loader: cekToken,
          },
          {
            path: "bank",
            element: <BankAccount />,
            loader: cekToken,
          },
          {
            path: "employeereports",
            element: <EmployeeReports />,
            loader: cekToken,
          },
          {
            path: "paymentreports",
            element: <CompanyPaymentReports />,
            loader: cekToken,
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
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <DashboardAdmin />,
        loader: cekTokenAdmin,
      },
      {
        path: "masteruser",
        element: <MasterUser />,
        loader: cekTokenAdmin,
      },
      {
        path: "masterpost",
        element: <MasterPost />,
        loader: cekTokenAdmin,
      },
      {
        path: "masterpost/details/",
        element: <DetailsPostAdmin />,
        loader: cekTokenAdmin,
      },
      {
        path: "userreports",
        element: <UserReports />,
        loader: cekTokenAdmin,
      },
      {
        path: "postingreports",
        element: <PostingReports />,
        loader: cekTokenAdmin,
      },
      {
        path: "incomereports",
        element: <IncomeReportsAdmin />,
        loader: cekTokenAdmin,
      },
      {
        path: "paymentreports",
        element: <PaymentReports />,
        loader: cekTokenAdmin,
      },
      // {
      //   path: "*",
      //   element: <ErrorPage />,
      // },
    ],
  },
  {
    path: "/verify",
    element: <Verification />,
  },

  // {
  //   path:   "*",
  //   element: <NotFound />,
  // },
]);

export default Router;
