import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
    name1: "department name",
    type: "text",
  },
  {
    name: "dept_location",
    name1: " location",
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
          setTimeout(() => {
            navigate("/department");
          }, 1000);
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
    <div className=" px-6 sm:px-10 py-10 ">
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
            <Form onSubmit={handleSubmit} className="mt-16">
              <div className="shadow-2xl shadow-gray-400 md:w-8/12 w-full p-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:w-11/12  mx-auto">
                  {FormField.map((field, index) => (
                    <div key={index}>
                      <label
                        htmlFor={field.name}
                        className="md:text-lg text-sm pl-2  font-semibold text-black capitalize"
                      >
                        {field.name1}
                      </label>
                      <Field
                        type={field.type}
                        name={field.name}
                        className="border border-gray-400 text-sm rounded-md py-2 my-2 px-3 w-full"
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
                    className="md:px-4 md:py-2 px-2 py-1 bg-blue-500 text-white font-semibold md:text-base text-sm rounded-md hover:bg-blue-600 transition-colors duration-300"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
      <ToastContainer className="mt-11 " />
    </div>
  );
};

export default EditDept;
