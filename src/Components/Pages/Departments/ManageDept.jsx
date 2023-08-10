import React, { useState, useEffect, useCallback } from "react";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { get, remove } from "../../../services/api";
import DangerModal from "../../UI/DangerModal";
import "react-toastify/dist/ReactToastify.css";

const ManageDept = () => {
  // Existing state variables
  const [info, setInfo] = useState([]);
  const [toggle, setToggle] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [workingId, setWorkingId] = useState(null);

  // New state variables for search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Fetch data and filter on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get("/department");
        setInfo(res.data);
        setFilteredData(res.data); // Set initial filteredData to fetched data
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [toggle]);

  // Function to delete an item
  const deleteItem = (id) => {
    remove(`/department/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setToggle(!toggle);
          toast.success("The department is removed");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          toast.error("The department has a foreign key");
        } else {
          toast.error("Failed to remove the department");
        }
        console.log(err.message);
      });
  };

  // Function to execute delete operation after confirmation
  const success = () => {
    deleteItem(workingId);
  };

  // Function to cancel the delete operation
  const failure = () => {
    setShowDelete(false);
  };

  const handleSearch = () => {
    const filteredInfo = info.filter((val) => {
      const nameMatch = val.dept_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const locationMatch = val.dept_location
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return nameMatch || locationMatch;
    });

    setFilteredData(filteredInfo);
  };

  // Call handleSearch on searchQuery change
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  // ... other existing code ...

  return (
    <div className="my-10 mx-4 md:mx-10 lg:mx-16 relative overflow-y-hidden">
      {showDelete && (
        <DangerModal
          onClick={success}
          falseCondition={failure}
          name="department"
        />
      )}
      <h1 className="font-bold text-xl">Manage Department</h1>
      {/* Add search box */}
      <div className="mb-4 mt-6 md:mt-0">
        <input
          type="text"
          placeholder="Search here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 focus:bg-blue-50 transition-all duration-300 rounded px-2 py-1 appearance-none bg-white"
        />
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="table-auto w-full rounded-lg border-collapse border border-mainColor shadow-lg bg-gradient-to-r from-[#c1d6eb] to-[#ebeaf0]">
          <thead className="bg-mainColor  text-white uppercase md:text-base text-sm leading-normal">
            <tr>
              <th className="py-3 text-center px-2 border-r border-b border-mainColor">
                S.No
              </th>
              <th className="py-3 px-1 border-r border-b border-mainColor">
                Department Name
              </th>
              <th className="py-3 px-2 border-r border-b border-mainColor hidden md:table-cell">
                Location
              </th>
              <th className="py-3 px-2 border-r border-b border-mainColor">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800  md:text-base text-[12px] font-bold">
            {/* Use filteredData instead of info to render the rows */}
            {filteredData.map((val, i) => (
              <tr
                key={i}
                className="border-b border-mainColor hover:bg-gray-100"
              >
                <td className="py-3 text-center border-l border-mainColor">
                  {i + 1}
                </td>
                <td className="py-3 text-center border-l border-mainColor border-r capitalize">
                  {val.dept_name}
                </td>
                <td className="py-3 text-center border-l border-r border-mainColor capitalize hidden md:table-cell">
                  {val.dept_location}
                </td>
                <td className="py-3 border-l border-r border-mainColor">
                  <div className="flex justify-center md:justify-start gap-3">
                    <MdDelete
                      onClick={() => {
                        setWorkingId(val.dept_id);
                        setShowDelete(true);
                      }}
                      className="md:text-3xl text-xl hover:scale-110 hover:text-red-500 transition-all delay-100 duration-300 cursor-pointer"
                    />
                    <Link
                      state={val}
                      className="md:text-3xl text-xl hover:scale-110 hover:text-blue-500 transition-all delay-100 duration-300"
                      to={{
                        pathname: `/department/${val.dept_id}`,
                      }}
                    >
                      <MdOutlineUpdate className="md:text-3xl text-xl cursor-pointer" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer className="mt-11 text-sm" />
    </div>
  );
};

export default ManageDept;
