import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "../../../services/api";
import { BsBuilding } from "react-icons/bs";
import PieChart from "./PieChart";

const data = [
  {
    title: "Total Department",
    num: "24",
    intro: "View Department",
    colors: "#FFEFE7",
    colors1: "#EC9E09",
    path: "/department",
    icons: <BsBuilding />,
  },
  {
    title: "Total Employee",
    num: "24",
    intro: "View Employee",
    colors: "#E8F0FB",
    colors1: "#595FF0",
    path: "/employee",
    icons: <BsBuilding />,
  },
  {
    title: "Total Attendance",
    num: "24",
    intro: "View Attendance",
    colors: "#FDEBF9",
    colors1: "#16C6BC",
    path: "/attendance",
    icons: <BsBuilding />,
  },
  {
    title: "Leave Request",
    num: "24",
    intro: "View Leave Request",
    colors: "#F1F9FB",
    colors1: "#F74E61",
    path: "/leave",
    icons: <BsBuilding />,
  },
];

const Dashboard = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    get("/employee").then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setEmployee(res.data);
      }
    });
  }, []);

  // Sort the employees by salary in descending order
  const sortedEmployees = [...employee].sort((a, b) => b.salary - a.salary);

  // Get the top 5 employees with highest salary
  const topEmployees = sortedEmployees.slice(0, 5);

  return (
    <div className="">
      <div className="flex gap-20">
        <div className="grid grid-cols-1 mt-10 gap-5 md:grid-cols-2 h-46 w-5/12">
          {data.map((val, i) => (
            <Link to={val.path} key={i}>
              <div
                style={{ backgroundColor: val.colors }}
                className="rounded-lg h-36 flex flex-col gap-2 items-center text-sm shadow-md shadow-blue-400 py-4 mx-2 sm:mx-4 md:mx-6 text-center hover:transition-all hover:scale-105 hover:delay-200 hover:duration-1000 px-2"
              >
                <div
                  className="text-xl font-bold text-white p-1 rounded-sm "
                  style={{ backgroundColor: val.colors1 }}
                >
                  {val.icons}
                </div>
                <div className="text-md font-bold">{val.title}</div>
                <div className="">{val.num}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="w-80">
          <PieChart />
        </div>
      </div>
      {/* Top salary employee */}
      <div className="employee_data ml-5  pl-6 shadow-sm  shadow-mainColor w-[70%]  rounded-lg  ">
        <h1 className="text-2xl font-bold mb-8 pt-6 mt-4">
          Top Salary Employees
        </h1>
        <div className="w-full">
          {topEmployees.map((emp, index) => (
            <div key={index} className="flex items-center mb-4 w-full">
              <img
                src={`http://localhost:5000/${emp.image}`}
                alt="Employee"
                className="w-12 h-12 rounded-full mr-5"
              />
              <div className="grid w-full grid-cols-4 gap-4  text-sm text-[#5E5E5E] font-bold items-center">
                <div className="text-gray-700 capitalize ">
                  {emp.first_name} {emp.middle_name} {emp.last_name}
                </div>
                <div>{emp.dept_name}</div>
                <div>{emp.job}</div>
                <div className="font-bold text-black">${emp.salary}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
