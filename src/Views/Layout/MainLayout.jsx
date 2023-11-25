import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import fetch from "../../Client/fetch";

export default function MainLayout() {
  // const { checkToken } = fetch()

  // useEffect(() => {
  //   checkToken()

  // }, [])

  return (
    <>
      <div className="bg-ghostwhite-50 h-screen">
        <Navbar />
        <div className="mt-20">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
}
