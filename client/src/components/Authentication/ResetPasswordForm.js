import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import "./style.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(6, "Too Short!").max(20, "Too Long!").required("Password is Required"),
  confirmPassword: Yup.string()
    .required("Please Re-Enter Your Password")
    .oneOf([Yup.ref("password")], "Your Password Do Not Match"),
});

const ResetPasswordForm = () => {
  const { token } = useParams();
  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={ResetPasswordSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const res = await axios.post(`/password/reset/${token}`, values);
          if (res.data.success) {
            resetForm({ values: "" });
            toast.success("Password updated successfully");
          }
        } catch (error) {
          console.log(error);
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
            disabled={errors.password || errors.confirmPassword}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
