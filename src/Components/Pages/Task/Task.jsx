import React, { useState } from "react";
import AddTask from "./AddTask";
import ManageTask from "./ManageTask";

const Department = () => {
  const [Active, setActive] = useState("add");
  const data = [
    {
      id: "add",
      name: "Assign Task",
    },
    {
      id: "view",
      name: " Task History",
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
                className={`border-2 capitalize py-1 px-4 text-xl shadow-md shadow-gray-700  cursor-pointer rounded-md w-fit   mt-4
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

      {Active === "add" ? <AddTask /> : <ManageTask />}
    </div>
  );
};

export default Department;
