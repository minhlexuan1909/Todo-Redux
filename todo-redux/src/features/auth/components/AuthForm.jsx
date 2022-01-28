import "./AuthForm.scss";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { Card } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

export const AuthForm = ({ title, children }) => {
  return (
    <div className="auth-form">
      <Card className="w-50">
        <Card.Header>{title}</Card.Header>
        <Card.Body>{children}</Card.Body>
      </Card>
    </div>
  );
};
