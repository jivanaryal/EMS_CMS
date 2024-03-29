import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { get, post } from "../../../services/api";
import * as yup from "yup";

const schema = yup.object().shape({
  dept_name: yup.string().required("Select one department"),
  position: yup
    .string()
    .required("Required*")
    .max(30, "Character length should not exceed 15")
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
  // image:yup.string().required("the image is required");
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
    name: "position",
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
  // const [newImg, setNewImg] = useState("");

  useEffect(() => {
    get("/department")
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    console.log(e.target.files);
    setFirst(e.target.files[0]);
    // setNewImg(e.target.files[0]);
  };

  const postFormData = (val, formikBag) => {
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
      //   post: val.post,
      //   salary: val.salary,
      //   first_name: val.first_name,
      //   middle_name: val.middle_name,
      //   gender: val.gender,
      //   last_name: val.last_name,
      // };

      const formData = new FormData();
      formData.append("dept_id", dept_id);
      formData.append("dept_name", val.dept_name);
      formData.append("position", val.position);
      formData.append("salary", val.salary);
      formData.append("first_name", val.first_name);
      formData.append("middle_name", val.middle_name);
      formData.append("last_name", val.last_name);
      formData.append("gender", val.gender);
      formData.append("file", first);

      post(`/employee/${dept_id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            toast.success("The employee is added");
            formikBag.resetForm();
          }
        })
        .catch((err) => [console.log(err)]);
    }
  };

  FormFields[0].options = [...employee];
  return (
    <div>
      <div className="mt-20 md:px-20">
        <Formik
          initialValues={{
            dept_name: "",
            position: "",
            salary: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            image: [],
          }}
          validationSchema={schema}
          onSubmit={(val, formikBag) => {
            console.log(val);
            postFormData(val, formikBag);
          }}
        >
          {({ handleSubmit, values }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <div className="shadow-2xl md:shadow-none shadow-gray-400 md:w-full w-full p-2">
                  <div className="grid md:grid-cols-2 grid-cols-1  gap-6">
                    {FormFields.map((val, i) => {
                      if (val.type === "select") {
                        return (
                          <div key={i}>
                            <label
                              htmlFor={val.name}
                              className="block font-bold mb-2 text-sm md:text-base"
                            >
                              {val.name}
                            </label>
                            <Field
                              as={val.type}
                              placeholder={`enter ${val.name}`}
                              name={val.name}
                              className="border border-gray-400 md:p-2 p-1 rounded w-full md:text-base text-sm"
                            >
                              <option
                                value=""
                                selected
                                disabled
                                className="block font-bold mb-2 text-sm md:text-base"
                              >
                                {`select ${val.name1}`}
                              </option>
                              {val.options?.map((option, j) => {
                                if (val.name === "dept_name") {
                                  return (
                                    <option
                                      key={j}
                                      value={option.dept_name}
                                      data-dept-id={option.dept_id}
                                      className="block font-bold mb-2 text-sm md:text-base"
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
                            <label
                              htmlFor={val.type}
                              className="block font-bold"
                            >
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
                              <div className=" ">
                                <img
                                  src={
                                    first
                                      ? URL.createObjectURL(first)
                                      : "https://cdn-icons-png.flaticon.com/512/1869/1869679.png"
                                  }
                                  className="md:w-44 md:h-44 w-32 h-28 rounded-xl border-2 bg-black px-2 border-black py-2 shadow-mainColor shadow-lg relative right-14 bottom-14"
                                  alt="preview"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div key={i}>
                            <label
                              htmlFor={val.name}
                              className="block font-bold mb-2  text-sm md:text-base"
                            >
                              {val.name}
                            </label>
                            <Field
                              type={val.type}
                              placeholder={`enter ${val.name}`}
                              name={val.name}
                              className="border border-gray-400 md:p-2 p-1 rounded w-full md:text-base text-sm"
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
                    <ToastContainer className="mt-11 text-sm " />
                  </div>

                  <button
                    type="submit"
                    className="bg-mainColor  relative bottom-24  hover:bg-blue-700 text-white font-bold py-2 px-4  rounded"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddSubSection;
