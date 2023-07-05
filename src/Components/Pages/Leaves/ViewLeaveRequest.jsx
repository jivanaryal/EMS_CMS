import React, { useState, useEffect } from "react";
import { MdOutlineCheck } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { get, update } from "../../../services/api";

const LeaveApprovalList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  // Fetch the pending leave requests from the backend
  const fetchLeaveRequests = async () => {
    get("/leave").then((res) => {
      if (res.status === 200) {
        setLeaveRequests(res.data);
        console.log(res.data);
      }
    });
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleApprove = async (leaveRequestId) => {
    try {
      const response = await update(`/leave/approve/${leaveRequestId}`, {
        status: "approved",
      });

      if (response.status === 200) {
        // Update the leave request status in the UI
        setLeaveRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.emp_id === leaveRequestId
              ? { ...request, status: "approved" }
              : request
          )
        );
      } else {
        console.error("Failed to approve leave.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleReject = async (leaveRequestId) => {
    try {
      const response = await update(`/leave/approve/${leaveRequestId}`, {
        status: "rejected",
      });

      if (response.status === 200) {
        // Update the leave request status in the UI
        setLeaveRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.emp_id === leaveRequestId
              ? { ...request, status: "rejected" }
              : request
          )
        );
      } else {
        console.error("Failed to reject leave.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="my-10">
      <h1 className="font-bold text-2xl mb-6">Leave Approval List</h1>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700 text-center">
          <tr>
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">Employee Name</th>
            <th className="py-3 px-4">Department Name</th>
            <th className="py-3 px-4">Start Date</th>
            <th className="py-3 px-4">End Date</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-center">
          {leaveRequests.map((request) => (
            <tr key={request.emp_id} className="border-b">
              <td className="py-4 px-4">{request.emp_id}</td>
              <td className="py-4 px-4">
                {request.first_name}
                {request.middle_name}
                {request.last_name}
              </td>
              <td className="py-4 px-4">{request.dept_name}</td>
              <td className="py-4 px-4">{request.start_date}</td>
              <td className="py-4 px-4">{request.end_date}</td>
              <td className="py-4 px-4">{request.status}</td>
              <td className="py-4 px-4">
                {request.status === "pending" && (
                  <div>
                    <button
                      onClick={() => handleApprove(request.emp_id)}
                      className="text-green-500 pr-4 hover:text-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(request.emp_id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default LeaveApprovalList;
