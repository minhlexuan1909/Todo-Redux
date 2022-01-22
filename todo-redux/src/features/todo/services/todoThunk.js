import { createAsyncThunk } from "@reduxjs/toolkit";
import TodoAPI from "../api/TodoAPI";

export const getTodoThunk = createAsyncThunk(
  "todo/getTodoThunk",
  async (data) => {
    try {
      const response = await TodoAPI.getTodo(data.token);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return err.response.data;
    }
  }
);

export const toggleStatusTodoThunk = createAsyncThunk(
  "todo/toggleStatusTodoThunk",
  async (data) => {
    try {
      const id = data.id;
      const token = data.token;
      delete data.id;
      delete data.token;
      console.log(data);
      const response = await TodoAPI.toggleStatusTodo(data, id, token);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return err.response.data;
    }
  }
);
