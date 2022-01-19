import "./LoginPage.scss";

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { AuthForm } from "../../components/AuthForm";
import { loginThunk } from "../../services/authThunk";

const LoginPage = () => {
  const dispatch = useDispatch();
  // const token = useSelector(authTokenSelector);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginButtonClick = () => {
    const data = {
      username: username,
      password: password,
    };
    dispatch(loginThunk(data));
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="login-page">
      <AuthForm title={"Login"}>
        <Form>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
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
          <div className="mb-3 d-flex justify-content-between">
            <Link to="">Forgot Password?</Link>
            <Link to="/register">Create An Account</Link>
          </div>
          <Button
            className="w-100"
            variant="success"
            onClick={handleLoginButtonClick}
          >
            Login
          </Button>
        </Form>
      </AuthForm>
    </div>
  );
};

export default LoginPage;
