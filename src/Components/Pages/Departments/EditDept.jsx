import React from "react";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import { update } from "../../../services/api";
import { useLocation, useNavigate, useParams } from "react-router";
import { IoArrowBack } from "react-icons/io5";
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

const EditDept = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(navigate);
  console.log(id);
  // const navigate = useNavigate();

  const postFormData = async (value) => {
    update(`/department/${id}`, value)
      .then((res) => {
        if (res.status === 200) {
          toast.success(`The dept_id ${id} is updated`);
          console.log("hello");
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          const { data } = err.response;
          if (data && data.error && data.msg) {
            toast.error(data.msg);
          } else {
            toast.error("An error occurred while updating the department.");
          }
        } else if (err.request) {
          toast.error("No response received from the server.");
        } else {
          toast.error("An error occurred while updating the department.");
        }
      });
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="w-full">
      <div className="text-3xl">
        <IoArrowBack onClick={() => handleGoBack()} />
      </div>
      <h1 className="text-center text-3xl font-bold">Edit Department</h1>
      <Formik
        initialValues={{
          dept_name: location.state.dept_name,
          dept_location: location.state.dept_location,
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
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default EditDept;
