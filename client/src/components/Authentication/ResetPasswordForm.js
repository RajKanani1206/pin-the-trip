import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import "./style.css";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(6, "Too Short!").max(20, "Too Long!").required("Password is Required"),
  confirmPassword: Yup.string()
    .required("Please Re-Enter Your Password")
    .oneOf([Yup.ref("password")], "Your Password Do Not Match"),
});

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={ResetPasswordSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          setLoading(true);
          const res = await axios.post(`/password/reset/${token}`, values);
          if (res.data.success) {
            resetForm({ values: "" });
            setLoading(false);
            toast.success("Password updated successfully");
            navigate("/login");
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
          <p className="mb-0 mt-3 input-label">New Password*</p>
          <Field
            name="password"
            type="password"
            className="w-100 p-2 my-1 border rounded input-field"
            placeholder="Enter new Password"
          />
          {errors.password && touched.password ? (
            <div className="input-error text-danger">{errors.password}</div>
          ) : null}
          <p className="mb-0 mt-3 input-label">Confirm New Password*</p>
          <Field
            name="confirmPassword"
            type="password"
            className="w-100 p-2 my-1 border rounded input-field"
            placeholder="Re-Enter new Password"
          />
          {errors.confirmPassword && touched.confirmPassword ? (
            <div className="input-error text-danger">{errors.confirmPassword}</div>
          ) : null}
          <button
            type="submit"
            className="w-100 mt-4 p-2 border rounded text-white input-button"
            disabled={errors.password || errors.confirmPassword || loading}
          >
            {loading ? <DotLoader loading={loading} size={18} color="#0394cb" /> : `Submit`}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
