import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListSetting = () => {
  return (
    <div className="w-25">
      <ListGroup>
        <Link to="/dashboard/profile">
          <ListGroup.Item>Profile</ListGroup.Item>
        </Link>
        <Link to="/dashboard/profile/change-password">
          <ListGroup.Item>Change Password</ListGroup.Item>
        </Link>
      </ListGroup>
    </div>
  );
};

export default ListSetting;
