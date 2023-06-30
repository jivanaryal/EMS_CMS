import React from "react";
import { Formik, Form, Field } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import axios from "axios";
import { post } from "../../../services/api";
// import axios from "axios";

const schema = yup.object().shape({
  dept_name: yup.string().required("The name is required"),
  dept_location: yup.string().required("The name is required"),
});
const FormField = [
  {
    name: "dept_name",
    type: "text",
  },
  {
    name: "dept_location",
    type: "text",
  },
];

const AddDepartment = () => {
  const postFormData = async (value) => {
    post("/department", value).then((res) => {
      toast.success("the department is added");
    });
  };
  return (
    <div className="w-full px-10">
      <Formik
        initialValues={{
          dept_name: "",
          dept_location: "",
        }}
        validationSchema={schema}
        onSubmit={(val) => {
          console.log(val);
          postFormData(val);
        }}
      >
        {({ handleSubmit }) => {
          return (
            <Form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="mt-20"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {FormField.map((val, i) => (
                  <div key={i} className="mx-auto">
                    <label htmlFor={val.name} className="text-sm font-semibold">
                      {val.name}
                    </label>
                    <Field
                      type={val.type}
                      name={val.name}
                      className="border border-gray-400 rounded-md py-2 px-2 w-full"
                      placeholder={`Enter ${val.name}`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-9">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default AddDepartment;
