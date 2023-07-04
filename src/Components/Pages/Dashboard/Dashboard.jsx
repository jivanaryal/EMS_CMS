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
    colors: "green",
    path: "/leave",
  },
];

const Dashboard = () => {
  return (
    <div className="w-full flex">
      <div className="grid grid-cols-1 gap-6  md:grid-cols-2 w-6/12">
        {data.map((val, i) => {
          console.log(val.colors);
          return (
            <Link to={val.path}>
              <div
                key={i}
                style={{ backgroundColor: val.colors }}
                className="rounded-lg flex flex-col gap-2 text-sm shadow-md shadow-blue-400 py-10 mx-2 sm:mx-4 md:mx-6 text-center hover:transition-all hover:scale-105 hover:delay-200 hover:duration-1000"
              >
                <div className="text-lg">{val.title}</div>
                <div>{val.num}</div>
                <div>{val.intro}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
