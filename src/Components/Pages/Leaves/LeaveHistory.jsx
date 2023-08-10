import React, { useState, useEffect, useMemo } from "react";
// import { MdOutlineCheck } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { get, update } from "../../../services/api";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router";

const LeaveApprovalList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const navigate = useNavigate();
  const [dataLimit, setDataLimit] = useState(10);

  // Fetch the pending leave requests from the backend
  const fetchLeaveRequests = async () => {
    try {
      const response = await get("/leave");

      if (response.status === 200) {
        setLeaveRequests(response.data);
        console.log(response.data);
      } else {
        console.error("Failed to fetch leave requests.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const filteredEmployee = leaveRequests.filter(
    (val) => val.status === "rejected" || val.status === "approved"
  );

  console.log(filteredEmployee);

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleDataLimitChange = (event) => {
    setDataLimit(parseInt(event.target.value, 10));
  };

  const limitedData = useMemo(
    () => filteredEmployee.slice(0, dataLimit),
    [leaveRequests, dataLimit]
  );

  return (
    <div className="my-10 md:mx-4 mx-2 ">
      <div className="text-3xl cursor-pointer">
        <IoArrowBack onClick={() => handleGoBack()} />
      </div>
      <h1 className="font-bold text-2xl mb-6">Leave History</h1>
      <div className="my-4">
        <label className="mr-2">Show Entries:</label>
        <div className="relative inline-block">
          <select
            value={dataLimit}
            onChange={handleDataLimitChange}
            className="border text-black border-gray-400 w-28 focus:outline-none focus:ring focus:border-blue-300 focus:bg-blue-50 transition-all duration-300 rounded px-2 py-1 appearance-none bg-white pr-8"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            {/* Add more options based on your requirement */}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <table
        className="table-auto w-full rounded-lg border-collapse border border-gray-400 shadow-lg bg-gradient-to-r from-[#c1d6eb] to-[#ebeaf0]"
        style={{
          background:
            "linear-gradient(to right, #c1d6eb, #ccd9ec, #d6dce6, #e1e5ec, #ebeaf0)",
        }}
      >
        <thead className="bg-mainColor text-white uppercase md:text-base text-[10px] leading-normal border-gray-400 border-2">
          <tr>
            <th className="py-2 px-2  border-r border-b border-gray-400">
              S. No
            </th>
            <th className="py-2 px-2  border-r border-b border-gray-400">
              Employee Name
            </th>
            <th className="py-2 px-2  border-r border-b border-gray-400  hidden md:table-cell">
              Image
            </th>
            <th className="py-2 px-2 border-r border-b border-gray-400  hidden md:table-cell">
              Start Date
            </th>
            <th className="py-2 px-2 border-r border-b border-gray-400  hidden sm:table-cell">
              End Date
            </th>
            <th className="py-2 px-2 border-r border-b border-gray-400  hidden md:table-cell">
              Message
            </th>
            <th className="py-2 px-4 border-r border-b border-gray-400  ">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-center md:text-base text-xs border-2 border-gray-400">
          {limitedData.map((request, i) => (
            <tr
              key={request.leave_id}
              className="border-b border-gray-400  hover:bg-gray-200 font-bold"
            >
              <td className="py-4 px-2 border-l border-r  border-gray-400">
                {i + 1}
              </td>
              <td className="py-4 px-2 border-l border-r  border-gray-400">
                {request.first_name}
                {request.middle_name}
                {request.last_name}
              </td>
              <td className="py-4 px-2 border-l border-r  border-gray-400 hidden md:table-cell">
                <img
                  src={`http://localhost:5000/${request.image}`}
                  alt=""
                  className="w-24 rounded-full h-24"
                />
              </td>
              <td className="py-4 px-2 border-l border-r  border-gray-400 hidden md:table-cell">
                {request.start_date}
              </td>
              <td className="py-4 px-2 border-l border-r  border-gray-400 hidden sm:table-cell">
                {request.end_date}
              </td>
              <td className="px-2 h-32 border-gray-400 border-l border-r hidden md:table-cell">
                <div className="line-clamp-6 text-justify">
                  {request.message}
                </div>
              </td>

              <td className="pl-4">
                <div
                  className={` px-1 outline-none w-fit border-l bg-opacity-750 text-white md:text-lg  text-center font-black capitalize ${
                    request.status === "rejected" && "bg-red-500 text-white"
                  } ${
                    request.status === "approved" && "bg-green-500 text-white"
                  }`}
                >
                  {" "}
                  {request.status}
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

export default LeaveApprovalList;
