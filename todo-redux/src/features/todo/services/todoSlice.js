import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import AuthAPI from "../../auth/api";
import {
  addNoteThunk,
  addTodoThunk,
  deleteNoteThunk,
  deleteTodoThunk,
  editNoteThunk,
  editTodoThunk,
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
      // state = [];
      if ("error" in action.payload) {
        // console.log(action.payload.error.message);
        if (action.payload.error.statusCode === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          AuthAPI.logout();
        }
      } else {
        // state = action.payload;
        toast.success("Todolist Loaded");
        return [...action.payload];
        // action.payload.map((item) => state.push(item));
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
      toast.warn("Removing note...");
    });
    builder.addCase(deleteNoteThunk.fulfilled, (state, action) => {
      if (typeof action.payload === "Object" && "error" in action.payload) {
      } else {
        toast.success("Note removed");
        state.forEach((todo) => {
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
        state.forEach((todo) => {
          let note = todo.notes.find((note) => note.id === action.payload.id);
          if (note) {
            note.content = action.payload.content;
          }
        });
      }
    });
    builder.addCase(addTodoThunk.pending, () => {
      toast.warn("Creating todo...");
    });
    builder.addCase(addTodoThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        const errMessage = action.payload.error.message;
        toast.error(errMessage);
      } else {
        toast.success("Todo created");
        const newTodo = { ...action.payload, notes: [] };
        state.push(newTodo);
      }
    });
    builder.addCase(editTodoThunk.pending, () => {
      toast.warn("Editing todo...");
    });
    builder.addCase(editTodoThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        const errMessage = action.payload.error.message;
        toast.error(errMessage);
      } else {
        toast.success("Todo edited");
        const curTodo = state.find((todo) => todo.id === action.payload.id);
        console.log(curTodo);
        curTodo.name = action.payload.name;
        curTodo.isDone = action.payload.isDone;
      }
    });
    builder.addCase(deleteTodoThunk.pending, () => {
      toast.warn("Removing todo...");
    });
    builder.addCase(deleteTodoThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        const errMessage = action.payload.error.message;
        toast.error(errMessage);
      } else {
        toast.success("Todo removed");
        const todoFilteredList = state.filter(
          (todo) => todo.id !== action.payload.id
        );
        return [...todoFilteredList];
      }
    });
  },
});

export default todoSlice;
export const todoAction = todoSlice.actions;

export const todoListSelector = (state) => state.todo;
export const todoListLengthSelector = (state) => {
  return state.todo.length;
};
export const newestTodoIdSelector = (state) => {
  if (state.todo.length) {
    const tmpState = [...state.todo];
    return tmpState[tmpState.length - 1].id;
  } else return -1;
};
