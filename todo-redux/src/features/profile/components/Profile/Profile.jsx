import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CircularProgress } from "react-cssfx-loading/lib";
import { useDispatch, useSelector } from "react-redux";

import {
  authTokenSelector,
  userIdSelector,
} from "../../../auth/services/authSlice";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import profileSlice, {
  createAtSelector,
  emailSelector,
  isEditSelector,
  loadingProfileSelector,
  nameSelector,
  usernameSelector,
} from "../../services/profileSlice";
import { editInfoThunk } from "../../services/profileThunk";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const id = useSelector(userIdSelector);
  const token = useSelector(authTokenSelector);
  const isEdit = useSelector(isEditSelector);
  const usernameInfo = useSelector(usernameSelector);
  const nameInfo = useSelector(nameSelector);
  const emailInfo = useSelector(emailSelector);
  const createAt = useSelector(createAtSelector);
  const loadingProfile = useSelector(loadingProfileSelector);

  const [createDay, setCreateDay] = useState("");
  const [validateEff, setValidateEff] = useState(false);

  const [formData, setFormData] = useState({
    nameInput: "",
    emailInput: "",
  });

  const [validationErr, setValidationErr] = useState({
    nameInput: null,
    emailInput: null,
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
    if (formData.nameInput === "") {
      err.nameInput = "This cannot be blank";
    }
    if (formData.emailInput === "") {
      err.emailInput = "This cannot be blank";
    } else if (
      !formData.emailInput
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      err.emailInput = "Please enter valid email address";
    }
    // const empty = Object.values(err).every((x) => x === null);
    // if (!empty) setValidateEff(true);
    setValidationErr(err);
    return err;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const err = findError();
    setValidateEff(true);
    const empty = Object.values(err).every((x) => x === null);
    if (empty) {
      const data = {
        id: id,
        token: token,
        name: formData.nameInput,
        email: formData.emailInput,
      };
      dispatch(editInfoThunk(data));
      setValidateEff(false);
    }
  };

  const handleEditBtnClick = () => {
    findError();
    dispatch(profileSlice.actions.toggleIsEdit());
  };

  useEffect(() => {
    if (createAt) {
      const date = new Date(createAt);
      const options = { year: "numeric", month: "short", day: "numeric" };
      setCreateDay(date.toLocaleString("en-GB", options).replaceAll(" ", "-"));
    }
  }, [createAt]);

  useEffect(() => {
    setFormData({
      nameInput: nameInfo,
      emailInput: emailInfo,
    });
  }, [nameInfo, emailInfo]);

  // useEffect(() => {
  //   findError();
  // }, []);

  console.log(validationErr);
  // Data not yet loaded
  if (loadingProfile && !nameInfo) {
    return <CircularProgress color="black"></CircularProgress>;
  }
  return (
    <div>
      <div style={{ display: "flex" }}>
        <ProfileForm title={"Profile"}>
          <Form noValidate onSubmit={handleSubmit}>
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
                isInvalid={validationErr.nameInput && validateEff}
                isValid={!validationErr.nameInput && validateEff}
                value={isEdit ? formData.nameInput : nameInfo}
                onChange={(e) => setInputValue("nameInput", e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {validationErr.nameInput}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                // placeholder={emailInfo}
                disabled={!isEdit}
                readOnly={!isEdit}
                required
                isInvalid={validationErr.emailInput && validateEff}
                isValid={!validationErr.emailInput && validateEff}
                value={isEdit ? formData.emailInput : emailInfo}
                onChange={(e) => setInputValue("emailInput", e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {validationErr.emailInput}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 mt-3">
              <Form.Label>Created day</Form.Label>
              <Form.Control type="text" disabled readOnly value={createDay} />
            </Form.Group>
            {isEdit ? (
              <div className="buttons">
                <Button
                  disabled={loadingProfile}
                  variant="success"
                  className="mr-3"
                  type="submit"
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
