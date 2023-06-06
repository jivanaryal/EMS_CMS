import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navigation/Navbar/Navbar";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <div className="sticky top-0 h-screen overflow-hidden">
            <Sidebar />
          </div>
        </div>
        <div className="col-span-10 bg-red-500 relative">
          <div>
            <Navbar />
          </div>

          <div className="relative top-24 mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
