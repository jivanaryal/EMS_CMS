import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { get, post } from "../../../services/api";
import { TbSelect } from "react-icons/tb";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
const FormFields = [
  {
    name: "emp_name",
    type: "select",
    options: [],
    icons: <TbSelect />,
  },
  {
    name: "email",
    type: "email",
    icons: <AiOutlineMail />,
  },
  {
    name: "password",
    type: "password",
    icons: <RiLockPasswordFill />,
  },
];

const CreateEmp = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    get("/employee")
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch employees:", error);
      });
  }, []);

  const postFormData = async (values) => {
    try {
      const response = await post(
        `/createemp/signup/${values.emp_name}`,
        values
      );

      if (response.status === 200) {
        toast.success("New employee created");
      } else {
        console.error("Failed to create employee.");
        toast.error("Failed to create employee.");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error("Employee with the same ID already exists.");
        toast.error("Employee with the same ID already exists.");
      } else {
        console.error("Error:", error);
        toast.error("An error occurred while creating employee.");
      }
    }
  };

  let initData = [
    {
      _id: "0",
      Section: "Choose Employee Name",
    },
  ];

  FormFields[0].options = [...employee];

  return (
    <div className="w-full px-6 sm:px-10 min-h-[90vh] flex justify-center items-center bg-opacity-10 bg-white">
      <Formik
        initialValues={{
          emp_name: "",
          email: "",
          password: "",
        }}
        // validationSchema={schema}
        onSubmit={(values) => {
          postFormData(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="">
            <div className="shadow-lg shadow-mainColor   bg-slate-100 w-[35rem]  rounded-lg   backdrop-filter  bg-opacity-50 border-2 border-gray-300 pt-10  p-10">
              <div className="grid grid-cols-1 gap-6">
                <p className="font-bold text-xl">Create Employee ID</p>
                {FormFields.map((val, i) => {
                  if (val.type === "select") {
                    return (
                      <div key={i} className="">
                        <label
                          htmlFor={val.name}
                          className="block font-bold mb-2"
                        >
                          {val.name}
                        </label>
                        <div className="name flex items-center bg-gray-300 border-2 border-gray-300">
                          <p className="icons p-2 text-lg">{val.icons}</p>
                          <Field
                            as={val.type}
                            placeholder={`enter ${val.name}`}
                            name={val.name}
                            className="outline-none py-2 w-full"
                          >
                            <option value="" selected disabled>
                              {initData[0].Section}
                            </option>
                            {val.options?.map((option, j) => {
                              return (
                                <option key={j} value={option.emp_id}>
                                  {option.first_name +
                                    " " +
                                    option.middle_name +
                                    " " +
                                    option.last_name}
                                </option>
                              );
                            })}
                          </Field>
                        </div>
                        <ErrorMessage
                          name={val.name}
                          component={"div"}
                          className="text-red-600"
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div key={i}>
                        <label
                          htmlFor={val.name}
                          className="block font-bold mb-2"
                        >
                          {val.name}
                        </label>
                        <div className="name flex items-center bg-gray-300 border-2 border-gray-300">
                          <p className="icons p-2 text-lg">{val.icons}</p>
                          <Field
                            type={val.type}
                            placeholder={`enter ${val.name}`}
                            name={val.name}
                            className=" outline-none py-2 px-1 w-full"
                          />
                        </div>
                        <ErrorMessage
                          name={val.name}
                          component={"div"}
                          className="text-red-600"
                        />
                      </div>
                    );
                  }
                })}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded "
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer className="mt-11 text-sm " />
    </div>
  );
};

export default CreateEmp;
