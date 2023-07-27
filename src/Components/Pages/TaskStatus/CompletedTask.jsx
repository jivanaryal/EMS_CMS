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
    <div className="my-10 mx-10 shadow-sm  shadow-gray-400 p-4">
      <h1 className="font-bold text-xl mb-4">View Inprogress Task</h1>
      <table className="w-full">
        <thead className=" text-gray-600 uppercase border border-gray-400 text-md leading-normal bg-gray-300 ">
          <tr className="">
            <th className="py-3 text-start  px-6 border-r border-b border-gray-400">
              S.No
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              Assign To
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              Images
            </th>

            <th className="py-3 px-6 border-r border-b border-gray-400">
              Task Title
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              Assign Date
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              End Date
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              Status
            </th>

            <th className="py-3 px-6 border-r border-b border-gray-400">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-[15px] font-medium ">
          {fileterEmployee.map((val, i) => {
            return (
              <tr className="border-b border-r border-gray-400 hover:bg-gray-100">
                <td className="py-3 px-4 border-l text-center border-gray-400 ">
                  {i + 1}
                </td>
                <td className="py-3 px-4 border-l border-gray-400 text-center capitalize">
                  {val.emp_name}
                </td>
                <td className="py-3 px-4 border-l border-gray-400 text-center capitalize">
                  <img
                    src={`http://localhost:5000/${val.image}`}
                    alt=""
                    className="w-16 h-16 rounded-full"
                  />
                </td>
                <td className="py-3 px-4 border-gray-400 border-l text-center ">
                  {val.task_title}
                </td>
                <td className="py-3 px-4 border-l border-gray-400 text-center">
                  {val.task_assign_date}
                </td>
                <td className="py-3 px-4 border-l  border-gray-400 text-center">
                  {val.task_end_date}
                </td>
                <td className="py-3 px-4 border-l border-gray-400 capitalize text-center">
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
