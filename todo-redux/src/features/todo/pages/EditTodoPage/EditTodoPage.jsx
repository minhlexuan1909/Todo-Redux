import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import TodoForm from "../../components/TodoForm/TodoForm";
import { todoListSelector } from "../../services/todoSlice";

const EditTodoPage = () => {
  const { idTodo } = useParams();

  const todoList = useSelector(todoListSelector);

  const [todoNotes, setTodoNotes] = useState([]);
  const [todo, setTodo] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    const found = todoList.find((todo) => todo.id === parseInt(idTodo));
    if (found) {
      setTodo(found);
      setTodoNotes(found.notes.map((note) => note.content));
      setShow(true);
    }
    console.log(found);
  }, [todoList, idTodo]);
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
