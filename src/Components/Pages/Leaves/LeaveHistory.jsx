import React, { useState, useEffect } from "react";
// import { MdOutlineCheck } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { get, update } from "../../../services/api";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router";

const LeaveApprovalList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div className="my-10 mx-4">
      <div className="text-3xl ">
        <IoArrowBack onClick={() => handleGoBack()} />
      </div>
      <h1 className="font-bold text-2xl mb-6">Leave History</h1>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden lg:text-md md:text-sm">
        <thead className="bg-gray-200 text-gray-700 text-center text-lg">
          <tr>
            <th className="py-3 px-2  border-r border-b border-gray-400">ID</th>
            <th className="py-3 px-2  border-r border-b border-gray-400">
              Employee Name
            </th>
            <th className="py-3 px-2  border-r border-b border-gray-400">
              Image
            </th>
            <th className="py-3 px-2 border-r border-b border-gray-400">
              Start Date
            </th>
            <th className="py-3 px-2 border-r border-b border-gray-400">
              End Date
            </th>
            <th className="py-3 px-2 border-r border-b border-gray-400">
              Message
            </th>
            <th className="py-3 px-4 border-r border-b border-gray-400">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-center">
          {filteredEmployee.map((request) => (
            <tr
              key={request.emp_id}
              className="border-b border-gray-400  hover:bg-gray-200 font-bold"
              style={{
                background:
                  "linear-gradient(to right, #c1d6eb, #ccd9ec, #d6dce6, #e1e5ec, #ebeaf0)",
              }}
            >
              <td className="py-4 px-2 border-l border-r  border-gray-400">
                {request.emp_id}
              </td>
              <td className="py-4 px-2 border-l border-r  border-gray-400">
                {request.first_name}
                {request.middle_name}
                {request.last_name}
              </td>
              <td className="py-4 px-2 border-l border-r  border-gray-400">
                <img
                  src={`http://localhost:5000/${request.image}`}
                  alt=""
                  className="w-24 rounded-full h-24"
                />
              </td>
              <td className="py-4 px-2 border-l border-r  border-gray-400">
                {request.start_date}
              </td>
              <td className="py-4 px-2 border-l border-r  border-gray-400">
                {request.end_date}
              </td>
              <td className="px-4 h-40 border-gray-400 border-l border-r">
                <div className="line-clamp-6 text-justify">
                  {request.message}
                </div>
              </td>

              <td
                className={`py-4 px-2 border-l border-r border-gray-400 text-lg  text-center font-black capitalize ${
                  request.status === "rejected" && "text-red-700"
                } ${request.status === "approved" && "text-green-700"}`}
              >
                {request.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default LeaveApprovalList;
