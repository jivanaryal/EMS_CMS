import React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { GoSearch } from "react-icons/go";
// import { useNavigate } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="fixed top-0 bg-secondColor w-screen shadow-md shadow-slate-800">
      <div
        className="w-full h-full flex justify-between items-center text-white
      pl-4"
      >
        <div className="logo bg-red-400 rounded-full h-10 w-10"></div>
        <div className="searchbox flex items-center relative">
          <GoSearch className="absolute left-3 text-black" />
          <input
            type="search"
            className="text-black focus:outline-none rounded-3xl p-2 pl-10 font-4xl"
            placeholder="search..."
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
