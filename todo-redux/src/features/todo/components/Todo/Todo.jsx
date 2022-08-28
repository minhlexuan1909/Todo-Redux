import "./Todo.scss";

import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { CircularProgress } from "react-cssfx-loading/lib";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { authTokenSelector } from "../../../auth/services/authSlice";
import {
  deleteTodoThunk,
  toggleStatusTodoThunk,
} from "../../services/todoThunk";
import CollapseNoteList from "../CollapseNoteList/CollapseNoteList";

import { motion } from "framer-motion";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const token = useSelector(authTokenSelector);

  const handleDeleteBtnClick = () => {
    if (window.confirm("Are you sure you want to delete")) {
      const data = {
        id: todo.id,
        token: token,
      };
      dispatch(deleteTodoThunk(data));
    }
  };

  const handleStatusClick = () => {
    const data = {
      id: todo.id,
      token: token,
      isDone: Math.abs(todo.isDone - 1),
    };
    dispatch(toggleStatusTodoThunk(data));
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="todo"
    >
      <Card>
        <Card.Body>
          <Card.Title>
            <div className="todo-content">
              {todo.loadingToggleStatus ? (
                <CircularProgress
                  style={{ marginRight: ".75rem", marginTop: ".25em" }}
                  color="black"
                  width="1em"
                  height="1em"
                />
              ) : (
                <Form.Check
                  type="checkbox"
                  disabled={todo.loadingDelete || todo.loadingToggleStatus}
                  checked={todo.isDone}
                  onChange={handleStatusClick}
                />
              )}
              {todo.isDone ? (
                <div style={{ textDecoration: "line-through", color: "grey" }}>
                  {todo.name}
                </div>
              ) : (
                <div>{todo.name}</div>
              )}
            </div>
            <div>
              <Link to={`/dashboard/edit-todo/${todo.id}`}>
                <Button
                  disabled={todo.loadingDelete || todo.loadingToggleStatus}
                  variant="primary"
                  className="mr-2"
                >
                  Edit
                </Button>
              </Link>
              <Button
                disabled={todo.loadingDelete || todo.loadingToggleStatus}
                variant="primary"
                onClick={handleDeleteBtnClick}
              >
                {todo.loadingDelete ? (
                  <CircularProgress
                    color="white"
                    width="1.5rem"
                    height="1.5rem"
                  />
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </Card.Title>

          <CollapseNoteList
            loadingAddNote={todo.loadingAddNote}
            id={todo.id}
            notes={todo.notes}
            enableCollapse={!todo.loadingDelete && !todo.loadingToggleStatus}
          />
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default Todo;
