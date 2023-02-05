import axios from "axios";
import React, { useState } from "react";
import PinInput from "react-pin-input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyForm = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const handleClick = async () => {
    const data = {
      otp: token,
    };
    try {
      const res = await axios.post(`/verifyEmail?userId=${userId}`, data);
      if (res.data.success) {
        toast.success("User Registered successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="text-center m-4">
      <PinInput
        length={4}
        initialValue=""
        type="numeric"
        inputMode="number"
        onChange={(value, index) => {
          setToken(value);
        }}
        style={{ padding: "10px" }}
        inputStyle={{ borderColor: "red" }}
        inputFocusStyle={{ borderColor: "blue" }}
      />
      <p className="my-4">Didn't recieve OTP? Resend OTP</p>
      <button
        onClick={handleClick}
        className="w-100 p-2 border rounded text-white input-button"
        disabled={!(token?.toString().length === 4)}
      >
        VERIFY
      </button>
    </div>
  );
};

export default VerifyForm;
