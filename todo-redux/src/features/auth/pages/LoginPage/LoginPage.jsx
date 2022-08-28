import "./LoginPage.scss";

import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { AuthForm } from "../../components/AuthForm";
import { loginThunk } from "../../services/authThunk";
import {
  authAction,
  authTokenSelector,
  loadingLoginSelector,
} from "../../services/authSlice";
import CircularProgressForButton from "../../../../components/CircularProgressForButton/CircularProgressForButton";

const LoginPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const token = useSelector(authTokenSelector);
  const loadingLogin = useSelector(loadingLoginSelector);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      setValidated(false);
      const data = {
        username: username,
        password: password,
      };
      dispatch(loginThunk(data));
    } else {
      setValidated(true);
    }
  };

  useEffect(() => {
    dispatch(authAction.setFalseIsRegis());
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <div className="login-page">
      <AuthForm title={"Login"}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setValidated(false);
              }}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            This cannot be blank
          </Form.Control.Feedback>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setValidated(false);
              }}
            />
            <Form.Control.Feedback type="invalid">
              This cannot be blank
            </Form.Control.Feedback>
          </Form.Group>
          <div className="mb-3 d-flex justify-content-between">
            <Link to="">Forgot Password?</Link>
            <Link to="/register">Create An Account</Link>
          </div>
          <Button
            disabled={loadingLogin}
            className="w-100"
            variant="success"
            type="submit"
          >
            {loadingLogin ? <CircularProgressForButton /> : "Login"}
          </Button>
        </Form>
      </AuthForm>
    </div>
  );
};

export default LoginPage;
