import React, { useContext, useEffect, useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import SubNav from "./SubNav";
import { ColorContext } from "../../../Hoc/Layouts/Layout";

const Navbar = () => {
  const { show, setShow, sidebar, setShowSidebar } = useContext(ColorContext);

  const navbarRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside the Navbar component
    const handleClickOutsideNavbar = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        console.log(
          navbarRef.current,
          !navbarRef.current.contains(event.target)
        );
        setShow(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutsideNavbar);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutsideNavbar);
    };
  }, [setShow]);

  return (
    <div
      ref={navbarRef}
      className="h-16 border-2 border-l-0 z-30 text-white w-full   shadow-lg fixed top-0  bg-secondColor navbar"
      style={{
        background: "linear-gradient(to right, #000460, #004e82)",
      }}
    >
      <div
        className={`h-full flex items-center
      pl-4  pr-7  ${sidebar ? "justify-around" : "justify-between mr-14 "}`}
      >
        {/* search  */}

        <div className="searchbox invisible flex items-center relative border-2 border-gray-200 rounded-md ">
          <input
            type="search"
            className="text-black focus:outline-none p-2 pl-10 font-4xl bg-[#FAFAFA]"
            placeholder="search.."
          />
          <GoSearch className="absolute left-3 text-black" />
        </div>

        {/* profile */}
        <div className="flex relative  items-center gap-3">
          <div className="font-bold text-lg text-white sm:block hidden  ">
            Admin
          </div>
          <div className=" rounded-full ">
            <RiAdminFill className="w-10 h-10 font-bold p-2 sm:block hidden rounded-full border-2" />
          </div>
          <div className=" ">
            <MdKeyboardArrowDown
              onClick={() => {
                setShow(!show);
              }}
              className="text-4xl sm:mr-0 mr-20  cursor-pointer "
            />
            {show && (
              <div className="w-44 text-black bg-white rounded-md shadow-sm shadow-gray-400 absolute top-[3.3rem] font-bold  right-[1px] -z-50  cursor-pointer border-1 border-gray-300 py-2 px-3">
                <div>
                  <SubNav />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
