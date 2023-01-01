import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./style.css";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is Required"),
});

const ForgotPasswordForm = () => {
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={ForgotPasswordSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const res = await axios.post("/forgotPassword", values);
          if (res.data.success) {
            resetForm({ values: "" });
            toast.success(res.data.message);
          }
        } catch (error) {
          console.log(error);
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
          <button
            type="submit"
            className="w-100 mt-4 p-2 border rounded text-white input-button"
            disabled={errors.email}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
