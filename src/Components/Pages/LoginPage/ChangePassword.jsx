import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { get, post } from "../../../services/api";
import * as yup from "yup";

import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router";

const validationSchema = yup.object().shape({
  old_password: yup.string().required("Old password is required"),
  new_password: yup
    .string()
    .required("New password is required")
    .min(6, "New password should be at least 6 characters long"),
  confirm_password: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("new_password")], "Passwords do not match"),
});

const FormFields = [
  {
    name1: "Old Password",
    name: "old_password",
    type: "password",
    icons: <RiLockPasswordFill />,
  },
  {
    name1: "New Password",
    name: "new_password",
    type: "password",
    icons: <RiLockPasswordFill />,
  },
  {
    name1: "Confirm Password",
    name: "confirm_password",
    type: "password",
    icons: <RiLockPasswordFill />,
  },
];

const ChangePassword = () => {
  const [employee, setEmployee] = useState([]);
  const id = localStorage.getItem("admin_id");
  const navigate = useNavigate();

  useEffect(() => {
    get("/employee")
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch employees:", error);
      });
  }, []);

  const postFormData = async (values, formikBag) => {
    try {
      const response = await post(`/adminlogintable/changepw/${id}`, values);

      if (response.status === 200) {
        toast.success("New password change");
        localStorage.clear();
        navigate("/login");
      } else {
        toast.error("Failed to change password.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Your Old Password is incorrect.");
      } else {
        toast.error("An error occurred while changing password.");
      }
    }
  };

  let initData = [
    {
      _id: "0",
      Section: "Choose Employee Name",
    },
  ];

  FormFields[0].options = [...employee];

  return (
    <div className="w-full min-h-[90vh] flex justify-center items-center bg-opacity-10 bg-white">
      <Formik
        initialValues={{
          old_password: "",
          new_password: "",
          confirm_password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          postFormData(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="w-full md:mx-10 mx-4 max-w-md "
          >
            <div className="shadow-lg shadow-mainColor bg-slate-100 rounded-lg border-2 border-gray-300 p-10">
              <div className="grid grid-cols-1 gap-6">
                <p className="font-bold text-red-500 text-2xl">
                  Change Your Password
                </p>
                {FormFields.map((val, i) => {
                  if (val.type === "select") {
                    return (
                      <div key={i} className="">
                        <label
                          htmlFor={val.name}
                          className="block font-bold mb-2"
                        >
                          {val.name1}
                        </label>
                        <div className="name flex items-center bg-gray-300 border-2 border-gray-300">
                          <p className="icons p-2 text-lg">{val.icons}</p>
                          <Field
                            as={val.type}
                            placeholder={`enter ${val.name}`}
                            name={val.name}
                            className="outline-none py-2 w-full"
                          >
                            <option value="" selected disabled>
                              {initData[0].Section}
                            </option>
                            {val.options?.map((option, j) => {
                              return (
                                <option key={j} value={option.emp_id}>
                                  {option.first_name +
                                    " " +
                                    option.middle_name +
                                    " " +
                                    option.last_name}
                                </option>
                              );
                            })}
                          </Field>
                        </div>
                        <ErrorMessage
                          name={val.name}
                          component={"div"}
                          className="text-red-600"
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div key={i}>
                        <label
                          htmlFor={val.name}
                          className="block font-bold mb-2"
                        >
                          {val.name1}
                        </label>
                        <div className="name flex items-center bg-gray-300 border-2 border-gray-300">
                          <p className="icons p-2 text-lg">{val.icons}</p>
                          <Field
                            type={val.type}
                            placeholder={`enter ${val.name}`}
                            name={val.name}
                            className="outline-none py-2 px-1 w-full"
                          />
                        </div>
                        <ErrorMessage
                          name={val.name}
                          component={"div"}
                          className="text-red-600"
                        />
                      </div>
                    );
                  }
                })}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer className="mt-11 text-sm" />
    </div>
  );
};

export default ChangePassword;
