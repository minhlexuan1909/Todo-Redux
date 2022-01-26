import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../components/Header/Header";
import {
  authTokenSelector,
  userIdSelector,
} from "../../../auth/services/authSlice";
import ListSetting from "../../components/ListSetting/ListSetting";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import {
  emailSelector,
  nameSelector,
  usernameSelector,
} from "../../services/profileSlice";
import { editInfoThunk, getInfoThunk } from "../../services/profileThunk";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const id = useSelector(userIdSelector);
  const token = useSelector(authTokenSelector);
  const [isEdit, setIsEdit] = useState(false);

  const usernameInfo = useSelector(usernameSelector);
  const nameInfo = useSelector(nameSelector);
  const emailInfo = useSelector(emailSelector);

  const [nameInput, setNameInput] = useState(nameInfo);
  const [emailInput, setEmailInput] = useState(emailInfo);
  useEffect(() => {
    const data = {
      id: id,
      token: token,
    };
    dispatch(getInfoThunk(data));
  }, []);
  const handleEditButtonClick = () => {
    setNameInput(nameInfo);
    setEmailInput(emailInfo);
    if (isEdit) {
      const data = {
        id: id,
        token: token,
        name: nameInput,
        email: emailInput,
      };
      dispatch(editInfoThunk(data));
    }
    setIsEdit(!isEdit);
  };
  const handleNameChange = (e) => {
    setNameInput(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };
  return (
    <div>
      <Header></Header>
      <div style={{ display: "flex" }}>
        <ListSetting></ListSetting>
        <ProfileForm title={"Profile"}>
          <Form>
            <Form.Group className="mb-3 mt-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                // placeholder={usernameInfo}
                disabled
                readOnly
                value={usernameInfo}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                // placeholder={nameInfo}
                disabled={!isEdit}
                readOnly={!isEdit}
                value={isEdit ? nameInput : nameInfo}
                onChange={handleNameChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                // placeholder={emailInfo}
                disabled={!isEdit}
                readOnly={!isEdit}
                value={isEdit ? emailInput : emailInfo}
                onChange={handleEmailChange}
              />
            </Form.Group>
            {isEdit ? (
              <>
                <Button
                  variant="success"
                  className="mr-3"
                  onClick={handleEditButtonClick}
                >
                  Save
                </Button>
                <Button variant="danger" onClick={() => setIsEdit(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button variant="primary" onClick={handleEditButtonClick}>
                  Edit
                </Button>
              </>
            )}
            {/* <Button
              variant={isEdit ? "success" : "primary"}
              onClick={handleEditButtonClick}
            >
              {isEdit ? "Save" : "Edit"}
            </Button> */}
          </Form>
        </ProfileForm>
      </div>
    </div>
  );
};

export default ProfilePage;
