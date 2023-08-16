import React, { useState, useEffect } from "react";
// import { MdOutlineCheck } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { get, update } from "../../../services/api";
import { Link } from "react-router-dom";

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
            request.leave_id === leaveRequestId
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
            request.leave_id === leaveRequestId
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
    <div className="my-10 md:mx-4 mx-2 ">
      <Link to="/leave/history">
        <div className="border-2 absolute right-4 top-[-1px] capitalize md:py-2 py-1  shadow-md md:px-4 px-1 md:text-xl text-sm font-bold  shadow-mainColor cursor-pointer rounded-md w-fit   mt-4 hover:bg-mainColor hover:text-white">
          Leave History
        </div>
      </Link>
      <h1 className="font-bold text-2xl mb-6">Pending Leave Request</h1>

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
            <th className="py-2 px-2 border-r border-b border-gray-400  hidden md:table-cell">
              End Date
            </th>
            <th className="py-2 px-2 border-r border-b border-gray-400  hidden sm:table-cell">
              Message
            </th>
            <th className="py-2 px-4 border-r border-b border-gray-400  hidden md:table-cell">
              Status
            </th>
            <th className="py-2 px-4 border-r border-b border-gray-400  ">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-center  border-2 border-gray-400">
          {fileterEmployee.map((request, i) => (
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
              <td className="px-2 h-32 border-gray-400 border-l border-r hidden sm:table-cell">
                <div className="line-clamp-6 text-justify">
                  {request.message}
                </div>
              </td>

              <td className="px-2 h-32 border-gray-400 border-l border-r">
                <div
                  className={`mx-4 outline-none w-fit border-l opacity- text-lg  text-center font-black capitalize ${
                    request.status === "rejected" && "bg-red-500 text-white"
                  } ${
                    request.status === "approved" && "bg-green-500 text-white"
                  }`}
                >
                  {" "}
                  {request.status}
                </div>
              </td>
              <td className="py-4 px-4 border-r border-b border-gray-400 ">
                {request.status === "pending" ? (
                  <div className="flex">
                    <button
                      onClick={() => handleApprove(request.leave_id)}
                      className="bg-green-500 hover:bg-green-600 text-white py-3 px-3  rounded mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(request.leave_id)}
                      className="bg-red-500 hover:bg-red-600 text-white  py-3 px-4 rounded "
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <div className="flex">
                    <button className="btn btn-disabled mr-3" disabled>
                      Approve
                    </button>
                    <button className="btn btn-disabled" disabled>
                      Reject
                    </button>
                  </div>
                )}
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
