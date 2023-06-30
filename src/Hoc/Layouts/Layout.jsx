import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navigation/Navbar/Navbar";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="relative grid grid-cols-12">
      <div className="col-span-2">
        <div className="fixed w-64 top-0 left-0 z-50  h-screen overflow-hidden max-h-screen  shadow-xl ">
          <Sidebar />
        </div>
      </div>
      <div className="col-span-10 z-50 ">
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
