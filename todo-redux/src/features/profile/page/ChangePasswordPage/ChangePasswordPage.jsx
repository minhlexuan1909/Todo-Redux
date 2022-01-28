import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Header from "../../../../components/Header/Header";
import {
  authTokenSelector,
  userIdSelector,
} from "../../../auth/services/authSlice";
import ListSetting from "../../components/ListSetting/ListSetting";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import { nameSelector } from "../../services/profileSlice";
import { changePasswordThunk, getInfoThunk } from "../../services/profileThunk";

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const id = useSelector(userIdSelector);
  const token = useSelector(authTokenSelector);
  const fullname = useSelector(nameSelector);
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
