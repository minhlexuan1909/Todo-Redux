import "./DashBoardPage.scss";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../../../components/Header/Header";
import { authTokenSelector } from "../../../auth/services/authSlice";
import Todo from "../../components/Todo/Todo";
import { todoListSelector } from "../../services/todoSlice";
import { getTodoThunk } from "../../services/todoThunk";
import { toast } from "react-toastify";

const DashBoardPage = () => {
  const dispatch = useDispatch();
  const todoList = useSelector(todoListSelector);
  const token = useSelector(authTokenSelector);

  useEffect(() => {
    const data = {
      token: token,
    };
    dispatch(getTodoThunk(data));
  }, []);

  return (
    <div className="dashboard">
      <Header></Header>
      <div className="todo">
        {todoList.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default DashBoardPage;
