import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { GiArchiveRegister } from "react-icons/gi";
import { FcLeave } from "react-icons/fc";
import { BiTask } from "react-icons/bi";
import logo from "../../../assets/Image/logo1.png";
import { ColorContext } from "../../../Hoc/Layouts/Layout";
const Navdata = [
  {
    title: "dashboard",
    path: "/",
    logo: <MdDashboard />,
  },

  {
    title: "department",
    path: "/department",
    logo: <HiBuildingOffice2 />,
  },
  {
    title: "employee",
    path: "/employee",
    logo: <HiUserGroup />,
  },
  {
    title: "task",
    path: "/task",
    logo: <BiTask />,
  },
  {
    title: "task status",
    path: "/taskstatus",
    logo: <BiTask />,
  },

  {
    title: "leave",
    path: "/leave",
    logo: <FcLeave />,
  },
  {
    title: "create EID",
    path: "/create",
    logo: <AiOutlineUsergroupAdd />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const { sidebar, setShowSidebar } = useContext(ColorContext);

  return (
    <div className="pl-5  h-full">
      <div
        className={` text-[#FDF7FF] flex justify-center   font-extrabold py-1 ${
          sidebar === false && "hidden"
        }`}
      >
        <img src={logo} alt="logo" className="h-20 w-24" />
      </div>
      <div
        className={`text-[#e2cefd] pb-4 ${sidebar === false && "invisible"}`}
      >
        MAIN MENU
      </div>
      <div className="flex flex-col h-full gap-5 ">
        {Navdata.map((val, i) => {
          return (
            <Link to={val.path}>
              {" "}
              <div
                className={`flex md:px-3 pl-1 pr-0 md:py-2 py-1  shadow-base rounded-md   items-center mr-4 text-base text-[#ece1fc] border-[1px] text-center  gap-2 capitalize ${
                  location.pathname === val.path &&
                  "text-gray-700 bg-[#F1F9FB] shadow-md shadow-gray-700 font-bold text-lg "
                }`}
              >
                <div className=" text-lg   ">{val.logo}</div>
                <div className={`text-sm  ${sidebar ? "block" : "hidden"}`}>
                  {val.title}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
