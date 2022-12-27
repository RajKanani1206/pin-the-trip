import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import LoginForm from "../components/Authentication/LoginForm";
import "./style.css";

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
        <LoginForm />
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
