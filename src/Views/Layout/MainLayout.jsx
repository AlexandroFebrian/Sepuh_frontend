import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import fetch from "../../Client/fetch";

export default function MainLayout() {
  const { checkToken, getCategory } = fetch();

  useEffect(() => {
    // checkToken()
    getCategory();
  }, []);

  return (
    <>
      <div className="bg-ghostwhite-50 h-screen">
        <Navbar />  
        <div className="pt-20 relative">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
}
