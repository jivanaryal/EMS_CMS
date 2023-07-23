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

  const fileterEmployee = leaveRequests.filter(
    (val) => val.status === "rejected" || "approved"
  );

  console.log(fileterEmployee);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="my-10">
      <div className="text-3xl">
        <IoArrowBack onClick={() => handleGoBack()} />
      </div>
      <h1 className="font-bold text-2xl mb-6">Leave History</h1>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden lg:text-md md:text-sm">
        <thead className="bg-gray-200 text-gray-700 text-center text-lg">
          <tr>
            <th className="py-3 px-2  border-r border-b border-gray-200">ID</th>
            <th className="py-3 px-2  border-r border-b border-gray-200">
              Employee Name
            </th>
            <th className="py-3 px-2  border-r border-b border-gray-200">
              Image
            </th>
            <th className="py-3 px-2 border-r border-b border-gray-200">
              Start Date
            </th>
            <th className="py-3 px-2 border-r border-b border-gray-200">
              End Date
            </th>
            <th className="py-3 px-2 border-r border-b border-gray-200">
              Message
            </th>
            <th className="py-3 px-2 border-r border-b border-gray-200">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-center">
          {fileterEmployee.map((request) => (
            <tr key={request.emp_id} className="border-b font-bold">
              <td className="py-4 px-2 border-l border-r">{request.emp_id}</td>
              <td className="py-4 px-2 border-l border-r">
                {request.first_name}
                {request.middle_name}
                {request.last_name}
              </td>
              <td className="py-4 px-2 border-l border-r">
                <img
                  src={`http://localhost:5000/${request.image}`}
                  alt=""
                  className="w-24 rounded-full h-24"
                />
              </td>
              <td className="py-4 px-2 border-l border-r">
                {request.start_date}
              </td>
              <td className="py-4 px-2 border-l border-r">
                {request.end_date}
              </td>
              <td className="px-4 h-40">
                <div className="line-clamp-6 text-justify">
                  {request.message}
                </div>
              </td>

              <td className="py-2 px-2 border-l border-r">{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default LeaveApprovalList;
