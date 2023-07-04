import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { get, post } from "../../../services/api";
import * as yup from "yup";

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
  middle_name: yup
    .string()
    .max(15, "Character length should not exceed 15")
    .matches(/^[^0-9]+$/, "Only characters are allowed."),
  last_name: yup
    .string()
    .required("Required*")
    .max(15, "Character length should not exceed 15")
    .matches(/^[A-Za-z]+$/, "Only characters are allowed."),
  gender: yup.string().required("Select Gender"),
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
  {
    name: "image",
    type: "file",
  },
];
const AddSubSection = () => {
  const [employee, setEmployee] = useState([]);
  const [first, setFirst] = useState("");
  const [newImg, setNewImg] = useState("");

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

  const handleChange = (e) => {
    console.log(e.target.files);
    setFirst(e.target.files);
    setNewImg(e.target.files[0]);
  };

  const postFormData = (val) => {
    console.log(val);
    const selectedOption = FormFields[0].options.find(
      (option) => option.dept_name === val.dept_name
    );

    if (selectedOption) {
      const dept_id = selectedOption.dept_id;
      console.log(dept_id);

      // const data = {
      //   dept_id: dept_id,
      //   dept_name: val.dept_name,
      //   job: val.job,
      //   salary: val.salary,
      //   first_name: val.first_name,
      //   middle_name: val.middle_name,
      //   gender: val.gender,
      //   last_name: val.last_name,
      // };

      const formData = new FormData();
      formData.append("dept_id", val.dept_id);
      formData.append("dept_name", val.dept_name);
      formData.append("job", val.job);
      formData.append("salary", val.salary);
      formData.append("first_name", val.first_name);
      formData.append("middle_name", val.middle_name);
      formData.append("last_name", val.last_name);
      formData.append("gender", val.gender);
      formData.append("file", first[0]);

      post(`/employee/${dept_id}`, formData).then((res) => {
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
            image: [],
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
                    } else if (val.type === "file") {
                      return (
                        <div>
                          <label htmlFor={val.type} className="block font-bold">
                            {val.name}
                          </label>
                          <br />
                          <div className="flex">
                            <input
                              type={val.type}
                              name={val.name}
                              accept=".png,.jpg,.jpeg,.gif"
                              required
                              multiple
                              onChange={(e) => handleChange(e)}
                            />
                            <img
                              src={
                                newImg
                                  ? URL.createObjectURL(newImg)
                                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Employeval.svg/1687px-Employeval.svg.png"
                              }
                              className="w-40 relative right-5 bottom-14"
                              alt="preview"
                            />
                          </div>
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
                  <ToastContainer position="bottom-right" />
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 mb-5 relative  hover:bg-blue-700 text-white font-bold py-2 px-4  rounded"
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
