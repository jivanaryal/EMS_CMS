import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { get } from "../../../services/api";

const FormFields = [
  {
    name: "dept_name",
    type: "select",
    options: [],
  },
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
    name: "description",
    type: "text",
  },
];

const AddTask = () => {
  const [department, setDepartment] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [filteredEmployee, setFilteredEmployee] = useState([]);

  useEffect(() => {
    get("/department").then((res) => {
      if (res.status === 200) {
        setDepartment(res.data);
      }
    });
    get("/employee").then((res) => {
      setEmployee(res.data);
    });
  }, []);

  const handleChangeDept = (e, setFieldValue) => {
    const deptName = e.target.value;
    setFieldValue("dept_name", deptName); // Update the value of the "dept_name" field
    setFieldValue("emp_name", ""); // Reset the value of the "emp_name" field
    const filteredData = employee.filter((emp) => emp.dept_name === deptName);
    setFilteredEmployee(filteredData);
  };

  const handleChangeEmp = (e, setFieldValue) => {
    const empName = e.target.value;
    setFieldValue("emp_name", empName); // Update the value of the "emp_name" field
  };

  useEffect(() => {
    FormFields[1].options = filteredEmployee;
  }, [filteredEmployee]);

  FormFields[0].options = department;

  return (
    <div className="mt-20 px-20">
      <Formik
        initialValues={{
          dept_name: "",
          emp_name: "",
          description: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => {
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
                          as="select"
                          placeholder={`select ${val.name}`}
                          name={val.name}
                          onChange={
                            val.name === "dept_name"
                              ? (e) => handleChangeDept(e, setFieldValue)
                              : (e) => handleChangeEmp(e, setFieldValue)
                          }
                          className="border border-gray-400 p-2 rounded w-full"
                        >
                          <option
                            value=""
                            selected
                            disabled
                          >{`choose ${val.name}`}</option>
                          {val.options?.map((option, j) => {
                            if (val.name === "dept_name") {
                              return (
                                <option key={j} value={option.dept_name}>
                                  {option.dept_name}
                                </option>
                              );
                            } else if (val.name === "emp_name") {
                              return (
                                <option key={j} value={option.first_name}>
                                  {option.first_name} {option.middle_name}
                                  {option.last_name}
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
                          className="border border-gray-400 p-2 rounded w-full"
                        />
                      </div>
                    );
                  }
                })}
                <button type="submit">Submit</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddTask;
