import React, { useState, useEffect } from "react";
// import { MdOutlineCheck } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { get, update } from "../../../services/api";

const LeaveApprovalList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

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
              ? { ...request, status: "Approved" }
              : request
          )
        );
        toast.success("Leave request approved.");
      } else {
        console.error("Failed to approve leave.");
        toast.error("Failed to approve leave.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while approving leave.");
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
              ? { ...request, status: "Rejected" }
              : request
          )
        );
        toast.success("Leave request rejected.");
      } else {
        console.error("Failed to reject leave.");
        toast.error("Failed to reject leave.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while rejecting leave.");
    }
  };

  const fileterEmployee = leaveRequests.filter(
    (val) => val.status === "pending"
  );

  return (
    <div className="my-10">
      <h1 className="font-bold text-2xl mb-6">Leave Approval List</h1>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden lg:text-md md:text-sm">
        <thead className="bg-gray-200 text-gray-700 text-center">
          <tr>
            <th className="py-3 px-4 border-r-2 border-gray-300">ID</th>
            <th className="py-3 px-4 border-r-2 border-gray-300">
              Employee Name
            </th>
            <th className="py-3 px-4 border-r-2 border-gray-300">Image</th>
            <th className="py-3 px-4 border-r-2 border-gray-300">Start Date</th>
            <th className="py-3 px-4 border-r-2 border-gray-300">End Date</th>
            <th className="py-3 px-4 border-r-2 border-gray-300">Message</th>
            <th className="py-3 px-4 border-r-2 border-gray-300">Status</th>
            <th className="py-3 px-4 border-r-2 border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-center">
          {fileterEmployee.map((request) => (
            <tr key={request.emp_id} className="border-b">
              <td className="py-4 px-4 border-r-2 border-gray-300">
                {request.emp_id}
              </td>
              <td className="py-4 px-4 border-r-2 border-gray-300">
                {request.first_name}
                {request.middle_name}
                {request.last_name}
              </td>
              <td className="py-4 px-4 border-r-2 border-gray-300">
                <img
                  src={`http://192.168.18.7:5000/${request.image}`}
                  alt=""
                  className="w-24 rounded-full h-24"
                />
              </td>
              <td className="py-4 px-4 border-r-2 border-gray-300">
                {request.start_date}
              </td>
              <td className="py-4 px-4 border-r-2 border-gray-300">
                {request.end_date}
              </td>
              <td className="w-56 h-40 border-r-2 border-gray-300">
                <div className="line-clamp-6 text-justify px-2 ">
                  {request.message}
                </div>
              </td>

              <td className="py-4 px-4 border-r-2 border-gray-300">
                {request.status}
              </td>
              <td className="py-4 px-4 ">
                {request.status === "pending" ? (
                  <div className="flex">
                    <button
                      onClick={() => handleApprove(request.emp_id)}
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2  md:px-1 md:py-1 md:text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(request.emp_id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded  md:px-1 md:py-1 md:text-sm "
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <div className="flex">
                    <button
                      disabled
                      className="bg-green-300 text-gray-600 py-2 px-4 rounded mr-2 cursor-not-allowed md:px-1 md:py-1 md:text-sm"
                    >
                      Approve
                    </button>
                    <button
                      disabled
                      className="bg-red-300 text-gray-600 py-2 px-4 rounded cursor-not-allowed md:px-1 md:py-1 md:text-md md:text-sm"
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
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default LeaveApprovalList;
