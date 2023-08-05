import React from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
// import axios from "axios";
import { post } from "../../../services/api";
// import axios from "axios";

const schema = yup.object().shape({
  dept_name: yup
    .string()
    .required("The Name is required")
    .max(20, "Character length should not exceed 20")
    .matches(
      /^[^\s].*[^\s]$/,
      "Spaces are not allowed at the beginning or the end"
    ),
  dept_location: yup
    .string()
    .required("The location is required")
    .max(15, "Character length should not exceed 15")
    .matches(/^[A-Za-z]+$/, "Only characters are allowed."),
});

const FormField = [
  {
    name: "dept_name",
    name1: "department name",
    type: "text",
  },
  {
    name: "dept_location",
    name1: " location",
    type: "text",
  },
];

const AddDepartment = () => {
  const postFormData = async (value, formikBag) => {
    post("/department", value)
      .then((res) => {
        if (res.status === 200) {
          toast.success("The department is added");
          formikBag.resetForm();
        }
      })
      .catch((err) => {
        if (err.response) {
          const { data } = err.response;
          if (data && data.error && data.msg) {
            toast.error(data.msg);
          } else {
            toast.error("An error occurred while processing the request.");
          }
        } else if (err.request) {
          toast.error("No response received from the server.");
        } else {
          toast.error("An error occurred while processing the request.");
        }
      });
  };
  return (
    <div className=" px-6 sm:px-10  ">
      <Formik
        initialValues={{
          dept_name: "",
          dept_location: "",
        }}
        validationSchema={schema}
        onSubmit={(values, formikBag) => {
          postFormData(values, formikBag);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="mt-16">
            <div className="shadow-2xl shadow-gray-400 md:w-8/12 w-full p-2">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:w-11/12  mx-auto">
                {FormField.map((field, index) => (
                  <div key={index}>
                    <label
                      htmlFor={field.name}
                      className="text-lg pl-2 font-semibold text-black capitalize"
                    >
                      {field.name1}
                    </label>
                    <Field
                      type={field.type}
                      name={field.name}
                      className="border border-gray-400 rounded-md py-2 my-2 px-3 w-full"
                      placeholder={`Enter ${field.name}`}
                    />
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                ))}
              </div>
              <div className=" w-11/12 mx-auto pt-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300"
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

export default AddDepartment;
