import React, { useState, useCallback, useMemo } from "react";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { get, remove } from "../../../services/api";
import DangerModal from "../../UI/DangerModal";
import "react-toastify/dist/ReactToastify.css";

const ManageDept = () => {
  const [info, setInfo] = useState([]);
  // const navigate = useNavigate();
  const [toggle, setToggle] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [workingId, setWorkingId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await get("/department");
      console.log(res.data);
      setInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = (id) => {
    remove(`/department/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setToggle(!toggle);
          toast.success("The department is removed");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          toast.error("The department having foreign key");
        } else {
          toast.error("Failed to remove the department");
        }
        console.log(err.message);
      });
  };

  const success = () => {
    deleteItem(workingId);
  };

  const failure = () => {
    setShowDelete(false);
  };
  const newCallBack = useCallback(() => {
    fetchData();
  }, []);

  const newData = useMemo(() => newCallBack(), [toggle]);
  return (
    <div className="my-10 mx-10">
      {showDelete && (
        <DangerModal
          onClick={success}
          falseCondition={failure}
          name="department"
        />
      )}
      <h1 className="font-bold text-xl">Manage Department</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full rounded-lg border-collapse border border-gray-400 shadow-lg bg-gradient-to-r from-[#c1d6eb] to-[#ebeaf0]">
          <thead className="bg-gray-300 text-[#000000] uppercase text-lg leading-normal">
            <tr>
              <th className="py-3 text-center px-2 border-r border-b border-gray-400">
                S.No
              </th>
              <th className="py-3 px-1 border-r border-b border-gray-400">
                Department Name
              </th>
              <th className="py-3 px-2 border-r border-b border-gray-400">
                Location
              </th>

              <th className="py-3 px-2 border-r border-b border-gray-400">
                Delete
              </th>
              <th className="py-3 px-4 border-r border-b border-gray-400">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-md font-bold">
            {info.map((val, i) => (
              <tr
                key={i}
                className="border-b border-gray-400 hover:bg-gray-100"
              >
                <td className="py-3 text-center border-l border-gray-400">
                  {i + 1}
                </td>
                <td className="py-3 text-center border-l border-gray-400 border-r capitalize">
                  {val.dept_name}
                </td>
                <td className="py-3 text-center border-l border-r border-gray-400 capitalize">
                  {val.dept_location}
                </td>
                <td className="py-3 border-l border-r border-gray-400 ">
                  <MdDelete
                    onClick={() => {
                      setWorkingId(val.dept_id);
                      setShowDelete(true);
                    }}
                    className="text-3xl mx-auto  hover:scale-110 hover:text-red-500 transition-all delay-100 duration-300 cursor-pointer"
                  />
                </td>
                <td className="py-3 border-l border-r border-gray-400 ">
                  <Link
                    state={val}
                    className="text-3xl  hover:scale-110 hover:text-blue-500 transition-all delay-100 duration-300"
                    to={{
                      pathname: `/department/${val.dept_id}`,
                    }}
                  >
                    <MdOutlineUpdate className="text-3xl mx-auto cursor-pointer" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default ManageDept;
