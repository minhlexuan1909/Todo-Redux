import React from "react";
import { Card } from "react-bootstrap";

const ProfileForm = ({ title, children }) => {
  return (
    <div className="w-100">
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
