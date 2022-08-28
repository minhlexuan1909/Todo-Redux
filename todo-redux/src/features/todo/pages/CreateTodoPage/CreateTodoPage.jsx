import "./CreateTodoPage.scss";

import React from "react";

import TodoForm from "../../components/TodoForm/TodoForm";

const CreateTodoPage = () => {
  return <TodoForm title={"Create"} name={""} isDone={0} notes={[]}></TodoForm>;
};

export default CreateTodoPage;
