import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "../../../services/api";

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
    title: "Leave Request",
    num: "24",
    intro: "View Leave Request",
    colors: "green",
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

  return (
    <div className="">
      <div className="flex">
        <div className="grid grid-cols-1 gap-6 h-96  md:grid-cols-2 w-6/12">
          {data.map((val, i) => (
            <Link to={val.path} key={i}>
              <div
                style={{ backgroundColor: val.colors }}
                className="rounded-lg flex flex-col gap-2 text-sm shadow-md shadow-blue-400 py-10 mx-2 sm:mx-4 md:mx-6 text-center hover:transition-all hover:scale-105 hover:delay-200 hover:duration-1000"
              >
                <div className="text-lg">{val.title}</div>
                <div>{val.num}</div>
                <div>{val.intro}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="employee_data px-6 ">
          <h1 className="text-2xl font-bold mb-4">Top Employees</h1>
          <div className="shadow-xl bg-white rounded-lg p-4">
            {employee.slice(1, 4).map((emp, index) => (
              <div key={index} className="flex items-center mb-4">
                <img
                  src={`http://localhost:5000/${emp.image}`}
                  alt="Employee"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <div className="text-lg font-bold">
                    {emp.first_name} {emp.middle_name} {emp.last_name}
                  </div>
                  <div className="text-gray-600 mb-2">Position: {emp.job}</div>
                  <div className="text-gray-600 mb-2">
                    Department Name: {emp.dept_name}
                  </div>
                  <div className="text-gray-600 mb-2">
                    Salary: ${emp.salary}
                  </div>
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
