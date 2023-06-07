import React from "react";
import { Link } from "react-router-dom";

const data = [
  {
    title: "Total Department",
    num: "24",
    intro: "Add Department",
    colors: "#FFEFE7",
    path: "/department",
  },
  {
    title: "Total Employee",
    num: "24",
    intro: "Add Employee",
    colors: "#E8F0FB",
    path: "/employee",
  },
  {
    title: "Total Attendance",
    num: "24",
    intro: "View Attendance",
    colors: "#FDEBF9",
    path: "/attendance",
  },
  {
    title: " Leave Request",
    num: "24",
    intro: "View Leave Request",
    colors: "#FDEBF9",
    path: "/leave",
  },
  {
    title: "Create EmployeeId",
    num: "24",
    intro: "View Attendance",
    colors: "#FDEBF9",
    path: "/create",
  },
];

const Dashboard = () => {
  return (
    <div className="w-10/12 mx-auto">
      <div className="grid grid-cols-3 gap-6">
        {data.map((val, i) => {
          console.log(val.colors);
          return (
            <Link to={val.path}>
              {" "}
              <div
                key={i}
                style={{ backgroundColor: val.colors }}
                className="rounded-lg flex flex-col font-bold justify-start  gap-2 text-base shadow-md shadow-blue-400 py-10 mx-10  pl-4 hover:transition-all hover:scale-105 hover:delay-200 hover:duration-1000"
              >
                <div className="text-xl">{val.title}</div>
                <div className="text-3xl">{val.num}</div>
                <div className="text-red-500">{val.intro}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
