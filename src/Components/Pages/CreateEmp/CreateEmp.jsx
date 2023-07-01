import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import axios from "axios";
import { get, post } from "../../../services/api";
// import axios from "axios";

// const schema = yup.object().shape({
//   dept_name: yup.string().required("The name is required"),
//   dept_location: yup.string().required("The name is required"),
// });
const FormFields = [
  {
    name: "emp_name",
    type: "select",
    options: [],
  },
  {
    name: "email",
    type: "email",
  },
  {
    name: "password",
    type: "password",
  },
];

const CreateEmp = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    get("/employee").then((res) => {
      setEmployee(res.data);
    });
  }, []);

  const postFormData = async (value) => {
    console.log(value.emp_name);
    post(`/createemp/${value.emp_name}`, value).then((res) => {
      toast.success("the department is added");
    });
  };

  let initData = [
    {
      _id: "0",
      Section: "Choose Employee Name",
    },
  ];

  FormFields[0].options = [...employee];

  return (
    <div className="w-full px-6 sm:px-10">
      <Formik
        initialValues={{
          emp_name: "",
          email: "",
          password: "",
        }}
        // validationSchema={schema}
        onSubmit={(values) => {
          postFormData(values);
          console.log(values);
          toast.success("Form submitted successfully!");
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              {FormFields.map((val, i) => {
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
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default CreateEmp;
