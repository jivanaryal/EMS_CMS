import { Field, Form, Formik } from "formik";
import React from "react";

const Example1 = () => {
  return (
    <div>
      <Formik
        initialValues={{
          color: "",
        }}
      >
        <Form>
          <Field as="select" name="color">
            <option value="" selected disabled>
              Choose the color
            </option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="yellow">Yello</option>
          </Field>
        </Form>
      </Formik>
    </div>
  );
};

export default Example1;
