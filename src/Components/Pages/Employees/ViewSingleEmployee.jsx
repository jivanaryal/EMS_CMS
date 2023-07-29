import React, { useEffect, useState } from "react";
import { get } from "../../../services/api";
import { useParams } from "react-router";

const ViewSingleEmployee = () => {
  const [singleEmployee, setSingleEmployee] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    get(`/employee/${id}`)
      .then((res) => {
        setSingleEmployee(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[90vh]  bg-gradient-to-r from-[#c1d6eb] to-[#ebeaf0]">
      <div className="bg-white w-96 capitalize rounded-lg p-8 shadow-md border border-gray-300">
        {singleEmployee.map((val) => (
          <div key={val.id}>
            <div className="text-center mb-4">
              <img
                src={`http://localhost:5000/${val.image}`}
                alt=""
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg mx-auto"
              />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-blue-500 text-center">
              Employee Details
            </h1>
            <div className="text-lg mb-2">
              <span className="font-semibold text-gray-600">Employee Id:</span>{" "}
              {val.emp_id}
            </div>
            <div className="text-lg mb-2">
              <span className="font-semibold text-gray-600">Name:</span>{" "}
              {val.first_name} {val.middle_name} {val.last_name}
            </div>
            <div className="text-lg mb-2">
              <span className="font-semibold text-gray-600">Department:</span>{" "}
              {val.dept_name}
            </div>
            <div className="text-lg mb-2">
              <span className="font-semibold text-gray-600">Gender:</span>{" "}
              {val.gender}
            </div>
            <div className="text-lg">
              <span className="font-semibold text-gray-600">Salary:</span> $
              {val.salary}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSingleEmployee;
