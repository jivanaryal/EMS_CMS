import React from "react";
import { Formik, Form, Field } from "formik";
import { ToastContainer } from "react-toastify";
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
    post("/department", value);
  };
  return (
    <div className="w-full">
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
              className="grid grid-cols-2 gap-2 mt-20"
            >
              {FormField.map((val, i) => (
                <div
                  key={i}
                  className="w-10/12 mx-auto grid grid-cols-12 gap-6 place-content-center place-items-center"
                >
                  <label className="col-span-2" htmlFor={val.name}>
                    {val.name}
                  </label>
                  <Field
                    type={val.type}
                    name={val.name}
                    className="bg-gray-300 col-span-10 border-2 border-gray-400 rounded-md py-2 px-2 w-full"
                    placeholder={`enter  ${val.name}`}
                  />
                </div>
              ))}
              <div className="flex justify-end mt-9 w-ful">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300 w-auto"
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
