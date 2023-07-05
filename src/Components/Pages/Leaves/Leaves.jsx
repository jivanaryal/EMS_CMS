import React, { useState } from "react";
// import AddEmployee from "./AddEmployee";
// import ManageEmp from "./ManageEmp";
import ViewLeaveRequest from "./ViewLeaveRequest";

const Employee = () => {
  const [Active, setActive] = useState("view");

  return (
    <div className="">
      <div className="flex pl-10 gap-4 justify-center"></div>

      {<ViewLeaveRequest />}
    </div>
  );
};

export default Employee;
