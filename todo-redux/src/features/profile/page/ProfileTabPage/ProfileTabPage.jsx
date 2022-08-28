import React from "react";
import { Col, ListGroup, Row, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";

import Header from "../../../../components/Header/Header";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import Profile from "../../components/Profile/Profile";
import { nameSelector } from "../../services/profileSlice";

const ProfileTabPage = ({ route }) => {
  const nameInfo = useSelector(nameSelector);

  return (
    <div>
      <Header fullname={nameInfo} />
      <Tab.Container
        fluid
        id="list-group-tabs-example"
        defaultActiveKey={`#/dashboard/profile` + (route ? `/${route}` : "")}
      >
        <Row>
          <Col xl={3}>
            <ListGroup>
              <ListGroup.Item action href="#/dashboard/profile">
                Profile
              </ListGroup.Item>
              <ListGroup.Item action href="#/dashboard/profile/change-password">
                Change password
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col xl={9}>
            <Tab.Content>
              <Tab.Pane eventKey="#/dashboard/profile">
                <Profile />
              </Tab.Pane>
              <Tab.Pane eventKey="#/dashboard/profile/change-password">
                <ChangePassword />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default ProfileTabPage;
