import axios from "axios";
import React, { useEffect, useState } from "react";
import PinInput from "react-pin-input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyForm = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
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

  const resendOTP = async () => {
    try {
      const res = await axios.post(`/resendOtp?userId=${userId}`);
      if (res.data.success) {
        toast.success("Email Sent Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    setMinutes(1);
    setSeconds(30);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [seconds]);

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
        inputStyle={{ height: "45px", width: "45px", borderRadius: "5px" }}
        inputFocusStyle={{ borderColor: "#0394cb" }}
      />
      <div className="d-flex justify-content-between my-4">
        {seconds > 0 || minutes > 0 ? (
          <p className="mb-0">
            Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </p>
        ) : (
          <p className="mb-0">Didn't recieve OTP?</p>
        )}
        <button disabled={seconds > 0 || minutes > 0} className="border-0 bg-white" onClick={resendOTP}>
          Resend OTP
        </button>
      </div>
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
