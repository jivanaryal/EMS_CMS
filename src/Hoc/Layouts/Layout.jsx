import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navigation/Navbar/Navbar";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="flex jivan">
      <div className="flex-none w-1/6">
        <div className="sticky top-0 min-h-screen max-h-screen  bg-mainColor shadow-purple-800  overflow-hidden shadow-xl ">
          <Sidebar />
        </div>
      </div>
      <div className="flex-auto z-10  bg-[#F6FAFB] ">
        <div className="z-50">
          <Navbar />
        </div>
        <div className="relative pl-2 mt-20 -z-10 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
