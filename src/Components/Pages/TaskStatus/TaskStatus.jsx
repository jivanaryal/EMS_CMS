import React, { useState } from "react";
import CompletedTask from "./CompletedTask";
import InProgressTask from "./InProgressTask";

const Employee = () => {
  const [Active, setActive] = useState("view");
  const data = [
    {
      id: "add",
      name: "completed task",
    },
    {
      id: "view",
      name: "InComplete task",
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
                className={`border-2 capitalize py-1 px-4 shadow-md shadow-gray-700   text-xl cursor-pointer rounded-md w-fit   mt-4
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

      {Active === "add" ? <CompletedTask /> : <InProgressTask />}
    </div>
  );
};

export default Employee;
