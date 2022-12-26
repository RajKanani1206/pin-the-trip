import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./style.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string().min(6, "Too Short!").max(20, "Too Long!").required("Password is Required"),
});

const LoginForm = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="m-4">
          <p className="mb-0 input-label">Email*</p>
          <Field
            name="email"
            type="email"
            className="w-100 p-2 my-1 border rounded input-field"
            placeholder="Enter your Email"
          />
          {errors.email && touched.email ? <div className="input-error text-danger">{errors.email}</div> : null}
          <p className="mb-0 mt-3 input-label">Password*</p>
          <Field
            name="password"
            type="password"
            className="w-100 p-2 my-1 border rounded input-field"
            placeholder="Enter your Password"
          />
          {errors.password && touched.password ? (
            <div className="input-error text-danger">{errors.password}</div>
          ) : null}
          <button
            type="submit"
            className="w-100 mt-4 p-2 border rounded text-white input-button"
            disabled={errors.email || errors.password}
          >
            SIGN IN
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
