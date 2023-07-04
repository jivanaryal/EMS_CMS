import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "../../../services/api";

const data = [
  {
    title: "Total Department",
    num: "24",
    intro: "View Department",
    colors: "#FFEFE7",
    path: "/department",
  },
  {
    title: "Total Employee",
    num: "24",
    intro: "View Employee",
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
    title: "Leave Request",
    num: "24",
    intro: "View Leave Request",
    colors: "#F1F9FB",
    path: "/leave",
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
      <div className="flex gap-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 h-36 w-10/12">
          {data.map((val, i) => (
            <Link to={val.path} key={i}>
              <div
                style={{ backgroundColor: val.colors }}
                className="rounded-lg h-32 flex flex-col gap-2 items-center text-sm shadow-md shadow-blue-400 py-10 mx-2 sm:mx-4 md:mx-6 text-center hover:transition-all hover:scale-105 hover:delay-200 hover:duration-1000"
              >
                <div className="text-lg font-bold">{val.title}</div>
                <div>{val.num}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="employee_data px-6 shadow-xl py-4 bg-white rounded-lg w-full mx-4">
          <h1 className="text-2xl font-bold mb-4">Top Salary Employees</h1>
          <div>
            {topEmployees.map((emp, index) => (
              <div key={index} className="flex items-center mb-4">
                <img
                  src={`http://192.168.18.7:5000/${emp.image}`}
                  alt="Employee"
                  className="w-12 h-12 rounded-full mr-5"
                />
                <div className="grid grid-cols-5 gap-4 w-full text-sm text-[#5E5E5E] font-bold items-center">
                  <div className="text-gray-700 capitalize col-span-2">
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
    </div>
  );
};

export default Dashboard;
