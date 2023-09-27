import { createBrowserRouter } from "react-router-dom";
import SignIn from "./SignIn/SignIn";

const Router = createBrowserRouter([
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