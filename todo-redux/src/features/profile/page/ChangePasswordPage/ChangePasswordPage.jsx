import React, { useEffect, useState } from "react";
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
import {
  loadingProfileSelector,
  nameSelector,
} from "../../services/profileSlice";
import { changePasswordThunk, getInfoThunk } from "../../services/profileThunk";

const ChangePasswordPage = () => {
  const dispatch = useDispatch();

  const id = useSelector(userIdSelector);
  const token = useSelector(authTokenSelector);
  const fullname = useSelector(nameSelector);
  const loadingProfile = useSelector(loadingProfileSelector);

  // const [oldPassword, setOldPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [validationErr, setValidationErr] = useState({
    oldPassword: null,
    newPassword: null,
  });

  const setInputValue = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    setValidationErr({
      ...validationErr,
      [field]: null,
    });
  };
  // const handleChangePassButtonClick = () => {
  //   // console.log(token);
  //   const data = {
  //     oldPassword: oldPassword,
  //     newPassword: newPassword,
  //     token: token,
  //   };
  //   dispatch(changePasswordThunk(data));
  // };
  const findValidationErr = () => {
    if (!formData.oldPassword) {
      validationErr.oldPassword = "This cannot be blank";
    }
    if (!formData.newPassword) {
      validationErr.newPassword = "This cannot be blank";
    } else if (formData.oldPassword === formData.newPassword) {
      validationErr.newPassword =
        "Old password and New password cannot be the same";
    }
    setFormData({ ...formData });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    findValidationErr();
    const empty = Object.values(validationErr).every((x) => x === null);
    if (empty) {
      const data = {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        token: token,
      };
      dispatch(changePasswordThunk(data));
    }
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
      <Header fullname={fullname}></Header>
      <div style={{ display: "flex" }}>
        <ListSetting></ListSetting>
        <ProfileForm title={"Change Password"}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={formData.oldPassword}
                isInvalid={validationErr.oldPassword}
                onChange={(e) => setInputValue("oldPassword", e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {validationErr.oldPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={formData.newPassword}
                isInvalid={validationErr.newPassword}
                onChange={(e) => setInputValue("newPassword", e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {validationErr.newPassword}
              </Form.Control.Feedback>
            </Form.Group>
            {loadingProfile ? (
              <Button variant="success" disabled={loadingProfile}>
                <CircularProgress
                  color="white"
                  width="1.5rem"
                  height="1.5rem"
                ></CircularProgress>
              </Button>
            ) : (
              // <Button variant="success" onClick={handleChangePassButtonClick}>
              //   Save
              // </Button>
              <Button variant="success" type="submit">
                Save
              </Button>
            )}
          </Form>
        </ProfileForm>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
