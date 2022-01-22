import React, { useEffect } from "react";
import { ButtonGroup, Card, ToggleButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  authTokenSelector,
  userIdSelector,
} from "../../../auth/services/authSlice";
import { todoAction } from "../../services/todoSlice";
import { toggleStatusTodoThunk } from "../../services/todoThunk";
import CollapseNoteList from "../CollapseNoteList/CollapseNoteList";

import { toast } from "react-toastify";
const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  // const id = useSelector(userIdSelector);
  const token = useSelector(authTokenSelector);
  const handleStatusClick = () => {
    const data = {
      id: todo.id,
      token: token,
      isDone: Math.abs(todo.isDone - 1),
    };
    dispatch(todoAction.toggleStatusTodo(todo.id));
    dispatch(toggleStatusTodoThunk(data));
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <div className="todo-content">
            <Card.Title>{todo.name}</Card.Title>
            <ButtonGroup>
              <ToggleButton
                type="check-box"
                variant={todo.isDone ? "success" : "warning"}
                onClick={handleStatusClick}
              >
                {todo.isDone ? "Done" : "Pending"}
              </ToggleButton>
            </ButtonGroup>
          </div>
          <CollapseNoteList notes={todo.notes} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Todo;
