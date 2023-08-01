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
    <div className="my-10 mx-10 relative">
      {showDelete && (
        <DangerModal
          onClick={success}
          falseCondition={failure}
          name="department"
        />
      )}
      <h1 className="font-bold text-xl">Manage Department</h1>
      {/* Add search box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md absolute right-0 top-0 focus:outline-none focus:ring focus:border-blue-300 focus:bg-blue-50 transition-all duration-300 rounded px-2 py-1 appearance-none bg-white "
        />
      </div>
      <div className="overflow-x-auto pt-2">
        <table className="table-auto w-full rounded-lg border-collapse border border-gray-400 shadow-lg bg-gradient-to-r from-[#c1d6eb] to-[#ebeaf0]">
          <thead className="bg-gray-300 text-[#000000] uppercase text-base leading-normal">
            <tr>
              <th className="py-3 text-center px-2 border-r border-b border-gray-400">
                S.No
              </th>
              <th className="py-3 px-1 border-r border-b border-gray-400">
                Department Name
              </th>
              <th className="py-3 px-2 border-r border-b border-gray-400">
                Location
              </th>
              <th className="py-3 px-2 border-r border-b border-gray-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-md font-bold">
            {/* Use filteredData instead of info to render the rows */}
            {filteredData.map((val, i) => (
              <tr
                key={i}
                className="border-b border-gray-400 hover:bg-gray-100"
              >
                <td className="py-3 text-center border-l border-gray-400">
                  {i + 1}
                </td>
                <td className="py-3 text-center border-l border-gray-400 border-r capitalize">
                  {val.dept_name}
                </td>
                <td className="py-3 text-center border-l border-r border-gray-400 capitalize">
                  {val.dept_location}
                </td>
                <td className="py-3 border-l  border-r border-gray-400  ">
                  <div className="flex justify-center gap-3">
                    <MdDelete
                      onClick={() => {
                        setWorkingId(val.dept_id);
                        setShowDelete(true);
                      }}
                      className="text-3xl   hover:scale-110 hover:text-red-500 transition-all delay-100 duration-300 cursor-pointer"
                    />
                    <Link
                      state={val}
                      className="text-3xl ml-2 hover:scale-110 hover:text-blue-500 transition-all delay-100 duration-300"
                      to={{
                        pathname: `/department/${val.dept_id}`,
                      }}
                    >
                      <MdOutlineUpdate className="text-3xl  cursor-pointer" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer className="mt-11 text-sm " />
    </div>
  );
};

export default ManageDept;
