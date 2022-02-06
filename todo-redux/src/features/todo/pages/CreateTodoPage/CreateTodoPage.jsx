import "./CreateTodoPage.scss";

import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  authTokenSelector,
  userIdSelector,
} from "../../../auth/services/authSlice";
import { getInfoThunk } from "../../../profile/services/profileThunk";
import TodoForm from "../../components/TodoForm/TodoForm";
import { getTodoThunk } from "../../services/todoThunk";

const CreateTodoPage = () => {
  const dispatch = useDispatch();

  const id = useSelector(userIdSelector);
  const token = useSelector(authTokenSelector);

  useEffect(() => {
    const data = {
      id: id,
      token: token,
    };
    dispatch(getInfoThunk(data));
    dispatch(getTodoThunk({ token: token }));
  }, []);

  return <TodoForm title={"Create"} name={""} isDone={0} notes={[]}></TodoForm>;
};

export default CreateTodoPage;
