import React, { useState, useEffect, useCallback, useMemo } from "react";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { get, remove } from "../../../services/api";
import DangerModal from "../../UI/DangerModal";
import "react-toastify/dist/ReactToastify.css";

const ManageEmp = () => {
  // Existing state variables
  const [info, setInfo] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [toggle, setToggle] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [workingId, setWorkingId] = useState(null);

  // New state variables for search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Function to fetch data
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
  }, [toggle]);

  // Function to delete an item
  const deleteItem = useCallback(
    (id) => {
      try {
        remove(`/employee/${id}`)
          .then((res) => {
            if (res.status === 200) {
              setToggle(!toggle);
              toast.success("The Employee record is removed", {
                className: "custom-toast",
              });
            }
          })
          .catch((err) => {
            if (err.response && err.response.status === 409) {
              toast.error(
                "Can't delete employee having foreign key reference",
                {
                  className: "custom-toast",
                }
              );
            }
          });
      } catch (err) {
        if (err.response && err.response.status === 409) {
          // Show toast message for the conflict error
          toast.error("Can't delete employee having foreign key reference", {
            className: "custom-toast",
          });
        } else {
          toast.error("Failed to remove the employee", {
            className: "custom-toast",
          });
        }
      }
    },
    [toggle]
  );

  // Function to execute delete operation after confirmation
  const success = () => {
    deleteItem(workingId);
  };

  // Function to cancel the delete operation
  const failure = () => {
    setShowDelete(false);
  };

  // Function to handle the search logic for emp_name and position
  const handleSearch = useCallback(() => {
    const filteredInfo = info.filter((val) => {
      const nameMatch = (
        val.first_name +
        " " +
        val.middle_name +
        " " +
        val.last_name
      )
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const positionMatch = val.position
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return nameMatch || positionMatch;
    });

    setFilteredData(filteredInfo);
  }, [info, searchQuery]);

  // Function to handle the department filter
  const handleFilter = () => {
    if (selectedDept === "") {
      setFilteredData(info); // Reset filteredData to the original data
    } else {
      const filteredData = info.filter((emp) => emp.dept_name === selectedDept);
      setFilteredData(filteredData);
    }
  };

  // Fetch data and filter on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter data on searchQuery change
  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  // Get unique department names
  const uniqueDepartments = useMemo(() => {
    const departmentSet = new Set(info.map((emp) => emp.dept_name));
    return Array.from(departmentSet);
  }, [info]);

  return (
    <div className="my-10 relative">
      {showDelete && (
        <DangerModal
          onClick={success}
          falseCondition={failure}
          name="employee"
        />
      )}
      <h1 className="font-bold text-xl">Manage Employee</h1>

      {/* Department filter */}
      <div className="my-4">
        <label className="mr-2">Filter by Department:</label>
        <select
          value={selectedDept}
          onChange={(event) => setSelectedDept(event.target.value)}
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

      {/* Search box */}
      <div className="my-4">
        <input
          type="search"
          placeholder="Search Here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md absolute right-0 top-10 focus:outline-none focus:ring focus:border-blue-300 focus:bg-blue-50 transition-all duration-300  appearance-none bg-white "
        />
        {/* <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        >
          Search
        </button> */}
      </div>

      <table className="table-auto w-full rounded-lg border-collapse border border-gray-400 shadow-lg bg-gradient-to-r from-[#c1d6eb] to-[#ebeaf0]">
        <thead className="bg-gray-300 text-[#000000] uppercase text-base leading-normal">
          <tr>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              S.No
            </th>
            <th className="py-3 px-1 border-r border-b border-gray-400">
              Employee Name
            </th>
            <th className="py-3 px-2 border-r border-b border-gray-400">
              Images
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              Position
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              Salary
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm font-bold">
          {/* Use filteredData instead of info to render the rows */}
          {filteredData.map((val, i) => (
            <tr
              key={i}
              className="border-b border-gray-400  hover:bg-gray-200 font-bold"
            >
              <td className="py-3 px-4 border-l border-gray-400 text-center">
                {i + 1}
              </td>
              <td className="py-3 px-4 border-l border-r border-gray-400">
                {val.first_name} {val.middle_name} {val.last_name}
              </td>
              <td className=" py-1 border-l border-gray-400 border-r">
                <div className="h-28 w-32 mx-auto">
                  <img
                    src={`http://localhost:5000/${val.image}`}
                    className="object-cover  w-full h-full rounded-sm"
                    alt="Employee"
                  />
                </div>
              </td>
              <td className="py-3 px-4 border-l border-r border-gray-400 capitalize">
                {val.position}
              </td>
              <td className="py-3 px-4 border-l border-r border-gray-400">
                {val.salary}
              </td>
              <td className=" border-l border-r border-gray-400">
                <div className="flex justify-center gap-2">
                  <MdDelete
                    onClick={() => {
                      setWorkingId(val.emp_id);
                      setShowDelete(true);
                    }}
                    className="text-3xl  hover:scale-110 hover:text-red-500 transition-all delay-100 duration-300"
                  />
                  <Link
                    state={val}
                    className="hover:scale-110   transition-all delay-100 duration-300 hover:text-blue-500"
                    to={{
                      pathname: `/employee/${val.emp_id}`,
                    }}
                  >
                    <MdOutlineUpdate className="text-3xl" />
                  </Link>
                  <Link
                    state={val}
                    className="hover:scale-110   transition-all delay-100 duration-300 hover:text-green-500"
                    to={{
                      pathname: `/employee/view/${val.emp_id}`,
                    }}
                  >
                    <BsEyeFill className="text-3xl" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer className="mt-11 text-sm " />
    </div>
  );
};

export default ManageEmp;
