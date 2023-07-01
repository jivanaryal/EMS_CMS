import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import { get, post } from "../../../services/api";

// const schema = yup.object().shape({
//   section_name: yup.string().required("course  is required"),
//   subSection: yup.string().required("section  is required"),
// });
const schema = yup.object().shape({
  dept_name: yup.string().required("Select one department"),
  job: yup
    .string()
    .required("Required*")
    .max(15, "Character length should not exceed 15")
    .matches(/^[^0-9]+$/, "Only characters are allowed."),
  salary: yup
    .string()
    .required("Required*")
    .matches(/^[0-9]+$/, "Only numbers are allowed."),
  first_name: yup
    .string()
    .required("Required*")
    .max(15, "Character length should not exceed 15")
    .matches(/^[A-Za-z]+$/, "Only characters are allowed."),
  last_name: yup
    .string()
    .required("Required*")
    .max(15, "Character length should not exceed 15")
    .matches(/^[A-Za-z]+$/, "Only characters are allowed."),
});
const FormFields = [
  {
    name: "dept_name",
    name1: "department",
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
    name1: "gender",
    type: "select",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "others", label: "Others" },
    ],
  },
];
const AddSubSection = () => {
  const [employee, setEmployee] = useState([]);

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
    console.log(val);
    const selectedOption = FormFields[0].options.find(
      (option) => option.dept_name === val.dept_name
    );

    if (selectedOption) {
      const dept_id = selectedOption.dept_id;
      console.log(dept_id);

      const data = {
        dept_id: dept_id,
        dept_name: val.dept_name,
        job: val.job,
        salary: val.salary,
        first_name: val.first_name,
        middle_name: val.middle_name,
        gender: val.gender,
        last_name: val.last_name,
      };

      post(`/employee/${dept_id}`, data).then((res) => {
        if (res.status === 200) {
          toast.success("The employee is added");
        }
      });
    }
  };

  FormFields[0].options = [...employee];
  return (
    <div>
      <div className="mt-20 px-20">
        <Formik
          initialValues={{
            dept_name: "",
            job: "",
            salary: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            gender: "",
          }}
          validationSchema={schema}
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
                              {`select ${val.name1}`}
                            </option>
                            {val.options?.map((option, j) => {
                              if (val.name === "dept_name") {
                                return (
                                  <option
                                    key={j}
                                    value={option.dept_name}
                                    data-dept-id={option.dept_id}
                                  >
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

export default AddSubSection;
