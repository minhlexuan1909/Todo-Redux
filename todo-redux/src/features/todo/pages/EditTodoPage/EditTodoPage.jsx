import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  authTokenSelector,
  userIdSelector,
} from "../../../auth/services/authSlice";
import { getInfoThunk } from "../../../profile/services/profileThunk";
import { todoListSelector } from "../../services/todoSlice";
import { getTodoByIdThunk, getTodoThunk } from "../../services/todoThunk";
import TodoForm from "../../components/TodoForm/TodoForm";

const EditTodoPage = () => {
  const { idTodo } = useParams();

  const dispatch = useDispatch();

  const userId = useSelector(userIdSelector);
  const token = useSelector(authTokenSelector);
  const todoList = useSelector(todoListSelector);

  const [todoNotes, setTodoNotes] = useState([]);
  const [todo, setTodo] = useState({});
  const [show, setShow] = useState(false);
  useEffect(() => {
    const data = {
      id: userId,
      token: token,
    };
    dispatch(getInfoThunk(data));
    dispatch(getTodoThunk({ token: token }));
  }, []);

  useEffect(() => {
    const found = todoList.find((todo) => todo.id === parseInt(idTodo));
    if (found) {
      setTodo(found);
      setTodoNotes(found.notes.map((note) => note.content));
      setShow(true);
    }
    console.log(found);
  }, [todoList]);
  console.log(todo);
  console.log(todoNotes);
  return (
    <>
      {show ? (
        <TodoForm
          title={"Edit"}
          todoId={parseInt(idTodo)}
          name={todo.name}
          isDone={todo.isDone}
          notes={todoNotes}
        ></TodoForm>
      ) : (
        // <TodoForm title={"Edit"} name={""} isDone={0} notes={[]}></TodoForm>
        <></>
      )}
    </>
  );
};

export default EditTodoPage;
