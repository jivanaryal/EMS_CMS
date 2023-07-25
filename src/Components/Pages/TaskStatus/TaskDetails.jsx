import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { get } from "../../../services/api";

const TaskDetails = () => {
  const [task, setTask] = useState([]);
  const [taskHistory, setTaskHistory] = useState([]);

  const id = localStorage.getItem("emp_id");

  useEffect(() => {
    get(`/task/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setTask(res.data);
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="my-10 mx-10 shadow-sm shadow-gray-400 p-4">
      <h1 className="font-bold text-xl mb-4">View Task Details</h1>
      <div className="container border-gray-300 border-2">
        <div className="nav font-extrabold text-xl border-gray-300 p-2 bg-gray-200 ">
          Task Details
        </div>
        {task.map((val, i) => {
          return (
            <div className="body border-gray-300 border-t-2 ">
              <div className=" border-b-2 border-gray-300  grid grid-cols-4 px-2 hover:bg-gray-100">
                <p className="font-semibold border-gray-300 border-r-2 w-full py-3">
                  Task Title
                </p>
                <p className="px-2 py-3">{val.task_title}</p>
              </div>
              <div className="desc px-2 grid grid-cols-4 border-b-2 border-gray-300  hover:bg-gray-100">
                <p className="font-semibold border-gray-300 border-r-2 py-3">
                  Task Priority
                </p>
                <p className="px-2 py-3">{val.task_priority}</p>
              </div>

              <div className="desc px-2 grid grid-cols-4 border-b-2 border-gray-300  hover:bg-gray-100">
                <p className="font-semibold border-gray-300 border-r-2 py-3">
                  Task Description
                </p>
                <p className="px-2 py-3">{val.task_description}</p>
              </div>
              <div className="assign px-2 grid grid-cols-4 border-b-2 border-gray-300  hover:bg-gray-100">
                <p className="font-semibold border-gray-300 border-r-2 py-3">
                  Task Assign Date
                </p>
                <p className="px-2 py-3">{val.task_assign_date}</p>
              </div>
              <div className="finish px-2 grid grid-cols-4 border-b-2 border-gray-300  hover:bg-gray-100">
                <p className="font-semibold border-gray-300 border-r-2 py-3">
                  Task Finish Date
                </p>
                <p className="px-2 py-3">{val.task_end_date}</p>
              </div>
              {/* remarks */}
              <div className="assign px-2 grid grid-cols-4  hover:bg-gray-100">
                <p className="font-semibold border-gray-300 border-r-2 py-3">
                  Employee Final Remarks
                </p>
                <p className="capitalize py-3">{val.emp_final_remark}</p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Task history */}
      <div className=" border-gray-300 border-2 mt-4">
        <p className="p-2 text-center font-bold text-lg"> Task History</p>
        <table className="w-full border-2 border-gray-200">
          <thead className=" bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 border-r border-b border-gray-200">
                SN.
              </th>
              <th className="py-3 text-start px-6 border-r border-b border-gray-200">
                Remarks
              </th>
              <th className="py-3 text-start px-6 border-r border-b border-gray-200">
                Status
              </th>
              <th className="py-3 text-start px-6 border-r border-b border-gray-200">
                Task Progess
              </th>
              <th className="py-3 text-start px-6 border-r border-b border-gray-200">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-md font-light">
            {taskHistory.map((val, i) => (
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-4 border-l border-r">{i + 1}</td>
                <td className="py-3 px-4 border-l border-r">
                  {val.emp_final_remark}
                </td>
                <td className="py-3 px-4 border-l border-r text-center">
                  {val.status}
                </td>
                <td className="py-3 px-4 border-l border-r">
                  <div className="relative h-2 w-48 bg-gray-200 rounded-full">
                    <div
                      className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                      style={{ width: `${val.task_complete}%` }}
                    ></div>
                  </div>
                </td>

                <td className="py-3 px-4 border-l border-r">{val.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn text-center mt-4 "></div>
    </div>
  );
};

export default TaskDetails;
