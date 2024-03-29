import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navigation/Navbar/Navbar";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";
import UserAuthContextApi, {
  UserAuthContext,
} from "../../Hoc/ContextApi/UserAuthContextApi";
import { AiOutlineMenuFold } from "react-icons/ai";

export const ColorContext = createContext();

const Layout = () => {
  const [show, setShow] = useState(false);
  const [Arrow, setArrow] = useState(false);
  const [sidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1020) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    // Call handleResize initially to set the initial state based on the window width
    handleResize();

    // Add the event listener for the resize event
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <UserAuthContextApi>
      <UserAuthContext.Provider>
        <ColorContext.Provider
          value={{ show, setShow, Arrow, setArrow, sidebar, setShowSidebar }}
        >
          <div className="flex jivan">
            <div
              className={`flex-none w-1/6 ${
                sidebar
                  ? "transition-all delay-75 "
                  : "md:w-20 w-16  transition-all delay-100 duration-300"
              }`}
            >
              <div className="sticky top-0 min-h-screen max-h-screen   bg-mainColor overflow-hidden  ">
                <AiOutlineMenuFold
                  className="text-3xl cursor-pointer lg:visible invisible absolute text-white right-2 top-2 "
                  onClick={() => {
                    setShowSidebar(!sidebar);
                  }}
                />
                <Sidebar />
              </div>
            </div>
            <div
              className="flex-auto z-10 bg-slate-100 "
              // style={{
              //   background:
              //     "linear-gradient(to right, #c1d6eb, #ccd9ec, #d6dce6, #e1e5ec, #ebeaf0)",
              // }}
            >
              <div
                className="z-50"
                // style={{
                //   background:
                //     "linear-gradient(to right, #c1d6eb, #e1e7ec, #d6dce6, #c2c9de)",
                // }}
              >
                <Navbar />
              </div>
              <div className="relative  mt-[4.1rem] -z-10  ">
                <Outlet />
              </div>
            </div>
          </div>
        </ColorContext.Provider>
      </UserAuthContext.Provider>
    </UserAuthContextApi>
  );
};

export default Layout;
