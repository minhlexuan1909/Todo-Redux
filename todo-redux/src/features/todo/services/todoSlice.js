import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getTodoThunk, toggleStatusTodoThunk } from "./todoThunk";

const todoSlice = createSlice({
  name: "todo",
  initialState: [
    // {
    //   name: "Default Todo",
    //   isDone: 0,
    //   id: 1,
    //   notes: [
    //     {
    //       content: "note 1",
    //       todoId: 1,
    //       id: 1,
    //     },
    //   ],
    // },
  ],
  reducers: {
    toggleStatusTodo: (state, action) => {
      const togTodo = state.find((todo) => todo.id === action.payload);
      if (togTodo) {
        togTodo.isDone = Math.abs(togTodo.isDone - 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodoThunk.pending, (state, action) => {
      toast.warn("Loading Todo...");
    });
    builder.addCase(getTodoThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
      } else {
        // state = action.payload;
        action.payload.map((item) => state.push(item));
        toast.success("Todolist Loaded");
      }
    });
    builder.addCase(toggleStatusTodoThunk.pending, () => {
      toast.warn("Changing todo status");
    });
    builder.addCase(toggleStatusTodoThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        const errMessage = action.payload.message;
        toast.error(errMessage);
      } else {
        toast.success("Change status successfully");
      }
    });
  },
});

export default todoSlice;
export const todoAction = todoSlice.actions;

export const todoListSelector = (state) => state.todo;
