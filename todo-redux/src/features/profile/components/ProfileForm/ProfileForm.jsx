import React from "react";
import { Card, Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

const ProfileForm = ({ title, children }) => {
  return (
    <div className="w-75">
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
      <Card>
        <Card.Body>
          <Card.Header>{title}</Card.Header>
          {children}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileForm;
