import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";
import Navbar from "../../Components/Navigation/Navbar/Navbar";

const Layout = () => {
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-2 bg-red-500 h-screen sticky top-0 left-0">
          <Sidebar />
        </div>
        <div className="col-span-10 bg-yellow-500 relative">
          <Navbar />
        </div>
      </div>

      <div className="absolute top-4 left-48">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
