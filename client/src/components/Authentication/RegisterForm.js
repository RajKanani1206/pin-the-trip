import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { omit } from "lodash";
import "./style.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(2, "Too Short!").max(20, "Too Long!").required("Username is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string().min(6, "Too Short!").max(20, "Too Long!").required("Password is Required"),
  confirmPassword: Yup.string()
    .required("Please Re-Enter Your Password")
    .oneOf([Yup.ref("password")], "Your Password Do Not Match"),
});

const RegisterForm = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={async (values, { resetForm }) => {
        const input = omit(values, ["confirmPassword"]);
        try {
          const res = await axios.post("/register", input);
          if (res.data.success) {
            resetForm({ values: "" });
            toast.success("Email sent successfully");
            navigate(`/verify?userId=${res.data.id}`);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="m-4">
          <p className="mb-0 input-label">Username*</p>
          <Field
            name="username"
            type="text"
            className="w-100 p-2 my-1 border rounded input-field"
            placeholder="Enter your Username"
          />
          {errors.username && touched.username ? (
            <div className="input-error text-danger">{errors.username}</div>
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
            disabled={errors.username || errors.email || errors.password || errors.confirmPassword}
          >
            SIGN UP
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
