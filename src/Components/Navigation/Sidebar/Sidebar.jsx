import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { GiArchiveRegister } from "react-icons/gi";
import { FcLeave } from "react-icons/fc";

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
    title: "attendance",
    path: "/attendance",
    logo: <GiArchiveRegister />,
  },
  {
    title: "createEmployee",
    path: "/create",
    logo: <AiOutlineUsergroupAdd />,
  },
  {
    title: "leave",
    path: "/leave",
    logo: <FcLeave />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="pl-5   h-full">
      <div className="text-4xl text-[#FDF7FF] text-center font-extrabold pb-5">
        EMS
      </div>
      <div className="text-[#e2cefd] py-6">MAIN MENU</div>
      <div className="flex flex-col h-full gap-8 ">
        {Navdata.map((val, i) => {
          return (
            <Link to={val.path}>
              {" "}
              <div
                className={`flex pl-4 py-1 shadow-base rounded-md   items-center mr-4 text-base text-[#ece1fc] border-2 text-center  gap-2 capitalize ${
                  location.pathname === val.path &&
                  "text-gray-700 bg-[#F1F9FB] "
                }`}
              >
                <div className=" text-lg   ">{val.logo}</div>
                <div className="">{val.title}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
