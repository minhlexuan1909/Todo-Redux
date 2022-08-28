import React from "react";
import { CircularProgress } from "react-cssfx-loading/lib";
import { useSelector } from "react-redux";

import Header from "../../../../components/Header/Header";
import { nameSelector } from "../../../profile/services/profileSlice";
import Todo from "../../components/Todo/Todo";
import {
  loadingTodoListSelector,
  todoListSelector,
} from "../../services/todoSlice";

const DashBoardPage = () => {
  const todoList = useSelector(todoListSelector);
  const fullname = useSelector(nameSelector);
  const loadingTodoList = useSelector(loadingTodoListSelector);

  return (
    <div>
      <Header fullname={fullname}></Header>
      <div>
        {loadingTodoList ? (
          <CircularProgress color="black"></CircularProgress>
        ) : (
          todoList.map((todo, index) => <Todo key={index} todo={todo} />)
        )}
      </div>
    </div>
  );
};

export default DashBoardPage;
