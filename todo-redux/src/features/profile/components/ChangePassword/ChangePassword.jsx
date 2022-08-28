import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CircularProgress } from "react-cssfx-loading/lib";
import { useDispatch, useSelector } from "react-redux";

import { authTokenSelector } from "../../../auth/services/authSlice";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import { loadingProfileSelector } from "../../services/profileSlice";
import { changePasswordThunk } from "../../services/profileThunk";

const ChangePasswordPage = () => {
  const dispatch = useDispatch();

  const token = useSelector(authTokenSelector);
  const loadingProfile = useSelector(loadingProfileSelector);

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
  return (
    <div>
      <div style={{ display: "flex" }}>
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
