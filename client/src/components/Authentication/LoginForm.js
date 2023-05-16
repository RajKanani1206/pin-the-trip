import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./style.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import DotLoader from "react-spinners/DotLoader";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string().min(6, "Too Short!").max(20, "Too Long!").required("Password is Required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values) => {
        try {
          setLoading(true);
          const res = await axios.post("/login", values);
          if (res.data.success) {
            setUser(res.data.user);
            setLoading(false);
            navigate("/map");
            toast.success("User logged in successfully");
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
          toast.error("Something went wrong");
        }
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
            disabled={errors.email || errors.password || loading}
          >
            {loading ? <DotLoader loading={loading} size={18} color="#0394cb" /> : `SIGN IN`}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
