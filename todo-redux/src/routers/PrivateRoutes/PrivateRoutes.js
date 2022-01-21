import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authTokenSelector } from "../../features/auth/services/authSlice";

const PrivateRoutes = ({ component }) => {
  const token = useSelector(authTokenSelector);
  if (token) {
    return component;
  } else return <Navigate to="/login" />;
};

export default PrivateRoutes;
