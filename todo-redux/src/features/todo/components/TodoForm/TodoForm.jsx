import "./TodoForm.scss";

import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../../../components/Header/Header";
import {
  authTokenSelector,
  userIdSelector,
} from "../../../auth/services/authSlice";
import { nameSelector } from "../../../profile/services/profileSlice";
import { addTodoThunk, editTodoThunk } from "../../services/todoThunk";

const TodoForm = ({ title, todoId, name, isDone, notes }) => {
  const dispatch = useDispatch();

  const id = useSelector(userIdSelector);
  const token = useSelector(authTokenSelector);
  const fullname = useSelector(nameSelector);

  const [checked, setChecked] = useState(isDone);
  const [newTodo, setNewtodo] = useState(name);
  const [listNote, setListNote] = useState(notes);
  const [validated, setValidated] = useState(false);

  const resetFeilds = () => {
    setChecked(0);
    setNewtodo("");
    setListNote([]);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      if (title === "Create") {
        setValidated(false);
        const data = {
          token: token,
          name: newTodo,
          isDone: checked,
          listNote: listNote,
          userId: id,
        };
        dispatch(addTodoThunk(data));
        resetFeilds();
      } else if (title === "Edit") {
        const data = {
          token: token,
          id: todoId,
          name: newTodo,
          isDone: checked,
        };
        dispatch(editTodoThunk(data));
        resetFeilds();
      }
    }
  };
  const handleAddNoteBtnClick = () => {
    setListNote([...listNote, ""]);
  };
  const handleRemoveInputBtnClick = (index) => {
    console.log(index);
    listNote.splice(index, 1);
    setListNote([...listNote]);
  };
  return (
    <div className="create-todo">
      <Header fullname={fullname}></Header>
      <Card>
        <Card.Header>{`${title} Todo`}</Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type name of your todo here"
                required
                value={newTodo}
                onChange={(e) => setNewtodo(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please fill out this feild
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Done"
                checked={checked}
                onChange={() => setChecked(Math.abs(checked - 1))}
              />
            </Form.Group>

            {listNote.map((item, index) => (
              <div key={index}>
                <Form.Group className="mb-3 d-flex " controlId="formBasicEmail">
                  <InputGroup hasValidation>
                    <Form.Control
                      disabled={title === "Edit"}
                      className="mr-2"
                      type="text"
                      placeholder="Type your note"
                      required
                      value={listNote[index]}
                      onChange={(e) => {
                        const newListNote = [...listNote];
                        newListNote[index] = e.target.value;
                        setListNote([...newListNote]);
                      }}
                    />
                    <Button
                      disabled={title === "Edit"}
                      onClick={() => handleRemoveInputBtnClick(index)}
                    >
                      <i className="bi bi-dash"></i>
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      Please fill out this feild or remove this
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </div>
            ))}
            {title === "Edit" ? (
              <Alert variant="warning">
                If you want to edit your note please do it under your todo in{" "}
                <Alert.Link href="/dashboard">dashboard</Alert.Link>
              </Alert>
            ) : (
              ""
            )}
            <div className="buttons">
              {title === "Create" ? (
                <Button
                  className="mb-2 add-note-btn"
                  variant="success"
                  onClick={handleAddNoteBtnClick}
                >
                  <div className="add-note-text">Add note</div>
                  <i className="ml-2 bi bi-plus-circle"></i>
                </Button>
              ) : (
                ""
              )}
              <Button variant="primary" type="submit">
                {title}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TodoForm;
