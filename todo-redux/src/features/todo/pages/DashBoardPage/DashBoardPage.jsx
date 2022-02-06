import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../../../components/Header/Header";
import {
  authTokenSelector,
  userIdSelector,
} from "../../../auth/services/authSlice";
import { nameSelector } from "../../../profile/services/profileSlice";
import { getInfoThunk } from "../../../profile/services/profileThunk";
import Todo from "../../components/Todo/Todo";
import { todoListSelector } from "../../services/todoSlice";
import { getTodoThunk } from "../../services/todoThunk";

const DashBoardPage = () => {
  const dispatch = useDispatch();
  const todoList = useSelector(todoListSelector);
  const token = useSelector(authTokenSelector);
  const id = useSelector(userIdSelector);
  const fullname = useSelector(nameSelector);
  useEffect(() => {
    const data = {
      id: id,
      token: token,
    };
    dispatch(getInfoThunk(data));
  }, []);

  useEffect(() => {
    const data = {
      token: token,
    };
    dispatch(getTodoThunk(data));
  }, []);

  return (
    <div className="dashboard">
      <Header fullname={fullname}></Header>
      <div>
        {todoList.map((todo, index) => (
          <Todo key={index} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default DashBoardPage;
