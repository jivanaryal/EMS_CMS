import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navigation/Navbar/Navbar";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-2/12 sm:w-1/5 px-6 fixed top-0 h-screen overflow-hidden max-h-screen shadow-xl">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-10/12 sm:w-4/5 ml-auto">
        <div>
          <Navbar />
        </div>

        <div className="relative pl-2 -z-50 top-24 mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
