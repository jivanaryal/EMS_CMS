import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-2 bg-red-500 h-screen sticky top-0 left-0">
          hii
        </div>
        <div className="col-span-10 bg-yellow-500">hello</div>
      </div>

      <div className="absolute top-20 left-64">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
