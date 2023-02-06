import React from "react";
import Logo from "../assets/logo.png";

const PageNotFound = () => {
  return (
    <div className="min-vh-100 p-4">
      <div className="w-100 auth-container">
        <div className="text-center">
          <img src={Logo} alt="Logo" height={100} width={100} className="m-4" />
          <div className="fst-italic fw-bold banner-text">
            Pin <br /> Not Found
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
