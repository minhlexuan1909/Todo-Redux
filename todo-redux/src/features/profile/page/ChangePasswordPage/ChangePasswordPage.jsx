import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Header from "../../../../components/Header/Header";
import { authTokenSelector } from "../../../auth/services/authSlice";
import ListSetting from "../../components/ListSetting/ListSetting";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import { changePasswordThunk } from "../../services/profileThunk";

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const token = useSelector(authTokenSelector);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleOldPassChange = (e) => {
    setOldPassword(e.target.value);
  };
  const handleNewPassChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangePassButtonClick = () => {
    // console.log(token);
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      token: token,
    };
    dispatch(changePasswordThunk(data));
  };
  return (
    <div>
      <Header></Header>
      <div style={{ display: "flex" }}>
        <ListSetting></ListSetting>
        <ProfileForm title={"Change Password"}>
          <Form>
            <Form.Group className="mb-3 mt-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={oldPassword}
                onChange={handleOldPassChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={newPassword}
                onChange={handleNewPassChange}
              />
            </Form.Group>
            <Button variant="success" onClick={handleChangePassButtonClick}>
              Save
            </Button>
          </Form>
        </ProfileForm>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
