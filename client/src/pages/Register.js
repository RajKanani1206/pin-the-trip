import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import RegisterForm from "../components/Authentication/RegisterForm";
import "./style.css";

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
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
