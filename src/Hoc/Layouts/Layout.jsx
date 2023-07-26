import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navigation/Navbar/Navbar";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="flex jivan">
      <div className="flex-none w-1/6">
        <div className="sticky top-0 min-h-screen max-h-screen   bg-mainColor overflow-hidden  ">
          <Sidebar />
        </div>
      </div>
      <div
        className="flex-auto z-10  bg-[#F6FAFB] "
        style={{
          background:
            "linear-gradient(to right, #c1d6eb, #e1e7ec, #d6dce6, #c2c9de)",
        }}
      >
        <div className="z-50">
          <Navbar />
        </div>
        <div
          className="relative  mt-[4.1rem] -z-10  "
          style={{
            background:
              "linear-gradient(to right, #c1d6eb, #ccd9ec, #d6dce6, #e1e5ec, #ebeaf0)",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
