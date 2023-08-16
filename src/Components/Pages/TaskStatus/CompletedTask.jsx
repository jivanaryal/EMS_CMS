import React, { useEffect, useState } from "react";
import { get } from "../../../services/api";
import { Link } from "react-router-dom";

const InProgressTask = () => {
  // const location = useLocation();
  const [task, setTask] = useState([]);
  // const id = localStorage.getItem("emp_id");
  console.log(task);
  useEffect(() => {
    get(`/task`)
      .then((res) => {
        if (res.status === 200) {
          setTask(res.data);
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.error(error); // Display the error in the console
      });
  }, []);

  const fileterEmployee = task.filter((val) => val.status === "completed");
  console.log(fileterEmployee);

  return (
    <div className="my-10 md:mx-10 mx-2 shadow-sm  shadow-gray-400 p-4">
      <h1 className="font-bold text-xl mb-4">View Completed Task</h1>
      <table className="table-auto w-full rounded-lg border-collapse border border-gray-400 shadow-lg bg-gradient-to-r from-[#c1d6eb] to-[#ebeaf0]">
        <thead className="  uppercase border border-gray-400 md:text-md text-xs leading-normal bg-mainColor text-white ">
          <tr className="">
            <th className="py-3 text-start   px-6 border-r border-b border-gray-400">
              S.No
            </th>
            <th className="py-3 px-2 border-r border-b border-gray-400">
              Assign To
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400 hidden md:table-cell">
              Images
            </th>

            <th className="py-3 px-6 border-r border-b border-gray-400 hidden md:table-cell">
              Task Title
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400 hidden lg:table-cell">
              Assign Date
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400 hidden md:table-cell">
              End Date
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400 hidden lg:table-cell">
              Task priority
            </th>

            <th className="py-3 px-6 border-r border-b border-gray-400">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-black md:text-[13px] text-xs font-medium ">
          {fileterEmployee.map((val, i) => {
            return (
              <tr className="border-b border-gray-400  hover:bg-gray-200 font-bold">
                <td className="py-3 px-4 border-l text-center border-gray-400 ">
                  {i + 1}
                </td>
                <td className="py-3 px-4 border-l border-gray-400 text-center capitalize">
                  {val.emp_name}
                </td>
                <td className="py-3 px-4 border-l border-gray-400 text-center capitalize hidden md:table-cell">
                  <img
                    src={`http://localhost:5000/${val.image}`}
                    alt=""
                    className="w-16 h-16 rounded-full"
                  />
                </td>
                <td className="py-3 px-4 border-gray-400 border-l text-center hidden md:table-cell ">
                  {val.task_title}
                </td>
                <td className="py-3 px-4 border-l border-gray-400 text-center hidden lg:table-cell">
                  {val.task_assign_date}
                </td>
                <td className="py-3 px-4 border-l  border-gray-400 text-center hidden md:table-cell">
                  {val.task_end_date}
                </td>
                <td className="py-3 px-4 border-l border-gray-400 capitalize text-center hidden lg:table-cell">
                  {val.task_priority}
                </td>
                <td className="py-3 px-4 border-l border-gray-400 text-center">
                  <Link to={`detail/${val.task_id}`} key={i} state={val}>
                    <div
                      className={`py-1 px-2 bg-mainColor font-medium text-white rounded-sm hover:bg-blue-700 `}
                    >
                      View
                    </div>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InProgressTask;
