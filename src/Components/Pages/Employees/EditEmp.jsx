import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import { get, post } from "../../../services/api";
import { useLocation } from "react-router";

// const schema = yup.object().shape({
//   section_name: yup.string().required("course  is required"),
//   subSection: yup.string().required("section  is required"),
// });

const FormFields = [
  {
    name: "dept_name",
    type: "select",
    options: [],
  },
  {
    name: "first_name",
    type: "text",
  },
  {
    name: "middle_name",
    type: "text",
  },
  {
    name: "last_name",
    type: "text",
  },
  {
    name: "salary",
    type: "text",
  },
  {
    name: "job",
    type: "text",
  },

  {
    name: "gender",
    type: "select",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "others", label: "Others" },
    ],
  },
];
const EditEmp = () => {
  const [employee, setEmployee] = useState([]);

  const location = useLocation();
  console.log(location.state.gender);

  useEffect(() => {
    get("/department").then((res) => {
      setEmployee(res.data);
    });
  }, []);

  let initData = [
    {
      _id: "0",
      Section: "Choose Department",
    },
  ];

  const postFormData = (val) => {
    post(`/employee/${val.dept_name}`, val).then((res) => {
      if (res.status === 200) {
        toast.success("the employee is added");
      }
    });
  };

  FormFields[0].options = [...employee];
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Edit Employee</h1>
      <div className="mt-20 px-20">
        <Formik
          initialValues={{
            dept_name: location.state.dept_name,
            job: location.state.job,
            salary: location.state.salary,
            first_name: location.state.first_name,
            middle_name: location.state.middle_name,
            gender: location.state.gender,
            last_name: location.state.last_name,
          }}
          // validationSchema={schema}
          onSubmit={(val) => {
            console.log(val);
            postFormData(val);
          }}
        >
          {({ handleSubmit, values }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  {FormFields.map((val, i) => {
                    console.log(val);
                    if (val.type === "select") {
                      return (
                        <div key={i}>
                          <label
                            htmlFor={val.name}
                            className="block font-bold mb-2"
                          >
                            {val.name}
                          </label>
                          <Field
                            as={val.type}
                            placeholder={`enter ${val.name}`}
                            name={val.name}
                            className="border border-gray-400 p-2 rounded w-full"
                          >
                            <option value="" selected disabled>
                              {initData[0].Section}
                            </option>
                            {val.options?.map((option, j) => {
                              console.log(option.gender, "hello");
                              if (val.name === "dept_name") {
                                return (
                                  <option value={option.dept_id} key={j}>
                                    {option.dept_name}
                                  </option>
                                );
                              } else {
                                return (
                                  <option value={option.value} key={j}>
                                    {option.label}
                                  </option>
                                );
                              }
                            })}
                          </Field>
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
                          <Field
                            type={val.type}
                            placeholder={`enter ${val.name}`}
                            name={val.name}
                            className="border border-gray-400 p-2 rounded w-full"
                          />
                          <ErrorMessage
                            name={val.name}
                            component={"div"}
                            className="text-red-600"
                          />
                        </div>
                      );
                    }
                  })}
                  <ToastContainer />
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded"
                >
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default EditEmp;
