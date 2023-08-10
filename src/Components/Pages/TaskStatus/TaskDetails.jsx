import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { get } from "../../../services/api";

const TaskDetails = () => {
  const [status, setStatus] = useState(false);
  const [task, setTask] = useState([]);
  const [taskHistory, setTaskHistory] = useState([]);
  const { id } = useParams();
  console.log(id);

  // const id = localStorage.getItem("emp_id");

  useEffect(() => {
    get(`/task/single/${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setTask(res.data);
          setStatus(res.data[0].status);
        }
      })
      .catch((error) => {
        console.error(error); // Display the error in the console
      });

    get(`/task_history/${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setTaskHistory(res.data);

          console.log(res.data[0].status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mt-10  md:mx-10 shadow-sm shadow-gray-400 p-4   ">
      <h1 className="font-bold text-xl mb-4">View Task Details</h1>
      <div className="container border-gray-400 border-2">
        <div className="nav font-extrabold text-xl border-gray-400 p-2  text-white bg-mainColor">
          Task Details
        </div>
        {task.map((val, i) => {
          return (
            <div className="body border-gray-400 border-t-2 md:text-sm text-[11px]  bg-gradient-to-r from-[#c1d6eb] to-[#ebeaf0] ">
              <div className=" border-b-2 border-gray-400  grid grid-cols-4 px-2 hover:bg-gray-100">
                <p className="font-semibold border-gray-400 border-r-2 w-full py-3  col-span-1">
                  Task Title
                </p>
                <p className="px-2 py-3 col-span-3">{val.task_title}</p>
              </div>
              <div className="desc px-2 grid grid-cols-4 border-b-2 border-gray-400  hover:bg-gray-100">
                <p className="font-semibold border-gray-400 border-r-2 py-3 col-span-1">
                  Task Priority
                </p>
                <p className="px-2 py-3 col-span-3">{val.task_priority}</p>
              </div>

              <div className="desc px-2 grid grid-cols-4 border-b-2 border-gray-400  hover:bg-gray-100">
                <p className="font-semibold border-gray-400 border-r-2 py-3 col-span-1">
                  Task Description
                </p>
                <p className="px-2 py-3 col-span-3">{val.task_description}</p>
              </div>
              <div className="assign px-2 grid grid-cols-4 border-b-2 border-gray-400  hover:bg-gray-100">
                <p className="font-semibold border-gray-400 border-r-2 py-3 col-span-1">
                  Task Assign Date
                </p>
                <p className="px-2 py-3 col-span-3">{val.task_assign_date}</p>
              </div>
              <div className="finish px-2 grid grid-cols-4 border-b-2 border-gray-400  hover:bg-gray-100">
                <p className="font-semibold border-gray-400 border-r-2 py-3">
                  Task Finish Date
                </p>
                <p className="px-2 py-3">{val.task_end_date}</p>
              </div>
              {/* remarks */}
            </div>
          );
        })}
      </div>
      {/* Task history */}
      <div className="border-gray-400 border-2 mt-4 overflow-x-auto">
        <p className="p-2 bg-mainColor text-white text-center font-bold md:text-lg text-base">
          Task History
        </p>
        <table className="w-full border-2 border-gray-400">
          <thead className="bg-gray-100 text-gray-600 uppercase md:text-sm text-[11px] leading-normal">
            <tr>
              <th className="py-3 px-6 border-r border-b border-gray-400">
                SN.
              </th>

              <th className="py-3 text-start px-6 border-r border-b border-gray-400">
                Status
              </th>
              <th className="py-3 text-start px-6 border-r border-b border-gray-400 hidden md:table-cell">
                Task Progess
              </th>
              <th className="py-3 text-start px-6 border-r border-b border-gray-400  hidden md:table-cell">
                Time
              </th>
              <th className="py-3 text-start px-6 border-r border-b border-gray-400">
                View
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800 md:text-md text-[10px] md:leading-4 leading-3  font-light  bg-gradient-to-r from-[#c1d6eb] to-[#ebeaf0]">
            {taskHistory.map((val, i) => (
              <tr className="border-b border-gray-400 hover:bg-gray-100">
                <td className="py-3 px-4 border-l border-r border-gray-400">
                  {i + 1}
                </td>

                <td className="py-3 px-4 border-l border-r border-gray-400 text-center">
                  {val.status}
                </td>
                <td className="py-3 px-4 border-l border-r border-gray-400 hidden md:table-cell">
                  <div className="relative h-2 w-48 bg-gray-200 rounded-full">
                    <div
                      className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                      style={{ width: `${val.task_complete}%` }}
                    ></div>
                  </div>
                </td>

                <td className="py-3 px-4 border-l border-r border-gray-400 hidden md:table-cell">
                  {val.time}
                </td>
                <td className="py-3 px-4 border-l border-r border-gray-400">
                  <Link to={`/single/th/${val.th_id}`}>
                    <button>view here</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskDetails;
