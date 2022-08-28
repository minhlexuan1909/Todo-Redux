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
  initialState: {
    todoList: [
      // {
      //   name: "Default Todo",
      //   isDone: 0,
      //   id: 1,
      //   notes: [
      //     {
      //       content: "note 1",
      //       todoId: 1,
      //       id: 1,
      //       loadingEditNote: false,
      //       loadingDeleteNote: false,
      //       isEditNote: false,
      //     },
      //   ],
      //   loadingDelete: false,
      //   loadingAddNote: false,
      //   loadingToggleStatus: false,
      // },
    ],
    loadingTodoList: false,
    loadingAddOrEditTodo: false,
  },
  reducers: {
    toggleEditButton: (state, action) => {
      let curNote = {};
      for (const todo of state.todoList) {
        curNote = todo.notes.find((note) => note.id === action.payload);
        if (curNote) break;
      }
      curNote.isEditNote = !curNote.isEditNote;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodoThunk.pending, (state) => {
      state.loadingTodoList = true;
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
        toast.success("Todolist Loaded");
        const todoData = [...action.payload];
        todoData.forEach((todo) => {
          todo.loadingDelete = false;
          todo.loadingAddNote = false;
          todo.loadingToggleStatus = false;
          for (const note of todo.notes) {
            note.loadingEditNote = false;
            note.loadingDeleteNote = false;
            note.isEditNote = false;
          }
        });
        return {
          ...state,
          todoList: [...todoData],
          loadingTodoList: false,
        };
        // action.payload.map((item) => state.push(item));
      }
    });
    builder.addCase(toggleStatusTodoThunk.pending, (state, action) => {
      const curTodo = state.todoList.find(
        (todo) => todo.id === action.meta.arg.id
      );
      curTodo.loadingToggleStatus = true;
    });
    builder.addCase(toggleStatusTodoThunk.fulfilled, (state, action) => {
      const togTodo = state.todoList.find(
        (todo) => todo.id === action.payload.id
      );
      togTodo.loadingToggleStatus = false;
      if ("error" in action.payload) {
        const errMessage = action.payload.error.message;
        toast.error(errMessage);
      } else {
        toast.success("Change status successfully");

        if (togTodo) {
          togTodo.isDone = Math.abs(togTodo.isDone - 1);
        } else {
          console.log("Toggle error");
        }
      }
    });
    builder.addCase(addNoteThunk.pending, (state, action) => {
      const curTodo = state.todoList.find(
        (todo) => todo.id === action.meta.arg.todoId
      );
      curTodo.loadingAddNote = true;
    });
    builder.addCase(addNoteThunk.fulfilled, (state, action) => {
      const curTodo = state.todoList.find(
        (todo) => todo.id === action.meta.arg.todoId
      );
      curTodo.loadingAddNote = false;
      if ("error" in action.payload) {
        const errMessage = action.payload.error.message;
        toast.error(errMessage);
      } else {
        toast.success("New note added");
        const note = {
          content: action.payload.content,
          todoId: action.payload.todoId,
          userId: action.payload.userId,
          id: action.payload.id,
        };
        curTodo.notes.push(note);
      }
    });
    builder.addCase(deleteNoteThunk.pending, (state, action) => {
      let curNote = {};
      for (const todo of state.todoList) {
        curNote = todo.notes.find((note) => note.id === action.meta.arg.id);
        if (curNote) break;
      }
      curNote.loadingDeleteNote = true;
    });
    builder.addCase(deleteNoteThunk.fulfilled, (state, action) => {
      let curNote = {};
      for (const todo of state.todoList) {
        curNote = todo.notes.find((note) => note.id === action.meta.arg.id);
        if (curNote) break;
      }
      curNote.loadingDeleteNote = false;
      if (typeof action.payload === "object" && "error" in action.payload) {
      } else {
        toast.success("Note removed");
        state.todoList.forEach((todo) => {
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
    builder.addCase(editNoteThunk.pending, (state, action) => {
      let curNote = {};
      for (const todo of state.todoList) {
        curNote = todo.notes.find((note) => note.id === action.meta.arg.id);
        if (curNote) break;
      }
      curNote.loadingEditNote = true;
    });
    builder.addCase(editNoteThunk.fulfilled, (state, action) => {
      let curNote = {};
      for (const todo of state.todoList) {
        curNote = todo.notes.find((note) => note.id === action.meta.arg.id);
        if (curNote) break;
      }
      curNote.loadingEditNote = false;
      curNote.isEditNote = false;
      if ("error" in action.payload) {
        const errMessage = action.payload.error.message;
        toast.error(errMessage);
      } else {
        toast.success("Note edited");
        state.todoList.forEach((todo) => {
          let note = todo.notes.find((note) => note.id === action.payload.id);
          if (note) {
            note.content = action.payload.content;
          }
        });
      }
    });
    builder.addCase(addTodoThunk.pending, (state) => {
      state.loadingAddOrEditTodo = true;
    });
    builder.addCase(addTodoThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        const errMessage = action.payload.error.message;
        toast.error(errMessage);
      } else {
        toast.success("Todo created");
        const newTodo = { ...action.payload, notes: [] };
        state.todoList.push(newTodo);
      }
      state.loadingAddOrEditTodo = false;
    });
    builder.addCase(editTodoThunk.pending, (state) => {
      state.loadingAddOrEditTodo = true;
    });
    builder.addCase(editTodoThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        const errMessage = action.payload.error.message;
        toast.error(errMessage);
      } else {
        toast.success("Todo edited");
        const curTodo = state.todoList.find(
          (todo) => todo.id === action.payload.id
        );
        console.log(curTodo);
        curTodo.name = action.payload.name;
        curTodo.isDone = action.payload.isDone;
      }
      state.loadingAddOrEditTodo = false;
    });
    builder.addCase(deleteTodoThunk.pending, (state, action) => {
      const curTodo = state.todoList.find(
        (todo) => todo.id === action.meta.arg.id
      );
      curTodo.loadingDelete = true;
    });
    builder.addCase(deleteTodoThunk.fulfilled, (state, action) => {
      if ("error" in action.payload) {
        const errMessage = action.payload.error.message;
        toast.error(errMessage);
      } else {
        toast.success("Todo removed");
        const todoFilteredList = state.todoList.filter(
          (todo) => todo.id !== action.payload.id
        );
        return {
          ...state,
          todoList: [...todoFilteredList],
        };
      }
    });
  },
});

export default todoSlice;
export const todoAction = todoSlice.actions;

export const todoListSelector = (state) => state.todo.todoList;
export const loadingTodoListSelector = (state) => state.todo.loadingTodoList;
export const loadingAddOrEditTodoSelector = (state) =>
  state.todo.loadingAddOrEditTodo;
export const todoListLengthSelector = (state) => {
  return state.todo.todoList.length;
};
export const newestTodoIdSelector = (state) => {
  if (state.todo.todoList.length) {
    const tmpState = [...state.todo.todoList];
    return tmpState[tmpState.length - 1].id;
  } else return -1;
};
