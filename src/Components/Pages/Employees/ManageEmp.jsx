import React, { useState, useEffect, useCallback, useMemo } from "react";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { get, remove } from "../../../services/api";
import DangerModal from "../../UI/DangerModal";
import "react-toastify/dist/ReactToastify.css";

const ManageEmp = () => {
  const [info, setInfo] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [toggle, setToggle] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [workingId, setWorkingId] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await get("/employee");
      if (res.status === 200) {
        setInfo(res.data);
      } else {
        console.log("The data is not fetched");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const deleteItem = useCallback(
    (id) => {
      try {
        remove(`/employee/${id}`).then((res) => {
          if (res.status === 200) {
            setToggle(!toggle);
            toast.success("The Employee record is removed", {
              className: "custom-toast",
            });
          }
        });
      } catch (err) {
        if (err.response && err.response.status === 409) {
          toast.error("Can't delete employee having foreign key reference");
        } else {
          toast.error("Failed to remove the employee");
        }
      }
    },
    [toggle]
  );

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

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const newCallBack = useCallback(() => {
    fetchData();
  }, []);

  const newData = useMemo(() => newCallBack(), [toggle]);

  // Get unique department names
  const uniqueDepartments = useMemo(() => {
    const departmentSet = new Set(info.map((emp) => emp.dept_name));
    return Array.from(departmentSet);
  }, [info]);

  const success = () => {
    deleteItem(workingId);
  };

  const failure = () => {
    setShowDelete(false);
  };

  return (
    <div className="my-10">
      {showDelete && (
        <DangerModal
          onClick={success}
          falseCondition={failure}
          name="employee"
        />
      )}
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
          {uniqueDepartments.map((dept, i) => (
            <option key={i} value={dept}>
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

      <table className="table-auto w-full rounded-lg border-collapse border border-gray-400 shadow-lg bg-gradient-to-r from-[#c1d6eb] to-[#ebeaf0]">
        <thead className="bg-gray-300 text-[#000000] uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              S.No
            </th>
            <th className="py-3 px-1 border-r border-b border-gray-400">
              Employee Name
            </th>
            <th>Images</th>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              position
            </th>

            <th className="py-3 px-6 border-r border-b border-gray-400">
              gender
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              Department Name
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              salary
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              Delete
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-bold">
          {info.map((val, i) => (
            <tr
              key={i}
              className="py-3 text-center px-2 border-r border-b border-gray-400"
            >
              <td className="py-3 px-4 border-l border-gray-400 text-center">
                {i + 1}
              </td>
              <td className="py-3 px-4 border-l border-r border-gray-400">
                {val.first_name + " " + val.middle_name + " " + val.last_name}
              </td>
              <td className="py-3 px-4  border-l border-gray-400 border-r">
                <div className="h-28 w-28  rounded-full">
                  <img
                    src={`http://localhost:5000/${val.image}`}
                    className="object-cover rounded-full w-full h-full"
                    alt="Course"
                  />
                </div>
              </td>
              <td className="py-3 px-4 border-l border-r border-gray-400 capitalize">
                {val.position}
              </td>
              <td className="py-3 px-4 border-l border-r border-gray-400 capitalize">
                {val.gender}
              </td>
              <td className="py-3 px-4 border-l border-r border-gray-400 capitalize">
                {val.dept_name}
              </td>
              <td className="py-3 px-4 border-l border-r border-gray-400">
                {val.salary}
              </td>
              <td className="py-3 px-4 border-l border-r text-center border-gray-400">
                <MdDelete
                  onClick={() => {
                    setWorkingId(val.emp_id);
                    setShowDelete(true);
                  }}
                  className="text-3xl mx-auto hover:scale-110 hover:text-red-500 transition-all delay-100 duration-300"
                />
              </td>
              <td className="py-3 px-4 border-l border-r border-gray-400 text-center">
                <Link
                  state={val}
                  className="hover:scale-110 mx-auto transition-all delay-100 duration-300 hover:text-blue-500"
                  to={{
                    pathname: `/employee/${val.emp_id}`,
                  }}
                >
                  <MdOutlineUpdate className="text-3xl mx-auto" />
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
