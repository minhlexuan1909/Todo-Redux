import React from "react";
import { Card, Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

const ProfileForm = ({ title, children }) => {
  return (
    <div className="w-75">
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
