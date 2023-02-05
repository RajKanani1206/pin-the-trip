import React from "react";
import Logo from "../assets/logo.png";
import VerifyForm from "../components/Authentication/VerifyForm";
import "./style.css";

const Verify = () => {
  return (
    <div className="min-vh-100 p-4">
      <div className="w-100 border rounded-3 shadow-lg auth-container">
        <div className="text-center">
          <img src={Logo} alt="Logo" height={100} width={100} className="m-4" />
          <h3>Verify Your Account</h3>
          <p className="m-4">Please enter the One-Time Password sent to your Email</p>
        </div>
        <VerifyForm />
      </div>
    </div>
  );
};

export default Verify;
