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
        remove(`/task/${id}`).then((res) => {
          if (res.status === 200) {
            setToggle(!toggle);
            toast.success("The Employee record is removed", {
              className: "custom-toast",
            });
          }
        });
      } catch (err) {
        if (err.response && err.response.status === 409) {
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

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const newCallBack = useCallback(() => {
    fetchData();
  }, []);

  const newData = useMemo(() => newCallBack(), [toggle]);

  // Get unique department names

  const success = () => {
    deleteItem(workingId);
  };

  const failure = () => {
    setShowDelete(false);
  };

  return (
    <div className="my-10 mx-2 ">
      {showDelete && (
        <DangerModal onClick={success} falseCondition={failure} name="task" />
      )}
      <h1 className="font-bold text-xl">Manage Task </h1>

      <table className="w-full rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-[#000000] uppercase text-sm leading-normal">
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
        <tbody className="text-gray-600 text-sm font-bold">
          {info.map((val, i) => (
            <tr
              key={i}
              className="py-3 text-center px-2 border-r border-b border-gray-400"
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
                      setWorkingId(val.emp_id);
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
