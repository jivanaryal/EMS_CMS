import React, { useState, useEffect, useCallback, useMemo } from "react";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { get, remove } from "../../../services/api";
import "react-toastify/dist/ReactToastify.css";

const ManageEmp = () => {
  const [info, setInfo] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [toggle, setToggle] = useState([]);

  const fetchData = async () => {
    get("/employee").then((res) => {
      console.log(res.data);
      setInfo(res.data);
    });
  };

  const deleteItem = (id) => {
    remove(`/employee/${id}`).then((res) => {
      if (res.status === 200) {
        setToggle(!toggle);
        toast.error("The Employee record is removed", {
          className: "custom-toast",
        });
      }
    });
  };

  const handleDeptChange = (event) => {
    setSelectedDept(event.target.value);
  };

  const filterByDepartment = useCallback(() => {
    if (selectedDept === "") {
      fetchData();
    } else {
      const filteredData = info.filter((emp) => emp.dept_name === selectedDept);
      setInfo(filteredData);
    }
  }, [selectedDept, info]);

  const handleFilter = () => {
    filterByDepartment();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const newCallBack = useCallback(() => {
    fetchData();
  }, []);

  const newData = useMemo(() => newCallBack(), [toggle]);

  // Get unique department names
  const uniqueDepartments = useMemo(() => {
    const departmentSet = new Set(info.map((emp) => emp.dept_name));
    return Array.from(departmentSet);
  }, [info]);

  return (
    <div className="my-10">
      <h1 className="font-bold text-xl">Manage Employee </h1>

      {/* Department filter */}
      <div className="my-4">
        <label className="mr-2">Filter by Department:</label>
        <select
          value={selectedDept}
          onChange={handleDeptChange}
          className="border border-gray-400 rounded px-2 py-1"
        >
          <option value="">All</option>
          {/* Render the unique department options */}
          {uniqueDepartments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <button
          onClick={handleFilter}
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        >
          Filter
        </button>
      </div>

      <table className="w-full rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              S.No
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              Employee Name
            </th>
            <th>Images</th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              position
            </th>

            <th className="py-3 px-6 border-r border-b border-gray-200">
              gender
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              Department Name
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              salary
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              Delete
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {info.map((val, i) => (
            <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4 border-l text-center">{i + 1}</td>
              <td className="py-3 px-4 border-l border-r">
                {val.first_name + " " + val.middle_name + " " + val.last_name}
              </td>
              <td className="py-3 px-4  border-l border-r">
                <div className="h-28 w-28 rounded-full">
                  <img
                    src={`http://localhost:5000/${val.image}`}
                    className="object-cover rounded-full w-full h-full"
                    alt="Course"
                  />
                </div>
              </td>
              <td className="py-3 px-4 border-l border-r">{val.job}</td>
              <td className="py-3 px-4 border-l border-r">{val.gender}</td>
              <td className="py-3 px-4 border-l border-r">{val.dept_name}</td>
              <td className="py-3 px-4 border-l border-r">{val.salary}</td>
              <td className="py-3 px-4 border-l border-r text-center">
                <MdDelete
                  onClick={() => deleteItem(val.emp_id)}
                  className="text-3xl hover:scale-110 hover:text-red-500 transition-all delay-100 duration-300"
                />
              </td>
              <td className="py-3 px-4 border-l border-r text-center">
                <Link
                  state={val}
                  className="hover:scale-110 transition-all delay-100 duration-300 hover:text-blue-500"
                  to={{
                    pathname: `/employee/${val.emp_id}`,
                  }}
                >
                  <MdOutlineUpdate className="text-3xl" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default ManageEmp;
