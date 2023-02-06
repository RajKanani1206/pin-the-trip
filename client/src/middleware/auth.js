import React from "react";
import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export const AuthorizeUser = ({ children }) => {
  const { user } = useUser();
  console.log("user", user);
  if (!user?._id) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
};
