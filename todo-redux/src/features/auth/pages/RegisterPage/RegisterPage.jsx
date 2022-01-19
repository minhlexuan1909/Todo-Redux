import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AuthForm } from "../../components/AuthForm";
import { errRegisterMessageSelector } from "../../services/authSlice";
import { registerThunk } from "../../services/authThunk";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const errRegisterMessage = useSelector(errRegisterMessageSelector);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const handleCreateButtonClick = () => {
    const data = {
      name: fullname,
      username: username,
      email: email,
      password: password,
      confirmPassword: passwordConfirm,
    };
    dispatch(registerThunk(data));
    // if (errRegisterMessage) {
    //   toast.error(errRegisterMessage);
    // }
  };
  useEffect(() => {
    if (errRegisterMessage) {
      toast.error(errRegisterMessage);
    }
  }, [errRegisterMessage]);
  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };
  return (
    <div>
      <AuthForm title={"Register"}>
        <Form>
          <Form.Group className="mb-3" controlId="fullname">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full name"
              value={fullname}
              onChange={handleFullnameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirm-password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
          </Form.Group>
          <Button
            className="w-100"
            variant="success"
            onClick={handleCreateButtonClick}
          >
            Create Account
          </Button>
        </Form>
      </AuthForm>
    </div>
  );
};

export default RegisterPage;
