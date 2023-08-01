import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navigation/Navbar/Navbar";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";

export const ColorContext = createContext();


const Layout = () => {
   const [show, setShow] = useState(false);
  const [Arrow, setArrow] = useState(false);

  return (
    <ColorContext.Provider value={{show,setShow,Arrow,setArrow}}>

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
            "linear-gradient(to right, #c1d6eb, #ccd9ec, #d6dce6, #e1e5ec, #ebeaf0)",
        }}
      >
        <div
          className="z-50"
          style={{
            background:
              "linear-gradient(to right, #c1d6eb, #e1e7ec, #d6dce6, #c2c9de)",
          }}
        >
          <Navbar />
        </div>
        <div className="relative  mt-[4.1rem] -z-10  ">
          <Outlet />
        </div>
      </div>
    </div>
    </ColorContext.Provider>
  );
};

export default Layout;
