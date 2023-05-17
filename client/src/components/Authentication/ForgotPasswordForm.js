import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./style.css";
import axios from "axios";
import { toast } from "react-toastify";
import DotLoader from "react-spinners/DotLoader";
import { BASE_URL } from "../../helper/helper";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is Required"),
});

const ForgotPasswordForm = () => {
  console.log("BASE_URL", BASE_URL);
  const [loading, setLoading] = useState(false);
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={ForgotPasswordSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          setLoading(true);
          const res = await axios.post(`${BASE_URL}/forgotPassword`, values);
          if (res.data.success) {
            resetForm({ values: "" });
            setLoading(false);
            toast.success(res.data.message);
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
          <button
            type="submit"
            className="w-100 mt-4 p-2 border rounded text-white input-button"
            disabled={errors.email || loading}
          >
            {loading ? <DotLoader loading={loading} size={18} color="#0394cb" /> : `Submit`}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
