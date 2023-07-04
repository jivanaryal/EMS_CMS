import React, { useState } from "react";
import AddEmployee from "./AddEmployee";
import ManageEmp from "./ManageEmp";

const Employee = () => {
  const [Active, setActive] = useState("view");
  const data = [
    {
      id: "add",
      name: "Add Emp",
    },
    {
      id: "view",
      name: "Manage Emp",
    },
  ];

  return (
    <div className="">
      <div className="flex pl-10 gap-4 justify-center">
        {data.map((val, i) => {
          return (
            <div key={i}>
              <div
                onClick={() => setActive(val.id)}
                className={`border-2 capitalize py-1 px-4 text-xl cursor-pointer rounded-md w-fit   mt-4
                                    ${
                                      val.id === Active
                                        ? "bg-mainColor  text-[#ffffff] scale-110"
                                        : "bg-secondColor"
                                    }`}
              >
                {val.name}
              </div>
            </div>
          );
        })}
      </div>

      {Active === "add" ? <AddEmployee /> : <ManageEmp />}
    </div>
  );
};

export default Employee;
