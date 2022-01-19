import "./AuthForm.scss";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import { errLoginMessageSelector } from "../services/authSlice";

export const AuthForm = ({ title, children }) => {
  const errLoginMessage = useSelector(errLoginMessageSelector);
  useEffect(() => {
    if (errLoginMessage) {
      toast.error(errLoginMessage);
    }
  }, []);

  return (
    <div className="auth-form">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="colored"
      />
      <Card className="w-50">
        <Card.Header>{title}</Card.Header>
        <Card.Body>{children}</Card.Body>
      </Card>
    </div>
  );
};
