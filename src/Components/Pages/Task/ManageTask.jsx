import React, { useState, useEffect, useCallback, useMemo } from "react";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { get, remove } from "../../../services/api";
import DangerModal from "../../UI/DangerModal";
import "react-toastify/dist/ReactToastify.css";
import { BsEyeFill } from "react-icons/bs";

const ManageTask = () => {
  const [info, setInfo] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [toggle, setToggle] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [workingId, setWorkingId] = useState(null);
  const [dataLimit, setDataLimit] = useState(10);

  const fetchData = useCallback(async () => {
    try {
      const res = await get("/task");
      if (res.status === 200) {
        setInfo(res.data);
      } else {
        console.log("The data is not fetched");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const deleteItem = useCallback(
    (id) => {
      try {
        remove(`/task/${id}`)
          .then((res) => {
            if (res.status === 200) {
              setToggle(!toggle);
              toast.success("The Employee record is removed", {
                className: "custom-toast",
              });
            }
          })
          .catch((err) => {
            if (err.response && err.response.status === 409) {
              toast.error(
                "Cannot delete the record as it is referenced by other records"
              );
            }
          });
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 409) {
          console.log(err.response.message);
          toast.error(
            "Cannot delete the record as it is referenced by other records."
          );
        } else {
          toast.error("Failed to remove the employee");
        }
      }
    },
    [toggle]
  );

  const success = () => {
    deleteItem(workingId);
  };

  const failure = () => {
    setShowDelete(false);
  };

  const handleDataLimitChange = (event) => {
    setDataLimit(parseInt(event.target.value, 10));
  };

  const limitedData = useMemo(
    () => info.slice(0, dataLimit),
    [info, dataLimit]
  );

  useEffect(() => {
    fetchData();
  }, [toggle]);

  return (
    <div className="my-10 mx-2 ">
      {showDelete && (
        <DangerModal onClick={success} falseCondition={failure} name="task" />
      )}
      <h1 className="font-bold text-xl">Manage Task </h1>

      <div className="my-4">
        <label className="mr-2">Show Entries:</label>
        <div className="relative inline-block">
          <select
            value={dataLimit}
            onChange={handleDataLimitChange}
            className="border text-black border-gray-400 w-28 focus:outline-none focus:ring focus:border-blue-300 focus:bg-blue-50 transition-all duration-300 rounded px-2 py-1 appearance-none bg-white pr-8"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            {/* Add more options based on your requirement */}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <table className="table-auto w-full rounded-lg border-collapse border border-gray-400 shadow-lg bg-gradient-to-r from-[#c1d6eb] to-[#ebeaf0]">
        <thead className="bg-gray-300 text-[#000000] uppercase text-base leading-normal">
          <tr>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              S.No
            </th>
            <th className="py-3 px-1 border-r border-b border-gray-400">
              Employee Name
            </th>
            <th className="border-gray-400 py-3 px-6 border-r border-b">
              Images
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              Task Title
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              Status
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-400">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-black text-sm font-bold">
          {limitedData.map((val, i) => (
            <tr
              key={i}
              className="border-b border-gray-400  hover:bg-gray-200 font-bold"
            >
              <td className="py-3 px-4 border-l text-center">{i + 1}</td>
              <td className="py-3 px-4 border-l border-r border-gray-400">
                {val.emp_name}
              </td>
              <td className="py-3 px-4  border-l border-r border-gray-400">
                <div className="h-28 w-28  rounded-full">
                  <img
                    src={`http://localhost:5000/${val.image}`}
                    className="object-cover rounded-full w-full h-full"
                    alt="Course"
                  />
                </div>
              </td>
              <td className="py-3 px-4 border-l border-r border-gray-400">
                {val.task_title}
              </td>
              <td className="py-3 px-4 border-l border-r border-gray-400">
                {val.status}
              </td>
              <td className=" border-l border-r border-gray-400  ">
                <div className="flex justify-center gap-2">
                  <MdDelete
                    onClick={() => {
                      setWorkingId(val.task_id);
                      setShowDelete(true);
                    }}
                    className="text-3xl  hover:scale-110 hover:text-red-500 transition-all delay-100 duration-300"
                  />
                  <Link
                    state={val}
                    className="hover:scale-110   transition-all delay-100 duration-300 hover:text-blue-500"
                    to={{
                      pathname: `/task/${val.task_id}`,
                    }}
                  >
                    <MdOutlineUpdate className="text-3xl" />
                  </Link>
                  <Link
                    state={val}
                    className="hover:scale-110   transition-all delay-100 duration-300 hover:text-green-500"
                    to={{
                      pathname: `/taskstatus/detail/${val.task_id}`,
                    }}
                  >
                    <BsEyeFill className="text-3xl" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default ManageTask;
