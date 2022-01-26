import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import AuthAPI from "../../auth/api";
import {
  addNoteThunk,
  deleteNoteThunk,
  editNoteThunk,
  getTodoThunk,
  toggleStatusTodoThunk,
} from "./todoThunk";
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
    // toggleStatusTodo: (state, action) => {
    //   const togTodo = state.find((todo) => todo.id === action.payload);
    //   if (togTodo) {
    //     togTodo.isDone = Math.abs(togTodo.isDone - 1);
    //   } else {
    //     console.log("Toggle error");
    //   }
    // },
    // addNote: (state, action) => {
    //   const curTodo = state.find((todo) => todo.id === action.payload.todoId);
    //   if (curTodo) {
    //     const note = {
    //       content: action.payload.content,
    //       todoId: curTodo.id,
    //       userId: action.payload.userId,
    //     };
    //     // curTodo.notes.push(note);
    //   } else {
    //     console.log("Add note error");
    //   }
    // },
    // deleteNote: (state, action) => {
    //   const curTodo = state.find((todo) => todo.id === action.payload.todoId);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodoThunk.pending, () => {
      toast.warn("Loading Todo...");
    });
    builder.addCase(getTodoThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        // console.log(action.payload.error.message);
        if (action.payload.error.statusCode === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          AuthAPI.logout();
        }
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
        const errMessage = action.payload.error.message;
        toast.error(errMessage);
      } else {
        toast.success("Change status successfully");
        const togTodo = state.find((todo) => todo.id === action.payload.id);
        if (togTodo) {
          togTodo.isDone = Math.abs(togTodo.isDone - 1);
        } else {
          console.log("Toggle error");
        }
      }
    });
    builder.addCase(addNoteThunk.pending, () => {
      toast.warn("Adding new note...");
    });
    builder.addCase(addNoteThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        const errMessage = action.payload.error.message;
        toast.error(errMessage);
      } else {
        toast.success("New note added");
        const curTodo = state.find((todo) => todo.id === action.payload.todoId);
        const note = {
          content: action.payload.content,
          todoId: action.payload.todoId,
          userId: action.payload.userId,
          id: action.payload.id,
        };
        curTodo.notes.push(note);
      }
    });
    builder.addCase(deleteNoteThunk.pending, () => {
      toast.warn("Deleting note...");
    });
    builder.addCase(deleteNoteThunk.fulfilled, (state, action) => {
      if (typeof action.payload === "Object" && "error" in action.payload) {
      } else {
        toast.success("Note deleted");
        state.map((todo) => {
          const index = todo.notes.findIndex(
            (note) => note.id === action.payload
          );
          // console.log(index);
          if (index > -1) {
            todo.notes.splice(index, 1);
          }
        });
      }
    });
    builder.addCase(editNoteThunk.pending, () => {
      toast.warn("Editing note...");
    });
    builder.addCase(editNoteThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        const errMessage = action.payload.error.message;
        toast.error(errMessage);
      } else {
        toast.success("Note edited");
        state.map((todo) => {
          let note = todo.notes.find((note) => note.id === action.payload.id);
          if (note) {
            note.content = action.payload.content;
          }
        });
      }
    });
  },
});

export default todoSlice;
export const todoAction = todoSlice.actions;

export const todoListSelector = (state) => state.todo;
