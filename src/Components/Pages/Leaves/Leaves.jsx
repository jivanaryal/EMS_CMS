import React from "react";
// import AddEmployee from "./AddEmployee";
// import ManageEmp from "./ManageEmp";
import ViewLeaveRequest from "./ViewLeaveRequest";

const Employee = () => {
  return (
    <div className="min-h-screen px-4">
      <div className="flex pl-10 gap-4 justify-center"></div>

      {<ViewLeaveRequest />}
    </div>
  );
};

export default Employee;
