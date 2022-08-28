import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgressForButton from "../../../../components/CircularProgressForButton/CircularProgressForButton";

import { AuthForm } from "../../components/AuthForm";
import {
  isRegisteredSuccessfullySelector,
  loadingRegisterSelector,
} from "../../services/authSlice";
import { registerThunk } from "../../services/authThunk";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isRegisteredSuccesfully = useSelector(isRegisteredSuccessfullySelector);
  const loadingRegister = useSelector(loadingRegisterSelector);

  const [validateEff, setValidateEff] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [validationErr, setValidationErr] = useState({
    fullname: null,
    username: null,
    email: null,
    password: null,
    passwordConfirm: null,
  });

  const setInputValue = (field, value) => {
    setValidateEff(false);
    setFormData({
      ...formData,
      [field]: value,
    });

    setValidationErr({
      ...validationErr,
      [field]: null,
    });
  };

  const findError = () => {
    const err = {};
    if (formData.fullname === "") {
      err.fullname = "This cannot be blank";
    }
    if (formData.username === "") {
      err.username = "This cannot be blank";
    }
    if (formData.email === "") {
      err.email = "This cannot be blank";
    } else if (
      !formData.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      err.email = "Please enter valid email address";
    }
    if (formData.password === "") {
      err.password = "This cannot be blank";
    }
    if (formData.passwordConfirm === "") {
      err.passwordConfirm = "This cannot be blank";
    } else if (formData.passwordConfirm !== formData.password) {
      err.passwordConfirm = "Confirm password does not match";
    }
    setValidationErr(err);
    return err;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValidateEff(true);
    const err = findError();
    const empty = Object.values(err).every((x) => x === null);
    if (empty) {
      const data = {
        name: formData.fullname,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.passwordConfirm,
      };
      dispatch(registerThunk(data));
      setValidateEff(false);
    }
  };
  useEffect(() => {
    findError();
    if (isRegisteredSuccesfully) {
      return navigate("/login");
    }
  }, [isRegisteredSuccesfully]);
  return (
    <div>
      <AuthForm title={"Register"}>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="fullname">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Full name"
              value={formData.fullname}
              isInvalid={validationErr.fullname && validateEff}
              isValid={!validationErr.fullname && validateEff}
              onChange={(e) => setInputValue("fullname", e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              {validationErr.fullname}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              required
              placeholder="Username"
              value={formData.username}
              isInvalid={validationErr.username && validateEff}
              isValid={!validationErr.username && validateEff}
              onChange={(e) => setInputValue("username", e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              {validationErr.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              placeholder="Email"
              value={formData.email}
              isInvalid={validationErr.email && validateEff}
              isValid={!validationErr.email && validateEff}
              onChange={(e) => setInputValue("email", e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              {validationErr.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              placeholder="Password"
              value={formData.password}
              isInvalid={validationErr.password && validateEff}
              isValid={!validationErr.password && validateEff}
              onChange={(e) => setInputValue("password", e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              {validationErr.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirm-password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              required
              placeholder="Confirm Password"
              value={formData.passwordConfirm}
              isInvalid={validationErr.passwordConfirm && validateEff}
              isValid={!validationErr.passwordConfirm && validateEff}
              onChange={(e) => setInputValue("passwordConfirm", e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              {validationErr.passwordConfirm}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            disabled={loadingRegister}
            className="w-100"
            variant="success"
            type="submit"
          >
            {loadingRegister ? <CircularProgressForButton /> : "Create Account"}
          </Button>
        </Form>
      </AuthForm>
    </div>
  );
};

export default RegisterPage;
