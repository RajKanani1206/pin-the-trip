import React from "react";
import Logo from "../assets/logo.png";
import ResetPasswordForm from "../components/Authentication/ResetPasswordForm";
import "./style.css";

const ResetPassword = () => {
  return (
    <div className="min-vh-100 p-4">
      <div className="w-100 border rounded-3 shadow-lg auth-container">
        <div className="text-center">
          <img src={Logo} alt="Logo" height={100} width={100} className="m-4" />
          <h3>Reset Password</h3>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
