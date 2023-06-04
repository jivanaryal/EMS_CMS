import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navigation/Navbar/Navbar";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-2 bg-red-500 h-screen sticky top-0 left-0">
          <Sidebar />
        </div>
        <div className="col-span-10 bg-yellow-500 relative">
          <div>
            <Navbar />
          </div>

          <div className="w-11/12 mx-auto ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
