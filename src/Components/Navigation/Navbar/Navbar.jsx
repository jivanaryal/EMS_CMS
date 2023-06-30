import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [show, setShow] = React.useState(false);
  const [Arrow, setArrow] = useState("down");
  // const navigate = useNavigate();
  return (
    <div className="h-16 border-2 z-40  shadow-lg fixed top-0 w-full bg-secondColor navbar">
      <div
        className="w-full h-full flex items-center
      pl-4 justify-around pr-7"
      >
        {/* search  */}
        <div className="searchbox flex items-center relative border-2 border-gray-200 rounded-md ">
          <input
            type="search"
            className="text-black focus:outline-none p-2 pl-10 font-4xl bg-[#FAFAFA]"
            placeholder="search.."
          />
          <GoSearch className="absolute left-3 text-black" />
        </div>
        {/* profile */}
        <div className="flex justify-between items-center gap-3 p-4">
          <div>Manoj Belbase</div>
          <div className="bg-red-400 rounded-full h-10 w-10">
            <img
              src={
                "https://th.bing.com/th/id/OIP.RdxS9u-w00MM-81ESAivhQHaHa?w=203&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7"
              }
              alt="logo"
              className="rounded-3xl"
            />
          </div>
          <div className="relative ">
            <MdKeyboardArrowDown
              onBlur={() => {
                setShow(false);
              }}
              onClick={() => {
                setArrow("up");
                setShow(!show);
              }}
              className={`text-4xl relative cursor-pointer ${
                show ? "hidden" : "block"
              } `}
            />
            <MdKeyboardArrowUp
              className={`text-4xl relative  text-white  cursor-pointer   ${
                Arrow === "down" ? "hidden  " : "block "
              }`}
              onClick={() => {
                setArrow("down");
                setShow(!show);
              }}
            />
            {show && (
              <div className="w-40 text-black absolute top-12 rounded-lg right-1 z-20 p-2 cursor-pointer border-1 border-gray-300 h-20 bg-secondColor">
                <p>LogOut</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
