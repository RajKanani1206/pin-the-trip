import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Too Short!").max(20, "Too Long!").required("First Name is Required"),
  lastName: Yup.string().min(2, "Too Short!").max(20, "Too Long!").required("Last Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string().min(6, "Too Short!").max(20, "Too Long!").required("Password is Required"),
  confirmPassword: Yup.string()
    .required("Please Re-Enter Your Password")
    .oneOf([Yup.ref("password")], "Your Password Do Not Match"),
});

const Register = () => {
  return (
    <div className="min-vh-100 p-4">
      <div className="w-100 border rounded-3 shadow-lg auth-container">
        <div className="text-center">
          <img src={Logo} alt="Logo" height={100} width={100} className="m-4" />
          <h3>Create Your Account</h3>
          <p className="my-4">
            Already have an account? <Link to="/login">SIGN IN</Link>
          </p>
        </div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="m-4">
              <p className="mb-0 input-label">First Name*</p>
              <Field
                name="firstName"
                type="text"
                className="w-100 p-2 my-1 border rounded input-field"
                placeholder="Enter your First Name"
              />
              {errors.firstName && touched.firstName ? (
                <div className="input-error text-danger">{errors.firstName}</div>
              ) : null}
              <p className="mb-0 mt-3 input-label">Last Name*</p>
              <Field
                name="lastName"
                type="text"
                className="w-100 p-2 my-1 border rounded input-field"
                placeholder="Enter your Last Name"
              />
              {errors.lastName && touched.lastName ? (
                <div className="input-error text-danger">{errors.lastName}</div>
              ) : null}

              <p className="mb-0 mt-3 input-label">Email*</p>
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
              <p className="mb-0 mt-3 input-label">Confirm Password*</p>
              <Field
                name="confirmPassword"
                type="password"
                className="w-100 p-2 my-1 border rounded input-field"
                placeholder="Re-Enter your Password"
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className="input-error text-danger">{errors.confirmPassword}</div>
              ) : null}
              <button
                type="submit"
                className="w-100 mt-4 p-2 border rounded text-white input-button"
                disabled={
                  errors.firstName || errors.lastName || errors.email || errors.password || errors.confirmPassword
                }
              >
                SIGN UP
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
