import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string().min(6, "Too Short!").max(20, "Too Long!").required("Password is Required"),
});

const Login = () => {
  return (
    <div className="min-vh-100 p-4">
      <div className="w-100 border rounded-3 shadow-lg auth-container">
        <div className="text-center">
          <img src={Logo} alt="Logo" height={100} width={100} className="m-4" />
          <h3>Sign In To Your Account</h3>
          <p className="my-4">
            Don't have an account? <Link to="/register">SIGN UP</Link>
          </p>
        </div>
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
        <div className="text-center mb-4">
          <Link to="/forgotPassword" className="text-secondary">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
