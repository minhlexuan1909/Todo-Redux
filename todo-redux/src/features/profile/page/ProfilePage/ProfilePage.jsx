import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CircularProgress } from "react-cssfx-loading/lib";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../../../components/Header/Header";
import {
  authTokenSelector,
  userIdSelector,
} from "../../../auth/services/authSlice";
import ListSetting from "../../components/ListSetting/ListSetting";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import profileSlice, {
  emailSelector,
  isEditSelector,
  loadingProfileSelector,
  nameSelector,
  usernameSelector,
} from "../../services/profileSlice";
import { editInfoThunk, getInfoThunk } from "../../services/profileThunk";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const formRef = useRef();

  const id = useSelector(userIdSelector);
  const token = useSelector(authTokenSelector);
  const isEdit = useSelector(isEditSelector);

  const usernameInfo = useSelector(usernameSelector);
  const nameInfo = useSelector(nameSelector);
  const emailInfo = useSelector(emailSelector);
  const loadingProfile = useSelector(loadingProfileSelector);

  const [nameInput, setNameInput] = useState(nameInfo);
  const [emailInput, setEmailInput] = useState(emailInfo);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    console.log("submit");
    e.preventDefault();
    e.stopPropagation();
    if (!form.checkValidity()) {
      setValidated(true);
    } else {
      setValidated(false);
      const data = {
        id: id,
        token: token,
        name: nameInput,
        email: emailInput,
      };
      dispatch(editInfoThunk(data));
    }
  };

  const handleEditBtnClick = () => {
    // formRef.current.setAttribute("validated", validated);
    setNameInput(nameInfo);
    setEmailInput(emailInfo);
    dispatch(profileSlice.actions.toggleIsEdit());
  };
  useEffect(() => {
    const data = {
      id: id,
      token: token,
    };
    dispatch(getInfoThunk(data));
  }, []);

  return (
    <div>
      <Header fullname={nameInfo}></Header>
      <div style={{ display: "flex" }}>
        <ListSetting></ListSetting>
        <ProfileForm title={"Profile"}>
          <Form
            ref={formRef}
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
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
                required
                value={isEdit ? nameInput : nameInfo}
                onChange={(e) => setNameInput(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please fill out this feild
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                // placeholder={emailInfo}
                disabled={!isEdit}
                readOnly={!isEdit}
                value={isEdit ? emailInput : emailInfo}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter valid email address
              </Form.Control.Feedback>
            </Form.Group>

            {isEdit ? (
              <div className="buttons">
                <Button
                  disabled={loadingProfile}
                  variant="success"
                  className="mr-3"
                  type="submit"
                  // onClick={handleSaveButtonClick}
                >
                  {loadingProfile ? (
                    <CircularProgress
                      color="white"
                      width="1.5rem"
                      height="1.5rem"
                    ></CircularProgress>
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button
                  disabled={loadingProfile}
                  variant="danger"
                  onClick={() => dispatch(profileSlice.actions.toggleIsEdit())}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                type="button"
                onClick={handleEditBtnClick}
              >
                Edit
              </Button>
            )}
          </Form>
        </ProfileForm>
      </div>
    </div>
  );
};

export default ProfilePage;
