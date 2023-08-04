import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "../../../services/api";
import PieChart from "./PieChart";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";
import { BiTask } from "react-icons/bi";
import MyBarChart from "./BarChart";
import UserAuthContextApi, {
  UserAuthContext,
} from "../../../Hoc/ContextApi/UserAuthContextApi";

const Dashboard = () => {
  const [employee, setEmployee] = useState([]);
  const [leave, setLeave] = useState([]);
  const [uniquePendingLeaves, setUniquePendingLeaves] = useState([]);
  const [task, setTask] = useState([]);
  const [lemployee, setLEmployee] = useState(0);
  const [ldepartment, setLdepartment] = useState(0);
  const [viewReq, setViewReq] = useState(0);
  const [datas, setDatas] = useState(true);

  const data = [
    {
      title: `View ${ldepartment} Department`,
      intro: "View Department",
      colors: "#FFEFE7",
      colors1: "#EC9E09",
      path: "/department",
      icons: <HiBuildingOffice2 />,
      num: null,
    },
    {
      title: `View ${lemployee} Employee`,
      intro: "View Employee",
      colors: "#E8F0FB",
      colors1: "#595FF0",
      path: "/employee",
      icons: <HiUserGroup />,
      num: null, // Use the state value here
    },
    {
      title: "View Task",
      intro: "Assign Task",
      colors: "#FDEBF9",
      colors1: "#16C6BC",
      path: "/task",
      icons: <BiTask />,
      num: null,
    },
    {
      title: "Leave Request",
      intro: "View Leave Request",
      colors: "#F1F9FB",
      colors1: "#F74E61",
      path: "/leave",
      icons: <IoMdExit />,
      num: null,
    },
  ];

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
        const departmentRes = await get("/department");
        if (departmentRes.status === 200) {
          console.log(departmentRes.data);
          setLdepartment(departmentRes.data.length);
        }
      } catch (departmentError) {
        console.log(departmentError.message);
      }

      try {
        const employeeRes = await get("/employee");
        if (employeeRes.status === 200) {
          setEmployee(employeeRes.data);
          setLEmployee(employeeRes.data.length);
        }
      } catch (employeeErr) {
        console.log(employeeErr.message);
      }
      try {
        const taskRes = await get("/task");
        if (taskRes.status === 200) {
          setTask(taskRes.data);
        }
      } catch (taskErr) {
        console.log(taskErr.message);
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setDatas(false);
      } else {
        setDatas(true);
      }
    };

    // Call handleResize initially to set the initial state based on the window width
    handleResize();

    // Add the event listener for the resize event
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <UserAuthContextApi>
      <UserAuthContext.Provider>
        <div className="w-full">
          <div className="pb-4 w-12/12 mx-4">
            <div className="grid grid-cols-12 gap-4 ">
              <div className={`lg:col-span-8 col-span-12`}>
                <div className="flex mt-10 gap-14 w-full">
                  <div className="grid grid-cols-2   gap-8 md:grid-cols-2  shadow-sm shadow-mainColor p-4">
                    {data.map((val, i) => (
                      <Link to={val.path} key={i}>
                        <div
                          style={{ backgroundColor: val.colors }}
                          className="rounded-lg lg:h-28 h-24      flex flex-col justify-center items-center gap-2   shadow-md shadow-gray-300   mx-2 sm:mx-4 md:mx-2 text-center hover:transition-all hover:scale-105 hover:delay-200 hover:duration-1000 px-10"
                        >
                          <div
                            className="lg:text-xl text-sm  font-bold text-white p-1 rounded-md flex"
                            style={{ backgroundColor: val.colors1 }}
                          >
                            {val.icons}
                          </div>

                          <div className=" font-bold text-[14px]">
                            {val.title}
                          </div>
                          <span className="text-base font-bold">{val.num}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="lg:w-80 w-64  md:block hidden flex-auto shadow-mainColor shadow-2">
                    <PieChart employee={employee} />
                  </div>
                </div>
              </div>
              {/*             Pending Leave Requests */}
              <div
                className={`lg:col-span-4 md:col-span-9 col-span-12 w-full mt-4 `}
              >
                <div className="employee_data pl-6 shadow-xl shadow-gray-300 rounded-lg">
                  <h1 className="lg:text-xl text-base font-bold mb-8 pt-6 mt-4">
                    Pending Leave Requests
                  </h1>
                  {uniquePendingLeaves.length > 0 ? (
                    uniquePendingLeaves.map((pendingLeave, index) => (
                      <div
                        className="flex pb-6 items-center mb-4 w-full"
                        key={index}
                      >
                        <img
                          src={`http://localhost:5000/${pendingLeave.image}`}
                          alt="Employee"
                          className="w-12 h-12 rounded-full mr-5"
                        />
                        <div className="grid w-full grid-cols-3 gap-4  text-sm   lg:text-[12px] text-[#5E5E5E] font-bold items-center">
                          <div className="text-gray-700 capitalize ">
                            {pendingLeave.first_name} {pendingLeave.middle_name}{" "}
                            {pendingLeave.last_name}
                          </div>
                          <div>{pendingLeave.position}</div>
                          <Link to={"/leave"}>
                            <div className="border-2 mr-4 rounded-md hover:bg-blue-500 border-gray-700 py-1 bg-mainColor text-secondColor text-center">
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
            <div className="grid md:grid-cols-2 col-span-1 gap-6 py-6">
              {/* Top employee */}
              <div className=" employee_data  pl-6 shadow-sm shadow-mainColor  rounded-lg pb-2 mb-2">
                <h1 className="text-2xl font-bold mb-8 pt-6 mt-4">
                  Top Employees
                </h1>
                <div className="w-full">
                  {topEmployees.map((emp, index) => (
                    <div key={index} className="flex items-center mb-4 w-full">
                      <img
                        src={`http://localhost:5000/${emp.image}`}
                        alt="Employee"
                        className="w-12 h-12 rounded-full mr-5"
                      />
                      <div className="grid w-full  sm:grid-cols-3 grid-cols-2 gap-4 text-sm text-[#5E5E5E] font-bold items-center">
                        <div className="text-gray-700 capitalize ">
                          {emp.first_name} {emp.middle_name} {emp.last_name}
                        </div>
                        <div className="md:block hidden">{emp.dept_name}</div>

                        <div className="font-bold text-black">
                          ${emp.salary}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="shadow-md  shadow-mainColor md:block hidden">
                <MyBarChart task={task} />
              </div>
            </div>
          </div>
        </div>
      </UserAuthContext.Provider>
    </UserAuthContextApi>
  );
};

export default Dashboard;
