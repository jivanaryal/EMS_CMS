import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "../../../services/api";
import PieChart from "./PieChart";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";
import { BiTask } from "react-icons/bi";

const data = [
  {
    title: "View Department",
    // num: "24",
    intro: "View Department",
    colors: "#FFEFE7",
    colors1: "#EC9E09",
    path: "/department",
    icons: <HiBuildingOffice2 />,
  },
  {
    title: "View Employee",
    // num: "24",
    intro: "View Employee",
    colors: "#E8F0FB",
    colors1: "#595FF0",
    path: "/employee",
    icons: <HiUserGroup />,
  },
  {
    title: "Assign Task",
    // num: "24",
    intro: "Assign Task",
    colors: "#FDEBF9",
    colors1: "#16C6BC",
    path: "/task",
    icons: <BiTask />,
  },
  {
    title: "Leave Request",
    // num: "24",
    intro: "View Leave Request",
    colors: "#F1F9FB",
    colors1: "#F74E61",
    path: "/leave",
    icons: <IoMdExit />,
  },
];

const Dashboard = () => {
  const [employee, setEmployee] = useState([]);
  const [leave, setLeave] = useState([]);
  const [uniquePendingLeaves, setUniquePendingLeaves] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaveRes = await get("/leave");
        if (leaveRes.status === 200) {
          console.log(leaveRes.data);
          setLeave(leaveRes.data);
        }
      } catch (leaveErr) {
        console.log(leaveErr.message);
      }

      try {
        const employeeRes = await get("/employee");
        if (employeeRes.status === 200) {
          setEmployee(employeeRes.data);
        }
      } catch (employeeErr) {
        console.log(employeeErr.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (leave.length > 0) {
      const pendingLeaves = leave.filter((emp) => emp.status === "pending");
      setUniquePendingLeaves(pendingLeaves);
    } else {
      setUniquePendingLeaves([]);
    }
  }, [leave]);

  const sortedEmployees = [...employee].sort((a, b) => b.salary - a.salary);
  const topEmployees = sortedEmployees.slice(0, 5);

  return (
    <div className="grid grid-cols-12 gap-4 ">
      <div className="ml-5 col-span-8">
        <div className="flex mt-10 gap-14">
          {/* profile */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {data.map((val, i) => (
              <Link to={val.path} key={i}>
                <div
                  style={{ backgroundColor: val.colors }}
                  className="rounded-lg flex flex-col items-center justify-center text-center shadow-md transition-transform transform hover:scale-105 hover:delay-200 hover:duration-1000"
                >
                  <div
                    className="text-3xl font-bold text-white p-4 rounded-full"
                    style={{ backgroundColor: val.colors1 }}
                  >
                    {val.icons}
                  </div>
                  <div className="mt-4 text-xl font-semibold">{val.title}</div>
                  <div className="text-lg">{val.num}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* pie chart */}
          <div className="w-80 flex-auto">
            <PieChart employee={employee} />
          </div>
        </div>
        {/* Top employee */}
        <div className="employee_data pl-6 shadow-sm shadow-mainColor w-11/12 rounded-lg pb-2 mb-2">
          <h1 className="text-2xl font-bold mb-8 pt-6 mt-4">Top Employees</h1>
          <div className="w-full">
            {topEmployees.map((emp, index) => (
              <div key={index} className="flex items-center mb-4 w-full">
                <img
                  src={`http://localhost:5000/${emp.image}`}
                  alt="Employee"
                  className="w-12 h-12 rounded-full mr-5"
                />
                <div className="grid w-full grid-cols-4 gap-4 text-sm text-[#5E5E5E] font-bold items-center">
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
      {/*             Pending Leave Requests */}
      <div className="col-span-4 w-full mt-4">
        <div className="employee_data pl-6 shadow-xl shadow-gray-300 rounded-lg">
          <h1 className="text-xl font-bold mb-8 pt-6 mt-4">
            Pending Leave Requests
          </h1>
          {uniquePendingLeaves.length > 0 ? (
            uniquePendingLeaves.map((pendingLeave, index) => (
              <div className="flex pb-6 items-center mb-4 w-full" key={index}>
                <img
                  src={`http://localhost:5000/${pendingLeave.image}`}
                  alt="Employee"
                  className="w-12 h-12 rounded-full mr-5"
                />
                <div className="grid w-full grid-cols-3 gap-4  text-sm text-[#5E5E5E] font-bold items-center">
                  <div className="text-gray-700 capitalize ">
                    {pendingLeave.first_name} {pendingLeave.middle_name}{" "}
                    {pendingLeave.last_name}
                  </div>
                  <div>{pendingLeave.job}</div>
                  <Link to={"/leave"}>
                    <div className="border-2 rounded-md hover:bg-blue-500 border-gray-700 py-1 bg-mainColor text-secondColor text-center">
                      View
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="pb-4">No pending leave requests</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
