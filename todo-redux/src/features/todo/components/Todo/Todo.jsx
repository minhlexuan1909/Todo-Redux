import "./Todo.scss";

import React, { useEffect, useState } from "react";
import { ButtonGroup, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { authTokenSelector } from "../../../auth/services/authSlice";
import {
  deleteTodoThunk,
  toggleStatusTodoThunk,
} from "../../services/todoThunk";
import CollapseNoteList from "../CollapseNoteList/CollapseNoteList";
import { Button } from "react-bootstrap";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  // const id = useSelector(userIdSelector);
  const token = useSelector(authTokenSelector);

  const handleDeleteBtnClick = () => {
    const data = {
      id: todo.id,
      token: token,
    };
    dispatch(deleteTodoThunk(data));
  };

  const handleStatusClick = () => {
    const data = {
      id: todo.id,
      token: token,
      isDone: Math.abs(todo.isDone - 1),
    };
    // dispatch(todoAction.toggleStatusTodo(todo.id));
    dispatch(toggleStatusTodoThunk(data));
  };

  return (
    <div className="todo">
      <Card>
        <Card.Body>
          <Card.Title>
            <div className="todo-content">
              <Form.Check
                type="checkbox"
                checked={todo.isDone}
                onChange={handleStatusClick}
              />
              {todo.isDone ? (
                <div style={{ textDecoration: "line-through", color: "grey" }}>
                  {todo.name}
                </div>
              ) : (
                <div>{todo.name}</div>
              )}
            </div>
            <div>
              <Button
                variant="primary"
                className="mr-2"
                href={`/dashboard/edit-todo/${todo.id}`}
              >
                Edit
              </Button>
              <Button variant="primary" onClick={handleDeleteBtnClick}>
                Delete
              </Button>
              {/* <ToggleButton
                type="check-box"
                variant={todo.isDone ? "success" : "warning"}
                onClick={handleStatusClick}
              >
                {todo.isDone ? "Done" : "Pending"}
              </ToggleButton> */}
            </div>
          </Card.Title>

          {/* {todo.isDone ? (
                <Card.Title
                  style={{ textDecoration: "line-through", color: "grey" }}
                >
                  {todo.name}
                </Card.Title>
              ) : (
                <Card.Title>{todo.name}</Card.Title>
              )} */}

          <CollapseNoteList id={todo.id} notes={todo.notes} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Todo;
