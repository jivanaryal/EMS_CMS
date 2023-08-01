import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { get, post } from "../../../services/api";
import { toast, ToastContainer } from "react-toastify";

const FormFields = [
  {
    name: "emp_name",
    type: "select",
    options: [],
  },
  {
    name: "task_priority",
    type: "select",
    options: [
      { value: "normal", label: "Normal" },
      { value: "medium", label: "Medium" },
      { value: "urgent", label: "Urgent" },
      { value: "most_urgent", label: "Most Urgent" },
    ],
  },
  {
    name: "task_title",
    type: "text",
  },
  {
    name: "task_description",
    type: "textarea",
  },
  {
    name: "task_end_date",
    type: "date",
  },
];

const AddTask = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    get("/employee")
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const postFormData = (values) => {
    console.log(values);
    console.log();
    console.log(values.first_name);
    const selectedOption = FormFields[0].options.find(
      (option) =>
        option.first_name +
          " " +
          option.middle_name +
          " " +
          option.last_name ===
        values.emp_name
    );
    console.log(selectedOption);

    if (selectedOption) {
      const emp_id = selectedOption.emp_id;
      console.log(emp_id);

      post(`/task/${emp_id}`, values)
        .then((res) => {
          if (res.status === 200) {
            toast.success("The task is assigned");
          }
        })
        .catch((err) => {
          console.log(err.message);
          if (err.response && err.response.data && err.response.data.error) {
            toast.error(err.response.data.error);
          } else {
            toast.error("Failed to assign the task");
          }
        });
    }
  };

  FormFields[0].options = [...employee];

  return (
    <div className="mt-10 px-20 ">
      <Formik
        initialValues={{
          emp_name: "",
          task_priority: "",
          task_title: "",
          task_description: "",
          task_end_date: "",
        }}
        onSubmit={(values) => {
          postFormData(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className="shadow-2xl shadow-gray-400 px-4  w-7/12">
                <div className="grid grid-cols-1 w-full mb-3 gap-3">
                  {FormFields.map((val, i) => {
                    if (val.type === "select") {
                      return (
                        <div key={i}>
                          <label
                            htmlFor={val.name}
                            className="block font-bold mb-1"
                          >
                            {val.name}
                          </label>
                          <Field
                            as="select"
                            placeholder={`select ${val.name}`}
                            name={val.name}
                            className="border border-gray-400 p-1 rounded w-full"
                          >
                            <option
                              value=""
                              selected
                              disabled
                            >{`Choose ${val.name}`}</option>
                            {val.options?.map((option, j) => {
                              if (val.name === "emp_name") {
                                return (
                                  <option
                                    key={j}
                                    value={`${option.first_name} ${option.middle_name} ${option.last_name}`}
                                  >
                                    {`${option.first_name} ${option.middle_name} ${option.last_name}`}
                                  </option>
                                );
                              } else {
                                return (
                                  <option key={j} value={option.value}>
                                    {option.label}
                                  </option>
                                );
                              }
                            })}
                          </Field>
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
                          {val.name === "task_description" ? (
                            <Field
                              as="textarea" // Use a textarea element for the "message" field
                              type={val.type}
                              name={val.name}
                              className="border border-gray-400 rounded-md py-2 px-3 w-full resize-none h-24 " // Customize the width and height here
                              placeholder={`Enter ${val.name}`}
                            />
                          ) : (
                            <Field
                              type={val.type}
                              name={val.name}
                              className="border border-gray-400 rounded-md py-2 px-3 w-full"
                              placeholder={`Enter ${val.name}`}
                            />
                          )}
                          <ErrorMessage
                            name={val.name}
                            component={"div"}
                            className="text-red-600"
                          />
                        </div>
                      );
                    }
                  })}
                  <ToastContainer className="mt-11 text-sm " />
                </div>
                <button
                  type="submit"
                  className="bg-mainColor mb-5 w-fit  hover:bg-blue-700 text-white font-bold py-2 px-4  rounded"
                >
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddTask;
