import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { get, post, update } from "../../../services/api";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useParams } from "react-router";

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
    type: "text",
  },
  {
    name: "task_end_date",
    type: "date",
  },
];

const AddTask = () => {
  const [employee, setEmployee] = useState([]);
  const [task, setTask] = useState([]);
  const location = useLocation();
  const { id } = useParams();
  console.log(id);
  console.log(location.state);
  useEffect(() => {
    get("/employee")
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    get(`/task/${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setTask(res.data);
        }
      })
      .catch((error) => {
        console.error(error); // Display the error in the console
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

      console.log(task);

      const data = {
        emp_final_remark: task[0].emp_final_remark,
        task_complete: task[0].task_complete,
        status: task[0].status,
        emp_name: values.emp_name,
        task_assign_date: task[0].task_assign_date,
        task_end_date: values.task_end_date,
        task_priority: values.task_priority,
        task_description: values.task_description,
        task_title: task[0].task_title,
        emp_id: task[0].emp_id,
      };

      const task_id = task[0].task_id;
      console.log(task_id);

      update(`/task/${task_id}`, data)
        .then((res) => {
          if (res.status === 200) {
            toast.success("the task is assigned");
          }
        })
        .catch((err) => {
          console.log(err.message);
          toast.error("Failed to assign the task");
        });
    }
  };

  FormFields[0].options = [...employee];

  return (
    <div className="mt-10 px-20">
      <Formik
        initialValues={{
          emp_name: location.state.emp_name,
          task_priority: location.state.task_priority,
          task_title: location.state.task_title,
          task_description: location.state.task_description,
          task_end_date: location.state.task_end_date,
        }}
        onSubmit={(values) => {
          postFormData(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 w-7/12  gap-4">
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
                          as="select"
                          placeholder={`select ${val.name}`}
                          name={val.name}
                          className="border border-gray-400 p-1 rounded w-full"
                        >
                          <option
                            value=""
                            selected
                            disabled
                          >{`choose ${val.name}`}</option>
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
                        <Field
                          key={i}
                          type={val.type}
                          name={val.name}
                          placeholder={`enter ${val.name}`}
                          className="border border-gray-400 p-1 rounded w-full"
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
                className="bg-mainColor mb-5 w-fit  hover:bg-blue-700 text-white font-bold py-2 px-4  rounded"
              >
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddTask;
